<script setup>
import {useFoodStore} from '../store/food'
import {storeToRefs} from 'pinia'

const foodStore = useFoodStore();
const { selected } = storeToRefs(foodStore);

defineProps({
  msg: {
    type: String,
    required: true
  }
})

function change(){
  foodStore.selected=selected.value;
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      <select v-model="selected" @change="change">
        <option
          v-for="(item, index) in [{name:'선택하세요', value:0},{name:'휴게소음식점', value:1}]"
          :key="index"
          :value="item.value"
        >{{ item.name }}</option>
      </select>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
