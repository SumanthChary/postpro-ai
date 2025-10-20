const api = typeof browser !== "undefined" ? browser : chrome;

const form = document.getElementById("options-form");
const status = document.getElementById("status");
const fields = {
  supabaseUrl: document.getElementById("supabase-url"),
  supabaseAnonKey: document.getElementById("supabase-key"),
  userToken: document.getElementById("user-token"),
  userId: document.getElementById("user-id"),
  dashboardUrl: document.getElementById("dashboard-url"),
  plansUrl: document.getElementById("plans-url"),
};

async function loadSettings() {
  if (!api?.storage?.sync) return;
  const stored = await api.storage.sync.get(Object.keys(fields));
  Object.entries(fields).forEach(([key, input]) => {
    input.value = stored[key] || "";
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
    input.value = "";
  });
  showStatus("Settings cleared.");
});

loadSettings();
