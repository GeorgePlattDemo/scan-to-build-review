import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import test from 'node:test';

// Requires actual clean pinned Store and System checkouts. No substitute evaluator.
const system = process.env.STB_SYSTEM_ROOT;
if (!system || !process.env.STB_STORE_ZERO_ROOT) throw new Error('STB_SYSTEM_ROOT and STB_STORE_ZERO_ROOT are required');
const {startHostedStore} = await import(pathToFileURL(path.join(system,'apps/stb/server/hosted-store.mjs')));
const html = fs.readFileSync(new URL('../system-build-base-8d8a9dd.html',import.meta.url),'utf8');
const bridge = fs.readFileSync(new URL('../stb-alcove-store-bridge.js',import.meta.url),'utf8');
const definitions = html.slice(html.indexOf('function alcoveComponentPrograms('),html.indexOf('function storeMoney('));

test('existing Alcove definition and bridge reach real pinned Store over HTTP', async () => {
 const host = await startHostedStore({host:'127.0.0.1',port:0});
 let endpoint = `http://127.0.0.1:${host.port}/api/store-zero/job`, corrupt = false, calls = 0;
 const context = vm.createContext({URL,crypto,TextEncoder,AbortSignal,alcove:{pilotShelves:false},
   window:{location:{hostname:'localhost'}},document:{currentScript:{src:'http://localhost/stb-alcove-store-bridge.js'}},
   fetch:async (url,options) => {
     if(url.endsWith('/stb-store-runtime.json')) return Response.json({jobEndpoint:endpoint});
     calls++;
     const response = await fetch(url,{...options,headers:{...options.headers,Origin:'https://georgeplattdemo.github.io'}});
     if(!corrupt) return response;
     const body = await response.json(); body.candidateRevisionId = 'OTHER-JOB';
     return Response.json(body,{status:response.status});
   }});
 vm.runInContext(definitions+'\n'+bridge,context);
 const definition = changes => {
   context.input={h:65,w:44,d:14,n:5,span:42.5,material:'pine',pilotFeatures:[],...changes};
   return vm.runInContext('buildAlcoveStoreDefinition(input)',context);
 };
 const request = changes => context.window.STBAlcoveStoreBridge.request(definition(changes));
 try {
   const pine = await request({});
   const poplar = await request({material:'poplar'});
   const shallow = await request({d:11});
   for(const answer of [pine,poplar,shallow]) {
     assert.equal(answer.rawEvaluation.status,'SUPPORTABLE');
     assert.equal(answer.rawEvaluation.freshEvaluation,true);
     assert.ok(answer.rawEstimate.totals.Q > 0);
     const t = answer.rawEstimate.totals;
     assert.ok(Math.abs(t.Q-(t.material+t.hardware+t.machine_service)) < 0.011);
   }
   assert.notEqual(pine.rawEstimate.totals.material,poplar.rawEstimate.totals.material);
   assert.notEqual(pine.calculationIdentity.inputHash,shallow.calculationIdentity.inputHash);
   const repeat = await request({});
   assert.notEqual(pine.requestId,repeat.requestId);
   assert.equal(pine.calculationIdentity.resultHash,repeat.calculationIdentity.resultHash);
   corrupt=true;
   await assert.rejects(request({}),/STORE_CORRELATION_ERROR/);
   corrupt=false;
   endpoint=null;
   const before=calls;
   await assert.rejects(request({}),/STORE_RUNTIME_NOT_DEPLOYED/);
   assert.equal(calls,before);
   endpoint='http://localhost:4317/api/store-zero/job';
   context.window.location.hostname='georgeplattdemo.github.io';
   await assert.rejects(request({}),/STORE_RUNTIME_ENDPOINT_INVALID/);
   console.log(JSON.stringify({pine:pine.rawEstimate.totals,poplar:poplar.rawEstimate.totals,depth11:shallow.rawEstimate.totals}));
 } finally {await host.close();}
});
