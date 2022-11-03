const showSelect = document.querySelectorAll('.category__content--navbar--list--item--header')
const hideIcon = document.querySelectorAll('.fa-minus')
const showIcon = document.querySelectorAll('.fa-plus')
const tabSelect = document.querySelectorAll('.category__content--navbar--list--item--select')

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
