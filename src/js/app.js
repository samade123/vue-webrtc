import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import VueWindowSize from 'vue-window-size';
require('../scss/app.scss');

window.Vue = require('vue');
Vue.config.devtools = true

Vue.use(VueWindowSize);
Vue.use(Vuesax, {
  // options here
})

//pull in all vue components
require('./components');
var parse = require('url-parse');

window.addEventListener('load', function() {
  if (sessionStorage.getItem('scrollPosition') !== null)
    document.getElementsByClassName("main-body")[0].scrollTo({
      top: sessionStorage.getItem('scrollPosition'),
      left: 0,
      behavior: 'smooth',
    });
}, false);

window.Images = require("./testing/images")


//instantiate page vue
var app = new Vue({
  el: 'main',
  data: {
    // currentURL: "https://www.bing.com/",
    currentURL: null,
    liveURL: null,
    show: false,
    images: [],
    settings: false,
    allowScroll: false,
    mediaStreamConstraints:{
      video: true,
    },
    pages: {
      header: "header",
      chatting: "chatting",
    },
    currentPage: "header",
  },
  watch: {
    currentURL() {
      console.log("!£=")

      if (this.currentURL.length > 0) {
        setTimeout(() => {
          this.show = true
          console.log("delaylm;lm;lm;l")
        }, 300)
      } else this.show = false
    }
  },
  methods: {
    // var newDiv = document.createElement("img");
    headerHeight(){
      return this.windowWidth > 600 ? "63px" : "109px";
    },
    toggleSettings(event){
      this.settings=!this.settings;
      event.target.blur()
    },
    testMedia() {
      navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints)
        .then(this.gotLocalMediaStream).catch(this.handleLocalMediaStreamError);
    },
    gotLocalMediaStream(mediaStream) {
      this.localStream = mediaStream;
      if (this.$refs.camera){
        this.$refs.camera.srcObject = mediaStream;
      }
      else {
        // this.$refs.chatting.srcObject = mediaStream;

      }
    },
    handleLocalMediaStreamError(error) {
      console.log('navigator.getUserMedia error: ', error);
    },
    stopCamera() {
      if (this.localStream) {
        this.localStream.getTracks()[0].stop();
        this.localStream = false;
      } else {
        this.testMedia()
      }
    }
  },
  mounted() {
    this.testMedia()
  }
});
