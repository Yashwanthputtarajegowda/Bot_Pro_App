import { auth } from "./config.js";

import {

signInWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const loginBtn=document.getElementById("loginBtn");

if(loginBtn){

loginBtn.addEventListener("click",async()=>{

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

if(!email || !password){

alert("Enter Email and Password");

return;

}

try{

await signInWithEmailAndPassword(

auth,

email,

password

);

alert("Login Successful");

window.location.href="home.html";

}catch(error){

alert(error.message);

}

});

}
