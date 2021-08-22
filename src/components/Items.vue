<template>
    <section class="items">
        <div class="center">
            <h2 class="items__h2">
                Fetured Items
            </h2>
            <p class="items__p">
                Shop for items based on what we featured in this week
            </p>
            <div class="items__container">
                <Product v-bind:key="good.product_id" v-bind:good="good" v-for="good of catalog"/>
            </div>
                <Showall v-on:click="showAll"/>
        </div>
    </section>    
</template>

<script>
import Product from './Product.vue'
import Showall from './Showall.vue'

export default {
    name: 'Items',
    components: {
        Product,
        Showall
    },
    computed: {
        catalog() {
            if (this.toshow) {
                return this.$store.getters.getCatalog
            }
            return this.$store.getters.getCatalog.filter((good) => good.on_main)
        },
        toshow() {
            return this.$store.getters.getShow
        }
    },
    methods: {
        showAll() {
            /* catalogall = [...catalogall, ...catalogOther] */
            this.$store.commit('setShow')
        }
    }
}

</script>