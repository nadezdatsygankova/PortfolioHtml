const modal = document.querySelector('.modal');
const modalCloseBtn = document.getElementById('modal-close-btn')
const contactButton = document.getElementById('contact-id')

contactButton.addEventListener('click', ()=>{
  modal.style.display = 'inline'
})


modalCloseBtn.addEventListener('click', function (){
  console.log('click')
  modal.style.display = "none"
})

