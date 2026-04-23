const form = document.getElementById("login_form");
form.addEventListener("submit", login);  

function login(event) {
  event.preventDefault(); 
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
   const user = {
     username: username,
     password: password
   };
  console.log(user);
}