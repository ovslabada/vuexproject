<template>
    <section class="items">
        <div class="center">
            <h2 class="items__h2">
                Fetured Items
            </h2>
            <p class="items__p">
                Shop for items based on what we featured in this week
            </p>

            <Product v-bind:key="good.product_id" v-bind:good="good" v-for="good of catalog"/>

                    <div class="button-a__container">
            <div class="button-a">Browse All Product</div>
                    </div>
        </div>
    </section>    
</template>

<script>
import Product from './Product.vue'

export default {
    name: 'Items',
    components: {
        Product
    },
    computed: {
        catalog() {
            return this.$store.getters.getCatalog
        }
    }
}

</script>