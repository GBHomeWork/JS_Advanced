'use strict';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();
        this.countProductListPrice();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, img: 'img/notebook.jpg' },
            { id: 2, title: 'Mouse', price: 20, img: 'img/mouse.jpg' },
            { id: 3, title: 'Keyboard', price: 200, img: 'img/keyboard.jpg' },
            { id: 4, title: 'Gamepad', price: 50, img: 'img/gamepad.jpg' },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }

    countProductListPrice() {
        let productListPrice = 0;
        for (let product of this.goods) {
            productListPrice += product.price;
        }
        console.log(`Суммарная стоимость всех товаров из каталога: ${productListPrice}`);
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.img;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductList();

class Cart {
    showcart() { } //показать корзину при нажатии на иконку
    hideCart() { } //скрыть корзину при нажатии на иконку
    renderCart() { } //отобразить все содержимое корзины
    countCartPrice() { } //посчитать общую стоимость товаров в корзине
    showCartPrice() { } //отобразить общую стоимость товаров в корзине
    clearCart() { } //очистить все содержимое корзины
}

class CartItem {
    renderCartItem() { } //создать верстку для одного товара в корзине
    increaseCartItemAmount() { } //увеличить количество товара в корзине
    decreaseCartItemAmount() { } //уменьшить количество товара в корзине
    DeleteCartITem() { } //удалить товар из корзины
}