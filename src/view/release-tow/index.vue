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
        <van-dropdown-menu :close-on-click-outside="false">
          <van-dropdown-item title="筛选" ref="item">
            <div class="dropdown-item-box">
              <div>
                <div class="item-title">选择时间</div>
                <div class="item-search">
                  <van-field readonly clickable name="datetimePicker" :value="searchValueTime" placeholder="点击选择时间" @click="showTimePicker = true" />
                </div>
              </div>
              <div class="item-flex">
                <div class="item-flex-box">
                  <div class="item-title">姓名</div>
                  <div class="item-search">
                    <van-field v-model="searchValueName" placeholder="请输入..." />
                  </div>
                </div>
                <div>
                  <div class="item-title">电话</div>
                  <div class="item-search">
                    <van-field v-model="searchValuePo" type="number" placeholder="请输入..." />
                  </div>
                </div>
              </div>
              <div>
                <div class="item-title">输入车牌</div>
                <div class="item-search">
                  <van-field v-model="searchValuePl" placeholder="请输入..." />
                </div>
              </div>
              <div>
                <div class="item-title">选择部门</div>
                <div class="item-search">
                  <van-field readonly clickable name="picker" :value="searchValueDe" placeholder="点击选择部门" @click="showPickerDe = true" />
                </div>
              </div>
              <div>
                <div class="item-title">劵使用状态</div>
                <div class="item-search">
                  <van-field readonly clickable name="picker" :value="searchValueTp" placeholder="点击选择状态" @click="showPickerTp = true" />
                </div>
              </div>
              <div>
                <div class="item-title">选择劵类型</div>
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
    <!--筛选 选择状态弹框 -->
    <van-popup v-model="showPickerTp" position="bottom">
      <van-picker show-toolbar :columns="columnsTp" @confirm="onConfirmTp" @cancel="showPickerTp = false" />
    </van-popup>
    <!--筛选 选择部门弹框 -->
    <van-popup v-model="showPickerDe" position="bottom">
      <van-picker show-toolbar :columns="columnsDe" @confirm="onConfirmDe" @cancel="showPickerDe = false" />
    </van-popup>
    <!--筛选 选择时间弹框 -->
    <van-popup v-model="showTimePicker" position="bottom">
      <van-datetime-picker type="date" :min-date="minDateTime" :max-date="maxDateTime" @confirm="onTimeConfirm" @cancel="showTimePicker = false" />
    </van-popup>
    <!-- 选择时间弹框 -->
    <van-popup v-model="showSelctTime" :close-on-popstate="true" position="bottom">
      <van-datetime-picker v-model="timeOpt.selectDate" type="date" title="选择时间" :max-date="timeOpt.maxDate" :min-date="timeOpt.minDate" :formatter="formatterDate" @confirm="confirmDate" @cancel="showSelctTime = false" />
    </van-popup>
  </div>
</template>

<script>
import { Icon, Empty, Popup, DatetimePicker, DropdownMenu, DropdownItem, Field, Picker } from 'vant';
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
    [Picker.name]: Picker,
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

      searchValueTime: '',//筛选内搜索值
      searchValueName: '',//筛选内搜索值
      searchValuePo: '',//筛选内搜索值 
      searchValuePl: '',//筛选内搜索值 
      searchValueDe: '',//筛选内搜索值  
      searchValueTp: '',//筛选内搜索值  

      minDateTime: new Date(2020, 0, 1),
      maxDateTime: new Date(2025, 10, 1),
      showTimePicker: false, //选择时间弹窗

      columnsDe: ['研发部', '销售部'],
      showPickerDe: false,//部门

      columnsTp: ['开启', '关闭'],
      showPickerTp: false,//状态

      actionId: '',//选中标签id
      itemSelect: [{ name: '劵类型一', id: '1' }, { name: '劵类型一', id: '2' }, { name: '劵类型一', id: '3' }, { name: '劵类型一', id: '4' }, { name: '劵类型一', id: '5' }, { name: '劵类型一', id: '6' }],

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
    },
    //筛选 时间选择
    onTimeConfirm (time) {
      this.searchValueTime = formatTime(time, '-').substring(0, 11);
      this.showTimePicker = false;
    },
    //筛选 部门选择
    onConfirmDe (value) {
      this.searchValueDe = value;
      this.showPickerDe = false;
    },
    //筛选 状态选择
    onConfirmTp (value) {
      this.searchValueTp = value;
      this.showPickerTp = false;
    },
  }
};
</script>

<style lang="less" scoped>
@import "./style/index";
</style>
