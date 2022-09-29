import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCUhLeQFCgDYgA1HZLI1Ws1jUSttN2G9Z4",
  authDomain: "my-first-project-e5195.firebaseapp.com",
  databaseURL: "https://my-first-project-e5195-default-rtdb.firebaseio.com",
  projectId: "my-first-project-e5195",
  storageBucket: "my-first-project-e5195.appspot.com",
  messagingSenderId: "197560401258",
  appId: "1:197560401258:web:3306d1093245f95e04b913",
  measurementId: "G-Z9S7G3CRL7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//Authentication and registration
const auth = getAuth();

var registrationBtn = document.getElementById("registrationBtn");

registrationBtn.addEventListener('click', function(){
  let userName = document.getElementById("signup-userName").value;
  let email = document.getElementById("signup-userEmail").value;
  let pass = document.getElementById("signup-userPass").value;

  createUserWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User => ",user);
    //set data to realtime db
    const db = getDatabase();
    set(ref(db, `users/${user.uid}`), {
      username: userName,
      email: email,
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("ERROR => ",errorMessage);
    // ..
  });
})

//Login
var LoginBtn = document.getElementById("loginBtn");

LoginBtn.addEventListener('click', function(){
  let loginMail = document.getElementById("login-userMail").value;
  let loginPass = document.getElementById("login-userPass").value;


  //const auth = getAuth();
  signInWithEmailAndPassword(auth, loginMail, loginPass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User => ",user);

      //read data from realtime database
      const db = getDatabase();
      onValue(ref(db, `users/${user.uid}`), (data)=>{
        console.log("data =>",data.val());
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("ERROR => ",errorMessage);
      }
    );
})

//SLIDERS

var SignupWinowOpener = document.getElementById("slide-signup");

SignupWinowOpener.addEventListener('click', function(){
  document.querySelector(".login-form-container").style.cssText = "display: none;";
  document.querySelector(".signup-form-container").style.cssText = "display: block;";
  document.querySelector(".container").style.cssText = "background: linear-gradient(to left, hsl(162, 5%, 88%), hsl(162, 9%, 68%));";
  document.querySelector(".button-1").style.cssText = "display: none";
  document.querySelector(".button-2").style.cssText = "display: block";
  document.querySelector("#side-para").innerHTML = "Already have an account! \nSign in now "
});

var SigninWinowOpener = document.getElementById("slide-signin");

SigninWinowOpener.addEventListener('click', function(){
  document.querySelector(".signup-form-container").style.cssText = "display: none;";
  document.querySelector(".login-form-container").style.cssText = "display: block;";
  document.querySelector(".container").style.cssText = "background: linear-gradient(to left, hsl(212, 5%, 45%),  hsl(221, 9%, 27%));";
  document.querySelector(".button-2").style.cssText = "display: none";
  document.querySelector(".button-1").style.cssText = "display: block";
  document.querySelector("#side-para").innerHTML = "Don't have an account !! Sign-up now "
});