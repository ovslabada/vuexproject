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
                <Showall v-if="(!tosearch)" v-on:click="showAll"/>
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
        search() {
            return this.$store.getters.getSearch ? new RegExp(this.$store.getters.getSearch, 'gi') : false
        },
        catalog() {
            if (this.tosearch) {
               return this.$store.getters.getCatalog.filter((good) => this.search.test(good.product_title))
            } else if (this.toshow) {
                return this.$store.getters.getCatalog
            } else {
                return this.$store.getters.getCatalog.filter((good) => good.on_main)
            }
            
        },
        toshow() {
            return this.$store.getters.getShow
        },
        tosearch() {
            return this.$store.getters.getSearchis
        }
    },
    methods: {
        showAll() {
            this.$store.commit('setShow')
        }
    }
}

</script>