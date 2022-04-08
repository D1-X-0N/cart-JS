"use strict";

let featuredItems = document.querySelector(".featuredItems");
let cartBtn = featuredItems.querySelectorAll("button");
let featuredData = document.querySelectorAll(".featuredData");
let cartIcon = document.querySelector(".cartIconWrap");
let cartResultPrice = document.querySelector(".cart-result-price");
let items = new Array();
cartBtn.forEach((targetBtn) => {
    targetBtn.addEventListener("click", BtnClickHeandler);
});

cartIcon.addEventListener("click", CartClickHeandler);

class Item {
    constructor(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }
};

function GetDataAtr() {
    for(let i = 0; i < cartBtn.length; i++) {
        cartBtn[i].setAttribute("data-id", `${i}`);
        cartBtn[i].setAttribute(`count-${i}`, "0");
        featuredData[i].setAttribute("data-item-id", `${i}`);
    }
}

function CreateItem() {
    for(let i = 0; i < cartBtn.length; i++) {
        items[i] = new Item("", "", 0);
    }
}

function BtnClickHeandler(event) {
    GetInfoCart(event);
    CounterCart();
    AddCardInfo(event);
    ResultPriceAllItems();
}

function CounterCart() {
    let count = 0;
    for(let i = 0; i < items.length; i++) {
        count += items[i].count;
    }
    cartIcon.children[1].innerText = count;
}

function GetInfoCart(event) {
    for(let i = 0; i < featuredData.length; i++) {
        if(featuredData[i].getAttribute("data-item-id") == event.target.getAttribute("data-id")) {
            items[i].name = featuredData[i].firstElementChild.innerText;
            items[i].price = featuredData[i].lastElementChild.innerText;
            items[i].count += 1;
        }
    }    
}

function AddCardInfo(event) {
    if(items[event.target.getAttribute("data-id")].count == 1) {
        cartResultPrice.insertAdjacentHTML("beforebegin", `<div class="cart-info-item">`+
        `<div class="cart-info-category">${items[event.target.getAttribute("data-id")].name}-${event.target.getAttribute("data-id")}</div>`+
        `<div class="cart-info-category cart-count${event.target.getAttribute("data-id")}">${items[event.target.getAttribute("data-id")].count}</div>`+
        `<div class="cart-info-category">${items[event.target.getAttribute("data-id")].price}</div>`+
        `<div class="cart-info-category res cart-result-item${event.target.getAttribute("data-id")}">${ResultItemPrice(event)}</div>`+
    `</div>` );
    }
    else if(items[event.target.getAttribute("data-id")].count > 1) {
        let cartCount = document.querySelector(`.cart-count${event.target.getAttribute("data-id")}`);
        let cartResItem = document.querySelector(`.cart-result-item${event.target.getAttribute("data-id")}`);
        cartCount.innerText = items[event.target.getAttribute("data-id")].count;
        cartResItem.innerText = ResultItemPrice(event);
    }
}

function ResultPriceAllItems() {
    let resultSum = 0;
    let resItem = document.querySelectorAll(".res");
    resItem.forEach((itemPrice) => {
        resultSum += parseInt((itemPrice.innerText).match(/\d+/));
    });
    return cartResultPrice.innerText=`Товаров в корзине на сумму: $` + `${resultSum}`
}

function ResultItemPrice(event) {
  let priceNum = parseInt((items[event.target.getAttribute("data-id")].price).match(/\d+/));
  return `$` + `${priceNum * items[event.target.getAttribute("data-id")].count}`
}

function CartClickHeandler(event) {
    if(cartIcon.children[2].style.display == "none") {
        cartIcon.children[2].style.display = "flex";
    }
    else {
        cartIcon.children[2].style.display = "none";
    }
}

function init() {
    GetDataAtr();
    CreateItem();
}

init();