<template>
        <section class="subscribe">
        <div class="subscribe__blocks">
            <img class="advantages__images" src="img/face.png" alt="">
            <p class="subscribe__quote">“Vestibulum quis porttitor dui! Quisque viverra nunc mi, <span  class="subscribe__quote_i">a pulvinar purus condimentum“</span></p>
        </div>
        <div class="subscribe__blocks">
            <h2 class="subscribe__h2">Subscribe</h2>
            <p class="subscribe__p">For our newletter and promotion</p>
            <form class="subscribe__form" name="subscribe_form_name" action="input.php">
                <input class="subscribe__input" type="email" placeholder="Enter Your Email">
                <input v-on:click.prevent="onSubmit" class="subscribe__submit" type="submit" value="Subscribe">
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Subscribe',
    methods: {
        onSubmit (){
            console.log("win");
        }
    }
}
</script>