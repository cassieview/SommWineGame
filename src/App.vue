<template>
  <div id="app">
    <img alt="App logo" src="./assets/logo.png" height="150" width="350" />
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home
  }
};
</script>

<style>
#app {
  font-family: Calibri;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin: 60px;
}

body {
  background: 
    /* top, transparent red, faked with gradient */ linear-gradient(
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.9)
    ),
    /* bottom, image */ url("./assets/corkbackground.jpg");
  background-size: 100%;
}
</style>
