import Vue from 'vue'
import App from './App.vue'
import sos from '@signageos/front-applet'


Vue.config.productionTip = false

sos.onReady().then(() => {
  console.log("Ready to rock")
  new Vue({
    render: h => h(App),
  }).$mount('#app')
})

