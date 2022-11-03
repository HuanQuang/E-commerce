const dot1 = document.querySelector('.content__slider--dot--item.first')
const dot2 = document.querySelector('.content__slider--dot--item.second')
const slider = document.querySelector('.content__slider--wrap')

dot1.addEventListener('click', () => {
    slider.style.transform = 'translateX(0)';
    dot1.classList.add('active');
    dot2.classList.remove('active')
})
dot2.addEventListener('click', () => {
    slider.style.transform = 'translateX(-100%)';
    dot2.classList.add('active');
    dot1.classList.remove('active')
})
const arrowLeft = document.querySelector('.fa-arrow-left-long')
const arrowRight = document.querySelector('.fa-arrow-right-long')

var count = 0;
arrowRight.addEventListener('click', ()=> {
    count++;
    const slideAds = document.querySelector('.content__ads--slider')
    const listAds = document.querySelectorAll('.content__ads--slider img')
    slideAds.style.transform = 'translateX(count*50%)'
    slideAds.appendChild(listAds[0])
})

arrowLeft.addEventListener('click', ()=> {
    count--;
    const slideAds = document.querySelector('.content__ads--slider')
    const listAds = document.querySelectorAll('.content__ads--slider img')
    slideAds.prepend(listAds[listAds.length - 1])
    slideAds.style.transform = 'translateX(count*50%)'
})
// Show cart
const cart = document.querySelector('.header__cart--popup')
const closeBtn = document.querySelector('.header__cart--popup--header .fa-xmark')
const showCart = document.querySelector('.fa-bag-shopping')
showCart.addEventListener('click', () => {
    cart.style.transform = 'translateX(0)'
})
closeBtn.addEventListener('click', () => {
    cart.style.transform = 'translateX(390px)'
})
