const form = document.getElementById("register_form");
form.addEventListener("submit", register);  

async function register(event) {
  event.preventDefault(); 
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;

   const user = {
     firstname: firstname,
     lastname: lastname,
     username: username,
     password: password,
     phone: phone
   };
  const response = await fetch("/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  const data = await response.json();

  if (response.ok) {
    alert("Registered successfully!");
    window.location.href = "/login/login.html";
  } else {
    alert("Registration failed: " + data.message);
  }
}