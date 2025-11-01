const api = typeof browser !== "undefined" ? browser : chrome;

const DEFAULT_SETTINGS = {
  supabaseUrl: "https://rskzizedzagohmvyhuyu.supabase.co",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza3ppemVkemFnb2htdnlodXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMzg3NzksImV4cCI6MjA1MjYxNDc3OX0.7sbPmg3ms4_JKXILGYLb76TCPakwI9ngzApdifhVeo4",
  dashboardUrl: "https://postproai.app",
  plansUrl: "https://postproai.app/pricing",
};

const selectors = {
  enhanceInput: document.getElementById("enhance-input"),
  enhanceCategory: document.getElementById("enhance-category"),
  enhanceTone: document.getElementById("enhance-tone"),
  enhanceBtn: document.getElementById("enhance-btn"),
  viralityBtn: document.getElementById("virality-btn"),
  clearEnhance: document.getElementById("clear-enhance"),
  copyEnhanced: document.getElementById("copy-enhanced"),
  enhanceOutput: document.getElementById("enhance-output"),
  viralityOutput: document.getElementById("virality-output"),
  meterFill: document.getElementById("meter-fill"),
  meterScore: document.getElementById("meter-score"),
  meterStatus: document.getElementById("meter-status"),
  analyticsCard: document.getElementById("analytics-card"),
  profileName: document.getElementById("profile-name"),
  profilePlan: document.getElementById("profile-plan"),
  profileAvatar: document.getElementById("profile-avatar"),
  openDashboard: document.getElementById("open-dashboard"),
  openPlans: document.getElementById("open-plans"),
  openOptions: document.getElementById("open-options"),
  logoutBtn: document.getElementById("logout-btn"),
  planPill: document.getElementById("plan-pill"),
  authGate: document.getElementById("auth-gate"),
  planUpsell: document.getElementById("plan-upsell"),
  mainShell: document.getElementById("main-shell"),
  authCopy: document.getElementById("auth-gate-copy"),
  upgradeCopy: document.getElementById("upgrade-copy"),
  upgradeTitle: document.getElementById("upgrade-title"),
  loginCta: document.getElementById("cta-login"),
  trialCta: document.getElementById("cta-trial"),
  planTrialCta: document.getElementById("cta-plan-trial"),
  upgradeCta: document.getElementById("cta-upgrade"),
  loadingTemplate: document.getElementById("loading-template"),
  charCount: document.getElementById("char-count"),
  drawerBackdrop: document.getElementById("drawer-backdrop"),
  viralityDrawer: document.getElementById("virality-drawer"),
  closeDrawer: document.getElementById("close-drawer"),
  loginSheet: document.getElementById("login-sheet"),
  loginBackdrop: document.getElementById("login-backdrop"),
  loginClose: document.getElementById("login-close"),
  loginForm: document.getElementById("login-form"),
  loginEmail: document.getElementById("login-email"),
  loginPassword: document.getElementById("login-password"),
  loginToggle: document.getElementById("toggle-password"),
  loginSubmit: document.getElementById("login-submit"),
  loginForgot: document.getElementById("login-forgot"),
  loginOpenPlans: document.getElementById("login-open-plans"),
  loginMessage: document.getElementById("login-message"),
};

const state = {
  access: "unknown",
  subscription: null,
  settings: {
    ...DEFAULT_SETTINGS,
    userToken: "",
    userId: "",
    userEmail: "",
    refreshToken: "",
    tokenExpiresAt: 0,
  },
};

const VIRALITY_PLACEHOLDER = "Run a prediction to see reach, quick wins, and headline ideas.";

function toggleElement(element, shouldShow) {
  if (!element) return;
  element.classList.toggle("is-hidden", !shouldShow);
}

function updatePlanPill(tone, label) {
  if (!selectors.planPill) return;
  selectors.planPill.dataset.tone = tone;
  selectors.planPill.textContent = label;
}

function deriveInitials(source) {
  if (!source) return "PP";
  const words = source.trim().split(/[\s_]+/).filter(Boolean);
  if (words.length === 0) return "PP";
  const initials = words.slice(0, 2).map((part) => part[0]).join("");
  return initials.toUpperCase();
}

function updateProfile(details = {}) {
  const email = state.settings.userEmail || "";
  const fallbackName = email ? email.split("@")[0] : "PostPro member";

  if (selectors.profileName) {
    selectors.profileName.textContent = details.name || fallbackName;
  }

  if (selectors.profilePlan) {
    selectors.profilePlan.textContent = details.plan || "Plan pending";
  }

  if (selectors.profileAvatar) {
    const initialsSource = details.name || fallbackName;
    selectors.profileAvatar.textContent = deriveInitials(initialsSource);
  }
}

function setInteractiveState(enabled) {
  const disabled = !enabled;

  [selectors.enhanceBtn, selectors.viralityBtn, selectors.clearEnhance, selectors.copyEnhanced].forEach((button) => {
    if (button) button.disabled = disabled;
  });

  if (selectors.enhanceInput) selectors.enhanceInput.readOnly = disabled;
  if (selectors.enhanceCategory) selectors.enhanceCategory.disabled = disabled;
  if (selectors.enhanceTone) selectors.enhanceTone.disabled = disabled;
}

function resetMeter() {
  if (selectors.meterFill) {
    selectors.meterFill.style.setProperty("--score-scale", "0");
    selectors.meterFill.dataset.tier = "idle";
  }
  if (selectors.meterScore) selectors.meterScore.textContent = "--%";
  if (selectors.meterStatus) selectors.meterStatus.textContent = "Virality meter idle";
  if (selectors.analyticsCard) selectors.analyticsCard.dataset.state = "idle";
}

function applyScore(score) {
  if (!selectors.meterFill || !selectors.meterScore || !selectors.meterStatus || !selectors.analyticsCard) return;

  const bounded = Math.min(Math.max(Number(score) || 0, 0), 100);
  const scale = bounded / 100;

  selectors.meterFill.style.setProperty("--score-scale", String(scale));

  let tier = "low";
  let status = "Needs a stronger hook";
  let gradient = "linear-gradient(90deg, #f97316 0%, #fb7185 100%)";

  if (bounded >= 80) {
    tier = "high";
    status = "High reach potential";
    gradient = "linear-gradient(90deg, #22c55e 0%, #0ea5e9 100%)";
  } else if (bounded >= 55) {
    tier = "medium";
    status = "Promising but refine";
    gradient = "linear-gradient(90deg, #f59e0b 0%, #22c55e 100%)";
  }

  selectors.meterFill.dataset.tier = tier;
  selectors.meterFill.style.background = gradient;
  selectors.meterScore.textContent = `${Math.round(bounded)}%`;
  selectors.meterStatus.textContent = status;
  selectors.analyticsCard.dataset.state = "active";
}

function setViralityPlaceholder() {
  setOutput(selectors.viralityOutput, VIRALITY_PLACEHOLDER);
  if (selectors.viralityOutput) selectors.viralityOutput.classList.add("panel__output--empty");
  resetMeter();
  closeDrawer();
}

function openDrawer() {
  if (selectors.drawerBackdrop) {
    selectors.drawerBackdrop.classList.add("is-visible");
    selectors.drawerBackdrop.removeAttribute("hidden");
  }
  if (selectors.viralityDrawer) {
    selectors.viralityDrawer.classList.add("is-open");
    selectors.viralityDrawer.setAttribute("aria-hidden", "false");
  }
}

function closeDrawer() {
  if (selectors.drawerBackdrop) {
    selectors.drawerBackdrop.classList.remove("is-visible");
    selectors.drawerBackdrop.setAttribute("hidden", "");
  }
  if (selectors.viralityDrawer) {
    selectors.viralityDrawer.classList.remove("is-open");
    selectors.viralityDrawer.setAttribute("aria-hidden", "true");
  }
}

function setLoginMessage(message, tone = "error") {
  if (!selectors.loginMessage) return;
  if (!message) {
    selectors.loginMessage.hidden = true;
    selectors.loginMessage.textContent = "";
    selectors.loginMessage.className = "login__message";
    delete selectors.loginMessage.dataset.tone;
    return;
  }
  selectors.loginMessage.hidden = false;
  selectors.loginMessage.textContent = message;
  selectors.loginMessage.className = "login__message";
  selectors.loginMessage.dataset.tone = tone;
}

function openLoginSheet() {
  if (!selectors.loginSheet) return;
  selectors.loginSheet.hidden = false;
  selectors.loginSheet.classList.add("is-open");
  setLoginMessage("");
  if (selectors.loginEmail) {
    selectors.loginEmail.value = state.settings.userEmail || selectors.loginEmail.value || "";
  }
  if (selectors.loginPassword) {
    selectors.loginPassword.value = "";
    selectors.loginPassword.type = "password";
  }
  if (selectors.loginToggle) {
    selectors.loginToggle.classList.remove("is-active");
    const showIcon = selectors.loginToggle.querySelector(".login__toggle-icon--show");
    const hideIcon = selectors.loginToggle.querySelector(".login__toggle-icon--hide");
    showIcon?.classList.add("is-visible");
    hideIcon?.classList.remove("is-visible");
  }
  requestAnimationFrame(() => {
    selectors.loginEmail?.focus();
  });
}

function closeLoginSheet() {
  if (!selectors.loginSheet) return;
  selectors.loginSheet.classList.remove("is-open");
  setTimeout(() => {
    if (!selectors.loginSheet?.classList.contains("is-open")) {
      selectors.loginSheet.hidden = true;
    }
  }, 220);
  setLoginMessage("");
  selectors.loginPassword?.setAttribute("type", "password");
}

function togglePasswordVisibility() {
  if (!selectors.loginPassword || !selectors.loginToggle) return;
  const isHidden = selectors.loginPassword.type === "password";
  selectors.loginPassword.type = isHidden ? "text" : "password";
  selectors.loginToggle.classList.toggle("is-active", isHidden);
  const showIcon = selectors.loginToggle.querySelector(".login__toggle-icon--show");
  const hideIcon = selectors.loginToggle.querySelector(".login__toggle-icon--hide");
  showIcon?.classList.toggle("is-visible", isHidden === false);
  hideIcon?.classList.toggle("is-visible", isHidden);
}

function isLoginOpen() {
  return selectors.loginSheet?.classList.contains("is-open");
}

function setLoginBusy(isBusy, label) {
  const busyLabel = isBusy ? label || "Signing in..." : undefined;
  setButtonBusy(selectors.loginSubmit, isBusy, busyLabel);
  if (selectors.loginEmail) selectors.loginEmail.disabled = isBusy;
  if (selectors.loginPassword) selectors.loginPassword.disabled = isBusy;
  if (selectors.loginForgot) selectors.loginForgot.disabled = isBusy;
  if (selectors.loginOpenPlans) selectors.loginOpenPlans.disabled = isBusy;
  if (selectors.loginToggle) selectors.loginToggle.disabled = isBusy;
}

async function revokeSession() {
  if (!state.settings.userToken) return;
  try {
    const settings = await ensureSettings();
    await fetch(`${settings.supabaseUrl}/auth/v1/logout`, {
      method: "POST",
      headers: {
        apikey: settings.supabaseAnonKey,
        Authorization: `Bearer ${state.settings.userToken}`,
      },
    }).catch(() => undefined);
  } catch (error) {
    // Ignore logout errors silently.
  }
}

async function signInWithPassword(email, password) {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    setLoginMessage("Enter your email and password.");
    return null;
  }

  const settings = await ensureSettings();

  const endpoint = `${settings.supabaseUrl}/auth/v1/token?grant_type=password`;
  const body = JSON.stringify({ email: trimmedEmail, password: trimmedPassword });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: settings.supabaseAnonKey,
    },
    body,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error_description || errorBody?.error || response.statusText || "Sign in failed.";
    throw new Error(message);
  }

  const data = await response.json();
  const expiresAt = calculateExpiry(data.expires_in);
  await persistSession({
    userToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenExpiresAt: expiresAt,
    userId: data.user?.id,
    userEmail: data.user?.email || trimmedEmail,
  });

  return {
    userId: data.user?.id,
    email: data.user?.email || trimmedEmail,
    expiresAt,
  };
}

async function sendPasswordReset(email) {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) {
    setLoginMessage("Enter your email first to receive a reset link.");
    selectors.loginEmail?.focus();
    return;
  }

  const settings = await ensureSettings();
  const endpoint = `${settings.supabaseUrl}/auth/v1/recover`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: settings.supabaseAnonKey,
    },
    body: JSON.stringify({
      email: trimmedEmail,
      redirect_to: `${settings.dashboardUrl || DEFAULT_SETTINGS.dashboardUrl}/auth`,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error_description || errorBody?.error || response.statusText || "Reset request failed.";
    throw new Error(message);
  }

  setLoginMessage("Check your email for a reset link.", "success");
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  if (!selectors.loginEmail || !selectors.loginPassword) return;

  setLoginMessage("");
  setLoginBusy(true, "Signing in...");

  try {
    await signInWithPassword(selectors.loginEmail.value, selectors.loginPassword.value);
    closeLoginSheet();
    await hydrateAccessState();
  } catch (error) {
    const message = error?.message || "Sign in failed. Please try again.";
    setLoginMessage(message);
    selectors.loginPassword?.focus();
    selectors.loginPassword?.select?.();
  } finally {
    setLoginBusy(false);
  }
}

async function handleForgotPassword() {
  if (!selectors.loginEmail) return;
  setLoginMessage("");
  setLoginBusy(true, "Sending link...");
  try {
    await sendPasswordReset(selectors.loginEmail.value);
  } catch (error) {
    const message = error?.message || "Unable to send reset link.";
    setLoginMessage(message);
  } finally {
    setLoginBusy(false);
  }
}

async function handleLogout() {
  await revokeSession();
  await clearSession();
  state.subscription = null;
  closeLoginSheet();
  setLoginMessage("");
  updateAccessState("signedOut", { authMessage: "Signed out. Sign in to continue." });
}

function setOutput(element, content, opts = {}) {
  if (!element) return;
  const isEmpty = !content || content.trim().length === 0 || content === VIRALITY_PLACEHOLDER;
  element.classList.toggle("panel__output--empty", isEmpty);
  element.innerHTML = content || "";
  if (opts.scrollTop) element.scrollTop = 0;
}

function showLoading(element) {
  if (!element || !selectors.loadingTemplate) return;
  const node = selectors.loadingTemplate.content.cloneNode(true);
  element.classList.remove("panel__output--empty");
  element.innerHTML = "";
  element.appendChild(node);
}

function setButtonBusy(button, isBusy, label) {
  if (!button) return;

  if (isBusy) {
    if (!button.dataset.originalLabel) {
      button.dataset.originalLabel = button.textContent.trim();
    }
    if (label) {
      button.textContent = label;
    }
    button.classList.add("is-busy");
    button.setAttribute("aria-busy", "true");
    button.disabled = true;
  } else {
    if (button.dataset.originalLabel) {
      button.textContent = button.dataset.originalLabel;
      delete button.dataset.originalLabel;
    }
    button.classList.remove("is-busy");
    button.removeAttribute("aria-busy");
    button.disabled = false;
  }
}

const SESSION_KEYS = ["userToken", "refreshToken", "tokenExpiresAt", "userId", "userEmail"];

async function persistSession(session = {}) {
  if (!api?.storage?.sync) return;
  const payload = {};
  SESSION_KEYS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(session, key)) {
      payload[key] = session[key];
      state.settings[key] = session[key];
    }
  });
  if (Object.keys(payload).length > 0) {
    await api.storage.sync.set(payload);
  }
}

async function clearSession() {
  if (api?.storage?.sync) {
    await api.storage.sync.remove(SESSION_KEYS);
  }
  SESSION_KEYS.forEach((key) => {
    if (key === "tokenExpiresAt") {
      state.settings[key] = 0;
    } else {
      state.settings[key] = "";
    }
  });
}

function calculateExpiry(expiresInSeconds) {
  const fallback = 3600;
  const windowSeconds = Math.max(Number(expiresInSeconds) || fallback, 60);
  return Date.now() + Math.max(windowSeconds - 30, 30) * 1000;
}

function isSessionFresh() {
  if (!state.settings.userToken) return false;
  const expiresAt = Number(state.settings.tokenExpiresAt || 0);
  if (!expiresAt) return false;
  return Date.now() < expiresAt - 10 * 1000;
}

async function refreshSession() {
  if (!state.settings.refreshToken) return false;
  try {
    const settings = await ensureSettings();
    const endpoint = `${settings.supabaseUrl}/auth/v1/token?grant_type=refresh_token`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: settings.supabaseAnonKey,
      },
      body: JSON.stringify({ refresh_token: state.settings.refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Session refresh failed");
    }

    const data = await response.json();
    await persistSession({
      userToken: data.access_token || state.settings.userToken,
      refreshToken: data.refresh_token || state.settings.refreshToken,
      tokenExpiresAt: calculateExpiry(data.expires_in),
      userId: data.user?.id || state.settings.userId,
      userEmail: data.user?.email || state.settings.userEmail,
    });
    return true;
  } catch (error) {
    await clearSession();
    return false;
  }
}

async function ensureSession() {
  if (!state.settings.userToken) return;
  if (isSessionFresh()) return;
  const refreshed = await refreshSession();
  if (!refreshed) {
    throw new Error("Session expired. Sign in again.");
  }
}

function formatShortDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
  try {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch (error) {
    return date.toISOString().split("T")[0];
  }
}

function evaluateSubscriptionAccess(subscription) {
  if (!subscription) {
    return {
      status: "trialRequired",
    };
  }

  const planName = subscription.plan_name || "PostPro AI";
  const displayName =
    subscription.full_name || subscription.name || state.settings.userEmail?.split("@")[0] || "PostPro member";
  const tier = String(subscription.subscription_tier || "").toLowerCase();
  const subscribed = subscription.subscribed === true;
  const ownerTier = tier.includes("owner") || planName.toLowerCase().includes("owner");
  const rawEnd = subscription.subscription_end;
  const endTime = rawEnd ? Date.parse(rawEnd) : NaN;
  const hasExpiry = !Number.isNaN(endTime);
  const inWindow = !hasExpiry || endTime > Date.now();
  const isTrialTier = tier.includes("trial");
  const trialActive = isTrialTier && inWindow;
  const paidActive = subscribed && inWindow && !isTrialTier;
  const unlimitedActive = ownerTier && inWindow;
  const canAccess = paidActive || trialActive || unlimitedActive;

  if (canAccess) {
    const expiresAt = hasExpiry ? new Date(endTime) : null;
    const expiryLabel = expiresAt ? formatShortDate(expiresAt) : null;
    const isTrial = trialActive && !paidActive && !unlimitedActive;
    const planLabel = isTrial ? `${planName} trial` : `${planName} active`;
    const profilePlan = isTrial
      ? `Trial active${expiryLabel ? ` (ends ${expiryLabel})` : ""}`
      : `${planName} member`;

    return {
      status: "active",
      planLabel,
      planName,
      profilePlan,
      displayName,
      expiresAt,
      isTrial,
    };
  }

  const expiresAt = hasExpiry ? new Date(endTime) : null;
  const expiredTrial = isTrialTier && hasExpiry && endTime <= Date.now();

  return {
    status: "trialRequired",
    planName,
    displayName,
    expiresAt,
    isTrial: isTrialTier,
    expiredTrial,
  };
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
    "refreshToken",
    "tokenExpiresAt",
  ]);
  state.settings = {
    ...DEFAULT_SETTINGS,
    ...state.settings,
    ...stored,
    tokenExpiresAt: stored.tokenExpiresAt ? Number(stored.tokenExpiresAt) : state.settings.tokenExpiresAt || 0,
  };
  updateProfile();
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

function updateAccessState(status, details = {}) {
  state.access = status;

  toggleElement(selectors.authGate, status === "signedOut");
  toggleElement(selectors.planUpsell, status === "trialRequired" || status === "error");
  toggleElement(selectors.mainShell, status === "active");
  toggleElement(selectors.planTrialCta, status === "trialRequired");

  if (selectors.upgradeTitle) {
    selectors.upgradeTitle.textContent = details.upgradeTitle || (status === "error" ? "Unable to verify access" : "Upgrade required");
  }

  if (selectors.authCopy) {
    selectors.authCopy.textContent =
      details.authMessage || "Connect PostPro AI to unlock your LinkedIn toolkit.";
  }

  if (selectors.upgradeCopy) {
    selectors.upgradeCopy.textContent =
      status === "error"
        ? details.errorMessage || "We could not verify your subscription. Reopen the dashboard and try again."
        : details.upgradeMessage || "Activate a PostPro AI plan or trial to unlock enhancements.";
  }

  const tone =
    details.pillTone || (status === "active" ? "positive" : status === "trialRequired" || status === "error" ? "warning" : "neutral");
  const label =
    details.planLabel ||
    (status === "active"
      ? details.planName
        ? `${details.planName} active`
        : "Premium active"
      : status === "trialRequired"
        ? details.expiredTrial
          ? "Trial ended"
          : "Upgrade required"
        : status === "error"
          ? "Check access"
          : "Sign in required");

  updatePlanPill(tone, label);
  setInteractiveState(status === "active");

  if (status === "active") {
    updateProfile({ plan: details.profilePlan || label, name: details.displayName });
  } else if (status === "signedOut") {
    updateProfile({ plan: "Sign in required" });
    setOutput(selectors.enhanceOutput, "Your enhanced copy will appear here.");
    setViralityPlaceholder();
  } else if (status === "trialRequired") {
    const plan = details.expiredTrial
      ? "Trial ended"
      : details.planName
        ? `${details.planName} pending`
        : "Upgrade required";
    updateProfile({ plan, name: details.displayName });
    setOutput(selectors.enhanceOutput, "Your enhanced copy will appear here.");
    setViralityPlaceholder();
  } else {
    updateProfile({ plan: details.planName ? `${details.planName} pending` : "Upgrade required", name: details.displayName });
    setViralityPlaceholder();
  }

  if (selectors.trialCta) {
    selectors.trialCta.disabled = status === "active";
  }
  if (selectors.planTrialCta) {
    selectors.planTrialCta.disabled = status === "active";
  }
  if (selectors.logoutBtn) {
    selectors.logoutBtn.classList.toggle("is-hidden", status !== "active");
    selectors.logoutBtn.disabled = status !== "active";
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
      authMessage: "Sign in to your PostPro AI account to unlock the LinkedIn toolkit.",
    });
    return;
  }

  try {
    await ensureSession();

    const response = await invokeFunction("subscription-manager", {
      action: "getUserSubscription",
      userId: settings.userId,
      email: settings.userEmail || undefined,
    });

    const subscription = response?.subscription || null;
    state.subscription = subscription;

    if (!response?.success) {
      updateAccessState("error", { errorMessage: "Unable to verify your access right now." });
      return;
    }

    const access = evaluateSubscriptionAccess(subscription);

    if (access.status === "active") {
      const expiryLabel = access.isTrial && access.expiresAt ? formatShortDate(access.expiresAt) : null;
      updateAccessState("active", {
        planName: access.planName,
        planLabel: access.planLabel,
        profilePlan: access.profilePlan,
        displayName: access.displayName,
        upgradeMessage: expiryLabel ? `Trial active until ${expiryLabel}.` : undefined,
        pillTone: access.isTrial ? "positive" : undefined,
        isTrial: access.isTrial,
      });
      return;
    }

    const upgradeMessage = access.expiredTrial
      ? "Your trial has ended. Activate a PostPro AI plan to keep enhancing and predicting performance."
      : response?.requiresPurchase || !subscription
        ? "Select a PostPro AI Pro plan or trial to unlock enhancements."
        : "Activate a PostPro AI plan or trial to unlock enhancements.";

    updateAccessState("trialRequired", {
      planName: access.planName,
      displayName: access.displayName,
      upgradeMessage,
      expiredTrial: access.expiredTrial,
      pillTone: access.expiredTrial ? "warning" : undefined,
      planLabel: access.expiredTrial ? "Trial ended" : undefined,
    });
  } catch (error) {
    const message = error?.message || "Unable to verify access.";
    if (message.toLowerCase().includes("sign in again")) {
      await clearSession();
      updateAccessState("signedOut", { authMessage: "Session expired. Sign in again." });
      return;
    }
    updateAccessState("error", { errorMessage: message });
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatEnhancedContent(payload) {
  const { platforms = {}, diagnostics } = payload;
  const platformEntries = Object.entries(platforms)
    .filter(([, value]) => typeof value === "string" && value.trim().length > 0);

  const preferred = platformEntries.filter(([key]) => key.toLowerCase().includes("linkedin"));
  const visibleEntries = preferred.length > 0 ? preferred : platformEntries.slice(0, 1);

  if (visibleEntries.length === 0) {
    return "<div>No LinkedIn-ready copy returned. Try adjusting your prompt.";
  }

  const blocks = visibleEntries
    .map(([platform, value]) => {
      const title = platform.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return `
        <article class="result">
          <header class="result__heading">${escapeHtml(title)}</header>
          <pre class="result__content">${escapeHtml(value.trim())}</pre>
        </article>
      `;
    })
    .join("");

  const diagnosticsBlock = diagnostics?.insights?.length
    ? `
      <section class="result">
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
    ? `<div class="result">
        <header class="result__heading">Virality score</header>
        <p class="result__content"><strong>${Math.round(score)}%</strong> projected reach potential.</p>
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
      <section class="result">
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

function handleError(element, error) {
  const message = error?.message || "Unexpected error. Please try again.";
  setOutput(element, `<div class="error">${escapeHtml(message)}</div>`);
}

async function onEnhance() {
  if (state.access !== "active") return;

  const post = selectors.enhanceInput?.value.trim();
  if (!post) {
    handleError(selectors.enhanceOutput, new Error("Add a post to enhance."));
    return;
  }

  setButtonBusy(selectors.enhanceBtn, true, "Enhancing...");
  setInteractiveState(false);
  showLoading(selectors.enhanceOutput);

  try {
    const payload = {
      post,
      category: selectors.enhanceCategory?.value,
      styleTone: selectors.enhanceTone?.value,
      userId: state.settings.userId || undefined,
    };

    const data = await invokeFunction("enhance-post", payload);
    const content = formatEnhancedContent(data);
    setOutput(selectors.enhanceOutput, content, { scrollTop: true });
  } catch (error) {
    handleError(selectors.enhanceOutput, error);
  } finally {
    setButtonBusy(selectors.enhanceBtn, false);
    setInteractiveState(state.access === "active");
  }
}

async function onPredict() {
  if (state.access !== "active") return;

  const post = selectors.enhanceInput?.value.trim();
  if (!post) {
    handleError(selectors.viralityOutput, new Error("Add a post to analyze."));
    openDrawer();
    return;
  }

  setButtonBusy(selectors.viralityBtn, true, "Predicting...");
  setInteractiveState(false);
  showLoading(selectors.viralityOutput);
  openDrawer();

  try {
    const payload = {
      post,
      category: selectors.enhanceCategory?.value,
    };

    const data = await invokeFunction("analyze-virality", payload);
    if (typeof data.score === "number") {
      applyScore(data.score);
    }
    const content = formatViralityContent(data);
    setOutput(selectors.viralityOutput, content, { scrollTop: true });
  } catch (error) {
    handleError(selectors.viralityOutput, error);
    resetMeter();
  } finally {
    setButtonBusy(selectors.viralityBtn, false);
    setInteractiveState(state.access === "active");
  }
}

function updateCharCount() {
  if (!selectors.charCount || !selectors.enhanceInput) return;
  const current = selectors.enhanceInput.value.length;
  selectors.charCount.textContent = `${current}/3000`;
}

async function copyEnhancedToClipboard() {
  const text = selectors.enhanceOutput?.textContent?.trim();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    selectors.copyEnhanced?.classList.add("is-success");
    setTimeout(() => selectors.copyEnhanced?.classList.remove("is-success"), 1200);
  } catch (error) {
    console.error("Copy failed", error);
  }
}

function registerEvents() {
  if (selectors.enhanceBtn) selectors.enhanceBtn.addEventListener("click", onEnhance);
  if (selectors.viralityBtn) selectors.viralityBtn.addEventListener("click", onPredict);
  if (selectors.clearEnhance) {
    selectors.clearEnhance.addEventListener("click", () => {
      if (selectors.enhanceInput) selectors.enhanceInput.value = "";
      updateCharCount();
      setOutput(selectors.enhanceOutput, "Your enhanced copy will appear here.");
      setViralityPlaceholder();
    });
  }
  if (selectors.copyEnhanced) {
    selectors.copyEnhanced.addEventListener("click", copyEnhancedToClipboard);
  }

  if (selectors.enhanceInput) {
    selectors.enhanceInput.addEventListener("input", updateCharCount);
  }

  const openWorkspace = () => openInTab(state.settings.dashboardUrl, "https://postproai.app");
  const openPlans = () => openInTab(state.settings.plansUrl, "https://postproai.app/pricing");

  if (selectors.openDashboard) selectors.openDashboard.addEventListener("click", openWorkspace);
  if (selectors.openPlans) selectors.openPlans.addEventListener("click", openPlans);
  if (selectors.loginCta) selectors.loginCta.addEventListener("click", () => {
    if (state.access === "active") {
      openWorkspace();
    } else {
      openLoginSheet();
    }
  });
  if (selectors.trialCta) selectors.trialCta.addEventListener("click", openPlans);
  if (selectors.planTrialCta) selectors.planTrialCta.addEventListener("click", openPlans);
  if (selectors.upgradeCta) selectors.upgradeCta.addEventListener("click", openPlans);
  if (selectors.logoutBtn) selectors.logoutBtn.addEventListener("click", handleLogout);

  if (selectors.loginClose) selectors.loginClose.addEventListener("click", closeLoginSheet);
  if (selectors.loginBackdrop) selectors.loginBackdrop.addEventListener("click", closeLoginSheet);
  if (selectors.loginToggle) selectors.loginToggle.addEventListener("click", togglePasswordVisibility);
  if (selectors.loginForm) selectors.loginForm.addEventListener("submit", handleLoginSubmit);
  if (selectors.loginForgot) selectors.loginForgot.addEventListener("click", handleForgotPassword);
  if (selectors.loginOpenPlans) selectors.loginOpenPlans.addEventListener("click", openPlans);

  if (selectors.openOptions) {
    selectors.openOptions.addEventListener("click", () => {
      if (api.runtime.openOptionsPage) {
        api.runtime.openOptionsPage();
      } else {
        api.tabs.create({ url: "options.html" });
      }
    });
  }

  if (selectors.drawerBackdrop) {
    selectors.drawerBackdrop.addEventListener("click", closeDrawer);
  }
  if (selectors.closeDrawer) {
    selectors.closeDrawer.addEventListener("click", closeDrawer);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (isLoginOpen()) {
        closeLoginSheet();
        return;
      }
      closeDrawer();
    }
  });
}

function openInTab(url, fallback) {
  const target = url || fallback;
  if (!target) return;
  api.tabs.create({ url: target });
}

(async function init() {
  resetMeter();
  setViralityPlaceholder();
  setInteractiveState(false);
  registerEvents();
  await loadSettings();
  await hydrateAccessState();
  updateCharCount();
})();

