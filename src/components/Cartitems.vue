<template>
        <div class="cart__products">
            <Productincart v-bind:key="goodc.product_id" v-bind:goodc="goodc" v-for="goodc of cart"/>
        </div>
</template>

<script>
import Productincart from './Productincart.vue'

export default {
    name: 'Cartitems',
    components: {
        Productincart
    },
    computed: {
        cart() {
            return this.$store.getters.getCart
        }
    }
}
</script>
