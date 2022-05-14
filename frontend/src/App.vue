<template>
  <Header />
  <router-view/>
  <Subscribe />
  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Subscribe from './components/Subscribe.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Subscribe,
    Footer
  },
  mounted() {
    this.$store.dispatch('loadCatalog');
    this.$store.dispatch('loadCart');
  }
}
</script>