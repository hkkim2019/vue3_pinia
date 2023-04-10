<script setup>
import {storeToRefs} from 'pinia'
import {useFoodStore} from '../store/food'
import {ref, computed, watch} from 'vue';

const foodStore = useFoodStore();
const { currentPage } = storeToRefs(foodStore);

const props = defineProps({
    totalCount: {
        type: Number,
        required: true,
    },
    listSize: {
    type: Number,
    default: 10,
    }
})

watch(
    ()=>props.totalCount,
    (val)=>{
        console.log(val);
    }
)

const page = computed(() => {
    return foodStore.currentPage;
})
const maxPage = computed(() => {
    return Math.ceil(props.totalCount / props.listSize);
})
const startPage = computed(() => {
    return (Math.trunc((page.value - 1) / pageCount.value) * pageCount.value) + 1;
})
const endPage = computed(() => {
    let end = startPage.value + pageCount.value - 1;
    return end < maxPage.value ? end : maxPage.value;
})
const paginationUnits = computed(() => {
    let units = [];
    for(let num = startPage.value; num <= endPage.value; num++) {
        units.push(num);
    }
    return units;
})

const pageCount = ref(10);

const emit = defineEmits(['inFocus', 'submit'])

function changeCurrentPage(page) {
    if(this.page !== page) {
        foodStore.currentPage=page;
        emit("changePage", page);
    }
}
</script>

<template>
    <ul class="pagination-frame">
        <li @click="changeCurrentPage(
        (page - pageCount) > 1 ? page - pageCount : 1
        )">
        <a class="page-text">
            〈〈
        </a>
        </li>
        <li 
        class="page-left-btn"
        @click="changeCurrentPage(
            (page - 1) > 1 ? page - 1 : 1
        )"
        >
        <a class="page-text">
            〈
        </a>
        </li>
        
        <li 
        v-for="n in paginationUnits"
        :key="n"
        :class="[n === page ? 'selected-page' : '', 'page-btn']"
        @click="changeCurrentPage(n)"
        >
        <a class="page-text">
            {{ n }}
        </a>
        </li>
        
        <li 
        class="page-right-btn"
        @click="changeCurrentPage(
            (page + 1) < maxPage ? page + 1 : maxPage
        )"
        >
        <a class="page-text">
            〉
        </a>
        </li>
        <li @click="changeCurrentPage(
        (page + pageCount) < maxPage ? page + pageCount : maxPage
        )">
        <a class="page-text">
            〉〉
        </a>
        </li>
    </ul>
</template>

<style scoped>
  /* 페이징처리 출력부 */
  .pagination-frame {
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 1vh 0vw 0vh 0vw;
    padding: 0px;

    /* 드래그 막기 */
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  /* 페이지 이동 버튼 */
  .pagination-frame > li {
    width: 2.55vw;
    height: 3vh;
    background-color: #fff;
    border: 1px solid rgb(211, 210, 211);
    text-align: center;
    cursor: pointer;
  }
  .page-btn {
    margin: 0px 1px;
  }
  .page-left-btn {
    margin-right: 5px;
  }
  .page-right-btn {
    margin-left: 5px;
  }

  li:hover:not(.selected-page) {
    background-color: rgba(222, 222, 222, 0.3);
  }
  li.selected-page {
    background-color: rgb(222, 222, 222);
  }

  .page-text {
    text-decoration: none;
    cursor: pointer;
  }
  .page-text:hover {
    color: #000;
  }
  
  
</style>