const modal = document.querySelector('.modal');
const modalCloseBtn = document.getElementById('modal-close-btn')
const contactButton = document.getElementById('contact-id')

const firebaseConfig = {
  apiKey: "AIzaSyDrxnMl55mDqh-ZTUJAx4sxeUPguIi3Hr8",
  authDomain: "contacformnadiatsy.firebaseapp.com",
  databaseURL: "https://contacformnadiatsy-default-rtdb.firebaseio.com",
  projectId: "contacformnadiatsy",
  storageBucket: "contacformnadiatsy.appspot.com",
  messagingSenderId: "754460503086",
  appId: "1:754460503086:web:4d8c2a5a6eb9614bf283bf"
};


contactButton.addEventListener('click', ()=>{
  modal.style.display = 'inline'
})


modalCloseBtn.addEventListener('click', function (){
  console.log('click')
  modal.style.display = "none"
})

//initialize firebase
firebase.initializeApp(firebaseConfig);

//reference your database
const contactFormDB = firebase.database().ref("contact-form")

document.getElementById("contactForm").addEventListener("submit", submitForm);


function submitForm(e) {
  e.preventDefault();
  //gets the name
  let name = getInputVal("contact-name");
  //gets the email
  let email = getInputVal("contact-email");
  //gets the phone
  let phone = getInputVal("contact-phone");
  //gets the message
  let message = getInputVal("contact-message");
  console.log(name, email, phone, message)
  if (validateForm(name, email, phone, message)) {
    console.log('yes')
    saveMessage(name, email, phone, message)

    //enable alert
    document.querySelector('.alert').style.display = 'block';
    //remote alert
    setTimeout(() => {
      document.querySelector('.alert').style.display = 'none';
    }, 4000)

    //reset form
    document.getElementById("contactForm").reset();

  }
  else {
    console.log("Invalid email address or phone!");
  }
}

const saveMessage = (name, email, phone, message) => {
  let newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
}

function getInputVal(id) {
  return document.getElementById(id).value
}

function validateForm(name, email, phone, message) {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneno = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  //checks if all fields have been filled before sending message.
  if (name.trim() == "" || email.trim() == "" || message.trim() == "" || phone.trim() == "") {
    alert("all fields must be filled");
    return false;
  } else {
    if (email.match(validRegex) && phone.match(phoneno)) {
      console.log(name, email, phone, message)
      return true
    } else {
      alert("Invalid email address or phone!");
      return false;
    }
  }
}


