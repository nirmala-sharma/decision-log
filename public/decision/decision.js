const form = document.getElementById("decision_form");
form.addEventListener("submit", createDecision);

// Load all decisions for the logged-in user when the page opens
window.addEventListener("load", loadDecisions);

async function loadDecisions() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("You must be logged in to view decisions.");
    window.location.href = "/login/login.html";
    return;
  }

  const response = await fetch("/decisions");
  const decisions = await response.json();

  // Filter to only show decisions belonging to the logged-in user
  const userDecisions = decisions.filter(d => d.User_Id == userId);

  const list = document.getElementById("decisions_list");
  list.innerHTML = "";

  userDecisions.forEach(d => {
    const item = document.createElement("p");
    item.textContent = `${d.Title} — ${d.Status} (${d.Category_Name})`;
    list.appendChild(item);
  });
}

async function createDecision(event) {
  event.preventDefault();

  const userId = localStorage.getItem("userId");
  const title = document.getElementById("decision_input").value;
  const categoryId = document.getElementById("categoryId").value;
  const status = document.getElementById("status").value;

  const decision = { userId, categoryId, title, status };

  const response = await fetch("/decisions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(decision)
  });

  if (response.ok) {
    location.reload();
  } else {
    const data = await response.json();
    alert("Failed to add decision: " + data.message);
  }
}