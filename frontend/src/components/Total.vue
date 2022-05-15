<template>
    <div class="cart__order-price">
        <p v-if="isadresssent" class="cart__heading" >We have get your order</p>
        <p v-if="(!isadresssent)" class="cart__sub-total">
            SUB TOTAL<span class="cart__sub-total_price">&#36;{{ totalsum }}</span>
        </p>
        <p v-if="(!isadresssent)" class="cart__grand-total">
            GRAND TOTAL <span class="cart__grand-total_price">&#36;{{ totalsum }}</span>
        </p>
        <div class="cart__price-line"></div>
        <button v-if="(!isadresssent)" class="button-pink" v-on:click.prevent="setadress">
            PROCEED TO CHECKOUT
        </button>
        <router-link to="/" v-if="isadresssent" v-on:click="setadressnotsent" class="button-pink">
            LOOK FOR NEW GOODS
        </router-link>
    </div>
</template>

<script>


export default {
    name: 'Total',
    computed: {
        totalsum() {
            return this.$store.getters.gettotalsum
        },
        adress () {
            return this.$store.getters.getAdress
        },
        isadress () {
            for (let key in this.adress) {
                return true
            } return false
        },
        cart() {
            return this.$store.getters.getCart
        },
        isadresssent() {
            return this.$store.getters.getadresssent
        },
        isadresswrited () {
            return this.$store.getters.getadresswited
        }
    },
    methods: {
        setadress() {
            if (this.isadresswrited) {
                this.$store.commit('setadresswrited')
            }
            if (this.isadress) {
                this.$store.dispatch('loadAdress', {adress: this.adress, cart: this.cart});
            }
        },
        setadressnotsent () {
            if (this.isadresssent) {
                this.$store.commit('setadresssent')
            }
        }
    }
    }
</script>