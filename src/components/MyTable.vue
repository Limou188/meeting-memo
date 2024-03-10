<template>
  <div class="dateTable">
    <div class="hours">
      <ul>
        <li v-for="(item, index) in constantsHours" :key="index">
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div v-for="(item, index) of todoList" :key="index" class="content">
      <div v-for="(ite, i) of item[0]" :key="i" class="cell" @click="handleMeeting(index, i)" :class="{
          active: RowIndex === index && ColIndex === i,
          actives: ite.status > 0
        }">
        
        <div class="meetingData">
          <span>{{ ite.meetingTime }}
            <i v-show="ite.status === 1 || ite.status === 2">有约</i>
            <i v-show="ite.status === 3" style="background-color: rgb(250, 26, 76);color: rgb(50, 50, 50);">约满</i>
          </span>
          <a class="vSpan" v-for="(room, r) of ite.meetingRoom" :key="r">
            <span>{{ room }}</span>
          </a>
        </div>
        <div 
          class="dialog" 
          v-show="isShow && RowIndex === index && ColIndex === i"
          :class="{place: RowIndex > 3}"
        >
          <p>选择会议室:
          <ul>
            <li v-for="(option, index) in options" :key="index">
              <input type="checkbox" :value="option.label" v-model="selectedValues" @click.stop>
              <a>{{ option.label }}</a>
            </li>
          </ul>
          </p>
          <button @click.stop="submit" v-if="todoList[index][0][i].isData">更新</button>
          <button @click.stop="submit" v-else>添加</button>
          <button @click.stop="cancel" v-if="todoList[index][0][i].isData">取消</button>
          <button @click.stop="close" v-else>关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="MyTable">
import { ref, onMounted, reactive } from 'vue'

// 小时常量
const constantsHours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

// 初始化行和列索引
let RowIndex = ref('')
let ColIndex = ref('')
// 是否显示弹窗
const isShow = ref(false)
// 点击单元格事件
const handleMeeting = (index, i) => {
  selectedValues.value = []
  RowIndex.value = index
  ColIndex.value = i
  isShow.value = true
}

// 关闭弹窗
const close = () => {
  isShow.value = false
  RowIndex.value = null
  ColIndex.value = null
}

// 复选框选项数据
const options = [
  { label: '会议室1', value: 'option1' },
  { label: '会议室2', value: 'option2' },
  { label: '会议室3', value: 'option3' },
]

// 当前选中的值集合
const selectedValues = ref([])

const todo = ref([])
const todoItem = reactive({})
const todoList = ref([])

// 会议数据
const meeting = () => {
  for (let i = 0; i < 7; i++) {
    todo.value = ([])
    for (let j = 0; j < 9; j++) {
      todoItem.value = {
        id: j,
        meetingRoom: '',
        meetingTime: '',
        status: 0,
        isData: false,
      }
      todo.value.push(todoItem.value)
    }
    todoList.value.push([todo.value])
  }
}

// 初始化数据
onMounted(meeting)

// 提交数据
const submit = () => {
  if (selectedValues.value.length > 0) {
    const selectCell = todoList.value[RowIndex.value][0][ColIndex.value]
    if (ColIndex.value === 8) {
      selectCell.meetingTime = constantsHours[ColIndex.value] + '~' + '18:00'
    } else {
      selectCell.meetingTime = constantsHours[ColIndex.value] + '~' + constantsHours[ColIndex.value + 1]
    }
    selectCell.meetingRoom = selectedValues.value
    selectCell.status = selectedValues.value.length
    selectCell.isData = true
    todoList.value[RowIndex.value][0][ColIndex.value] = selectCell
    close()
  } else {
    alert('请选择会议室')
  }
}

// 取消会议
const cancel = () => {
  todoList.value[RowIndex.value][0][ColIndex.value].meetingRoom = '',
  todoList.value[RowIndex.value][0][ColIndex.value].meetingTime = '',
  todoList.value[RowIndex.value][0][ColIndex.value].isData = false,
  todoList.value[RowIndex.value][0][ColIndex.value].status = 0
  close()
}

</script>

<style scoped>
.hours {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  user-select: none;

  ul {
    display: flex;

    li {
      background-color: rgb(255, 255, 255);
      width: 120px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      list-style: none;
      border: 1px solid rgb(234, 234, 234);
    }
  }
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 65px;
  user-select: none;
  position: relative;
  .cell {
    width: 120px;
    background-color: rgb(244, 244, 244);
    border: 1px solid rgb(234, 234, 234);
    line-height: 65px;
    transition: all 0.2s;
    box-shadow: 4px 4px 3px rgba(149, 61, 232, 0.4);

    &:hover {
      background-color: rgb(220, 217, 217);
    }

    &.active {
      background-color: rgb(220, 217, 217);
    }

    &.actives {
      transition: all 0.5s;
      background-color: rgb(255, 255, 255);
      color: aliceblue;
      .meetingData {
        color: rgb(0, 0, 0);
      }
    }
  }
}
.dialog {
    position: absolute;
    width: 236px;
    height: 180px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    color: black;
    border-radius: 12px;
    text-align: center;
    z-index: 999;
    ul {
      color: black;
      list-style: none;
      display: flex;
      top: -15px;
      position: relative;
      li {
        margin: 7px;
        height: 20px;
      }
    }
    button {
      background-color: blueviolet;
      color: rgb(255, 255, 255);
      position: relative;
      height: 30px;
      border: none;
      padding: 5px;
      border-radius: 5px;
      top: 10px;
      margin: 20px;

      &:hover {
        background-color: rgb(149, 61, 232);
        color: rgb(255, 255, 255);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
      }
    }
  }
  .place{
      top: -180px;
    }
.meetingData {
  height: 65px;
  display: flex;

  span {
    width: 30px;
    height: 30px;
    padding: 0;
    position: relative;
    top: -15px;
    left: 2px;
    font-size: 10px;

    i {
      width: 30px;
      height: 20px;
      background-color: blueviolet;
      color: rgb(255, 255, 255);
      border-radius: 3px;
      font-size: 11px;
      left: 80px;
      top: -65px;
      position: relative;
      padding: 1px;
    }
  }

  a {
    display: flex;
    position: relative;
    height: 40px;

    span {
      display: flex;
      height: 15px;
      width: 40px;
      left: -30px;
      position: relative;
      top: 15px;
    }
  }
}
</style>