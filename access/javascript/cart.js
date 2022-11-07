const cart = document.querySelector('.header__cart--popup')
const closeBtn = document.querySelector('.header__cart--popup--header .fa-xmark')
const showCart = document.querySelector('.fa-bag-shopping')
showCart.addEventListener('click', () => {
    console.log('open')
    cart.style.transform = 'translateX(0)'
})
closeBtn.addEventListener('click', () => {
    cart.style.transform = 'translateX(390px)'
})
window.addEventListener('storage', () => {
    const countProduct = document.querySelector('.header__cart--popup--header span')
    const data = JSON.parse(localStorage.getItem('cart'))
    countProduct.innerHTML = data.length
})
