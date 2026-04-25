const FSBOAuth = {
  tiers: { foundations: 1, complete: 2, masterclass: 3 },

  isLoggedIn() {
    return localStorage.getItem('fsbo_user') !== null;
  },

  getUser() {
    const u = localStorage.getItem('fsbo_user');
    return u ? JSON.parse(u) : null;
  },

  getTier() {
    const u = this.getUser();
    return u ? u.tier : null;
  },

  hasAccess(required) {
    const t = this.getTier();
    if (!t) return false;
    return this.tiers[t] >= this.tiers[required];
  },

  requireAccess(required) {
    if (!this.isLoggedIn()) {
      window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
      return false;
    }
    if (!this.hasAccess(required)) {
      window.location.href = '/fsbo-pricing.html?upgrade=' + required;
      return false;
    }
    this._hydrateUser();
    return true;
  },

  _hydrateUser() {
    const u = this.getUser();
    if (!u) return;
    const el = document.getElementById('user-email');
    if (el) el.textContent = u.email;
    const tier = document.getElementById('user-tier');
    if (tier) tier.textContent = u.tier.charAt(0).toUpperCase() + u.tier.slice(1);
  },

  markComplete(moduleId) {
    const completed = this.getCompleted();
    if (!completed.includes(moduleId)) {
      completed.push(moduleId);
      localStorage.setItem('fsbo_completed', JSON.stringify(completed));
    }
    const btn = document.getElementById('mark-complete-btn');
    if (btn) {
      btn.innerHTML = '&#10003; Completed';
      btn.style.background = '#16a34a';
      btn.disabled = true;
    }
    const msg = document.getElementById('completion-message');
    if (msg) msg.style.display = 'block';
  },

  getCompleted() {
    const c = localStorage.getItem('fsbo_completed');
    return c ? JSON.parse(c) : [];
  },

  isComplete(moduleId) {
    return this.getCompleted().includes(moduleId);
  },

  checkComplete(moduleId) {
    if (this.isComplete(moduleId)) {
      const btn = document.getElementById('mark-complete-btn');
      if (btn) {
        btn.innerHTML = '&#10003; Completed';
        btn.style.background = '#16a34a';
        btn.disabled = true;
      }
    }
  },

  getProgress(course) {
    const config = FSBOConfig.courses[course];
    if (!config) return { done: 0, total: 0 };
    const completed = this.getCompleted();
    const done = config.modules.filter(m => completed.includes(m.id)).length;
    return { done, total: config.modules.length };
  },

  login(email, tier) {
    localStorage.setItem('fsbo_user', JSON.stringify({ email, tier, loginTime: Date.now() }));
  },

  logout() {
    localStorage.removeItem('fsbo_user');
    window.location.href = '/';
  }
};
