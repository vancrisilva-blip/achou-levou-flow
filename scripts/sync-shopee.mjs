import {mkdir,writeFile} from 'node:fs/promises';
import {ENDPOINT,authorization} from './test-shopee.mjs';
// These fields are listed in Shopee's official Explorer default query.
export const CATALOG_QUERY='{ productOfferV2 { nodes { productName itemId shopId commission price priceMin priceMax ratingStar offerLink productLink imageUrl shopName sales } } }';
export function numberOrNull(value){if(value===null||value===undefined||value==='')return null;const n=Number(value);return Number.isFinite(n)?n:null;}
export function normalizeOffer(n,fetchedAt){
  const name=typeof n.productName==='string'?n.productName.trim():'';
  const link=typeof n.offerLink==='string'?n.offerLink:'';
  const price=numberOrNull(n.priceMin)??numberOrNull(n.price);
  if(!name||!link||!n.itemId||price===null||price<=0)return null;
  let url;try{url=new URL(link);}catch{return null;}
  if(url.protocol!=='https:'||url.username||url.password||!['shopee.com.br','s.shopee.com.br','collshp.com'].includes(url.hostname))return null;
  const rating=numberOrNull(n.ratingStar),commission=numberOrNull(n.commission);
  return {id:`shopee:${n.shopId||''}:${n.itemId}`,name,link,price,priceMax:numberOrNull(n.priceMax),commission:commission!==null&&commission>=0?commission:null,rating:rating!==null&&rating>=0&&rating<=5?rating:null,shipping:false,shippingConfirmed:false,imageUrl:typeof n.imageUrl==='string'&&n.imageUrl.startsWith('https://')?n.imageUrl:null,shopName:typeof n.shopName==='string'?n.shopName:null,sales:numberOrNull(n.sales),status:'pending',source:'shopee_api',createdAt:fetchedAt,fetchedAt,caption:`${name}\n\nAntes de comprar, confira as variações, as medidas, o preço e o frete no anúncio.\n\nConfira a oferta pelo meu link de afiliada.\nPublicidade • Posso receber comissão pela compra.`};
}
export async function synchronize(env=process.env,request=fetch){
  const fetchedAt=new Date().toISOString();
  const base={version:1,fetchedAt,status:'not_connected',products:[],received:0,shippingAvailable:false};
  const appId=env.SHOPEE_APP_ID?.trim(),secret=env.SHOPEE_APP_SECRET?.trim();
  if(!appId||!secret)return {...base,status:'missing_credentials'};
  const payload=JSON.stringify({query:CATALOG_QUERY}),timestamp=String(Math.ceil(Date.now()/1000));
  try{
    const response=await request(ENDPOINT,{method:'POST',redirect:'error',headers:{'Content-Type':'application/json',Authorization:authorization(appId,secret,timestamp,payload)},body:payload,signal:AbortSignal.timeout(30000)});
    if(!response.ok)return {...base,status:'http_error'};
    const result=await response.json();
    if(result.errors?.length)return {...base,status:'api_error',codes:result.errors.map(e=>Number(e?.extensions?.code)).filter(Number.isFinite)};
    const nodes=result.data?.productOfferV2?.nodes;
    if(!Array.isArray(nodes))return {...base,status:'unexpected_response'};
    const unique=new Map();for(const n of nodes){const p=normalizeOffer(n,fetchedAt);if(p)unique.set(p.id,p);}
    const passes=p=>p.price<=30&&p.commission!==null&&p.commission>=4&&p.rating!==null&&p.rating>=4.8;
    const products=[...unique.values()].sort((a,b)=>Number(passes(b))-Number(passes(a))||(b.commission??-1)-(a.commission??-1)).slice(0,20);
    return {...base,status:'connected',received:nodes.length,products};
  }catch{return {...base,status:'connection_error'};}
}
export async function main(){
  const catalog=await synchronize();
  await mkdir('public/data',{recursive:true});
  // Only public offer details are emitted. No credentials, account IDs, orders,
  // revenue reports, raw error messages or request headers are saved.
  await writeFile('public/data/shopee-catalog.json',JSON.stringify(catalog));
  console.log(`Shopee catálogo: ${catalog.status}; ofertas recebidas: ${catalog.received}; exibidas: ${catalog.products.length}`);
}
if(process.argv[1]?.endsWith('/sync-shopee.mjs'))await main();
