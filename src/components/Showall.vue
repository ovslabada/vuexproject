<template>
    <div class="button-a__container">
        <div class="button-a">{{ buttontext }}</div>
    </div>
</template>

<script>
export default {
    name: 'Showall',
    computed: {
        buttontext() {
            if (this.toshowbutton) {
                return "Browse Less"
            }
            return "Browse All Product"
        },
        toshowbutton() {
            return this.$store.getters.getShow
        }
    }
}
</script>
