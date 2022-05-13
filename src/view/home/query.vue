<template>
  <div class="query">
    <div class="home-bg"></div>
    <div class="plate-box">
      <div class="plate">湘A1009TQ</div>
      <div class="plate-text">免费车</div>
    </div>
    <div class="query-main">
      <div class="lable">记录详情</div>
      <div class="name">
        <div class="query-bg"></div>
        <div>
          <div class="name-top">通道名称</div>
          <div class="name-buttoom">嘉兴苑-南门-入口</div>
        </div>
      </div>
      <div class="center">
        <div class="center-box" v-for="item in centerList" :key="item.name">
          <div class="center-box-name">{{item.name}}：</div>
          <div :style="item.name == '应收费用' ?'color:red;':''">{{item.val}}</div>
        </div>
      </div>
      <div class="query-bottom">
        <div class="record">进出记录</div>
        <div class="rent">月租查询</div>
      </div>
      <div class="query-bottom-tow">
        <div class="charge">现金收费</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Popup, Picker, Form, Field } from 'vant';
export default {
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Form.name]: Form,
    [Field.name]: Field,
    [Picker.name]: Picker,
  },
  data () {
    return {
      form: {
        parking: '',
        personnel: '',
        reason: '',
        plate: '',
      },
      columns: ['南苑车行', '滴滴车行', '书社车行', '阿萨车行'],
      centerList: [{ name: '入场时间', val: '2022-02-01 15:00:20', }, { name: '出场时间', val: '2022-02-01 15:00:20' }, { name: '停车时间', val: '3小时0分钟' }, { name: '计费时间', val: '3小时0分钟' }, { name: '优惠', val: '3小时0分钟' }, { name: '应收费用', val: '15.00元' }, { name: '缴费状态', val: '已缴费' }, { name: '已给发票', val: '否' }],
      showPicker: false,
    };
  },
  created () {

  },
  methods: {
    onConfirm (value) {
      this.form.parking = value;
      this.showPicker = false;
    },
    onCancel () {
      this.$router.go(-1);
    },
    onSubmit () {
      let i = 0;
      for (let key in this.form) {
        if (this.form[key] == '') {
          i++
        }
      }
      if (i > 0) {
        return console.log('必填项未填写！');
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style/query.less";
</style>
