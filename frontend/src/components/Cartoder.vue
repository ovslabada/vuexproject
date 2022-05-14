<template>
    <div class="cart__order-conteiner">
        <h4 class="cart__adress">SHIPPING ADRESS</h4>
        <div class="cart__order-conteiner-mini">
            <div class="cart__order-info">
                <form class="form" id="order" action="">
                    <select v-model="country" class="form__inputs form__inputs_select" placeholder="Bangladesh">
                        <option>Bangladesh</option>
                        <option>Russia</option>
                    </select>
                    <input v-model="stateadress" class="form__inputs" type="text" placeholder="Home adress">
                    <input v-model="postcode" class="form__inputs" type="number" placeholder="Postcode / Zip">
                    <input v-if="(!isadresswrited)" type="submit" v-on:click.prevent="addadress" v-on:click="setadresswrited" class="form__inputs form__button-grey" value="CONFIRM ADRESS">
                </form>
            </div>
            <p class="cart__adress" v-if="isadresswrited"><b>YOUR ADRESS IS:</b></p>
            <p class="cart__adress" v-if="isadresswrited">Postcode: {{ adress.postcode }}, Country: {{ adress.country }}, Home adress: {{ adress.stateadress }}.</p>
            <div v-if="isadresswrited" class="cart__order-info">
                <div class="form">
                    <div v-on:click="deleteadress" class="form__inputs form__button-grey" form="order">Reset adress</div>
                </div>
            </div>
            <Total />
        </div>
    </div>
</template>

<script>
import Total from './Total.vue'

export default {
    name: "Cartoder",
    components: {
        Total
    },
    computed: {
        cart() {
            return this.$store.getters.getCart
        },
        adress () {
            return this.$store.getters.getAdress
        },
        isadresswrited () {
            return this.$store.getters.getadresswited
        }
    },
    methods: {
        addadress() {
            this.$store.commit('addadress', {country: this.country, stateadress: this.stateadress, postcode: this.postcode, cart: this.cart})
        },
        deleteadress() {
            this.$store.commit('setadresswrited');
            this.$store.commit('resetadress');
            this.country = "";
            this.stateadress= "";
            this.postcode = ""
        },
        setadresswrited() {
            this.$store.commit('setadresswrited')
        }
    }
}
</script>
