<template>
<div class="container">
    <div class="header">
        <h1 class="title">Github Stats</h1>
    </div>
    <div class="input-form-wrapper">
    <form class="input-form">
        <input type='text' class="username-input" v-model='username'>
        <button @click.prevent='fetchUserRepos' class="submit-input">Submit</button>
    </form>
    <transition name="slide">
        <h3 class="username-error" v-if='usernameError'>Sorry, that username does not exist or has no public repositories.</h3>
    </transition>
    </div>
</div>
</template>

<script>
import { eventBus } from './main'

export default {
  props: {
    usernameError: {
      type: Boolean
    }
  },
  data: function () {
    return {
      username: ''
    }
  },
  methods: {
    async fetchUserRepos () {
      let url = 'https://api.github.com/users/' + this.username + '/repos'
      const response = await fetch(url)
      if (!response.ok) {
        eventBus.$emit('userSearchError', true)
        return null
      } else {
        eventBus.$emit('submitChange', [true, this.username])
        const repositories = await response.json()
        eventBus.$emit('repos', repositories)
        url = 'https://api.github.com/users/' + this.username
        const responseRepos = await fetch(url)
        const userInfo = await responseRepos.json()
        console.log(userInfo)
        eventBus.$emit('userDataInformation', userInfo)
      }
    }
  }
}

</script>

<style scoped>

  /* Animations*/
  .fade-enter {
      opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave-active {
    opacity: 0;
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

  .container {
    height: 100vh;
    width: 100vw;
    display: flex;
    margin: 0 auto;
    justify-content: center;
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
    color: var(--title-font-color);
    border-bottom: 1px solid var(--accent-one-color);
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
    font-size: 2rem;
    color: var(--main-bg-color);
    font-weight: bold;
    border-radius: 0.5rem;
    border: 1px solid var(--accent-one-color);
    background-color: var(--title-font-color);
  }

  .submit-input {
    height: 100%;
    margin-left: 0.5rem;
    padding: 0.3rem;
    border-radius: 0.5rem;
    border: 1px solid var(--accent-one-color);
    background-color: var(--title-font-color);
    cursor: pointer;
    color: var(--main-bg-color);
    font-weight: bold;
  }

  .username-error {
    width: 36%;
    margin-top: 8rem;
    color: white;
    font-size: 2rem;
  }
</style>
