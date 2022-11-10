const userInputSingup = document.querySelector('.userRegister')
const passwordInputSingup = document.querySelector('.passwordRegister')
const genderInputSingup = document.getElementById('selectGender')
const ageInputSingup = document.querySelector('.ageRegister')
const registerBtn = document.querySelector('.content__register--form--submitBtn')

registerBtn.addEventListener('click', async(e) => {
    e.preventDefault()
    const userRegister = userInputSingup.value
    const passwordRegister = passwordInputSingup.value
    const ageRegister = ageInputSingup.value
    const genderRegister = genderInputSingup.value
    const data = { user: userRegister, password: passwordRegister, age: ageRegister, sex: genderRegister }
    console.log(data)
    await axios
    .post('https://e-commerce-sever.vercel.app/api/account/register', data)
    .then((response) => {
        if(response.data === 'Đăng kí thành công'){
            alert(response.data)
            setTimeout(() => window.location.href = './login.html', 2000)
        } else if(response.data === 'Tài khoản đã tồn tại') {
                alert(response.data)
        } else alert('Đăng kí thất bại, lỗi server')
    })
})
