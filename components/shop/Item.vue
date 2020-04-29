<template>
  <div class="item">
    <p>{{ item.name }}</p>
    <span v-if="item.sale" class="salepill">Sale</span>
    <img
      :src="`images/${item.img}`"
      class="image"
      :alt="`Image of ${item.name}`"
    />
    <p>{{ item.price | usdollar }}</p>
    <el-button type="primary" class="buy" @click="buyItem">Buy Item</el-button>
  </div>
</template>

<script>
export default {
  filters: {
    usdollar(value) {
      return `$${value}`
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    buyItem() {
      this.$store.commit('buyItem', this.item)
    }
  }
}
</script>

<style scoped>
.item {
  border-radius: 5px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 300px;
  min-width: 200px;
  margin: 20px;
}

.image {
  max-height: 200px;
}

.salepill {
  background: rgb(232, 35, 25);
  color: white;
  font-family: 'Barlow', sans-serif;
  position: absolute;
  right: 30px;
  top: 60px;
  padding: 2px 10px 4px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  border-radius: 1000px;
}

p {
  font-size: 18px;
}
</style>
