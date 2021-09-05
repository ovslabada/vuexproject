<template>
    <section class="cart center">
    <div class="cart__products">
    <Items v-if="(search)"/>
    <Cartitems />
        <div class="cart__acts">
            <div v-on:click="clearcart" class="form__button-grey cart__button">Clear shopping cart</div>
            <a href="/" class="form__button-grey cart__button">Continue shopping</a>
        </div>
    </div>
    <div class="cart__order-conteiner">
        <h4 class="cart__adress">SHIPPING ADRESS</h4>
        <div class="cart__order-conteiner-mini">
            <div class="cart__order-info">
                <form class="form" id="order" action="">
                    <select class="form__inputs form__inputs_select" placeholder="Bangladesh">
                        <option>Bangladesh</option>
                        <option>Russia</option>
                    </select>
                    <input class="form__inputs" type="text" placeholder="State">
                    <input class="form__inputs" type="number" placeholder="Postcode / Zip">
                    <button class="form__inputs form__button-grey" type="submit" form="order">GET A QUOTE</button>
                </form>
            </div>
            <Total />
        </div>

    </div>
    </section>
</template>

<script>
import Cartitems from '../components/Cartitems.vue'
import Items from '../components/Items.vue'
import Total from '../components/Total.vue'

export default {
    name: 'Cartpage',
    components: {
        Cartitems,
        Items,
        Total
    },
    computed: {
        search() {
        return this.$store.getters.getSearch
        },
    },
    methods: {
        clearcart() {
             this.$store.dispatch('resetcart');
        }
    }
  }

</script>