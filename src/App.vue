<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <h1 class="title">Github Stats</h1>
      </div>
      <div class="input-form-wrapper">
        <form class="input-form" v-if='!isSubmitted'>
          <input type='text' id='username' class="username-input" v-model='userData.username'>
          <button @click.prevent='fetchUserRepos' class="submit-input">Submit</button>
        </form>
      <transition name="slide">
        <h3 class="username-error" v-if='usernameError'>Sorry, that username does not exist or has no public repositories.</h3>
      </transition>
      </div>
      <div class="footer">
        <p>footer text here</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userData: {
        username: '',
        name: '',
        joinDate: null,
        profileImage: null,
        respositories: [],
        followers: null,
        following: null
      },
      isSubmitted: false,
      usernameError: false
    }
  },
  methods: {
    async fetchUserRepos () {
      const url = 'https://api.github.com/users/' + this.userData.username + '/repos'
      const response = await fetch(url)
      if (!response.ok) {
        this.usernameError = true
        return null
      } else {
        this.isSubmitted = true
        this.usernameError = false
        const repositories = await response.json()
        this.userData.repositories = repositories
        console.log(this.userData.repositories)
        this.fetchUserStats()
      }
    },
    async fetchUserStats () {
      const url = 'https://api.github.com/users/' + this.userData.username
      const response = await fetch(url)
      const userInfo = await response.json()
      console.log(userInfo)
      this.setUserStats(userInfo)
    },
    setUserStats: function (userStats) {
      this.userData.name = userStats.name
      console.log(this.userData.name)
      this.userData.followers = userStats.followers
      console.log(this.userData.followers)
      this.userData.following = userStats.following
      console.log(this.userData.following)
      this.userData.profileImage = userStats.avatar_url
      console.log(this.userData.profileImage)
      this.userData.joinDate = userStats.created_at.split('T', 1)[0] // This should work for the date format GitHub presents in its API
      console.log(this.userData.joinDate)
    },
    getNumRepos: function () {
      return this.userData.repositories.length
    }
  }
}
</script>

<style lang="scss">
  /* Variables */
  :root {
    --main-bg-color: #d3d3d3;
  }
  /* Animations*/
  .fade-enter {
      opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave {

  }

  .fade-leave-active {
    opacity: 0;
  }

  .slide-enter {

  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
  }

  .slide-leave {

  }

  .slide-leave-active {

  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  /* basic reset since some browsers add padding automatically */
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font-family: sans-serif;
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
  .container {
    height: 100vh;
    width: 100vw;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  .header {
    height: 15%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 4rem;
  }

  .input-form-wrapper {
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .input-form {
    height: 3rem;
    position: fixed;
    width: 60%;
    display: flex;
    justify-content: center;
  }

  .username-input {
    height: 100%;
    width: 60%;
    padding-left: 0.3rem;
    border-radius: 0.5rem;
    font-size: 2rem;
  }

  .submit-input {
    height: 100%;
    margin-left: 0.5rem;
    padding: 0.3rem;
    border-radius: 0.5rem;
    background-color: white;
    cursor: pointer;
  }

  .username-error {
    width: 36%;
    margin-top: 8rem;
    color: white;
    font-size: 2rem;
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
