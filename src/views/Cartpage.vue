<template>
    <section class="cart center">
    <div class="cart__products">
    <Cartitems />
        <div class="cart__acts">
            <input type="reset" class="form__button-grey cart__button" value="Clear shopping cart">
            <a href="catalog.html" class="form__button-grey cart__button">Continue shopping</a>
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
            <div class="cart__order-price">
                <p class="cart__sub-total">
                    SUB TOTAL<span class="cart__sub-total_price">&#36;900</span>
                </p>
                <p class="cart__grand-total">
                    GRAND TOTAL <span class="cart__grand-total_price">&#36;900</span>
                </p>
                <div class="cart__price-line"></div>
                <button class="button-pink">
                    PROCEED TO CHECKOUT
                </button>
            </div>
        </div>

    </div>
    </section>
</template>

<script>
import Cartitems from '../components/Cartitems.vue'

export default {
    name: 'Cartpage',
    components: {
        Cartitems
    },
}

</script>