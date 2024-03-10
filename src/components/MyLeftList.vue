<template>
  <div class="leftList">
    <ul>
      <el-icon class="icon-top" :size="24" @click="upData(-1)" v-if="Day>1">
        <ArrowUp />
      </el-icon>
      <el-icon class="icon-top ban" :size="24"  v-else>
        <ArrowUp />
      </el-icon>
      <li v-for="(item, index) of dateStore.weekList.slice(MD - 7, MD)" :key="index" v-show="(MD - Day) < 7">
        <span>{{ fullDate }}-{{ dateStore.dayList[MD - 7 + index] }}</span>
        <p>{{ item }}</p>
      </li>
      <li v-for="(item, index) of dateStore.weekList.slice(Day - 1, Day + 6)" :key="index" v-show="(MD - Day) >= 7">
        <span>{{ fullDate }}-{{ dateStore.dayList[Day - 1 + index] }}</span>
        <p>{{ item }}</p>
      </li>
      <el-icon class="icon-bottom" :size="24" @click="upData(1)" v-if="(Day + 6) < MD">
        <ArrowDown />
      </el-icon>
      <el-icon class="icon-bottom ban" :size="24"  v-else>
        <ArrowDown />
      </el-icon>
    </ul>
  </div>
</template>

<script setup>
import { useDateStore } from '@/stores/date'
import { ref, onMounted, onUpdated, watch } from 'vue'

const dateStore = useDateStore()
const fullDate = ref('')
const MD = ref('')
const Day = ref('')
const cuIndex = ref('')

const upDayData = (dateStore, count) => {
  MD.value = dateStore.cuDate.cuMD
  Day.value = dateStore.cuDate.cuDay + (count || 0)
  fullDate.value = dateStore.fullDate.getFullYear() + '-' + (dateStore.fullDate.getMonth() + 1)
  dateStore.setNewDate(Day.value)
}
let count = 0
const upData = (x) => {
  count += x
  // console.log(count);
  upDayData(dateStore, count)
}
onMounted(() => {
  upDayData(dateStore)
})
// 当点击标题区日期组件时，将count的值时实更新，这样在点击左侧上下箭头时，可以准确更新
watch((dateStore.cuDate),()=>{
  if (MD.value - dateStore.cuDate.cuDay <= 6) {
    count = (MD.value - dateStore.cuDate.cuDay) - 6
    upDayData(dateStore)
  }else{
    count = 0
    upDayData(dateStore)
  }
})
</script>

<style scoped>
.leftList {
  position: absolute;
  width: 80px;
  height: 490px;
  top: 233px;
  left: 95px;
  user-select: none;

  ul {
    list-style: none;

    li {
      text-align: center;
      height: 58px;
      padding-top: 12px;
      width: 100px;
      background-color: rgb(249, 249, 249);
      border-radius: 10px;
      margin-top: 8px;
    }
  }
}

.icon-top {
  position: absolute;
  top: -23px;
  left: 39px;
  background-color: rgb(255, 255, 255);
  color: rgb(151, 67, 230);
  border-radius: 5px;
  &:hover{
    transition: all 0.3s;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    background-color: rgb(130, 67, 230);
    color: rgb(255, 255, 255);
  }
}

.icon-bottom {
  position: absolute;
  bottom: -3px;
  left: 39px;
  background-color: rgb(255, 255, 255);
  color: rgb(151, 67, 230);
  border-radius: 5px;
  &:hover{
    transition: all 0.3s;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    background-color: rgb(130, 67, 230);
    color: rgb(255, 255, 255);
  }
}
.ban{
  color: rgb(0, 0, 0);
  background-color: rgb(239, 239, 239);
  &:hover{
    transition: all 0.3s;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    background-color: rgb(239, 239, 239);
    color: rgb(0, 0, 0);
  }
}
</style>