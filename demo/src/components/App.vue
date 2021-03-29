<template>
  <div class="header-container dummy">
    <h1 class="header-title">dddl</h1>
    <div class="header-subtitle"><span>generates Data from DDL</span></div>
  </div>
  <div class="header-container">
    <h1 class="header-title">dddl</h1>
    <div class="header-subtitle"><span>generates Data from DDL</span></div>
  </div>
  <a href="https://github.com/kena0ki/dddl">
    <img class="gh-ribbon" src="../assets/forkme_right_red_aa0000.svg">
  </a>
  <div class="main-area">
    <Demo />
  </div>
  <div class="footer-container">
    <div class="footer">Made by kena0ki</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Demo from './Demo.vue';

export default defineComponent({
  name: 'App',
  components: {
    Demo
  }
});
</script>

<style>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
  background-color: white;
  box-shadow: inset 0 0 3em rgba(0, 0, 0,.1);
  z-index: 1;
}
.header-container.dummy {
  position: relative;
  z-index: -1
}
.header-title {
  margin: auto .5rem;
}
.header-subtitle {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  white-space: pre-wrap;
  width: 90%;
}

.main-area {
  width: 100%;
  max-width: 700px;
  margin: auto;
}

.footer-container {
  width: 100%;
  text-align: right;
  background-color: white;
  box-shadow: inset 0 0 3em rgba(0, 0, 0,.1);
  z-index: 1;
  padding: .5em;
}
.footer {
  margin: 0 1em;
}
</style>
