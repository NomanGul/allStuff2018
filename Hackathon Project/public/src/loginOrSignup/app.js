(function(){

const config = {
    apiKey: "AIzaSyCek1I7W14it5lYjOxhQI_EctNpdFsOExQ",
    authDomain: "pakolx-41f1c.firebaseapp.com",
    databaseURL: "https://pakolx-41f1c.firebaseio.com",
    projectId: "pakolx-41f1c",
    storageBucket: "pakolx-41f1c.appspot.com",
    messagingSenderId: "329604896905"
  };
  firebase.initializeApp(config);


// Get Elements
const txtEmail = document.querySelector('#txtEmail');
const txtPassword = document.querySelector('#txtPassword');
const btnLogin = document.querySelector('#btnLogin');
const btnSignup = document.querySelector('#btnSignup');
const auth = firebase.auth();

// Add Login Event
btnLogin.addEventListener('click', e => {
    // Get Email And Password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    // login
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
})

// Add Signup Event
btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    // login
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
})

auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
        console.log(firebaseUser);
    }else{
        console.log('not logged in');
    }
})
})();