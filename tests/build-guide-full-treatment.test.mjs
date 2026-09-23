import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const shell=fs.readFileSync(new URL('../system-build-current.html',import.meta.url),'utf8');
const base=fs.readFileSync(new URL('../system-build-base-8d8a9dd.html',import.meta.url),'utf8');
const source=fs.readFileSync(new URL('../stb-build-guide-spec.js',import.meta.url),'utf8');

const sandbox={window:{}};
vm.runInNewContext(source,sandbox,{filename:'stb-build-guide-spec.js'});
const spec=sandbox.window.STBBuildGuideSpec;

test('developer Build Guide covers every current page surface without rewriting the main column',()=>{
  assert.equal(spec.version,'STB-BUILD-GUIDE-0.1');
  assert.match(shell,/stb-build-guide-spec\.js\?v=4c3e13e3/);
  assert.match(shell,/function installDeveloperBuildGuides\(\)/);

  const fn=shell.slice(shell.indexOf('function installDeveloperBuildGuides()'),shell.indexOf('installDeveloperBuildGuides();',shell.indexOf('function installDeveloperBuildGuides()')));
  assert.match(fn,/page\.querySelector\(':scope > aside\.rail'\)/);
  assert.match(fn,/page\.append\(rail\)/);
  assert.match(fn,/rail\.innerHTML = spec\.render\(page\.id\)/);
  assert.equal(/\.main[^\n]*innerHTML|querySelector\([^\n]*\.main[^\n]*\)\.innerHTML/.test(fn),false,'Build Guide installer rewrites customer main content');

  const baseIds=[...base.matchAll(/<section[^>]+id="([^"]+)"/g)].map(m=>m[1]);
  const dynamicIds=[
    'start-own-live','outdoor-build-live','window-seat-live',
    'proof-store','proof-accept','proof-yard','proof-terms','proof-record',
    'playhouse-s001','playhouse-machine','playhouse-store','playhouse-review','playhouse-request','playhouse-yard','playhouse-terms','playhouse-result','playhouse-record',
    'picnic-store','picnic-request','picnic-yard','picnic-terms','picnic-recap','picnic-record',
    'alcove-store-order-surface','alcove-store-service-choices','alcove-store-yard-answer','alcove-store-commercial-sequence','alcove-store-returned-offer'
  ];
  for(const id of new Set([...baseIds,...dynamicIds])){
    assert.ok(spec.pages[id],`missing Build Guide page contract: ${id}`);
    for(const key of ['goal','visual','behavior','state','authority','wart','fullBuild']){
      assert.ok(String(spec.pages[id][key]||'').trim().length>8,`thin Build Guide ${key}: ${id}`);
    }
    const rendered=spec.render(id);
    for(const label of ['BUILD GUIDE · FULL BUILD','VISUAL','BEHAVIOR','STATE / DATA','AUTHORITY','PROTOTYPE WART','FULL BUILD GUARDRAIL','GLOBAL WARTS','PRODUCTION BASELINE']){
      assert.ok(rendered.includes(label),`rendered guide missing ${label}: ${id}`);
    }
  }
});

test('Build Guide names the real prototype debt instead of generic tech vocabulary',()=>{
  assert.match(spec.pages['start-own-live'].wart,/iframe bridge/i);
  assert.match(spec.pages['start-own-live'].fullBuild,/postMessage|message schemas/i);
  assert.match(spec.pages['proof-store'].wart,/out-of-order|timeout|duplicate/i);
  assert.match(spec.pages['proof-store'].fullBuild,/idempotent|stale/i);
  assert.match(spec.pages['proof-accept'].wart,/payment processor|PSP|webhook/i);
  assert.match(spec.pages['proof-accept'].fullBuild,/idempotency keys/i);
  assert.match(spec.pages['proof-yard'].wart,/MachineNeutralOp/);
  assert.match(spec.pages['proof-yard'].wart,/queue service|machine telemetry/i);
  assert.match(spec.pages['proof-yard'].fullBuild,/event-driven backend/i);
  assert.match(spec.pages.intake.wart,/malware scanning|hostile-file/i);
  assert.match(spec.pages.projects.wart,/legacy routes|quarantined/i);
  assert.match(spec.global.wart,/no production auth\/session service/i);
  assert.match(spec.global.fullBuild,/CSP|accessibility|backup\/recovery/i);
});
