<template>
  <div class="cartctrl">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <div class="icon-remove_circle_outline"></div>
      </div>
    </transition>
    <transition name="move">
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import eventHub from '@/common/js/eventHub'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) return
        if (!this.food.count) Vue.set(this.food, 'count', 1)
        else this.food.count++
        eventHub.$emit('cart-add', event.target)
      },
      decreaseCart (event) {
        if (!event._constructed) return
        if (this.food.count) this.food.count--
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartctrl
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0,160,220)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
        .icon-remove_circle_outline
          transition: all 0.4s linear         
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3D(24px,0,0) 
        .icon-remove_circle_outline
          transform: rotate(90deg) 
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear       
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3D(12px,0,0) 
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0,160,220)
</style>
