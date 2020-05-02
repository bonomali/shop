<template>
  <div class="card">
    <div class="image-wrapper">
      <div
        class="image"
        :style="{
          'background-image': 'url(' + url + item.feature_image + ')'
        }"
      ></div>
    </div>
    <div class="card-body">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description.substring(0, 120) }}...</p>
      <p>{{ item.price | usdollar }}</p>
      <client-only>
        <el-button type="primary" @click="buyItem">Pay with 0 IOTA</el-button>
      </client-only>
    </div>
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
  computed: {
    url(item) {
      return `${process.env.shopUrl}/`
    }
  },
  methods: {
    async buyItem() {
      const data = {}
      console.log('data', data)

      const resp = await this.$axios.$post(
        process.env.shopUrl + '/payment',
        data
      )
      console.log('buyItem', resp)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  height: auto;
  width: 100%;
  margin: 0 25px 50px;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 30px;
  .image-wrapper {
    height: 180px;
    width: 100%;
    overflow: hidden;
    margin-bottom: 20px;
    .image {
      height: inherit;
      width: inherit;
      background-size: cover;
      background-position: center center;
      transition: all 300ms ease-in-out;
    }
  }
  .card-body {
    padding: 0;
    text-align: left;
    opacity: 0.8;
    transition: all 200ms ease-in-out;
    position: relative;
    h3 {
      font-size: 22px;
      margin-bottom: 15px;
      line-height: 1.35;
    }
    p {
      margin-bottom: 10px;
    }
    span.more {
      position: absolute;
      bottom: -50px;
      left: 0;
      opacity: 0;
      font-style: italic;
      transition: all 200ms ease-in-out;
    }
  }
  &:hover {
    cursor: pointer;
    .image {
      transform: scale(1.1);
    }
    .card-body {
      opacity: 1;
    }
    span.more {
      opacity: 1;
      bottom: -40px;
    }
  }
}
@media only screen and (max-width: 920px) {
  .card {
    margin-bottom: 50px;
    width: calc(50% - 50px);
    .image-wrapper {
      height: 200px;
    }
  }
}
@media only screen and (max-width: 740px) {
  .card {
    margin-bottom: 50px;
    width: 100%;
    .image-wrapper {
      height: 250px;
    }
  }
}
</style>
