import {defineStore} from 'pinia'

//이름을 가지는 내보내기
//첫번쨰 인수로 사용하고자 하는 모듈의 이름을 넣어줘야합니다
export const useFoodStore = defineStore('selected',{
  state: () => ({
    selected: 0
  }),
  getters: {
  },
  actions: {
  },
})