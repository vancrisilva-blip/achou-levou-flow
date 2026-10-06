'use strict';
const KEY='achou-levou-plano-b-v1';
const $=id=>document.getElementById(id);
let records={},products=[],suggested=null,storageOK=true;
try{records=JSON.parse(localStorage.getItem(KEY)||'{}');if(!records||Array.isArray(records)||typeof records!=='object')throw Error();}catch{records={};storageOK=false;}
const msg=t=>$('message').textContent=t;
function save(id,patch){if(!storageOK){msg('Revisões indisponíveis. Recupere seus registros antes de editar.');return false;}const next={...records,[id]:{...records[id],...patch,updatedAt:new Date().toISOString()}};try{localStorage.setItem(KEY,JSON.stringify(next));records=next;return true;}catch{msg('Não foi possível salvar. Exporte uma cópia antes de fechar.');return false;}}
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
for(const channel of ['Telegram','WhatsApp']){const copy=node('button','Copiar para '+channel);copy.disabled=r.status!=='approved'||stale(p);copy.onclick=async()=>{const text=messageFor(p,current(p));try{await navigator.clipboard.writeText(text);msg('Mensagem copiada para '+channel+'. Compartilhe manualmente quando desejar.');}catch{const box=node('textarea');box.value=text;box.readOnly=true;box.setAttribute('aria-label','Mensagem para copiar');c.append(box);box.focus();box.select();msg('Selecione e copie a mensagem exibida.');}};actions.append(copy);}
c.append(actions);list.append(c);
}}
async function load(){suggested=null;$('catalog-status').textContent='Carregando…';try{const response=await fetch('./data/shopee-catalog.json',{cache:'no-store'});if(!response.ok)throw Error();const d=await response.json();if(d.version!==1||d.status!=='connected'||!Array.isArray(d.products))throw Error();const seen=new Set();products=d.products.filter(p=>typeof p.id==='string'&&!seen.has(p.id)&&seen.add(p.id)&&typeof p.name==='string'&&validLink(p.link)&&p.source==='shopee_api').slice(0,20);$('catalog-status').textContent=products.length+' ofertas reais • Consulta: '+date(d.fetchedAt)+'.';}catch{products=[];$('catalog-status').textContent='Catálogo indisponível. Atualize as ofertas pelo GitHub.';}render();}
$('reload').onclick=load;
$('suggest').onclick=()=>{suggested=products.filter(p=>numeric(p)&&!stale(p)&&(current(p).status||'prepared')==='prepared').sort((a,b)=>(b.commission||0)-(a.commission||0)).slice(0,5).map(p=>p.id);msg(suggested.length+' sugestões do catálogo atual. Frete ainda depende de conferência. Recarregue para voltar a todas.');render();};
for(const id of ['search','status','numeric','shipping-only'])$(id).oninput=render;
$('export').onclick=()=>{const a=node('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),records},null,2)],{type:'application/json'}));a.download='plano-b-revisoes.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
if(!storageOK)msg('Não foi possível ler as revisões salvas. Alterações foram bloqueadas.');
load();
