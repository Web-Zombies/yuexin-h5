<template>
  <div class="apply">
    <div class="home-bg"></div>
    <div style="padding-top: 28px;"></div>
    <div class="apply-main">
      <div class="apply-form">
        <van-form>
          <van-field v-model="form.parking" readonly clickable label="放行车场" placeholder="请选择" @click="showPicker = true" :rules="[{ required: true, message: '' }]" />
          <van-field v-model="form.personnel" label="通行人员" placeholder="请填写通行人员" :rules="[{ required: true, message: '' }]" />
          <van-field v-model="form.reason" label="事由" placeholder="请填写事由" :rules="[{ required: true, message: '' }]" />
          <van-field v-model="form.plate" label="放行车牌" placeholder="请填写放行车牌" :rules="[{ required: true, message: '' }]" />
        </van-form>
      </div>
      <div class="apply-bottom">
        <div class="cancel" @click="onCancel">取消</div>
        <div class="submit" @click="onSubmit">提交</div>
      </div>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
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
@import "./style/apply.less";
</style>
