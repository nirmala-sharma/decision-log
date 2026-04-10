const form = document.getElementById("register_form");
form.addEventListener("submit", register);  

function register(event) {
  event.preventDefault(); 
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

   const user = {
     firstname: firstname,
     lastname: lastname,
     username: username,
     password: password
   };
 console.log(user);
}