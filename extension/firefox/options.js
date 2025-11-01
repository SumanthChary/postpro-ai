const api = typeof browser !== "undefined" ? browser : chrome;

const form = document.getElementById("options-form");
const status = document.getElementById("status");
const DEFAULTS = {
  supabaseUrl: "https://rskzizedzagohmvyhuyu.supabase.co",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza3ppemVkemFnb2htdnlodXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMzg3NzksImV4cCI6MjA1MjYxNDc3OX0.7sbPmg3ms4_JKXILGYLb76TCPakwI9ngzApdifhVeo4",
  dashboardUrl: "https://postproai.app",
  plansUrl: "https://postproai.app/pricing",
};
const fields = {
  supabaseUrl: document.getElementById("supabase-url"),
  supabaseAnonKey: document.getElementById("supabase-key"),
  dashboardUrl: document.getElementById("dashboard-url"),
  plansUrl: document.getElementById("plans-url"),
};

async function loadSettings() {
  if (!api?.storage?.sync) return;
  const stored = await api.storage.sync.get(Object.keys(fields));
  Object.entries(fields).forEach(([key, input]) => {
    const fallback = DEFAULTS[key] ?? "";
    const value = stored[key];
    input.value = typeof value === "string" && value.trim().length > 0 ? value : fallback;
  });
}

function showStatus(message, tone = "info") {
  status.textContent = message;
  status.className = `status status--${tone}`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = Object.fromEntries(
    Object.entries(fields).map(([key, input]) => [key, input.value.trim()])
  );

  if (!payload.supabaseUrl || !payload.supabaseAnonKey) {
    showStatus("Supabase URL and anon key are required.", "error");
    return;
  }

  await api.storage.sync.set(payload);
  showStatus("Settings saved.", "success");
  setTimeout(() => showStatus(""), 3000);
});

const resetButton = document.getElementById("reset-settings");
resetButton.addEventListener("click", async () => {
  await api.storage.sync.remove(Object.keys(fields));
  Object.values(fields).forEach((input) => {
    const entry = Object.entries(fields).find(([, node]) => node === input);
    const key = entry ? entry[0] : undefined;
    input.value = key && DEFAULTS[key] ? DEFAULTS[key] : "";
  });
  showStatus("Settings cleared.");
});

loadSettings();
