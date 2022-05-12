<template>
  <div class="coupon">
    <van-dropdown-menu active-color="#1579F5">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
    <div class="coupon-center">
      <div class="coupon-box" v-for="(item,index) in couponData" :key="index" :class="item.checked == false?'coupon-box-static':''">
        <div class="box-name">
          <div>{{item.name}}</div>
          <div>
            <van-switch v-model="item.checked" size="18" active-color="#FFFFFF" inactive-color="#ACB6C8" />
          </div>
        </div>
        <div class="box-main" @click.stop="onDetails">
          <div class="box-main-center">
            <div class="text">{{item.text}}</div>
            <div class="number">
              <div>{{item.bh}}</div>
              <div>{{item.type}}</div>
            </div>
          </div>
          <div class="box-main-foot">
            <div>今日领券: <span>{{item.dayNum}}</span>张</div>
            <div>优惠金额: <span>{{item.money}}</span>元</div>
            <div>剩余领券数: <span>{{item.over}}</span>张</div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:76px"></div>
    <div class="coupon-bottom">
      <div>优惠劵申请审核</div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Switch } from 'vant';
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Switch.name]: Switch,
  },
  data () {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
        { text: '南苑车场', value: 0 },
        { text: '麓谷车场', value: 1 },
        { text: '开福车场', value: 2 },
      ],
      option2: [
        { text: '研发部', value: 0 },
        { text: '产品部', value: 1 },
        { text: '销售部', value: 2 },
      ],
      option3: [
        { text: '全部', value: 0 },
        { text: '类型二', value: 1 },
        { text: '类型三', value: 2 },
      ],
      couponData: [{ name: '约行云泊研发部门', checked: true, text: '约行Q码', bh: '2098007', type: '一次有效', dayNum: 10, money: '10', over: 53, static: '1' }, { name: '约行云泊研发部门', checked: true, text: '约行Q码', bh: '2098007', type: '一次有效', dayNum: 10, money: '10', over: 53, static: '1' }, { name: '约行云泊研发部门', checked: false, text: '约行Q码', bh: '2098007', type: '一次有效', dayNum: 10, money: '10', over: 53, static: '2' }]
    }
  },
  methods: {
    onDetails () {
      this.$router.push({ path: '/coupon-details' })
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style/index.less";
</style>
