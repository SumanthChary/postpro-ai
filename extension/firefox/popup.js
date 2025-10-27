const api = typeof browser !== "undefined" ? browser : chrome;

const selectors = {
  tabs: document.querySelectorAll(".tabs__button"),
  panels: {
    enhance: document.getElementById("panel-enhance"),
    virality: document.getElementById("panel-virality"),
  },
  enhanceInput: document.getElementById("enhance-input"),
  enhanceCategory: document.getElementById("enhance-category"),
  enhanceTone: document.getElementById("enhance-tone"),
  enhanceBtn: document.getElementById("enhance-btn"),
  clearEnhance: document.getElementById("clear-enhance"),
  enhanceOutput: document.getElementById("enhance-output"),
  viralityInput: document.getElementById("virality-input"),
  viralityCategory: document.getElementById("virality-category"),
  viralityBtn: document.getElementById("virality-btn"),
  clearVirality: document.getElementById("clear-virality"),
  viralityOutput: document.getElementById("virality-output"),
  openDashboard: document.getElementById("open-dashboard"),
  openPlans: document.getElementById("open-plans"),
  openOptions: document.getElementById("open-options"),
  planPill: document.getElementById("plan-pill"),
  authGate: document.getElementById("auth-gate"),
  planUpsell: document.getElementById("plan-upsell"),
  mainShell: document.getElementById("main-shell"),
  authCopy: document.getElementById("auth-gate-copy"),
  upgradeCopy: document.getElementById("upgrade-copy"),
  upgradeTitle: document.getElementById("upgrade-title"),
  loginCta: document.getElementById("cta-login"),
  trialCta: document.getElementById("cta-trial"),
  upgradeCta: document.getElementById("cta-upgrade"),
  loadingTemplate: document.getElementById("loading-template"),
};

const state = {
  activeTab: "enhance",
  access: "unknown",
  subscription: null,
  settings: {
    supabaseUrl: "",
    supabaseAnonKey: "",
    userToken: "",
    userId: "",
    dashboardUrl: "https://postproai.app",
    plansUrl: "https://postproai.app/pricing",
    userEmail: "",
  },
};

function toggleElement(element, shouldShow) {
  if (!element) return;
  element.classList.toggle("is-hidden", !shouldShow);
}

function updatePlanPill(tone, label) {
  if (!selectors.planPill) return;
  selectors.planPill.dataset.tone = tone;
  selectors.planPill.textContent = label;
}

function setInteractiveState(enabled) {
  const disabled = !enabled;

  selectors.tabs.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.disabled = disabled;
    button.tabIndex = disabled ? -1 : 0;
  });

  [
    selectors.enhanceBtn,
    selectors.clearEnhance,
    selectors.viralityBtn,
    selectors.clearVirality,
  ].forEach((button) => {
    if (button) button.disabled = disabled;
  });

  if (selectors.enhanceInput) selectors.enhanceInput.readOnly = disabled;
  if (selectors.viralityInput) selectors.viralityInput.readOnly = disabled;
  if (selectors.enhanceCategory) selectors.enhanceCategory.disabled = disabled;
  if (selectors.enhanceTone) selectors.enhanceTone.disabled = disabled;
  if (selectors.viralityCategory) selectors.viralityCategory.disabled = disabled;
}

function updateAccessState(status, details = {}) {
  state.access = status;
  if (status !== "active") {
    state.subscription = null;
  }

  toggleElement(selectors.authGate, status === "signedOut");
  toggleElement(selectors.planUpsell, status === "trialRequired" || status === "error");
  toggleElement(selectors.mainShell, status === "active");

  if (selectors.upgradeTitle) {
    selectors.upgradeTitle.textContent = status === "error" ? "Unable to verify access" : "Upgrade required";
  }

  if (selectors.authCopy && details.authMessage) {
    selectors.authCopy.textContent = details.authMessage;
  }

  if (selectors.upgradeCopy) {
    selectors.upgradeCopy.textContent = status === "error"
      ? details.errorMessage || "We could not verify your subscription. Reopen the dashboard and try again."
      : details.upgradeMessage || "Your account needs an active PostPro AI plan before you can enhance posts.";
  }

  const tone = status === "active" ? "positive" : status === "trialRequired" || status === "error" ? "warning" : "neutral";
  const label = (() => {
    if (status === "active") {
      return details.planName ? `${details.planName} active` : "Premium active";
    }
    if (status === "trialRequired") return "Upgrade required";
    if (status === "error") return "Check access";
    return "Sign in required";
  })();

  updatePlanPill(tone, label);
  setInteractiveState(status === "active");

  const nextTab = status === "active" ? state.activeTab || "enhance" : "enhance";
  setActiveTab(nextTab);
}

function openInTab(url, fallback) {
  const target = url || fallback;
  if (!target) return;
  api.tabs.create({ url: target });
}

function setActiveTab(tab) {
  state.activeTab = tab;
  selectors.tabs.forEach((button) => {
    const isActive = button.dataset.tab === tab;
    button.classList.toggle("tabs__button--active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  Object.entries(selectors.panels).forEach(([key, panel]) => {
    const isActive = key === tab;
    panel.classList.toggle("panel--hidden", !isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });
}

function setOutput(element, content, opts = {}) {
  if (!element) return;
  element.classList.toggle("panel__output--empty", !content || content.trim().length === 0);
  element.innerHTML = content || "";
  if (opts.scrollTop) {
    element.scrollTop = 0;
  }
}

function showLoading(element) {
  const node = selectors.loadingTemplate.content.cloneNode(true);
  element.classList.remove("panel__output--empty");
  element.innerHTML = "";
  element.appendChild(node);
}

async function loadSettings() {
  if (!api?.storage?.sync) return state.settings;
  const stored = await api.storage.sync.get([
    "supabaseUrl",
    "supabaseAnonKey",
    "userToken",
    "userId",
    "dashboardUrl",
    "plansUrl",
    "userEmail",
  ]);
  state.settings = {
    ...state.settings,
    ...stored,
  };
  return state.settings;
}

async function ensureSettings() {
  const settings = await loadSettings();
  if (!settings.supabaseUrl || !settings.supabaseAnonKey) {
    throw new Error("Add your Supabase URL and anon key in Extension settings.");
  }
  return settings;
}

async function invokeFunction(name, payload) {
  const settings = await ensureSettings();
  const endpoint = `${settings.supabaseUrl}/functions/v1/${name}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  const headers = {
    "Content-Type": "application/json",
    apikey: settings.supabaseAnonKey,
    Authorization: `Bearer ${settings.userToken || settings.supabaseAnonKey}`,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message = body?.error || response.statusText || "Service error";
      throw new Error(message);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function hydrateAccessState() {
  const settings = state.settings;

  if (!settings.supabaseUrl || !settings.supabaseAnonKey) {
    updateAccessState("error", { errorMessage: "Add your Supabase credentials in Extension settings." });
    return;
  }

  if (!settings.userToken || !settings.userId) {
    updateAccessState("signedOut", {
      authMessage: "Sign in from the PostPro AI dashboard to unlock the LinkedIn toolkit.",
    });
    return;
  }

  try {
    const response = await invokeFunction("subscription-manager", {
      action: "getUserSubscription",
      userId: settings.userId,
      email: settings.userEmail || undefined,
    });

    const subscription = response?.subscription;
    if (response?.success && subscription && subscription.subscribed !== false) {
      state.subscription = subscription;
      const planName = subscription.plan_name || "PostPro AI";
      updateAccessState("active", { planName });
      return;
    }

    if (response?.requiresPurchase || !subscription) {
      updateAccessState("trialRequired");
      return;
    }

    updateAccessState("trialRequired");
  } catch (error) {
    updateAccessState("error", { errorMessage: error?.message });
  }
}

function formatEnhancedContent(payload) {
  const { platforms = {}, diagnostics } = payload;
  const platformEntries = Object.entries(platforms)
    .filter(([, value]) => typeof value === "string" && value.trim().length > 0);

  const preferredPlatforms = platformEntries.filter(([key]) => key.toLowerCase().includes("linkedin"));
  const visibleEntries = preferredPlatforms.length > 0 ? preferredPlatforms : platformEntries.slice(0, 1);

  if (visibleEntries.length === 0) {
    return "<div>No LinkedIn-ready copy returned. Try adjusting your prompt.";
  }

  const blocks = visibleEntries
    .map(([platform, value]) => {
      const title = platform.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return `
        <article class="result">
          <header class="result__heading">${title}</header>
          <pre class="result__content">${escapeHtml(value.trim())}</pre>
        </article>
      `;
    })
    .join("");

  const diagnosticsBlock = diagnostics?.insights?.length
    ? `
      <section class="result result--tips">
        <header class="result__heading">Optimization tips</header>
        <ul class="result__list">
          ${diagnostics.insights.slice(0, 3).map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
        </ul>
      </section>
    `
    : "";

  return `<div class="results">${blocks}${diagnosticsBlock}</div>`;
}

function formatViralityContent(payload) {
  const score = typeof payload.score === "number" ? payload.score : null;
  const insights = Array.isArray(payload.insights) ? payload.insights.slice(0, 4) : [];
  const quickWins = Array.isArray(payload.quickWins) ? payload.quickWins.slice(0, 3) : [];

  const scoreBlock = score !== null
    ? `<div class="score">
        <div class="score__value">${score}%</div>
        <div class="score__label">LinkedIn virality potential</div>
      </div>`
    : "";

  const insightBlock = insights.length
    ? `
      <section class="result">
        <header class="result__heading">Top insights</header>
        <ul class="result__list">
          ${insights.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
        </ul>
      </section>
    `
    : "";

  const quickWinsBlock = quickWins.length
    ? `
      <section class="result result--wins">
        <header class="result__heading">Quick wins</header>
        <ul class="result__chips">
          ${quickWins.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
        </ul>
      </section>
    `
    : "";

  const sections = `${scoreBlock}${insightBlock}${quickWinsBlock}`;
  return sections.trim().length > 0 ? `<div class="results">${sections}</div>` : "No analysis available.";
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function handleError(element, error) {
  const message = error?.message || "Unexpected error. Please try again.";
  setOutput(element, `<div class="error">${escapeHtml(message)}</div>`);
}

async function onEnhance() {
  if (state.access !== "active") return;

  const post = selectors.enhanceInput.value.trim();
  if (!post) {
    handleError(selectors.enhanceOutput, new Error("Add a post to enhance."));
    return;
  }

  showLoading(selectors.enhanceOutput);

  try {
    const payload = {
      post,
      category: selectors.enhanceCategory.value,
      styleTone: selectors.enhanceTone.value,
      userId: state.settings.userId || undefined,
    };

    const data = await invokeFunction("enhance-post", payload);
    const content = formatEnhancedContent(data);
    setOutput(selectors.enhanceOutput, content, { scrollTop: true });
  } catch (error) {
    handleError(selectors.enhanceOutput, error);
  }
}

async function onPredict() {
  if (state.access !== "active") return;

  const post = selectors.viralityInput.value.trim();
  if (!post) {
    handleError(selectors.viralityOutput, new Error("Add a post to analyze."));
    return;
  }

  showLoading(selectors.viralityOutput);

  try {
    const payload = {
      post,
      category: selectors.viralityCategory.value,
    };

    const data = await invokeFunction("analyze-virality", payload);
    const content = formatViralityContent(data);
    setOutput(selectors.viralityOutput, content, { scrollTop: true });
  } catch (error) {
    handleError(selectors.viralityOutput, error);
  }
}

function registerEvents() {
  selectors.tabs.forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });

  if (selectors.enhanceBtn) selectors.enhanceBtn.addEventListener("click", onEnhance);
  if (selectors.clearEnhance) {
    selectors.clearEnhance.addEventListener("click", () => {
      selectors.enhanceInput.value = "";
      setOutput(selectors.enhanceOutput, "Your enhanced copy will appear here.");
    });
  }

  if (selectors.viralityBtn) selectors.viralityBtn.addEventListener("click", onPredict);
  if (selectors.clearVirality) {
    selectors.clearVirality.addEventListener("click", () => {
      selectors.viralityInput.value = "";
      setOutput(selectors.viralityOutput, "Your virality score and insights will appear here.");
    });
  }

  const openWorkspace = () => openInTab(state.settings.dashboardUrl, "https://postproai.app");
  const openPlans = () => openInTab(state.settings.plansUrl, "https://postproai.app/pricing");

  if (selectors.openDashboard) selectors.openDashboard.addEventListener("click", openWorkspace);
  if (selectors.openPlans) selectors.openPlans.addEventListener("click", openPlans);

  if (selectors.loginCta) selectors.loginCta.addEventListener("click", openWorkspace);
  if (selectors.trialCta) selectors.trialCta.addEventListener("click", openPlans);
  if (selectors.upgradeCta) selectors.upgradeCta.addEventListener("click", openPlans);

  if (selectors.openOptions) {
    selectors.openOptions.addEventListener("click", () => {
      if (api.runtime.openOptionsPage) {
        api.runtime.openOptionsPage();
      } else {
        api.tabs.create({ url: "options.html" });
      }
    });
  }
}

(async function init() {
  setInteractiveState(false);
  registerEvents();
  await loadSettings();
  await hydrateAccessState();
})();
