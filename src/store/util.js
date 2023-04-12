import {defineStore} from 'pinia'

                                    // devtools 연결 이름
export const useUtilStore = defineStore('util',{
  state: () => ({  // data
    loadingStatus: false,
  }),
  getters: { // computed
  },
  actions: {  // methods
    startSpinner(){
        this.loadingStatus = true;
    },
    endSpinner(){
        this.loadingStatus = false;
    }
  },
})