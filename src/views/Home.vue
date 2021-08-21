<template>
  <div class="home">
    <Brand />
    <Category />
    <Items />
    <Advantages />
  </div>
</template>

<script>
import Brand from '../components/Brand.vue'
import Category from '../components/Category.vue'
import Items from '../components/Items.vue'
import Advantages from '../components/Advantages.vue'

export default {
  name: 'Home',
  components: {
    Brand,
    Category,
    Items,
    Advantages
  }
}
</script>