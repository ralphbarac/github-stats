<template>
  <div id="app">
    <div class="container">
      <gs-search v-if='!isSubmitted' :usernameError='usernameError'></gs-search>
      <gs-profile :userData='userData' v-else-if='isSubmitted'></gs-profile>
    </div>
  </div>
</template>

<script>
import { eventBus } from './main'

export default {
  computed: {
    calcLanguagePerc: function () {
      const languageArray = []
      for (let i = 0; i < this.userData.repositories.length; i++) {
        if (this.userData.repositories[i].language != null) {
          languageArray.push(this.userData.repositories[i].language)
        }
      }
      const languageDict = {}
      for (let i = 0; i < languageArray.length; i++) {
        if (languageDict[languageArray[i]] != null) {
          languageDict[languageArray[i]] = languageDict[languageArray[i]] + 1
        } else {
          languageDict[languageArray[i]] = 1
        }
      }
      // Now converting to percentages
      let sum = 0
      for (const key in languageDict) {
        sum += parseFloat(languageDict[key])
      }
      for (const key in languageDict) {
        languageDict[key] = (languageDict[key] / sum) * 100
      }
      return languageDict
    }
  },
  data: function () {
    return {
      userData: {
        name: '',
        username: '',
        joinDate: '',
        profileImage: '',
        repositories: [],
        followers: null,
        following: null
      },
      isSubmitted: false,
      usernameError: false
    }
  },
  created () {
    eventBus.$on('userSearchError', (bool) => {
      this.usernameError = bool
    })

    eventBus.$on('submitChange', (array) => {
      this.isSubmitted = array[0]
      this.userData.username = array[1]
    })

    eventBus.$on('repos', (repositories) => {
      this.userData.repositories = repositories
    })

    eventBus.$on('userDataInformation', (data) => {
      this.userData.name = data.name
      this.userData.joinDate = data.created_at.split('T', 1)[0]
      this.userData.followers = data.followers
      this.userData.following = data.following
      this.userData.profileImage = data.avatar_url
    })
  }
}
</script>

<style lang="scss">
/* Variables */
  :root {
    --main-bg-color: #5cdb95;
    --title-font-color: #edf5e1;
    --accent-one-color: #8ee4af;
    --accent-two-color: #379683;
    --accent-three-color: #05386b;
  }
 /* basic reset since some browsers add padding automatically */
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font-family: Montserrat, sans-serif;
  }

  /* setting a global font size at 10 so its easy to use rem later on,
  root fontsize for browsers is 16px and we want 10px, so we divide 10/16 and get 62.5% */
  html {
    font-size: 62.5%;
  }

  body {
    box-sizing: border-box;
    margin: 0 auto;
    background-color: var(--main-bg-color);
  }

</style>

<!--
STATS TO SHOW:

(1) Language Distribution
(2) Top repos/featured repos/all repos/most starred repos?
(3) total # repos
(4) followers
(5) following
(6) join date, username, name, profile pic
(7) most starred repositories
-->
