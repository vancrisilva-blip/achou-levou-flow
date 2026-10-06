import {createHash} from 'node:crypto';
import {mkdir, writeFile, appendFile} from 'node:fs/promises';
export const ENDPOINT='https://open-api.affiliate.shopee.com.br/graphql';
// Authentication and field names verified against Shopee's own Explorer:
// https://open-api.affiliate.shopee.com.br/explorer
export const QUERY='{ productOfferV2 { nodes { productName itemId commission price priceMin priceMax ratingStar offerLink } } }';
export function authorization(appId,secret,timestamp,payload){
  const signature=createHash('sha256').update(appId+timestamp+payload+secret).digest('hex');
  return `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${signature}`;
}
export async function diagnose(env=process.env,request=fetch){
  const report={checkedAt:new Date().toISOString(),status:'not_connected',offerCount:0,availableFields:[],codes:[]};
  const appId=env.SHOPEE_APP_ID?.trim(),secret=env.SHOPEE_APP_SECRET?.trim();
  if(!appId||!secret)return {...report,status:'missing_credentials',missingNames:[...(!appId?['SHOPEE_APP_ID']:[]),...(!secret?['SHOPEE_APP_SECRET']:[])]};
  const payload=JSON.stringify({query:QUERY});
  const timestamp=String(Math.ceil(Date.now()/1000));
  try{
    const response=await request(ENDPOINT,{method:'POST',redirect:'error',headers:{'Content-Type':'application/json',Authorization:authorization(appId,secret,timestamp,payload)},body:payload,signal:AbortSignal.timeout(30000)});
    if(!response.ok)return {...report,status:'http_error',httpStatus:response.status};
    const result=await response.json();
    if(Array.isArray(result.errors)&&result.errors.length){
      // Do not log raw API error messages, request headers, IDs or credentials.
      report.codes=result.errors.map(e=>Number(e?.extensions?.code)).filter(Number.isFinite);
      return {...report,status:'api_error'};
    }
    const nodes=result.data?.productOfferV2?.nodes;
    if(!Array.isArray(nodes))return {...report,status:'unexpected_response'};
    const fields=['productName','itemId','commission','price','priceMin','priceMax','ratingStar','offerLink'];
    return {...report,status:'connected',offerCount:nodes.length,availableFields:fields.filter(key=>nodes.some(n=>n&&n[key]!=null))};
  }catch{return {...report,status:'connection_error'};}
}
export async function main(){
  const report=await diagnose();
  await mkdir('diagnostics',{recursive:true});
  await writeFile('diagnostics/shopee-status.json',JSON.stringify(report,null,2));
  const labels={connected:'Conexão confirmada',missing_credentials:'SHOPEE_APP_ID ou SHOPEE_APP_SECRET ausente',http_error:'Erro HTTP',api_error:'Consulta rejeitada pela API',unexpected_response:'Resposta inesperada',connection_error:'Falha de conexão ou timeout'};
  const summary=`## Diagnóstico Shopee\n\n${labels[report.status]}\n\nSecrets ausentes: ${(report.missingNames||[]).join(', ')||'nenhum'}\n\nOfertas retornadas: ${report.offerCount}\n\nCampos disponíveis: ${report.availableFields.join(', ')||'nenhum confirmado'}\n\nCódigos de erro: ${report.codes.join(', ')||'nenhum'}\n\nHTTP: ${report.httpStatus||'—'}\n\nNenhum produto ou dado comercial foi publicado. Frete grátis não é confirmado por esta consulta.\n`;
  console.log(labels[report.status]);
  if(report.missingNames)console.log('Secrets ausentes: '+report.missingNames.join(', '));
  if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,summary);
  if(report.status!=='connected')process.exitCode=1;
}
if(process.argv[1]?.endsWith('/test-shopee.mjs'))await main();
