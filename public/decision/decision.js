const form = document.getElementById("decision_form");
form.addEventListener("submit", register);  

function register(event) {
  event.preventDefault(); 
  const decisionInput= document.getElementById("decision_input").value;

   const decision = {
     decision: decisionInput
   };
  console.log(decision);
}