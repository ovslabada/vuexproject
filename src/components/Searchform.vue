<template>
    <div class="top-menu__form-cont">
        <form class="subscribe__form top-menu__form" name="searchformname">
            <input v-model="search" class="subscribe__input" type="text" placeholder="Enter Good's Title">
            <div v-on:click="searchIs" class="subscribe__submit subscribe__submit_div">Search</div>
        </form>
    </div>
</template>

<script>

export default {
    name: 'Searchform',
    computed: {
        search: {
            set (value) {
                return this.$store.commit('setSearch', value)
            }
        }
    },
    methods: {
        searchIs () {
            this.$store.commit('setSearchIs')
        }
    } 
}

</script>
