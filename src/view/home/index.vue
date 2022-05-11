<template>
  <div class="home">
    <div class="home-bg"></div>
    <div class="head">嘉兴苑-南门岗亭
      <van-icon name="arrow-down" color="#9AC2FF" />
    </div>
    <div class="head-bg-top"></div>
    <div class="home-main">
      <div class="video-bg">
        <div class="chukou"></div>
      </div>
      <div class="plate">
        <div class="plate-buttom">
          <div>湘A00001</div>
          <div>
            <van-icon name="edit" color="#9AC2FF" />
          </div>
        </div>
        <div class="details">
          查看详情>
        </div>
      </div>
      <div class="time">
        <span>临时停车</span>
        <span>入场时间：2020/3/30 15:25:45</span>
      </div>
    </div>
    <div class="center">
      <div class="center-left">
        <div>有责开闸</div>
        <div>需要核车辆信息</div>
      </div>
      <div class="center-right">
        <div>无责开闸</div>
        <div>无需核对可开闸</div>
      </div>
    </div>
    <div class="foot" :style="flag ? 'background-color:#FFFFFF;':''">
      <div class="foot-main" v-if="flag">
        <div v-for="item in list" :key="item.icon">
          <img :src="require('../../assets/images/home/'+item.icon+'.png')" alt="">
          <div>{{item.name}}</div>
        </div>
      </div>
      <div class="foot-bot" @click="putRow" v-if="flag">
        收起操作
      </div>
      <div class="foot-bot-action" @click="putRow" v-else>
        更多操作
      </div>
    </div>
    <div class="bottom">
      “约行云泊”技术支持
    </div>
    <div style="position: absolute;top: 80px;right: 20px;font-size: 12px;">
      <div @click="releaseRow">放行申请-审核列表(测试入口)</div>
      <div @click="releaseTowRow">放行申请-申请列表(测试入口)</div>
      <div @click="couponRow">优惠卷列表(测试入口)</div>
    </div>
  </div>
</template>

<script>
import {
  Icon
} from 'vant';

export default {
  components: {
    [Icon.name]: Icon,
  },

  data () {
    return {
      list: [{ name: "关闸", icon: "icon1" }, { name: "发送信息", icon: "icon2" }, { name: "现场缴费", icon: "icon3" }, { name: "锁定", icon: "icon4" }, { name: "解锁", icon: "icon5" }, { name: "车辆查询", icon: "icon6" }],
      flag: false
    };
  },

  methods: {
    putRow () {
      this.flag = !this.flag;
    },
    //放行申请
    releaseRow () {
      this.$router.push({ path: '/release' })
    },
    releaseTowRow () {
      this.$router.push({ path: '/release-tow' })
    },
    couponRow () {
      this.$router.push({ path: '/coupon' })
    }
  }
};
</script>

<style lang="less"  scoped>
@import "./index.less";
</style>
