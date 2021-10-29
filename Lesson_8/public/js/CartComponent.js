// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.img = `../images/featured/${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        }
    },
    template: `<span class="cartIconWrap">
                    <button class="btn-cart" type="button" @click="showCart = !showCart">
                        <img class="cartIcon" src="images/cart.png" alt="">
                    </button>
                    <div class="cart-block" v-show="showCart">
                        <cart-item v-for="item of cartItems" 
                        :key="item.id_product" 
                        :cart-item="item" 
                        @remove="remove">
                        </cart-item>
                    </div>
                </span>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `<div class="cart-item">
                    <div class="product-bio">
                        <img :src="cartItem.img" alt="Some img">
                        <div class="product-desc">
                            <div class="featuredName bold">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="featuredPrice">{{cartItem.quantity*cartItem.price}}$</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)"><i class="far fa-trash-alt"></i></button>
                    </div>
                </div>`
})