import { auth, database } from "./config.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {

registerBtn.addEventListener("click", async () => {

const fullName = document.getElementById("fullName").value.trim();

const username = document.getElementById("username").value.trim();

const email = document.getElementById("email").value.trim();

const password = document.getElementById("password").value;

const confirmPassword = document.getElementById("confirmPassword").value;

if (
!fullName ||
!username ||
!email ||
!password ||
!confirmPassword
){
alert("Please fill all fields");
return;
}

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

try{

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user = userCredential.user;

await set(
ref(database,"users/"+user.uid),
{
fullName,
username,
email,
createdAt:Date.now()
}
);

alert("Account Created Successfully");

window.location.href="login.html";

}catch(error){

alert(error.message);

}

});

}
