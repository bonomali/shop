<template>
  <div class="storefront">
    <div class="masthead" :style="`background:${bkcolor}`">
      <h1>{{ title }}</h1>
    </div>
    <pre v-show="loaded">{{ $store.state.payments }}</pre>
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
  computed: {
    loaded() {
      return this.$store.state.payments.status
    }
  },
  created() {
    this.fetchProducts()
    console.log('store', this.$store.state.payments)
    if (this.$store.state.payments.allowed_ids) {
      console.log('allowd', this.$store.state.payments.allowed_ids)
    } else {
      console.log('not allowd')
    }
  },
  mounted() {
    this.fetchProducts()
    console.log('mounted store', this.$store.state.payments)
  },
  methods: {
    async fetchProducts() {
      try {
        const resp = await this.$axios.$get(process.env.shopUrl + '/products')
        console.log('fetchProducts', resp)
        if (resp.products) {
          this.products = resp.products
        }
      } catch (error) {
        console.log('fetchProducts error', error)
      }
    }
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    payments(payment) {
      console.log('payments', payment)
      if (payment.status === 'paymentArrived') {
        this.state = 'transaction_incoming'
      } else if (payment.status === 'paymentSuccess') {
        console.log('emit payment', payment.payment.id)
        console.log('emit this.$store', this.$store.state.payments)
        this.$store.commit('payments/add', payment.payment.id)
        console.log('emit this.$store', this.$store.state.payments)
      }
    },
    disconnect() {
      console.log('socket disconnect')
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
  max-width: 800px;
  display: flex;
  flex-flow: wrap;
  flex-direction: row;
}
</style>
