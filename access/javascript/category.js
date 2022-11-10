const showSelect = document.querySelectorAll('.category__content--navbar--list--item--header')
const hideIcon = document.querySelectorAll('.fa-minus')
const showIcon = document.querySelectorAll('.fa-plus')
const tabSelect = document.querySelectorAll('.category__content--navbar--list--item--select')
const listItem = document.querySelector('.category__content--product--list--wrap')
const urlWomen =  "https://e-commerce-sever-huanquang.vercel.app/api/donu"
const urlMan = "https://e-commerce-sever-huanquang.vercel.app/api/donam"
const urlKid = "https://e-commerce-sever-huanquang.vercel.app/api/dotreem"
const getManList = document.querySelector('.header__navBar__item.manBtn')
const getWomanList = document.querySelector('.header__navBar__item.womanBtn')
const getKidList = document.querySelector('.header__navBar__item.kidBtn')
const countProduct = document.querySelector('.header__cart--popup--header span')
const cartProduct = [...JSON.parse(localStorage.getItem('cart')) || []];
const searchInput = document.querySelector('.header__subNav--search input')
const selectProduct = document.getElementById('selectProduct')

countProduct.innerHTML = cartProduct.reduce((a,b)=> a + b.qty, 0)
renderCart()
// open Cart modal
showSelect.forEach((showBtn, index) => {
    showBtn.addEventListener('click', ()  => {
        showIcon[index].classList.toggle('hide')
        hideIcon[index].classList.toggle('hide')
        tabSelect[index].classList.toggle('showAnima')
    })
})
const currentPrice = document.querySelector('.currentPrice')
const rangePrice = document.querySelector('.price input')
rangePrice.onchange = function(e){
    currentPrice.innerHTML = `${e.target.value}đ`
}

let currentPage = 1
let itemPerPage = 12
let totalPage = 0
let dataPerPage = []
let data = []
// Get data from API back - end
function handleSelectPage(index){
    currentPage = index
    dataPerPage = data.slice(
        (currentPage - 1) * itemPerPage, 
        (currentPage - 1) * itemPerPage + itemPerPage
        )
        renderListfromApi()
}
function renderListfromApi(){
    const html = dataPerPage.map(product => {
        return (
            `<a class="category__content--product--list--wrap--item">
                <img class="img-main" src="${product.imgMain}" alt="img">
                <img class="img-lazy" src="${product.imgSub}" alt="img">
                <div class="category__content--product--list--wrap--item--information">
                    <div class="option">
                        <span class="color">${product.color}</span>
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <h3 class="name">${product.name}</h3>
                    <div class="cart">
                        <span class="price">${product.price}đ</span>
                        <i class="fa-solid fa-bag-shopping" onclick ="addToCard('${product._id}')"></i>
                    </div>
                </div>
            </a>`
        )
       
    })
    listItem.innerHTML = html.join('')
}

async function getdata(url){
    currentPage = 1
    data = await fetch(url) 
                .then((response) => response.json())
                .then(data => data);
    localStorage.setItem('product', JSON.stringify(data))
    
    totalPage =  Math.ceil(data.length / itemPerPage)
    renderPageBtn()
    dataPerPage = data.slice(
        (currentPage - 1) * itemPerPage, 
        (currentPage - 1) * itemPerPage + itemPerPage
    )
    renderListfromApi()
    function renderPageBtn(){
        const pagination = document.querySelector('.category__content--product--list--pagination')
        let htmlPaginate = []       
        for (let i = 1; i <= totalPage; i++){
            htmlPaginate += `<li onclick="handleSelectPage(${i})"><div>${i}</div></li>`
            pagination.innerHTML = htmlPaginate
        }
    }
   
}
// option list render on category
window.addEventListener('onload', getdata(urlMan))

getManList.addEventListener('click', () => {
    getdata(urlMan)
})
getWomanList.addEventListener('click', () => {
    getdata(urlWomen)
})
getKidList.addEventListener('click', () => {
    getdata(urlKid)
})
// Add product to Cart
function addToCard(id){
    const data = JSON.parse(localStorage.getItem('product'))
    const product = data.find(item => item._id === id)
    const checkCartCurent = cartProduct.some(item => item._id === product._id)
    // check xem có hàng trong giỏ chưa. nếu có khi mua thêm sẽ tăng số lượng, không thì sẽ add vào lần đầu
    if(checkCartCurent){
        const objIndex = cartProduct.findIndex(item => item._id === product._id);
        cartProduct[objIndex].qty += 1
    }
    else {
        product.qty = 1
        cartProduct.push(product)
    }
    localStorage.setItem('cart', JSON.stringify(cartProduct))
    // Số lượng trong giỏ hàng
    countProduct.innerHTML = cartProduct.reduce((a,b)=> a + b.qty, 0)
    renderCart()
}
//  Hiển thị các sản phẩm tại giao diện Cart
function renderCart(){
    const html = cartProduct.map(item => {
        return (`<div class="header__cart--popup--body--item">
                    <img src="${item.imgMain}" alt="img">
                    <div class="header__cart--popup--body--item--content">
                        <p class="header__cart--popup--body--item--content--name">${item.name}</p>
                        <p class="header__cart--popup--body--item--content--color">Màu sắc: <span>${item.color}</span></p>
                        <div class="header__cart--popup--body--item--content--pay">
                            <div class="quality">
                                <i class="fa-solid fa-plus" onclick="decreaseProduct('${item._id}')"></i>
                                <span>${item.qty}</span>
                                <i class="fa-solid fa-minus" onclick="reduceProduct('${item._id}')"></i>
                            </div>
                            <p class="price"><span>${item.price*item.qty}</span>₫</p>
                        </div>
                    </div>
                </div>`)
    })
    document.querySelector('.header__cart--popup--body').innerHTML = html.join('')
}
// Tăng giảm số lượng trong giỏ hàng 
function decreaseProduct(id){
    const objIndex = cartProduct.findIndex(item => item._id === id)
    cartProduct[objIndex].qty += 1
    localStorage.setItem('cart', JSON.stringify(cartProduct))
    // Số lượng trong giỏ hàng
    countProduct.innerHTML = cartProduct.reduce((a,b)=> a + b.qty, 0)
    renderCart()
}
function reduceProduct(id){
    const objIndex = cartProduct.findIndex(item => item._id === id)
    if(cartProduct[objIndex].qty === 1){
        cartProduct.splice(objIndex, 1)
    }else {
        cartProduct[objIndex].qty -= 1
    }
    localStorage.setItem('cart', JSON.stringify(cartProduct))
    // Số lượng trong giỏ hàng
    countProduct.innerHTML = cartProduct.reduce((a,b)=> a + b.qty, 0)
    renderCart()
}
// Tìm kiếm sản phẩm theo từ khoá
searchInput.oninput = (e) => {
    const searchValue = e.target.value.trim().toLowerCase()
    const list = document.querySelectorAll('.category__content--product--list--wrap--item .name')
    list.forEach(item => {  
        if(!item.innerText.trim().toLowerCase().includes(searchValue)){
            item.parentElement.parentElement.classList.add('hide')
        }else {
            item.parentElement.parentElement.classList.remove('hide')
        }
    }) 
}
