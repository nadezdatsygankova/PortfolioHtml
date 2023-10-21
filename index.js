
import env from './env.js';
window.env = env;

const modal = document.querySelector('.modal');
const modalCloseBtn = document.getElementById('modal-close-btn')
const contactButton = document.getElementById('contact-id')


// Access the configuration variables
const EMIL_ID = env.EMIL_ID;
const SERVICE_ID = env.SERVICE_ID;
const TEMPLATE_ID = env.TEMPLATE_ID;

contactButton.addEventListener('click', ()=>{
  modal.style.display = 'inline'
})


modalCloseBtn.addEventListener('click', function (){
  console.log('click')
  modal.style.display = "none"
})

// document.getElementById("contactForm").addEventListener("submit", submitForm);


// function submitForm(e) {
//   e.preventDefault();
//   //gets the name
//   let name = getInputVal("contact-name");
//   //gets the email
//   let email = getInputVal("contact-email");
//   //gets the phone
//   let phone = getInputVal("contact-phone");
//   //gets the message
//   let message = getInputVal("contact-message");
//   // console.log(name, email, phone, message)
//   if (validateForm(name, email, phone, message)) {
//     // console.log('yes')
//     let templateParams = {
//       to_name: 'Nadia Tsy',
//       from_name: name,
//       from_email:email,
//       from_phone:phone,
//       message_html: message
//     };


//     emailjs.init(EMIL_ID);

//     emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
//       .then(function(response) {
//         console.log('SUCCESS!', response.status, response.text);
//       }, function(error) {
//         console.log('FAILED...', error);
//       });

//     //enable alert
//     document.querySelector('.alert').style.display = 'block';
//     //remote alert
//     setTimeout(() => {
//       document.querySelector('.alert').style.display = 'none';
//     }, 4000)

//     //reset form
//     document.getElementById("contactForm").reset();

//   }
//   else {
//     console.log("Invalid email address or phone!");
//   }
// }



// function getInputVal(id) {
//   return document.getElementById(id).value
// }

// function validateForm(name, email, phone, message) {
//   const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   const phoneno = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

//   //checks if all fields have been filled before sending message.
//   if (name.trim() == "" || email.trim() == "" || message.trim() == "" || phone.trim() == "") {
//     alert("all fields must be filled");
//     return false;
//   } else {
//     if (email.match(validRegex) && phone.match(phoneno)) {
//       console.log(name, email, phone, message)
//       return true;
//     } else {
//       alert("Invalid email address or phone!");
//       return false;
//     }
//   }
// }


const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.navigation');
if (iconMenu) {
  iconMenu.addEventListener('click', (e) => {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

const menuLinks = document.querySelectorAll('.menu__link');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick)
  })
}

function onMenuLinkClick(e) {
  const menuLink = e.target;
  if (iconMenu.classList.contains('_active')) {
    document.body.classList.remove('_lock');
    iconMenu.classList.remove('_active');
    menuBody.classList.remove('_active');
  }

}



