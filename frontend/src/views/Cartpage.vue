<template>
    <section class="cart center">
    <div class="cart__products">
    <Items v-if="(search)"/>
    <Cartitems />
        <div class="cart__acts">
            <div v-on:click="clearcart" class="form__button-grey cart__button">Clear shopping cart</div>
            <router-link to="/" class="form__button-grey cart__button">Continue shopping</router-link>
        </div>
    </div>
    <Cartoder />



    </section>
</template>

<script>
import Cartitems from '../components/Cartitems.vue'
import Items from '../components/Items.vue'
import Cartoder from '../components/Cartoder.vue'

export default {
    name: 'Cartpage',
    components: {
        Cartitems,
        Items,
        Cartoder
    },
    computed: {
        search() {
        return this.$store.getters.getSearch
        }
    },
    methods: {
        clearcart() {
            this.$store.dispatch('resetcart');
        }
    }
  }

</script>