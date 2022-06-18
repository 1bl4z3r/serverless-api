const corsHeaders = {
  "Access-Control-Allow-Origin": ORIGIN_URI,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function TG(BODY){
  const bot_url = `https://api.telegram.org/bot${TELEGRAMTOKEN}/sendMessage`;
  const messageSend = JSON.stringify({ "chat_id": CHATID, "text": BODY });
  try {
    let response = fetch(bot_url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: messageSend });
    return await response;
  } catch (error) {
    console.log(error);
  }
}
async function UPDATE(request) {

  const obj = await request.json();

  const BODY = `
  
  NEW UPDATE            
  ----------------------------------
  ----------------------------------
  Name : ${obj.FIRST_NAME} ${obj.LAST_NAME}
  Email : ${obj.EMAIL}
  Message : 
  ${obj.MSG}

  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  User Agent = ${obj.UA}
  Language = ${obj.LANG}
  System date/time = ${obj.DT}
  System Timezone = ${obj.ZONE}
  =================================
  =================================
  IP = ${request.headers.get('CF-Connecting-IP')}
  Colo = ${request.cf.colo}
  Country = ${request.cf.country}
  City = ${request.cf.city}
  Location = https://www.google.com/maps/place/${request.cf.latitude}+${request.cf.longitude}
  PostalCode = ${request.cf.postalCode}
  Region = ${request.cf.region}
  Timezone = ${request.cf.timezone}
  Organization = ${request.cf.asOrganization}
  ====================================`;

  await TG(BODY);
}
async function ACTIVITY(request) {
  const BODY = `
  
  ACTIVITY LOG
  ------------------------------------
  ------------------------------------
  IP = ${request.headers.get('CF-Connecting-IP')}
  CF-RAY = ${request.headers.get('cf-ray')}
  User-Agent = ${request.headers.get('user-agent')}
  Colo = ${request.cf.colo}
  Country = ${request.cf.country}
  City = ${request.cf.city}
  Location = https://www.google.com/maps/place/${request.cf.latitude}+${request.cf.longitude}
  ASN = ${request.cf.asn}
  PostalCode = ${request.cf.postalCode}
  Region = ${request.cf.region}
  Timezone = ${request.cf.timezone}
  Organization = ${request.cf.asOrganization}
  BODY = 
  ${JSON.stringify(await request.json(), null, 2)}
  ====================================`;

  await TG(BODY);
}

function handleOptions(request) {
  if (request.headers.get("Origin") !== null &&
    request.headers.get("Access-Control-Request-Method") !== null &&
    request.headers.get("Access-Control-Request-Headers") !== null) {
    return new Response(null, {
      headers: corsHeaders
    })
  } else {
    return new Response(null, {
      headers: {
        "Allow": "POST, OPTIONS",
      }
    })
  }
}

async function handleRequest(request) {
  const url = new URL(request.url)

  if ((url.pathname === "/submit") && (request.method === "POST") && (request.headers.get('Origin') === ORIGIN_URI)) {
    await UPDATE(request);

    return new Response(JSON.stringify({ COMMENT: 'If you are seeing this shit, then we have a lot in common' }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      }
    })
  }
  else if (request.method === "OPTIONS") {
    return handleOptions(request)
  }
  else {
    await ACTIVITY(request);
    return new Response('492077696c6c206e6f742070726f6365737320746869732072657175657374', {
      headers: { 'content-type': 'text/html' },
      status: 405
    })
  }
}