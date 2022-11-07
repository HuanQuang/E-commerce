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
const cartProduct = [...JSON.parse(localStorage.getItem('cart')) || []];


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


// Get data from API back - end
async function getdata(url){
    const data = await fetch(url) 
                .then((response) => response.json())
                .then(data => data);
 
    const html = data.map(product => {
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
    localStorage.setItem('product', JSON.stringify(data))
    listItem.innerHTML = html.join('')

}

// option list render on category
getdata(urlWomen)
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
    let product = data.find(item => item._id === id)
    cartProduct.push(product)
    localStorage.setItem('cart', JSON.stringify(cartProduct))
    
}


