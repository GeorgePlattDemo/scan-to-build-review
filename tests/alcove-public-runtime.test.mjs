import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const html = fs.readFileSync(new URL('../system-build-base-8d8a9dd.html',import.meta.url),'utf8');
const bridge = fs.readFileSync(new URL('../stb-alcove-store-bridge.js',import.meta.url),'utf8');
const runtimeConfig = JSON.parse(fs.readFileSync(new URL('../stb-store-runtime.json',import.meta.url),'utf8'));
const definitions = html.slice(html.indexOf('function alcoveComponentPrograms('),html.indexOf('function storeMoney('));
const endpoint = runtimeConfig.jobEndpoint;
if (!endpoint) throw new Error('public Store runtime endpoint is not configured');
const endpointUrl = new URL(endpoint);
const healthUrl = new URL('/healthz', endpointUrl).href;
const reviewOrigin = 'https://georgeplattdemo.github.io';

test('public Store Zero deployment is healthy, CORS-valid, and serves Alcove', async () => {
  const health = await fetch(healthUrl,{cache:'no-store'});
  assert.equal(health.status,200);
  assert.equal((await health.text()).trim(),'ok');

  const preflight = await fetch(endpoint,{
    method:'OPTIONS',
    headers:{
      Origin:reviewOrigin,
      'Access-Control-Request-Method':'POST',
      'Access-Control-Request-Headers':'content-type'
    }
  });
  assert.equal(preflight.status,204);
  assert.equal(preflight.headers.get('access-control-allow-origin'),reviewOrigin);

  const context = vm.createContext({
    URL,crypto,TextEncoder,AbortSignal,
    alcove:{pilotShelves:false},
    window:{location:{hostname:'georgeplattdemo.github.io'}},
    document:{currentScript:{src:'https://georgeplattdemo.github.io/scan-to-build-review/stb-alcove-store-bridge.js'}},
    fetch:async (url,options={}) => {
      if(String(url).endsWith('/stb-store-runtime.json')) return Response.json(runtimeConfig);
      return fetch(url,{
        ...options,
        headers:{...options.headers,Origin:reviewOrigin}
      });
    }
  });

  vm.runInContext(definitions+'\n'+bridge,context);
  context.input={h:65,w:44,d:14,n:5,span:42.5,material:'pine',pilotFeatures:[]};
  const definition=vm.runInContext('buildAlcoveStoreDefinition(input)',context);
  const answer=await context.window.STBAlcoveStoreBridge.request(definition);

  assert.equal(answer.storePin,'39a1b318063f62220c9c20c42200389098e0c687');
  assert.equal(answer.rawEvaluation.status,'SUPPORTABLE');
  assert.equal(answer.rawEvaluation.freshEvaluation,true);
  assert.equal(answer.rawEstimate.totals.material,230.88);
  assert.equal(answer.rawEstimate.totals.hardware,18);
  assert.equal(answer.rawEstimate.totals.Q,381.31);
  assert.deepEqual(
    answer.rawEvaluation.lines.map(line=>[line.role,line.storeSku,line.qty]),
    [
      ['UPRIGHTS','STB-ZERO-PINE-1X6-72-001',4],
      ['SHELVES','STB-ZERO-PINE-1X6-96-001',8]
    ]
  );

  console.log(JSON.stringify({
    endpoint,
    health:health.status,
    cors:preflight.status,
    storePin:answer.storePin,
    totals:answer.rawEstimate.totals
  }));
});
