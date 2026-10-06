'use strict';
const KEY='achou-levou-plano-b-v1';
const $=id=>document.getElementById(id);
let records={},products=[],suggested=null,storageOK=true;
try{records=JSON.parse(localStorage.getItem(KEY)||'{}');if(!records||Array.isArray(records)||typeof records!=='object')throw Error();}catch{records={};storageOK=false;}
const msg=t=>$('message').textContent=t;
function persist(next){try{localStorage.setItem(KEY,JSON.stringify(next));records=next;storageOK=true;return true;}catch{msg('Não foi possível salvar. Exporte uma cópia antes de fechar.');return false;}}
function save(id,patch){if(!storageOK){msg('Revisões indisponíveis. Importe uma cópia válida para recuperar os registros.');return false;}const p=products.find(p=>p.id===id);const now=new Date().toISOString();const old=records[id]||{};
const action=patch.copiedFor?'Mensagem copiada para '+patch.copiedFor:patch.status==='approved'?'Aprovado para copiar':patch.status==='rejected'?'Rejeitado':Object.hasOwn(patch,'shipping')?'Conferência de frete atualizada':'Mensagem editada';
const history=[...(Array.isArray(old.history)?old.history:[]),{at:now,action}].slice(-50);
return persist({...records,[id]:{...old,...patch,name:p?.name||old.name||id,link:p?.link||old.link||'',history,updatedAt:now}});}
function node(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;}
const date=v=>new Date(v).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'});
const money=v=>Number.isFinite(v)?v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):'Sem dados';
const numeric=p=>Number.isFinite(p.price)&&p.price<=30&&Number.isFinite(p.commission)&&p.commission>=4&&Number.isFinite(p.rating)&&p.rating>=4.8;
const stale=p=>!Number.isFinite(Date.parse(p.fetchedAt))||Date.now()-Date.parse(p.fetchedAt)>86400000;
function validLink(v){try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password&&['shopee.com.br','s.shopee.com.br','collshp.com'].includes(u.hostname);}catch{return false;}}
function current(p){const r=records[p.id]||{};return r.fetchedAt===p.fetchedAt?r:{status:'prepared',draft:r.draft||''};}
function initial(p){return p.name+'\n\nPreço a partir de '+money(p.price)+' • consulta em '+date(p.fetchedAt)+'.\nConfira variações, medidas, estoque, preço e frete no anúncio antes de comprar.';}
function messageFor(p,r){return (r.draft||initial(p)).trim()+'\n\nConfira a oferta:\n'+p.link+'\n\nPublicidade • Posso receber comissão pela compra.';}
function render(){
renderHistory();
const count=s=>products.filter(p=>(current(p).status||'prepared')===s).length;
$('summary').textContent=products.length+' ofertas • '+count('prepared')+' aguardando revisão • '+count('approved')+' aprovadas • '+count('rejected')+' rejeitadas.';
const list=$('products');list.replaceChildren();
const shown=products.filter(p=>{const r=current(p);return (!suggested||suggested.includes(p.id))&&p.name.toLocaleLowerCase('pt-BR').includes($('search').value.toLocaleLowerCase('pt-BR'))&&($('status').value==='all'||$('status').value===(r.status||'prepared'))&&(!$('numeric').checked||numeric(p))&&(!$('shipping-only').checked||r.shipping===true);});
if(!shown.length)list.append(node('p','Nenhuma oferta atende à seleção. Limpe os filtros ou recarregue o catálogo.','card'));
for(const p of shown){
const r=current(p),c=node('article',undefined,'card product');
c.append(node('span',({prepared:'Aguardando revisão',approved:'Aprovado • pronto para copiar',rejected:'Rejeitado'})[r.status||'prepared'],'badge'),node('h3',p.name));
if(p.imageUrl&&/^https:\/\//.test(p.imageUrl)){const img=node('img');img.src=p.imageUrl;img.alt=p.name;img.className='offer-image';img.loading='lazy';img.referrerPolicy='no-referrer';img.onerror=()=>{img.replaceWith(node('p','Imagem indisponível. Abra o anúncio para conferir.'));};c.prepend(img);}
c.append(node('p','Preço: '+money(p.price)+' • Comissão estimada: '+money(p.commission)+' • Nota: '+(Number.isFinite(p.rating)?p.rating:'Sem dados')),node('p','Consulta: '+date(p.fetchedAt)+(stale(p)?' • Desatualizado: busque uma consulta nova antes de aprovar.':'')),node('p','Procura: '+(Number.isFinite(p.sales)?p.sales+' vendas informadas pela API (período não informado).':'não verificada.')+' Concorrência: não verificada.'),node('p',numeric(p)?'Atende aos filtros numéricos.':'Não atende aos filtros numéricos.'));
const a=node('a','Conferir anúncio e frete');a.href=p.link;a.target='_blank';a.rel='noopener noreferrer';c.append(a);
const check=node('label',undefined,'check'),input=node('input');input.type='checkbox';input.checked=r.shipping===true;check.append(input,node('span','Conferi frete grátis para minha região nesta consulta'));input.onchange=()=>{if(save(p.id,{fetchedAt:p.fetchedAt,shipping:input.checked,status:'prepared'}))render();};c.append(check);
const label=node('label','Editar mensagem'),edit=node('textarea');edit.value=r.draft||initial(p);edit.maxLength=4000;label.append(edit);c.append(label);edit.onchange=()=>{if(save(p.id,{fetchedAt:p.fetchedAt,draft:edit.value,status:'prepared'})){msg('Edição salva. Revise novamente antes de aprovar.');render();}};
c.append(node('small','Seu link e o aviso de publicidade são adicionados abaixo e preservados ao copiar.'),node('p',messageFor(p,r)));
if(r.note)c.append(node('p','Motivo: '+r.note));
const actions=node('div',undefined,'actions'),approve=node('button','Aprovar para copiar','primary');approve.disabled=stale(p)||r.status==='approved';approve.onclick=()=>{if(!edit.value.trim()){msg('Escreva a mensagem antes de aprovar.');return;}if(save(p.id,{fetchedAt:p.fetchedAt,draft:edit.value,status:'approved',note:''})){msg('Aprovado para cópia manual. Nenhum envio realizado.');render();}};
const reject=node('button','Rejeitar');reject.onclick=()=>{const note=prompt('Motivo da rejeição:');if(!note?.trim())return;if(save(p.id,{fetchedAt:p.fetchedAt,status:'rejected',note:note.trim()}))render();};
actions.append(approve,reject);
for(const channel of ['Telegram','WhatsApp']){const copy=node('button','Copiar para '+channel);copy.disabled=r.status!=='approved'||stale(p);copy.onclick=async()=>{const text=messageFor(p,current(p));try{await navigator.clipboard.writeText(text);save(p.id,{copiedFor:channel});renderHistory();msg('Mensagem copiada para '+channel+'. Compartilhe manualmente quando desejar.');}catch{const box=node('textarea');box.value=text;box.readOnly=true;box.setAttribute('aria-label','Mensagem para copiar');c.append(box);box.focus();box.select();msg('Selecione e copie a mensagem exibida.');}};actions.append(copy);}
c.append(actions);list.append(c);
}}
async function load(){suggested=null;$('catalog-status').textContent='Carregando…';try{const response=await fetch('./data/shopee-catalog.json',{cache:'no-store'});if(!response.ok)throw Error();const d=await response.json();if(d.version!==1||d.status!=='connected'||!Array.isArray(d.products))throw Error();const seen=new Set();products=d.products.filter(p=>typeof p.id==='string'&&!seen.has(p.id)&&seen.add(p.id)&&typeof p.name==='string'&&validLink(p.link)&&p.source==='shopee_api').slice(0,20);$('catalog-status').textContent=products.length+' ofertas reais • Consulta: '+date(d.fetchedAt)+'.';}catch{products=[];$('catalog-status').textContent='Catálogo indisponível. Atualize as ofertas pelo GitHub.';}render();}
$('reload').onclick=load;
$('suggest').onclick=()=>{suggested=products.filter(p=>numeric(p)&&!stale(p)&&(current(p).status||'prepared')==='prepared').sort((a,b)=>(b.commission||0)-(a.commission||0)).slice(0,5).map(p=>p.id);msg(suggested.length+' sugestões do catálogo atual. Frete ainda depende de conferência. Recarregue para voltar a todas.');render();};
for(const id of ['search','status','numeric','shipping-only'])$(id).oninput=render;
$('export').onclick=()=>{const a=node('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),records},null,2)],{type:'application/json'}));a.download='plano-b-revisoes.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};

function renderHistory(){const list=$('history');list.replaceChildren();const events=Object.values(records).flatMap(r=>(r.history||[]).map(h=>({...h,name:r.name||'Produto revisado'}))).sort((a,b)=>Date.parse(b.at)-Date.parse(a.at)).slice(0,50);
if(!events.length){list.append(node('p','Nenhuma revisão registrada neste navegador.'));return;}
for(const e of events)list.append(node('p',date(e.at)+' — '+e.name+' • '+e.action));
}
function validateImport(data){
if(data?.version!==1||!data.records||typeof data.records!=='object'||Array.isArray(data.records))throw Error('Formato não reconhecido');
const entries=Object.entries(data.records);if(entries.length>1000)throw Error('Quantidade de registros excedida');
const clean={};
for(const [id,r] of entries){
if(['__proto__','constructor','prototype'].includes(id)||id.length>200||!r||typeof r!=='object'||Array.isArray(r)||!['prepared','approved','rejected'].includes(r.status)||!Number.isFinite(Date.parse(r.fetchedAt))||!Number.isFinite(Date.parse(r.updatedAt)))throw Error('Registro inválido');
for(const key of ['draft','note','name'])if(r[key]!==undefined&&(typeof r[key]!=='string'||r[key].length>4000))throw Error('Texto inválido');
if(r.link!==undefined&&r.link!==''&&!validLink(r.link))throw Error('Link inválido');
if(r.shipping!==undefined&&typeof r.shipping!=='boolean')throw Error('Conferência de frete inválida');
if(r.history!==undefined&&(!Array.isArray(r.history)||r.history.length>50||r.history.some(h=>!h||!Number.isFinite(Date.parse(h.at))||typeof h.action!=='string'||h.action.length>150)))throw Error('Histórico inválido');
clean[id]={status:r.status,fetchedAt:r.fetchedAt,updatedAt:r.updatedAt,draft:r.draft||'',note:r.note||'',name:r.name||id,link:r.link||'',shipping:r.shipping===true,history:(r.history||[]).map(h=>({at:h.at,action:h.action}))};
}
return clean;
}
$('import').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>2000000)throw Error('Arquivo acima de 2 MB');const incoming=validateImport(JSON.parse(await file.text()));const next={...records};let changed=0;for(const [id,r] of Object.entries(incoming)){if(!next[id]||Date.parse(r.updatedAt)>Date.parse(next[id].updatedAt)){next[id]=r;changed++;}}if(persist(next)){render();msg(changed+' revisão(ões) importada(s). Registros mais recentes foram preservados; nenhum envio realizado.');}}catch(error){msg('Importação recusada: '+error.message);}finally{e.target.value='';}};
function showStatus(status){suggested=null;$('status').value=status;$('search').value='';$('numeric').checked=false;$('shipping-only').checked=false;render();$('products').scrollIntoView({behavior:'smooth'});}
$('queue').onclick=()=>showStatus('approved');
$('pending').onclick=()=>showStatus('prepared');
$('all').onclick=()=>showStatus('all');
window.addEventListener('storage',e=>{if(e.key!==KEY)return;try{const next=JSON.parse(e.newValue||'{}');if(!next||typeof next!=='object'||Array.isArray(next))throw Error();records=next;render();}catch{msg('Não foi possível atualizar os registros de outra aba.');}});

if(!storageOK)msg('Não foi possível ler as revisões salvas. Alterações foram bloqueadas.');
load();
