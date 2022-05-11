<template>
  <div class="coupon-details">
    <div style="padding-top: 24px;"></div>
    <div class="details-center">
      <div>嘉兴苑南门车场</div>
      <div>约行云泊研发部门</div>
      <div class="code"></div>
      <div class="details-switch">
        <div>启用动态密码</div>
        <div>
          <van-switch v-model="checked" size="20" active-color="#3B86FF" inactive-color="#FFFFFF" />
        </div>
      </div>
      <div class="details-list">
        <div class="list-box" v-for="(item,index) in list" :key="index">
          <div class="box-left" :class="item.type == 2?'left-act':''">{{item.name.slice(0,1)}}</div>
          <div class="box-right">
            <div class="text">
              <div>{{item.name}}</div>
              <div>{{item.bh}}</div>
            </div>
            <div class="icon">
              <div class="edit"></div>
              <div class="refresh"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-tow" v-for="(item,index) in listTow" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.sum ==''? '--': item.sum + item.unit}}</div>
      </div>
      <div style="height:70px"></div>
      <div class="bottom">
        <div @click="show =true">
          卡券发放
        </div>
      </div>
    </div>

    <van-dialog v-model="show" show-cancel-button confirm-button-text="立即发送" confirm-button-color="#FFFFFF" cancel-button-color="#7D90AE" @confirm="onConfirm" @cancel="onCancel">
      <div class="lable">卡券发送</div>
      <div class="dialog-text">发送给:</div>
      <div class="dialog-input">
        <van-field v-model="value" placeholder="车牌号" />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Switch, Dialog, Field } from 'vant';
export default {
  components: {
    [Switch.name]: Switch,
    [Field.name]: Field,
    [Dialog.Component.name]: Dialog.Component,
  },
  data () {
    return {
      show: false,
      checked: true,
      value: '',
      list: [{ name: '主码', bh: '200502001', type: '1' }, { name: '辅码', bh: '200502001', type: '2' }],
      listTow: [{ name: '卷总数', sum: '', unit: '' }, { name: '已领取', sum: '0', unit: '张' }, { name: '可领取', sum: '', unit: '' }]
    }
  },
  methods: {
    onConfirm () { //确认
    },
    onCancel () { //取消
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style/details.less";
</style>
