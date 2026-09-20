(function(root){
  'use strict';

  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function install(context){
    context = context || {};
    var win = context.win;
    var doc = context.doc;
    var originalShow = context.originalShow;
    var selectJourneyProject = context.selectJourneyProject;
    var ensurePage = context.ensureProjectJourneyPage;
    var doctrine = root.STBStoreZeroCanonicalDoctrine || null;
    var state = null;

    if(!win || !doc || typeof originalShow !== 'function' || typeof ensurePage !== 'function'){
      throw new Error('Recovery Store spine requires win, doc, originalShow and ensureProjectJourneyPage');
    }

    function projectName(){
      return state && state.source === 'outdoor'
        ? 'Outdoor Build · replacement bench leg'
        : 'Start Your Own';
    }

    function materialSummary(handoff){
      var r = handoff && handoff.materialResolution || null;
      if(!r || r.status !== 'MAPPED') return 'UNRESOLVED · ' + esc(r && r.code || 'STORE MATERIAL ANSWER ABSENT');
      var parent = r.form === 'sheet'
        ? (r.quantity + ' × ' + (r.parentLabel || 'sheet'))
        : (r.quantity + ' × ' + (handoff.materialDemand && (handoff.materialDemand.label || handoff.materialDemand.sizeKey) || 'stock') + ' × ' + r.stockLengthIn + ' in');
      return esc(parent + ' · ' + r.storeSku + ' · material $' + Number(r.materialTotal || 0).toFixed(2));
    }

    function operationSummary(handoff){
      var ops = handoff && Array.isArray(handoff.operationDemand) ? handoff.operationDemand : [];
      if(!ops.length) return 'UNRESOLVED · no operation demand received';
      return ops.map(function(op){
        var q = op.quantity ? (' × ' + op.quantity) : '';
        var unresolved = op.unresolved ? ' · UNRESOLVED' : '';
        return esc((op.kind || 'OPERATION') + q + (op.detail ? (' · ' + op.detail) : '') + unresolved);
      }).join('<br>');
    }

    function unresolvedSummary(handoff){
      var items = handoff && Array.isArray(handoff.unresolvedConditions) ? handoff.unresolvedConditions : [];
      return items.length ? items.map(esc).join('<br>') : 'None declared at this Store boundary';
    }

    function doctrineHtml(){
      if(!doctrine || doctrine.expectedProcessStepCount !== 12){
        return '<div class="band warn"><b>CANONICAL STORE CONTENT UNAVAILABLE.</b> Fail closed. The recovery path will not invent a shortened Store substitute.</div>';
      }
      return '<div class="band" style="font-size:12px;line-height:1.55"><p style="margin:0">' +
        doctrine.definitionHtml + '</p></div>' +
        doctrine.processIntroHtml +
        doctrine.processStepsHtml;
    }

    function render(){
      if(!state || !state.handoff) return false;
      var h = state.handoff;
      var name = projectName();
      var authority = h.storeAuthority || {};
      var material = materialSummary(h);
      var operations = operationSummary(h);
      var unresolved = unresolvedSummary(h);
      var backTarget = state.source === 'outdoor' ? 'outdoor-build-live' : 'start-own-live';

      ensurePage(
        'recovery-store-answer',
        '<p class="stage-tag">STORE ANSWER</p><h1>STORE ANSWER · ' + esc(name) + '</h1>' +
        '<p class="sub">Store Zero answers the exact identified definition that Configure sent. It does not redraw or reinterpret the job.</p>' +
        doctrineHtml() +
        '<div class="s001-v2-callout"><b>CURRENT PROJECT ANSWER</b>The shared Store process above is the common doctrine. The facts below are the answer for this identified version.</div>' +
        '<div class="s001-v2-order">' +
          '<div><b>PROJECT</b><span>' + esc(name) + '</span></div>' +
          '<div><b>IDENTIFIED VERSION</b><span>' + esc(h.versionId || h.definitionId) + '</span></div>' +
          '<div><b>MATERIAL ANSWER</b><span>' + material + '</span></div>' +
          '<div><b>OPERATION DEMAND</b><span>' + operations + '</span></div>' +
          '<div><b>CAPABILITY BASIS</b><span>' + esc(authority.capabilityBasis || 'CURRENT CANONICAL STORE ZERO') + '</span></div>' +
          '<div><b>PROCESSING / FULFILLMENT RECOVERY</b><span>NOT ESTABLISHED · class-scoped economics unresolved</span></div>' +
          '<div><b>COMBINED VALUE</b><span>NOT COMPLETE</span></div>' +
          '<div><b>AVAILABILITY / TIMING</b><span>NOT ESTABLISHED by this reference surface</span></div>' +
        '</div>' +
        '<div class="s001-boundary"><b>UNRESOLVED STAYS UNRESOLVED.</b><br>' + unresolved + '</div>' +
        '<div class="band warn"><b>Reference Store answer only.</b> No commercial offer, payment, allocation, production release, machine readiness, physical fabrication, READY notice, or custody event is created here.</div>' +
        '<div class="btns"><button type="button" data-recovery-store-action="back-config" data-target="' + backTarget + '">← BACK TO CONFIGURE</button><button class="primary" type="button" data-recovery-store-action="accept">CONTINUE → ACCEPT / PAY</button></div>',
        '<p class="goal">One definition in, one Store answer out</p>' +
        '<div class="row"><b>Same identified version</b><span>No redraw or retyping.</span></div>' +
        '<div class="row"><b>Unknown stays visible</b><span>No made-up complete price.</span></div>'
      );

      ensurePage(
        'recovery-accept-pay',
        '<p class="stage-tag">ACCEPT / PAY</p><h1>ACCEPT / PAY</h1>' +
        '<p class="sub">This reference build has no complete commercial offer to accept and does not process payment.</p>' +
        '<div class="s001-v2-order">' +
          '<div><b>STORE ANSWER</b><span>RECEIVED · identified version ' + esc(h.versionId || h.definitionId) + '</span></div>' +
          '<div><b>COMMERCIAL OFFER</b><span>NOT ESTABLISHED</span></div>' +
          '<div><b>COMMERCIAL ACCEPTANCE</b><span>NOT ESTABLISHED</span></div>' +
          '<div><b>PAYMENT / SETTLEMENT</b><span>NOT ESTABLISHED</span></div>' +
        '</div>' +
        '<div class="band warn"><b>Acknowledging a reference answer is not commercial acceptance.</b> The demonstration may continue without inventing a sale.</div>' +
        '<div class="btns"><button type="button" data-recovery-store-action="store-answer">← STORE ANSWER</button><button class="primary" type="button" data-recovery-store-action="yard">CONTINUE REFERENCE DEMONSTRATION → STORE / YARD</button></div>',
        '<p class="goal">Keep commerce truthful</p>' +
        '<div class="row"><b>Reference answer</b><span>Can be reviewed.</span></div>' +
        '<div class="row"><b>Money</b><span>Not simulated as paid.</span></div>'
      );

      ensurePage(
        'recovery-store-yard',
        '<p class="stage-tag">STORE / YARD</p><h1>STORE / YARD</h1>' +
        '<p class="sub">The Store can retain the identified request and its reference answer. Internal physical events remain owned by the Store and local cell.</p>' +
        '<div class="s001-v2-order">' +
          '<div><b>MATERIAL ALLOCATION</b><span>NOT ALLOCATED</span></div>' +
          '<div><b>PRODUCTION RELEASE</b><span>NOT RELEASED</span></div>' +
          '<div><b>QUEUE / SCHEDULE</b><span>NOT QUEUED</span></div>' +
          '<div><b>MACHINE READINESS</b><span>NOT AUTHORIZED HERE</span></div>' +
          '<div><b>CYCLE START</b><span>LOCAL · NOT AUTHORIZED HERE</span></div>' +
          '<div><b>READY NOTICE</b><span>NOT ISSUED</span></div>' +
        '</div>' +
        '<div class="s001-boundary"><b>NO BLOOD ON WOOD.</b> Upstream software does not create machine readiness or remote Cycle Start. READY remains separate from custody.</div>' +
        '<div class="btns"><button type="button" data-recovery-store-action="accept">← ACCEPT / PAY</button><button class="primary" type="button" data-recovery-store-action="record">CONTINUE → HANDOFF / RECORD</button></div>',
        '<p class="goal">Store acts; customer does not fake Store events</p>' +
        '<div class="row"><b>Physical authority</b><span>Local and separately evidenced.</span></div>'
      );

      ensurePage(
        'recovery-handoff-record',
        '<p class="stage-tag">HANDOFF / RECORD</p><h1>HANDOFF / RECORD</h1>' +
        '<p class="sub">The owner record preserves what actually happened without pretending the unobserved events occurred.</p>' +
        '<div class="s001-v2-order">' +
          '<div><b>PROJECT</b><span>' + esc(name) + '</span></div>' +
          '<div><b>IDENTIFIED VERSION</b><span>' + esc(h.versionId || h.definitionId) + '</span></div>' +
          '<div><b>STORE MATERIAL ANSWER</b><span>' + material + '</span></div>' +
          '<div><b>STORE UNRESOLVED CONDITIONS</b><span>' + unresolved + '</span></div>' +
          '<div><b>PHYSICAL OUTCOME</b><span>NOT RECORDED</span></div>' +
          '<div><b>CUSTODY</b><span>NOT TRANSFERRED</span></div>' +
          '<div><b>CLOSEOUT</b><span>NOT ESTABLISHED</span></div>' +
        '</div>' +
        '<div class="band"><b>Record truth:</b> the definition reached Store Zero and received the reference answer shown above. No later event is backfilled.</div>' +
        '<div class="btns"><button type="button" data-recovery-store-action="yard">← STORE / YARD</button><button class="primary" type="button" data-recovery-store-action="library">PROJECT LIBRARY →</button></div>',
        '<p class="goal">Owner-held history</p>' +
        '<div class="row"><b>Keep the definition</b><span>Keep the exact identified version and Store answer together.</span></div>'
      );
      return true;
    }

    function open(payload){
      if(!payload || !payload.handoff) return false;
      state = {
        source:String(payload.source || ''),
        handoff:payload.handoff,
        answer:payload.answer || null
      };
      render();
      originalShow.call(win,'recovery-store-answer');
      return true;
    }

    function show(id){
      originalShow.call(win,id);
    }

    if(!win.__stbRecoveryStoreSpineBound){
      win.__stbRecoveryStoreSpineBound = true;
      win.addEventListener('click',function(event){
        var button = event.target && event.target.closest && event.target.closest('[data-recovery-store-action]');
        if(!button) return;
        var action = button.dataset.recoveryStoreAction;
        var map = {
          'store-answer':'recovery-store-answer',
          'accept':'recovery-accept-pay',
          'yard':'recovery-store-yard',
          'record':'recovery-handoff-record'
        };
        if(action === 'back-config'){
          event.preventDefault();
          event.stopImmediatePropagation();
          show(button.dataset.target || (state && state.source === 'outdoor' ? 'outdoor-build-live' : 'start-own-live'));
          return;
        }
        if(action === 'library'){
          event.preventDefault();
          event.stopImmediatePropagation();
          state = null;
          if(typeof selectJourneyProject === 'function') selectJourneyProject(null);
          show('projects');
          return;
        }
        if(map[action]){
          event.preventDefault();
          event.stopImmediatePropagation();
          show(map[action]);
        }
      },true);
    }

    return Object.freeze({
      open:open,
      render:render,
      getState:function(){return state;}
    });
  }

  root.STBRecoveryStoreSpine = Object.freeze({install:install});
})(window);
