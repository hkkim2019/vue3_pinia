<script setup>
import List from './List.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'

import { ref, reactive, watch } from 'vue';

import {storeToRefs} from 'pinia'
import {useFoodStore} from '../store/food'

import route from '@/code/Route';


const foodStore = useFoodStore();
const { selected } = storeToRefs(foodStore);

const routeCd = ref('');
const recommendyn = ref('');
const bestfoodyn = ref('');
const premiumyn = ref('');
const ynOption = reactive([{name:'선택하세요', value:''},{name:'Y', value:'Y'},{name:'N', value:'N'}]);
const data = reactive({
  list: [],
  showList: [],
});

console.log(route);

const getData = () => {
  if(foodStore.selected===1){
    const baseUrl = '/api/restinfo/restBestfoodList';
    const params = {
      key: import.meta.env.VITE_SERVICE_KEY,
      type: 'json',
      numOfRows: '10',
      pageNo: '1',
      /* 옵션 */
      routeCd: routeCd.value, // 노선
      // routeNm: '경부선',
      // stdRestCd: '000001', // 휴게소/주유소
      // stdRestNm: '서울만남(부산)휴게소',
      recommendyn: recommendyn.value,
      bestfoodyn: bestfoodyn.value,
      premiumyn: premiumyn.value,
    };
    const query = new URLSearchParams(params).toString();
    const url = `${baseUrl}?${query}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        data.list=[];
        data.showList=[];
        data.list=res.list;
        data.list.forEach(e=>{
          data.showList.push({'stdRestNm': e.stdRestNm, 'foodNm': e.foodNm, 'foodCost': e.foodCost, 'recommendyn': e.recommendyn, 'seasonMenu': e.seasonMenu, 'bestfoodyn': e.bestfoodyn, 'premiumyn': e.premiumyn})
        })
        data.showList=[...data.showList];
        // this.$forceUpdate();
      })
      .catch((err) => console.log(err));
  }
}

watch(foodStore, ()=>{
  console.log(foodStore.selected);
  getData();
}, { immediate: true }
,  { deep: true })
</script>

<template>
  <List>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>
        List
    </template>
    <div>
      노선
      <select v-model="routeCd" @change="getData">
        <option
          v-for="(item, index) in route"
          :key="index"
          :value="item.routeCd"
        >{{ item.routeNm }}</option>
      </select>
      추천메뉴 구분
      <select v-model="recommendyn" @change="getData">
        <option
          v-for="(item, index) in ynOption"
          :key="index"
          :value="item.value"
        >{{ item.name }}</option>
      </select>
      베스트푸드 구분
      <select v-model="bestfoodyn" @change="getData">
        <option
          v-for="(item, index) in ynOption"
          :key="index"
          :value="item.value"
        >{{ item.name }}</option>
      </select>
      프리미엄메뉴 구분
      <select v-model="premiumyn" @change="getData">
        <option
          v-for="(item, index) in ynOption"
          :key="index"
          :value="item.value"
        >{{ item.name }}</option>
      </select>
    <table class="table">
        <thead>
            <th class="th"
            v-for="(item, i) in [
            '휴게소/주유소명',
            '음식 이름',
            '음식 가격',
            '추천메뉴 구분',
            '계절메뉴 구분',
            '베스트푸드 구분',
            '프리미엄메뉴 구분',
            ]" :key="i">{{item}}</th>
        </thead>
        <tbody>
          <template  v-if="data.showList && data.showList.length>0">
            <tr v-for="(list, i) in  data.showList" :key="i">
                <td class="td" v-for="(item, j) in list" :key="`key_${j}`">
                  <template v-if="j==='seasonMenu'">
                    {{item==='4'?'사계절메뉴':item==='S'?'여름메뉴':'겨울메뉴'}}
                  </template>
                  <template v-else>
                    {{item}}
                  </template>
                </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="td" colspan="7" style="text-align:center;">
                조회된 데이터가 업습니다.
              </td>
            </tr>
          </template>
        </tbody>
    </table>
    </div>
  </List>
</template>

<style scoped>
.table {
  width: 100%;
  border: 1px solid #444444;
  border-collaps: collapse;
}

.th, .td {
  border: 1px solid #444444;
  padding: 10px;
}
</style>