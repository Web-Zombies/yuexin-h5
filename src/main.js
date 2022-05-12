import Vue from 'vue';
import App from './App';
import { router } from './router';
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
