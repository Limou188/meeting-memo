import { defineStore } from 'pinia'

export const useMeetingStore = defineStore('meeting', {
  actions:{
    setMeeting(data){
      this.meData = data
    }
  },
  state: () => ({
    meData:[]
  })
})