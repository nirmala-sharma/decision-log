const form = document.getElementById("login_form");
form.addEventListener("submit", login);  

async function login(event) {
  event.preventDefault(); 
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
   const user = {
     username: username,
     password: password
   };
  const response = await fetch("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("username", data.username);
    window.location.href = "/decision/decision.html";
  } else {
    alert("Login failed: " + data.message);
  }
}