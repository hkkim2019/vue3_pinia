<script setup>
import Home from './components/Home.vue'
import Menu from './components/Menu.vue'
import { ref } from 'vue';
import Spinner from './components/Spinner.vue';
import {useUtilStore} from './store/util'

const utilStore = useUtilStore();

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <Home msg="원하는게 뭐야"/>
    </div>
  </header>

  <main>
    <Menu />
  </main>
  <router-view></router-view>
  <Spinner :loading="utilStore.loadingStatus"/>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: top;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
