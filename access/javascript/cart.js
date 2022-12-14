const cart = document.querySelector('.header__cart--popup')
const closeBtn = document.querySelector('.header__cart--popup--header .fa-xmark')
const showCart = document.querySelector('.fa-bag-shopping')
const isLogin = !!localStorage.getItem('user')
const privatePageBtn = document.querySelector('.privatePageBtn')
const getUsername = JSON.parse(localStorage.getItem('user'))
const menuNav = document.querySelector('.header .fa-bars')
const closeMenuNav = document.querySelector('.header__navBar .fa-xmark')

showCart.addEventListener('click', () => {
    cart.style.transform = 'translateX(0)'
})
closeBtn.addEventListener('click', () => {
    cart.style.transform = 'translateX(390px)'
})
// mở menu mobile
menuNav.addEventListener('click', () => {
    console.log(1)
    document.querySelector('.header__navBar').style.transform = 'translateX(0)'
})
closeMenuNav.addEventListener('click', () => {
    document.querySelector('.header__navBar').style.transform = 'translateX(-390px)'
})


if(isLogin){
    document.querySelector('.header__cart--popup--login').innerHTML = 'Đặt hàng'
    privatePageBtn.setAttribute("href", "./index.html")
    document.querySelector('.header__subNav__option--item--popup').classList.remove('hide')
    document.querySelector('.header__subNav__option--item--popup--item--nameUser').innerHTML = getUsername
}else {
    document.querySelector('.header__cart--popup--login').innerHTML = 'Đăng nhập'
    document.querySelector('.header__cart--popup--login').setAttribute("href", "./login.html")
    privatePageBtn.setAttribute("href", "./login.html")
    document.querySelector('.header__subNav__option--item--popup').classList.add('hide')
}
const logOutBtn = document.querySelector('.header__subNav__option--item--popup--item.logout')

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setTimeout(()=> {
        window.location.href = './login.html'
    }, 2000)
})