import Vue from 'vue'
import App from './App.vue'
import Profile from './Profile.vue'
import Repo from './Repo.vue'
import Search from './Search.vue'

Vue.config.productionTip = false

Vue.component('gs-profile', Profile)
Vue.component('gs-repo', Repo)
Vue.component('gs-search', Search)

export const eventBus = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app')
