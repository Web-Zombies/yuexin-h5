<template>
  <div class="release">
    <div class="home-bg"></div>
    <div class="select-time">
      <div class="t-b-label">
        <span @click="openSelectTime(1)">{{selectStartTime ? selectStartTime : '请选择'}}</span>
        <label>至</label>
        <span @click="openSelectTime(2)">{{selectEndTime ? selectEndTime: '请选择'}}</span>
      </div>
      <div>
        <van-dropdown-menu>
          <van-dropdown-item title="筛选" ref="item">
            <div class="dropdown-item-box">
              <div>
                <div class="item-title">快捷搜索</div>
                <div class="item-search">
                  <van-field v-model="searchValue" placeholder="请输入人员姓名..." />
                </div>
              </div>
              <div>
                <div class="item-title">选择科室</div>
                <div class="item-select">
                  <div :class="item.id == actionId ?'action':''" v-for="item in itemSelect" :key="item.id" @click="actionId = item.id">
                    {{item.name}}
                  </div>
                </div>
              </div>
              <div class="drop-bot">
                <div class="reset" @click="onReset">重置</div>
                <div class="save" @click="onConfirm">确定</div>
              </div>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <div class="release-list">
      <div class="release-list-box" v-for="item in centerList" :key="item.id">
        <div class="box-type" :class="item.type == 2 ?'box-type-action':item.type == 3 ?'box-type-action-tow':''">{{item.typeText}}</div>
        <div class="box-title">
          <div>
            <van-icon name="newspaper-o" :color="item.type==3 ?'#C2CADA':''" />
          </div>
          <div>
            {{item.name}}
          </div>
        </div>
        <div class="box-center">
          <div>
            <div>车 场：</div>
            <div> {{item.parking}}</div>
          </div>
          <div>
            <div>优惠模式：</div>
            <div> {{item.discount}}</div>
          </div>
          <div>
            <div>车牌号：</div>
            <div> {{item.plate}}</div>
          </div>
        </div>
        <div class="box-foot">
          <div>
            {{item.time+' '+'前有效'}}
          </div>
          <div class="foot-img-use" v-if="item.type == 3"></div>
          <div class="foot-img-nouse" v-if="item.type == 2"></div>
        </div>
      </div>
    </div>
    <div style="height:76px"></div>
    <div class="release-bottom">
      <div @click="applyRow">申请放行</div>
    </div>
    <!-- 选择时间弹框 -->
    <van-popup v-model="showSelctTime" :close-on-popstate="true" position="bottom">
      <van-datetime-picker v-model="timeOpt.selectDate" type="date" title="选择时间" :max-date="timeOpt.maxDate" :min-date="timeOpt.minDate" :formatter="formatterDate" @confirm="confirmDate" @cancel="showSelctTime = false" />
    </van-popup>
  </div>
</template>

<script>
import { Icon, Empty, Popup, DatetimePicker, DropdownMenu, DropdownItem, Field } from 'vant';
import { formatTime, formatterPickerDater } from "../../utils";
export default {
  components: {
    [Icon.name]: Icon,
    [Empty.name]: Empty,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Field.name]: Field,
  },

  data () {
    return {

      showTime: true, // 时间组件
      type: null, // 1：开始，2：结束
      showSelctTime: false, // 选择时间弹框
      selectStartTime: '', // 弹窗选择-开始时间
      selectEndTime: '', // 弹窗选择-结束时间

      timeOpt: {
        selectDate: new Date(), // 选择提交时间
        minDate: '', // 之前的时间
        maxDate: '', // 只能选择今天及之前的时间
      },

      searchValue: '',//筛选内搜索值
      actionId: '',//选中标签id
      itemSelect: [{ name: '心脑血管科', id: '1' }, { name: '放射科', id: '2' }, { name: '神经内科', id: '3' }, { name: '心脑血管科', id: '4' }, { name: '放射科', id: '5' }, { name: '神经内科', id: '6' }],

      centerList: [{ name: '枫林车场', id: '1', type: '1', typeText: '待审核', parking: '咸嘉新村南苑停车场', discount: '一次', plate: '湘1CL66', time: '2022-02-02 00:00:00' }, { name: '枫林车场', id: '2', type: '2', typeText: '待审核', parking: '咸嘉新村南苑停车场', discount: '一次', plate: '湘1CL66', time: '2022-02-02 00:00:00' }, { name: '枫林车场', id: '3', type: '3', typeText: '已过期', parking: '咸嘉新村南苑停车场', discount: '一次', plate: '湘1CL66', time: '2022-02-02 00:00:00' }],
    };
  },
  created () {
    //默认昨天到今天的时间
    this.selectStartTime = formatTime(new Date((new Date).getTime() - 24 * 60 * 60 * 1000), '-').substring(0, 11);
    this.selectEndTime = formatTime(new Date(), '-').substring(0, 11);
  },
  methods: {
    onTabs (name) {

    },
    getData () {

    },
    // 时间组件
    clickRight () {
      this.showTime = !this.showTime;
    },
    // 时间确定查询
    selectOk () {
      this.showTime = false;
    },
    // 时间重置查询
    selectReset () {
      this.selectStartTime = '';
      this.selectEndTime = '';
    },
    //选择时间
    confirmDate (value) {
      this.showSelctTime = false;
      let str = formatTime(value, '-').substring(0, 11);
      this.type == 1 ? this.selectStartTime = str : this.selectEndTime = str;
    },
    // 时间打开
    openSelectTime (type) {
      this.type = type;
      let minDate = new Date(2017, 0, 1);
      let maxDate = new Date();
      if (type == 1 && this.selectEndTime) { // 选择开始时间
        maxDate = new Date(this.selectEndTime.replace(/-/g, '/'));
      } else if (type == 2 && this.selectStartTime) { // 选择结束时间
        minDate = new Date(this.selectStartTime.replace(/-/g, '/'));
      }
      this.timeOpt.minDate = minDate;
      this.timeOpt.maxDate = maxDate;
      this.showSelctTime = true;
    },
    //日期格式化
    formatterDate (type, val) {
      return formatterPickerDater(type, val);
    },
    onReset () {
      this.searchValue = '';//筛选内搜索值
      this.actionId = '';//选中标签id
    },
    onConfirm () {
      this.$refs.item.toggle();
    },
    applyRow () {
      this.$router.push({ path: '/apply' })
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style/index";
</style>
