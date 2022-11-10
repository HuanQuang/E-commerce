const loginBtn = document.querySelector('.submit--btn')
const userInput = document.querySelector('.content__section--form--user')
const passwordInput = document.querySelector('.content__section--form--password')
// const isLogin = !!localStorage.getItem('user')
loginBtn.addEventListener('click', async(e) => {
    e.preventDefault()
    const user = userInput.value
    const password = passwordInput.value
    await axios
    .post('https://e-commerce-sever-huanquang.vercel.app/api/account/login', { user: user, password: password })
    .then((response) => {
        console.log(response)
        if (response.data.user) {
            const token = response.data.token
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('token', JSON.stringify(response.data.token))
            alert(response.data.message)
            setTimeout(()=> {
                window.location.href = './index.html'
            }, 2000)
        } else {
            alert(response.data.message);
        }
    });
})
if(isLogin){
    document.querySelector('.header__cart--popup--login').innerHTML = 'Đặt hàng'
}else {
    document.querySelector('.header__cart--popup--login').innerHTML = 'Đăng nhập'
}