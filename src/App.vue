<template>
  <div id="app">
    <div class="container">
      <gs-search v-if='!isSubmitted' :usernameError='usernameError' :rateLimitError='rateLimitError'></gs-search>
      <gs-profile :userData='userData' v-else-if='isSubmitted'></gs-profile>
    </div>
  </div>
</template>

<script>
import { eventBus } from './main'

export default {
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
      usernameError: false,
      rateLimitError: false
    }
  },
  created () {
    eventBus.$on('userSearchError', (bool) => {
      this.usernameError = bool
    })

    eventBus.$on('rateLimitError', (bool) => {
      this.rateLimitError = bool
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
    --main-bg-color: #303c6c;
    --title-font-color: #f4976c;
    --accent-one-color: #fbe8a6;
    --accent-two-color: #b4dfe5;
    --accent-three-color: #d2fdff;
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
    height: 100%;
  }

  body {
    box-sizing: border-box;
    margin: 0 auto;
    background-color: var(--main-bg-color);
    height: 100%;
    min-height: 100vh;
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
