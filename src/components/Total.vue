<template>
    <div class="cart__order-price">
        <p class="cart__sub-total">
            SUB TOTAL<span class="cart__sub-total_price">&#36;{{ totalsum }}</span>
        </p>
        <p class="cart__grand-total">
            GRAND TOTAL <span class="cart__grand-total_price">&#36;{{ totalsum }}</span>
        </p>
        <div class="cart__price-line"></div>
        <button class="button-pink">
            PROCEED TO CHECKOUT
        </button>
    </div>
</template>

<script>


export default {
    name: 'Total',
    computed: {
        totalsum() {
            return this.$store.getters.gettotalsum
        }
    }
    }
</script>