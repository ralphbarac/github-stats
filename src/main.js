import Vue from 'vue'
import App from './App.vue'
import Profile from './Profile.vue'
import Repo from './Repo.vue'
import Search from './Search.vue'

Vue.config.productionTip = false

Vue.component('gs-profile', Profile)
Vue.component('gs-repo', Repo)
Vue.component('gs-search', Search)

export const cacheName = 'data-cache'
export const eventBus = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app')

/*
      const data = []
      this.repoData.forEach(async repo => {
        const url = repo.languages_url
        const response = await fetch(url)
        data.push({ name: repo.name, langs: await response.json() })
      })
      console.log(data)
*/
