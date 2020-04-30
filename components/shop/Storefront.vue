<template>
  <div class="storefront">
    <div class="masthead" :style="`background:${bkcolor}`">
      <h1>{{ title }}</h1>
    </div>
    <transition-group name="items" tag="section" class="products">
      <item
        v-for="(item, index) in products"
        :key="index"
        :item="item"
        :index="index"
      />
    </transition-group>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  components: {
    Item
  },
  props: {
    bkcolor: {
      type: String,
      default: '#3b60ed'
    },
    title: {
      type: String,
      default: 'Shop'
    },
    img: {
      type: String,
      default: 'banner-ppl'
    }
  },
  data() {
    return {
      products: []
    }
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const resp = await this.$axios.$get(process.env.shopUrl)
        console.log('fetchProducts', resp)
      } catch (error) {
        console.log('fetchProducts error', error)
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: white;
  position: relative;
  z-index: 100;
  font-size: 60px;
  padding: 8px 80px;
}

.bk {
  position: absolute;
  top: 0;
  left: 0;
}

.ppl-banner {
  position: absolute;
  z-index: 10;
  right: 100px;
}

.masthead {
  width: 100%;
  height: 100px;
  color: white;
  position: relative;
  overflow: hidden;
  margin: 10px 0;
}

.products {
  justify-content: center;
  color: black;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  flex-direction: row;
}
</style>
