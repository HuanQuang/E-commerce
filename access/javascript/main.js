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
// render list  sample product
function render(arr){
    return ( arr.slice(0, 5).map(item => {
            return (   `<div class="trending__list--item">
                            <div class="trending__list--item--img">
                                <img src="${item.imgMain}" alt="img">
                            </div>
                            <div class="trending__list--item--content">
                                <div class="trending__list--item--content--nav">
                                    <i class="fa-solid fa-check"></i>
                                    <i class="fa-regular fa-heart"></i>
                                </div>
                                <h2 class="trending__list--item--content--name">
                                    ${item.name}
                                </h2>
                                <div class="trending__list--item--content--cart">
                                    <p class="trending__list--item--content--cart--price">${item.price}đ</p>
                                    <i class="fa-solid fa-bag-shopping"></i>
                                </div>
                            </div>
                        </div>`)
}))}

async function getList(url, element){
    const data = await fetch(url)
    .then((response) => response.json())
    .then(data => data);
    
    const html = render(data)
    element.innerHTML = html.join('')
}


// Select tab
const tabs = document.querySelectorAll('.trending__tab--item')
const content = document.querySelectorAll('.trending__list')
// Call APi render list
getList(urlWomen, content[0])
getList(urlMan, content[1])
getList(urlKid, content[2])


tabs.forEach((tab, index) => {
    tab.onclick = function(e){
        document.querySelector('.trending__tab--item.active').classList.remove('active')
        e.target.closest('.trending__tab--item').classList.add('active')
        document.querySelector('.trending__list.active').classList.remove('active')
        content[index].classList.add('active')
    }
})

