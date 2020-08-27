Vue.component('products', {
    data() {
        return {
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        // filter(userSearch) {
        //     let regexp = new RegExp(userSearch, 'i');
        //     this.filtered = this.products.filter(el => regexp.test(el.product_name));
        // }
    },
    template: `<div class="products_catalog">
                <product v-for="item of filtered" 
                :key="item.product_id" 
                :product="item" 
                @add-product="$parent.$refs.cart.addProduct"></product>
            </div>`
});

Vue.component('product', {
    props: ['product'],
    template: `
                <div class="product_item">
                    <a :href="product.product_path" class="product_item_links">
                        <img :src="product.product_img" alt="picture" class="guitar_imgSmall">
                        <span class="product_item_name">{{ product.product_name }}</span>
                    </a>
                    <span class="product_item_price">30000 RUB</span>
                    <button class="product_item_btn" @click="$emit('add-product', product)">Купить товар</button>
                </div>`
});