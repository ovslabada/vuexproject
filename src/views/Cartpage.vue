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
        <p v-if="(sayadress)" class="cart__adress">WE GET YOUR ADRESS AND SAY THE PRICE LATER</p>
        <div class="cart__order-conteiner-mini">
            <div v-if="((!sayadress))" class="cart__order-info">
                <form class="form" id="order" action="">
                    <select v-model="country" class="form__inputs form__inputs_select" placeholder="Bangladesh">
                        <option>Bangladesh</option>
                        <option>Russia</option>
                    </select>
                    <input v-model="stateadress" class="form__inputs" type="text" placeholder="State">
                    <input v-model="postcode" class="form__inputs" type="number" placeholder="Postcode / Zip">
                    <div v-on:click="setadress" class="form__inputs form__button-grey" form="order">GET A QUOTE</div>
                </form>
            </div>
            <div v-if="(sayadress)" class="cart__order-info">
                <div class="form">
                    <div v-on:click="resetadress" class="form__inputs form__button-grey" form="order">ANOTHER ADRESS</div>
                </div>
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
        adress () {
            return this.$store.getters.getAdress
        },
        sayadress () {
            return this.$store.getters.getSayAdress
        }
    },
    methods: {
        clearcart() {
            this.$store.dispatch('resetcart');
        },
        setadress() {
            this.$store.dispatch('loadAdress', {country: this.country, stateadress: this.stateadress, postcode: this.postcode});
        },
        resetadress() {
            this.$store.commit(setAdressTrue);
        }
    }
  }

</script>