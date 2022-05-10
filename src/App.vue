<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  background-color: #f3f7fa;
  -webkit-font-smoothing: antialiased;
}
@supports (bottom: env(safe-area-inset-bottom)) {
  #app {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
