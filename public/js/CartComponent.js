Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            showCart: false,
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },

    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.product_id === item.product_id);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.product_id}`, {
                        quantity: 1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({
                    quantity: 1
                }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.product_id}`, {
                        quantity: -1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${item.product_id}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    })
            }
        }
    },
    template: `
            <div>
                <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                <div class="cart-block" v-show="showCart">
                    <cart-item v-for="item of cartItems" :key="item.product_id" :cart-item="item" @remove="remove"></cart-item>
                    <p class="cart-block-empty" v-if="!cartItems.length">Товары не добавлены</p>
                </div>
            </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart-item">
                    <img class="product-img" :src="cartItem.product_img" alt="picture" width="170" height="65">
                    <div class="right-block">
                        <div class="product-price">{{ cartItem.quantity*cartItem.product_price }} RUB</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                    <div class="product-desc">
                        <div class="product-title">{{ cartItem.product_name }}</div>
                        <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                        <div class="product-single-price">RUB {{ cartItem.product_price }} each</div>
                    </div>
                </div>
    `
})