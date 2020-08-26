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
                :product="item"></product>
            </div>`
});

Vue.component('product', {
    props: ['product'],
    template: `
                <div class="product_item">
                    <a :href="product.product_path" class="product_item_img">
                        <img :src="product.product_img" alt="picture" class="guitar_imgSmall">
                        <span class="product_item_link">{{ product.product_name }}</span>
                    </a>
                </div>`
})