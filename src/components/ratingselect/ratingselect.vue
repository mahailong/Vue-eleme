<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block blue" :class="{'active': selectType === 2}" 
        @click="handleSelectType(2, $event)">{{desc.all}}
        <span class="count">{{positiveCount+negativeCount}}</span></span>
      <span class="block blue" :class="{'active': selectType === 0}" 
        @click="handleSelectType(0, $event)">{{desc.positive}}
        <span class="count">{{positiveCount}}</span></span>
      <span class="block gray" :class="{'active': selectType === 1}" 
        @click="handleSelectType(1, $event)">{{desc.negative}}
        <span class="count">{{negativeCount}}</span></span>
    </div>
    <div class="switch" @click="toggleOnlyContent">
      <span class="icon-check_circle" :class="{active:onlyContent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  import eventHub from '@/common/js/eventHub'

  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positiveCount () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        }).length
      },
      negativeCount () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        }).length
      }
    },
    methods: {
      handleSelectType (type, event) {
        if (event._constructed) {
          eventHub.$emit('selectType', type)
        }
      },
      toggleOnlyContent () {
        if (event._constructed) {
          eventHub.$emit('onlyContent')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .ratingselect
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7,17,27,0.1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        color rgb(77,85,93)
        font-size 12px
        &.active
            color #fff
        .count
          margin-left 2px
          line-height 16px
          font-size 8px
        &.blue
          background rgba(0,160,220,0.2)
          &.active
            background rgb(0,160,220)
        &.gray
          background rgba(77,85,93,0.2)
          &.active
            background rgb(77,85,93)
  .switch
    padding 12px 18px
    line-height 24px
    border-bottom 1px solid rgba(7,17,27,0.1)
    color rgb(147,153,159)
    font-size 0
    .icon-check_circle
      display: inline-block
      margin-right 4px
      font-size 24px
      &.active
        color: rgb(0,160,220)
    .text
      font-size 12px
      vertical-align top
</style>
