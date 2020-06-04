<template>
<article id="page-success" class="page" :class="dark ? 'dark' : null">
  <div class="vid">    
    <video class="video" autoplay ref="chatting"></video>
    <div class="btn-div">

      <button class="btn" @click="stopCamera">Camera</button>
    </div>
  </div>
</article>
</template>

<script>
// import pdf from 'pdfvuer';
import copy from 'copy-to-clipboard';

var qr = require('qr-image')

var parse = require('url-parse')
var http = require('http');

export default {
  props: {
    currentUrl: {
      type: String
    },
    show: {
      type: Boolean
    },
    allowScroll: {
      type: Boolean
    },
    mediaStream: {
      type: Object
    },
  },
  data() {
    return {
      production: false,
      sidebar: ['person_pin', 'school', 'lock', 'book'],
      url: window.location.href,
      sidebarShow: true,
      // mobile: window.innerWidth > 600 ? false : true,
      dark: true,
      camera: false,
      mediaStreamConstraints:{
        video: true,
      },
      // currentUrl: "https://www.twitter.com",
      // show: false,
    }
  },
  // watch: {
  //   "mediaStream"() {
  //     this.$refs.chatting.srcObject = this.mediaStream;
  //   },
  //   deep: true,
  //
  // },
  methods: {
    iframeZoom(width) {
      console.log(this.windowWidth, width, this.windowWidth / width);
      let newVal = this.windowWidth / width - 0.05
      if (this.windowWidth < width) return newVal;
    },
    setWidth(num) {
      if (this.currentUrl) {
        setTimeout(() => {

        }, 500)
        return `${num}`
      } else return "0"
    },
    setHeight(num) {
      if (this.currentUrl) {
        setTimeout(() => {}, 500)
        return `${num}`
      } else return "0"

    },
    // displayFrame() {
    //   if (this.currentUrl) {
    //     setTimeout(() => {
    //       return true
    //     }, 3000)
    //   } else return false
    // },
    getLink(request) {
      return this.production ? request : "http://192.168.0.22:3000" + request;

    },
    copyUrl() {
      console.log("copying")
      copy(this.url)
    },
    mobile() {
      console.log(this.windowWidth);
      return this.windowWidth > 600 ? false : true;
    },
    logScrollPos() {
      console.log(document.getElementsByClassName("main-body").scrollTop)
    },
    testMedia() {
      navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints)
        .then(this.gotLocalMediaStream).catch(this.handleLocalMediaStreamError);
    },
    gotLocalMediaStream(mediaStream) {
      this.localStream = mediaStream;
      if (this.$refs.chatting) {
        this.$refs.chatting.srcObject = mediaStream;
      } else {
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
  created() {
    if (this.windowWidth < 601) {
      this.sidebarShow = false;
    }
  },
  mounted() {
    this.show = false;
    this.camera = true;
    // this.$refs.chatting.srcObject = this.mediaStream;
    this.testMedia();
  },
}
</script>
