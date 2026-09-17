/* Session over STB_ACCOUNT_SEED. One active account. Lists are queries. */

window.STB_ACCOUNT_SESSION = (function () {
  const SEED = () => window.STB_ACCOUNT_SEED;
  const KEY = 'stb-account-session-v1';

  function accounts() {
    return SEED().accounts;
  }

  function account(id) {
    return accounts()[id] || accounts().sarah;
  }

  function projectsFor(accountId, list) {
    return SEED().projects.filter((p) => p.accountId === accountId && (!list || p.list === list));
  }

  function project(id) {
    return SEED().projects.find((p) => p.id === id) || null;
  }

  function library(id) {
    return SEED().library[id] || null;
  }

  function load() {
    try {
      const raw = JSON.parse(sessionStorage.getItem(KEY) || '{}');
      const id = raw.accountId && accounts()[raw.accountId] ? raw.accountId : 'sarah';
      return { accountId: id, via: raw.via || 'landing' };
    } catch {
      return { accountId: 'sarah', via: 'landing' };
    }
  }

  function save(state) {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  }

  function bind(accountId, via) {
    const next = { accountId: account(accountId).id, via: via || 'switch' };
    save(next);
    return next;
  }

  function doorBind(doorId) {
    if (doorId === 'new-user') return bind('sarah', 'new-user');
    if (doorId === 'returning') return bind('tom', 'returning');
    if (doorId === 'professional') return bind('dick', 'professional');
    return load();
  }

  const STATUS_LABEL = {
    saved: 'Saved',
    in_work: 'In work',
    purchased: 'Purchased · fixture',
    sold: 'Sold · fixture',
    idle: 'Idle'
  };

  return {
    accounts,
    account,
    projectsFor,
    project,
    library,
    load,
    bind,
    doorBind,
    statusLabel: (s) => STATUS_LABEL[s] || s
  };
})();
