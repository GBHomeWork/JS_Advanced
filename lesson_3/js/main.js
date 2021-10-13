'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this._getProducts()
            .then(data => {
                this.goods = data;
                this.render();
            });
    }

    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
            const buyBtn = document.querySelector(`div[data-id='${productObj.id}'] .buy-btn`);
            buyBtn.addEventListener('click', () => {
                productObj.buy();
                basket.calcAmount();
                basket.calcSum();
            });
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.buyBtn = document.querySelector(`button[data-id='${this.id}']`);
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>`;
    }

    buy() {
        for (let product of basket.goods) {
            if (product.id_product == this.id) {
                product.quantity += 1;
                const quantity = document.querySelector(`div[data-id='${this.id}'] .quantity`);
                quantity.textContent = product.quantity;
            }
        }
    }
}

let list = new ProductsList();

class Basket {
    constructor(container = '.basket', total = '.total') {
        this.container = container;
        this.total = total;
        this._getProducts()
            .then(data => {
                this.goods = data.contents;
                this.sum = data.amount;
                this.amount = data.countGoods;
                this.render();
            });
        this.show();
    }

    _getProducts() {

        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const total = document.querySelector(this.total);
        const totalMsg = `В вашей корзине <span class='amount'>${this.amount}</span> 
                          товара(ов) на общую сумму <span class='sum'>${this.sum}</span> $.`;
        total.insertAdjacentHTML('afterbegin', totalMsg);
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new BasketItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
            const deleteBtn = document.querySelector(`div[data-id='${productObj.id}'] .delete-btn`);
            deleteBtn.addEventListener('click', () => {
                productObj.delete();
                basket.calcAmount();
                basket.calcSum();
            });
        }
    }

    show() {
        const basket = document.querySelector('.basket');
        const icon = document.querySelector('.btn-cart');
        icon.addEventListener('click', event => {
            if (event.target.classList.contains('btn-cart')) {
                basket.classList.toggle('hide');
            }
        });
    }

    calcAmount() {
        let calc = 0;
        for (let product of this.goods) {
            calc += product.quantity;
        }
        this.amount = calc;
        let amountEl = document.querySelector('.amount');
        amountEl.textContent = calc;
    }

    calcSum() {
        let calc = 0;
        for (let product of this.goods) {
            calc += product.quantity * product.price;
        }
        this.sum = calc;
        let sumEl = document.querySelector('.sum');
        sumEl.textContent = calc;
    }
}

class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="basket-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <span class='quantity'>${this.quantity}</span>
                        <button class="delete-btn">Удалить</button>
                    </div>
                </div>`;
    }

    delete() {
        for (let product of basket.goods) {
            if (product.id_product == this.id && product.quantity > 1) {
                product.quantity -= 1;
                const quantity = document.querySelector(`div[data-id='${this.id}'] .quantity`);
                quantity.textContent = product.quantity;
            }
        }
    }
}

let basket = new Basket();
