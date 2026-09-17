/* Wire landing doors and account lists to STB_ACCOUNT_SEED.
   Runs against the base exhibit document. Does not invent projects. */
(function () {
  const S = () => window.STB_ACCOUNT_SESSION;
  const frame = document.getElementById('stb-current');
  if (!frame) return;

  frame.addEventListener('load', () => {
    const win = frame.contentWindow;
    const doc = win.document;
    const wrap = doc.querySelector('.wrap');
    if (!wrap || !S()) return;

    if (!doc.getElementById('stb-account-style')) {
      const style = doc.createElement('style');
      style.id = 'stb-account-style';
      style.textContent = `
        .recovery-nav{align-items:center}
        .recovery-nav .canonical-nav-spacer{flex:1}
        .canonical-user-label{display:flex;align-items:center;gap:6px;margin-left:auto;color:var(--text2);font-size:10px;font-weight:600;letter-spacing:.03em}
        .canonical-user-label select{font:inherit;font-size:10px;padding:4px 7px;border:1px solid var(--border);border-radius:5px;background:var(--surface);color:var(--text)}
        .account-context{margin:0 0 14px;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--tint);font-size:12px;line-height:1.45}
        .account-context b{display:block;margin-bottom:2px}
        .account-list{display:grid;gap:8px;margin:14px 0}
        .account-row{display:block;width:100%;text-align:left;padding:11px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface)}
        .account-row b,.account-row span{display:block}
        .account-row span{margin-top:3px;color:var(--text2);font-size:11px}
        .account-status{display:inline-block;margin-top:6px;font-size:10px;letter-spacing:.04em;font-weight:700;color:var(--accent)}
        #projects>.demo-active-account,#projects>#demo-empty-projects{display:none!important}
      `;
      doc.head.append(style);
    }

    const recovery = doc.querySelector('.recovery-nav');
    if (recovery && !doc.getElementById('canonical-demo-user')) {
      const homeButton = recovery.querySelector('[data-go="projects"]');
      if (homeButton) homeButton.textContent = 'Home';
      const myBtn = doc.createElement('button');
      myBtn.type = 'button';
      myBtn.textContent = 'My Projects';
      myBtn.setAttribute('data-account-go', 'my-projects');
      if (homeButton) homeButton.insertAdjacentElement('afterend', myBtn);
      const spacer = doc.createElement('span');
      spacer.className = 'canonical-nav-spacer';
      recovery.append(spacer);
      const label = doc.createElement('label');
      label.className = 'canonical-user-label';
      label.innerHTML = 'DEMO USER <select id="canonical-demo-user"></select>';
      recovery.append(label);
    }

    const select = doc.getElementById('canonical-demo-user');
    if (select && !select.dataset.seeded) {
      select.innerHTML = Object.values(S().accounts()).map((a) =>
        `<option value="${a.id}">${a.name}</option>`
      ).join('');
      select.dataset.seeded = 'true';
    }

    function ensurePage(id, title, railGoal) {
      if (doc.getElementById(id)) return doc.getElementById(id);
      const section = doc.createElement('section');
      section.className = 'page';
      section.id = id;
      section.innerHTML =
        `<div class="main"><h1>${title}</h1><div data-account-mount="${id}"></div></div>` +
        `<aside class="rail"><p class="hd">BUILD GUIDE</p><p class="goal">${railGoal}</p>` +
        `<div class="row"><b>Seeded lives</b><span>Sarah, Tom, Dick, and Harry are records. This page queries them.</span></div>` +
        `<div class="row"><b>Doors bind accounts</b><span>New → Sarah. Returning → Tom. Professional → Dick. Harry is the browser on the switch.</span></div>` +
        `</aside>`;
      wrap.append(section);
      return section;
    }

    ensurePage('my-projects', 'MY PROJECTS', 'Working list');
    ensurePage('archive', 'COMPLETED PROJECTS / RECORDS', 'Closed records');

    function contextBar(account, extra) {
      return `<div class="account-context"><b>${account.name.toUpperCase()} · ${account.label}</b>${account.blurb}${extra ? `<div class="dim" style="margin-top:6px">${extra}</div>` : ''}</div>`;
    }

    function rowHtml(p) {
      const lib = S().library(p.libraryId);
      const root = lib ? lib.rootId : 'projects';
      return `<button class="account-row" type="button" data-open-project="${p.id}" data-root="${root}">` +
        `<b>${p.title}</b><span>${p.summary}</span>` +
        `<span class="account-status">${S().statusLabel(p.status)}</span></button>`;
    }

    function renderLists() {
      const state = S().load();
      const account = S().account(state.accountId);
      if (select) select.value = account.id;

      const working = S().projectsFor(account.id, 'working');
      const closed = S().projectsFor(account.id, 'archive');

      const my = doc.querySelector('[data-account-mount="my-projects"]');
      if (my) {
        if (!working.length) {
          my.innerHTML = contextBar(account) +
            `<p><b>${account.name}</b> has no working projects.</p>` +
            `<p class="dim">${account.id === 'sarah' ? 'That is the User 1 bench. Start from Home.' : 'Nothing in work on this account.'}</p>` +
            `<div class="btns"><button type="button" data-account-go="projects">HOME</button></div>`;
        } else {
          my.innerHTML = contextBar(account, 'Working list only. Sold and purchased sit in records.') +
            `<div class="account-list">${working.map(rowHtml).join('')}</div>` +
            `<div class="btns"><button type="button" data-account-go="projects">+ START ANOTHER / HOME</button></div>`;
        }
      }

      const ar = doc.querySelector('[data-account-mount="archive"]');
      if (ar) {
        if (!closed.length) {
          ar.innerHTML = contextBar(account) +
            `<p><b>${account.name}</b> has no completed records.</p>` +
            `<p class="dim">${account.id === 'sarah' ? 'User 1 has not purchased. Do not invent a frozen alcove here.' : 'No sold or purchased fixture on this account.'}</p>` +
            `<div class="btns"><button type="button" data-account-go="my-projects">MY PROJECTS</button></div>`;
        } else {
          ar.innerHTML = contextBar(account, 'Declared fixture outcomes. Not live payment.') +
            `<div class="account-list">${closed.map(rowHtml).join('')}</div>` +
            `<div class="btns"><button type="button" data-account-go="my-projects">MY PROJECTS</button></div>`;
        }
      }

      const homeBody = doc.querySelector('#projects > .split > .body, #projects .body');
      if (homeBody && !doc.getElementById('account-home-context')) {
        homeBody.insertAdjacentHTML('afterbegin', `<div id="account-home-context"></div>`);
      }
      const homeCtx = doc.getElementById('account-home-context');
      if (homeCtx) homeCtx.innerHTML = contextBar(account, 'Shared library. Saving is a separate act. Switching accounts swaps whose list you hold.');
    }

    function go(id) {
      if (typeof win.show === 'function') win.show(id);
      else {
        doc.querySelectorAll('section.page').forEach((p) => p.classList.toggle('on', p.id === id));
      }
      renderLists();
    }

    if (!doc.documentElement.dataset.accountWired) {
      doc.documentElement.dataset.accountWired = 'true';
      doc.addEventListener('click', (e) => {
        const doorBtn = e.target.closest('[data-go="new-user"],[data-go="returning"],[data-go="professional"]');
        if (doorBtn) {
          S().doorBind(doorBtn.getAttribute('data-go'));
          renderLists();
          return;
        }
        const remember = e.target.closest('#new-user button');
        if (remember && /THIS DEVICE|EMAIL|LATER/i.test(remember.textContent)) {
          e.preventDefault();
          e.stopPropagation();
          S().doorBind('new-user');
          go('projects');
          return;
        }
        const ret = e.target.closest('#returning button');
        if (ret) {
          const t = ret.textContent.toUpperCase();
          if (t.includes('RETURN TO A PROJECT')) {
            e.preventDefault(); e.stopPropagation();
            S().doorBind('returning'); go('my-projects'); return;
          }
          if (t.includes('START SOMETHING NEW')) {
            e.preventDefault(); e.stopPropagation();
            S().doorBind('returning'); go('projects'); return;
          }
          if (t.includes('COMPLETED')) {
            e.preventDefault(); e.stopPropagation();
            S().doorBind('returning'); go('archive'); return;
          }
        }
        const pro = e.target.closest('#professional button');
        if (pro) {
          const t = pro.textContent.toUpperCase();
          if (t.includes('SHARED HOME')) {
            e.preventDefault(); e.stopPropagation();
            S().doorBind('professional'); go('projects'); return;
          }
          if (t.includes('UPLOAD') || t.includes('TAKEOFF')) {
            e.preventDefault(); e.stopPropagation();
            S().doorBind('professional'); go('intake'); return;
          }
        }
        const accountGo = e.target.closest('[data-account-go]');
        if (accountGo) {
          e.preventDefault();
          go(accountGo.getAttribute('data-account-go'));
          return;
        }
        const open = e.target.closest('[data-open-project]');
        if (open) {
          e.preventDefault();
          const rec = S().project(open.getAttribute('data-open-project'));
          const root = open.getAttribute('data-root') || (rec && S().library(rec.libraryId)?.rootId) || 'projects';
          go(root);
        }
      }, true);

      if (select) {
        select.addEventListener('change', () => {
          S().bind(select.value, 'switch');
          renderLists();
        });
      }
    }

    renderLists();
  });
})();
