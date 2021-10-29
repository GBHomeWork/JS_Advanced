Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: []
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.img = `../images/featured/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="featuredItems">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product'],
    template: `<div class="featuredItem">
                <div class="featuredImgWrap">
                    <img :src="product.img" alt="Some img">
                    <div class="featuredImgDark">
                        <button class="buy-btn" @click="$emit('add-product', product)">
                            <img src="../images/cart.svg" alt="">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div class="featuredData">
                    <div class="featuredName bold">
                        {{product.product_name}}
                    </div>
                    <div class="featuredPrice">
                        {{product.price}}$
                    </div>
                </div>
            </div>`
})