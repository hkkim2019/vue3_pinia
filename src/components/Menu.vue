<script setup>
import List from './List.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'

import { reactive, watch } from 'vue';

import {storeToRefs} from 'pinia'
import {useFoodStore} from '../store/food'


const foodStore = useFoodStore();
const { selected } = storeToRefs(foodStore);

const data = reactive({
  list: [],
});

const getData = () => {
  if(foodStore.selected===1){
    fetch('/api/restinfo/restBestfoodList?key='+import.meta.env.VITE_SERVICE_KEY+'&type=json&numOfRows=10&pageNo=1', {
      headers: { 'Content-type': 'application/json' },
    }).then(res=>res.json()).then((response) => {
      console.log({ response });
      data.list=response.list;
    }).catch((error) => {
      console.log('Looks like there was a problem: \n', error);
    });
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
    <template #heading>List</template>

    {{ data.list }}
  </List>
</template>
