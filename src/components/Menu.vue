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
    const baseUrl = '/api/restinfo/restBestfoodList';
    const params = {
      key: import.meta.env.VITE_SERVICE_KEY,
      type: 'json',
      numOfRows: 10,
      pageNo: 1,
    };
    const query = new URLSearchParams(params).toString();
    const url = `${baseUrl}?${query}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        data.list=res.list;
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
    <template #heading>List</template>

    {{ data.list }}
  </List>
</template>
