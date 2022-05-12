<template>
  <div class="home">
    <div class="home-bg"></div>
    <div class="head" @click="showPa =true">{{paName}}
      <van-icon name="arrow-down" color="#9AC2FF" />
    </div>
    <div class="head-bg-top"></div>
    <div class="home-main">
      <div class="video-bg">
        <van-icon name="play-circle-o" size="50" color="RGBA(235, 244, 255, 0.6)" @click="onVideo" />
        <div class="chukou" v-if="!videoFlag"></div>
        <video-player style="width:98%;height:92%;margin:0 auto;padding-top:8px;" v-else class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="playsinline" :options="playerOptions">
        </video-player>
      </div>
      <div class="plate">
        <div class="plate-buttom" @click="showPl =true">
          <div>{{ plateName }}</div>
          <div>
            <van-icon name="edit" color="#9AC2FF" />
          </div>
        </div>
        <div class="details" @click="showDe = true">
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
        <div v-for="item in list" :key="item.icon" @click="opRow(item)">
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

    <!-- 车牌号修改 -->
    <van-dialog v-model="showPl" show-cancel-button confirm-button-text="确认修改" confirm-button-color="#FFFFFF" cancel-button-color="#7D90AE" @confirm="onConfirmPl">
      <div class="lable">请输入车牌号</div>
      <div class="dialog-input">
        <van-field v-model="valuePl" />
      </div>
    </van-dialog>
    <!-- 选择车场 -->
    <van-dialog v-model="showPa" show-cancel-button confirm-button-text="确认" confirm-button-color="#FFFFFF" cancel-button-color="#7D90AE" @confirm="onConfirmPa">
      <div class="lable">请选择车场</div>
      <van-picker show-toolbar :columns="columnsPa" @change="onChangePa" />
    </van-dialog>
    <!-- 停车详情 -->
    <van-action-sheet v-model="showDe">
      <div class="lable">
        <div>湘A00001</div>
        <div>待缴费：10元</div>
      </div>
      <div class="content">
        <div class="content-box" v-for="item in contentDeList" :key="item.name">
          <div>{{item.name}}：</div>
          <div>{{item.val}}</div>
        </div>
      </div>
      <div class="content-bottom" @click="showDe = false">
        关闭
      </div>
    </van-action-sheet>
    <!-- 发送信息 -->
    <van-action-sheet v-model="showNews">
      <div class="lable-tow">
        <div>发送信息</div>
        <div>确认发送后信息会在对应闸机上显示</div>
      </div>
      <div class="news-center">
        <van-radio-group v-model="newsRadio">
          <van-radio name="1">需要小区工作人维修西北门岗亭</van-radio>
          <van-radio name="2">南门岗亭正在改造</van-radio>
          <van-radio name="3">需要小区工作人维修西北门岗亭</van-radio>
          <van-radio name="4">南门岗亭正在改造</van-radio>
        </van-radio-group>
      </div>
      <div class="news-text">内容信息</div>
      <div class="news-textarea">
        <van-field v-model="newsVlaue" rows="4" autosize type="textarea" placeholder="请填写信息内容..." />
      </div>
      <div class="news-bot">
        <div class="cancel" @click="showNews =false">取消</div>
        <div class="save" @click="showNews =false">确定</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Icon, Dialog, ActionSheet, Picker, Field, RadioGroup, Radio } from 'vant';
export default {
  components: {
    [Icon.name]: Icon,
    [ActionSheet.name]: ActionSheet,
    [Picker.name]: Picker,
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
  },

  data () {
    return {
      list: [{ name: "关闸", icon: "icon1" }, { name: "发送信息", icon: "icon2" }, { name: "现场缴费", icon: "icon3" }, { name: "锁定", icon: "icon4" }, { name: "解锁", icon: "icon5" }, { name: "车辆查询", icon: "icon6" }],
      paName: '嘉兴苑-南门岗亭',
      changePaName: null,
      flag: false,

      showPl: false,
      plateName: '湘A00001',
      valuePl: '湘A00001',

      showPa: false,

      showNews: false,
      newsRadio: '1',
      newsVlaue: '',

      columnsPa: [{
        text: '嘉兴苑',
        children: [
          {
            text: '南门岗亭',
          },
          {
            text: '北门',
          },
          {
            text: '东门',
          },
        ],
      },
      {
        text: '嘉和苑',
        children: [
          {
            text: '西北门',
          },
          {
            text: '南门',
          },
        ],
      }],
      showDe: false,
      contentDeList: [{ name: '车辆类型', val: '临时车' }, { name: '入场时间', val: '2022-02-01 15:00:20' }, { name: '出场时间', val: '2022-02-01 15:00:20' }, { name: '停车时间', val: '3小时0分钟' }, { name: '计费时间', val: '3小时0分钟' }, { name: '优惠', val: '3小时0分钟' }],
      // 视频
      videoFlag: false,
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: 'auto',
        language: 'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '16:8',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [{
          //类型
          type: "video/mp4",
          //url地址
          src: ''
        }],
        //你的封面地址
        poster: '',
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true
        }
      }
    };
  },
  computed: {
    playsinline () {
      var ua = navigator.userAgent.toLocaleLowerCase();
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        return false
      } else {
        return true
      }
    }
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
    },
    onChangePa (picker, values) {
      // console.log(picker, values);
      this.changePaName = values[0] + '-' + values[1];
    },
    //车牌选择
    onConfirmPl () {
      this.plateName = this.valuePl;
    },
    //车场选择
    onConfirmPa () {
      if (this.changePaName) {
        this.paName = this.changePaName;
      }
    },
    onVideo () {
      this.videoFlag = !this.videoFlag;
      this.playerOptions['sources'][0]['src'] = 'http://vjs.zencdn.net/v/oceans.mp4';
      if (this.videoFlag == false) {
        return false
      }
      this.$nextTick(() => {
        this.$refs.videoPlayer.player.play();
      })
    },
    //操作点击
    opRow (data) {
      switch (data.name) {
        case '发送信息':
          this.showNews = true;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less"  scoped>
@import "./index.less";
</style>
