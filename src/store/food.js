import {defineStore} from 'pinia'

                                    // devtools 연결 이름
export const useFoodStore = defineStore('food',{
  state: () => ({  // data
    selected: 0,
    currentPage:1,
  }),
  getters: { // computed
  },
  actions: {  // methods
  },
  // $reset(){
  //   selected.value = 0;
  // }
})