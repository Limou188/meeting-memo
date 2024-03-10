import { defineStore } from "pinia"


export const useDateStore = defineStore('date', {
  actions:{
    setWeek(week){
      this.weekList = week
      // console.log(this.weekList);
    },
    setDay(day){
      this.dayList = day
      // console.log(this.dayList);
    },
    setFullDate(fullDate){
      this.fullDate = fullDate
      // console.log(this.fullDate);
    },
    setCuDate(cuMD,cuDay){
      this.cuDate.cuMD = cuMD
      this.cuDate.cuDay = cuDay
      // console.log(this.cuDate.cuDay);
    },
    setNewDate(newDay){
      this.newDate.newDay = newDay
      // console.log(this.newDate);
    }
  },
  state: () => ({
    weekList:[],
    dayList:[],
    fullDate:'',
    cuDate:{
      cuMD:'',
      cuDay:'',
    },
    newDate:{
      newDay:'',
    }
  })
})