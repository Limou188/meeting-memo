<template>
  <div class="title">
    <span><b>{{ cuMonth + 1 }}月{{ headerDay }}日 {{ cuWeekDay }}</b></span>
    <ul>
      <li>
        我的预约
      </li>
      <li>
        日期:
        {{ cuYear }}年
        {{ cuMonth + 1 }}月
        {{ headerDay }}日
        {{ cuWeekDay }}
        &nbsp;&nbsp;
        <el-icon>
          <ArrowDown />
        </el-icon>
      </li>
      <li style="background-color: blueviolet; color: white;">
        预约
      </li>
    </ul>
  </div>
  <div class="title-week">
    <ul>
      <li v-for="(item, index) of weekList.slice(cuDay-1, cuDay+13)" :key="index">
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
  <ul class="title-day">
    <li v-for="(item, index) of dayList.slice(cuDay-1, cuDay+13)" :key="index" class="day" @click="updateDay(item, index)">
      <span :class="{ active: isActive === item }">{{ item }}</span>
    </li>
    <li>
      <div class="inputDeep">
        <el-date-picker 
          :clearable="false" 
          v-model="dateValue" 
          type="date" 
          style="width: 30px; height: 36px;" 
          @change="elUpData(dateValue)"
        />
      </div>
    </li>
  </ul>
</template>


<script setup name="MyTitle">
import { ref, onMounted, watch } from 'vue'
import { useDateStore } from '../stores/date.js'


// 日期数据
const cuDate = ref(new Date());
// 日期列表
const dayList = ref([])
// 星期列表
const weekList = ref([])
// 一个月的天数
let cuMD = ref(new Date(cuDate.value.getFullYear(), cuDate.value.getMonth() + 1, 0).getDate())
// console.log('当前年份：', cuDate.value.getFullYear());
const cuYear = ref(cuDate.value.getFullYear())
// console.log('当前月份：', cuDate.value.getMonth() + 1);
const cuMonth = ref(cuDate.value.getMonth())
// console.log('当前日期：', cuDate.value.getDate());
const cuDay = ref(cuDate.value.getDate())
// console.log('当前星期：', cuDate.value.getDay());
const cuWeek = ref(cuDate.value.getDay())
// 模板用数据
const headerDay = ref(cuDay.value)

// 初始化数据
onMounted(() => {
  getCurrentDateList()
})

// 当前日期激活样式 
const isActive = ref(cuDay.value)
// 使用pinis将数据全局化
const dateStore = useDateStore()
//获取当前月份日期列表
const getCurrentDateList = (item) => {
  dayList.value = []
  weekList.value = []
  if ((cuDay.value + 14) > cuMD.value) {
    console.log(cuDay.value);
    for (let x = 1; x <= cuMD.value; x++) {
      dayList.value.push(x)
      // new Date()会把非时间格式的字符串转换成时间格式并把月份加一
      const weekDay = new Date(cuYear.value, cuMonth.value, dayList.value[x-1]).getDay()
      // 根据 weekDay 返回对应的星期名称
      weekList.value.push(getWeek(weekDay))
    }
    let shortDay = cuDay.value
    dateStore.setCuDate(cuMD.value, shortDay)
    cuDay.value = cuMD.value - 13
  } else {
    for (let x = 1; x <= cuMD.value; x++) {
      dayList.value.push(x)
      // new Date()会把非时间格式的字符串转换成时间格式并把月份加一
      const weekDay = new Date(cuYear.value, cuMonth.value, dayList.value[x-1]).getDay()
      // 根据 weekDay 返回对应的星期名称
      weekList.value.push(getWeek(weekDay))
    }
    dateStore.setCuDate(cuMD.value, cuDay.value)
  }
  dateStore.setFullDate(new Date(cuYear.value, cuMonth.value, cuDay.value))
  dateStore.setWeek(weekList.value)
  dateStore.setDay(dayList.value)
}
// 
watch((dateStore.newDate),()=>{
  if (cuMD.value - dateStore.newDate.newDay < 14) {
    cuDay.value = cuMD.value - 13
  }else{
    cuDay.value = dateStore.newDate.newDay
  }
  headerDay.value = dateStore.newDate.newDay
  cuWeekDay.value = getWeek(new Date(cuYear.value, cuMonth.value, dateStore.newDate.newDay).getDay())
  isActive.value = headerDay.value
})
// 计算星期几
const getWeek = (weekDay) => {
  let week;
  switch (weekDay) {
    case 0:
      week = "星期天";
      break;
    case 1:
      week = "星期一";
      break;
    case 2:
      week = "星期二";
      break;
    case 3:
      week = "星期三";
      break;
    case 4:
      week = "星期四";
      break;
    case 5:
      week = "星期五";
      break;
    case 6:
      week = "星期六";
      break;
  }
  return week
}
// 初始化当前星期
const cuWeekDay = ref(getWeek(cuWeek.value))
// 日期组件选中更新
const dateValue = ref('')
const elUpData = (newV) => {
  cuMD.value = new Date(newV.getFullYear(), newV.getMonth() + 1, 0).getDate()
  cuDay.value = newV.getDate()
  headerDay.value = cuDay.value
  cuYear.value = newV.getFullYear()
  cuMonth.value = newV.getMonth()
  cuWeekDay.value = getWeek(newV.getDay())
  isActive.value = cuDay.value
  getCurrentDateList()
}
// 点击更新当前日期
const updateDay = (item, index) => {
  headerDay.value = item
  cuDay.value = item
  cuWeekDay.value = getWeek(new Date(cuYear.value, cuMonth.value, item).getDay())
  isActive.value = item
  getCurrentDateList()
}
</script>

<style scoped lang="scss">
// 自定义element plus 组件的样式
.inputDeep {
  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    border: 0px;
    background-color: rgb(255, 255, 255);
    padding-left: 20px;
    width: 20px;
    height: 32px;
    border-radius: none;
    cursor: default;

    .el-input__inner {
      cursor: default !important;
    }
  }

  :deep(.el-input__prefix) {
    color: blueviolet;
    font-size: 25px;
  }
  :deep(.el-input__prefix):hover {
    transition: all 0.2s;
    color: rgb(163, 105, 246);
  }
}

.title {
  user-select: none;
  display: flex;
  padding-top: 25px;
  margin: 0 auto;
  width: 80%;
  justify-content: space-between;

  span {
    font-size: 21px;
  }

  ul {
    display: flex;
    list-style: none;

    li {
      background-color: rgb(255, 255, 255);
      padding: 5px 10px;
      border-radius: 5px;
      margin-right: 20px;
    }
  }
}

.title-week {
  user-select: none;
  display: flex;
  width: 80%;
  padding-top: 10px;
  padding-bottom: 5px;
  margin: 0 auto;
  justify-content: space-between;

  ul {
    list-style: none;
    display: flex;

    li {
      width: 79px;
      text-align: center;
    }
  }
}

.title-day {
  user-select: none;
  display: flex;
  width: 80%;
  padding-bottom: 15px;
  margin: 0 auto;
  justify-content: space-between;
  list-style: none;

  li {
    width: 82px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: rgb(255, 255, 255);

    span {
      display: inline-block;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      margin: 0 auto;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: rgb(255, 255, 255);
        background-color: blueviolet;
      }

      &.active {
        color: rgb(255, 255, 255);
        background-color: blueviolet;
      }
    }

    .icon-date {
      margin-top: 8px;

      &:hover {
        background-color: rgb(255, 255, 255);
        color: rgb(184, 138, 227);
      }
    }
  }
}
</style>