const cart = document.querySelector('.header__cart--popup')
const closeBtn = document.querySelector('.header__cart--popup--header .fa-xmark')
const showCart = document.querySelector('.fa-bag-shopping')
showCart.addEventListener('click', () => {
    cart.style.transform = 'translateX(0)'
})
closeBtn.addEventListener('click', () => {
    cart.style.transform = 'translateX(390px)'
})

