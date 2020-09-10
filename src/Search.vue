<template>
<div class="container">
    <div class="header">
        <h1 class="title">GitHub Stats</h1>
    </div>
    <div class="input-form-wrapper">
    <form class="input-form">
        <input type='text' class="username-input" placeholder="Username" v-model='username'>
        <button @click.prevent='fetchAndCache' class="submit-input">Submit</button>
    </form>
    <transition name="slide">
        <h3 class="username-error" v-if='usernameError'>Sorry, that username does not exist or has no public repositories.</h3>
        <h3 class="rate-limit-error" v-if='rateLimitError'>GitHub rate limit exceeded.</h3>
    </transition>
    </div>
</div>
</template>

<script>
import { eventBus, cacheName } from './main'

export default {
  props: {
    usernameError: {
      type: Boolean
    },
    rateLimitError: {
      type: Boolean
    }
  },
  data: function () {
    return {
      username: ''
    }
  },
  methods: {
    async fetchAndCache () {
      let url = 'https://api.github.com/users/' + this.username + '/repos'
      caches.open(cacheName).then(async cache => {
        const data = await cache.match(url).then(async res => {
          if (res === undefined) {
            const response = await fetch(url)
            if (!response.ok) {
              if (response.status === 403) {
                eventBus.$emit('rateLimitError', true)
                return 'Error'
              } else {
                eventBus.$emit('userSearchError', true)
                return 'Error'
              }
            } else {
              cache.put(url, await response.clone())
              return await response.clone().json()
            }
          } else {
            return await res.clone().json()
          }
        })
        if (data !== 'Error') {
          eventBus.$emit('repos', data)
          url = 'https://api.github.com/users/' + this.username
          const userData = await cache.match(url).then(async res => {
            if (res === undefined) {
              const response = await fetch(url)
              cache.put(url, await response.clone())
              return await response.clone().json()
            } else {
              return await res.clone().json()
            }
          })
          data.forEach(async repo => {
            const url = repo.languages_url
            const langData = await cache.match(url).then(async res => {
              if (res === undefined) {
                const response = await fetch(url)
                cache.put(url, await response.clone())
                return await response.clone().json()
              } else {
                return await res.clone().json()
              }
            })
            eventBus.$emit('langData', langData)
          })
          eventBus.$emit('userDataInformation', userData)
          eventBus.$emit('submitChange', [true, this.username])
        }
      })
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
    border-bottom: 1px solid var(--accent-three-color);
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
    border-radius: 0.5rem;
    border: 1px solid var(--accent-three-color);
  }

  .username-input::placeholder {
    color: var(--main-bg-color);
  }

  .submit-input {
    background-color: white;
    height: 100%;
    font-size: 1.5rem;
    margin-left: 0.5rem;
    padding: 0.3rem;
    border-radius: 0.5rem;
    border: 1px solid var(--accent-three-color);
    cursor: pointer;
    color: var(--main-bg-color);
  }

  .username-error {
    width: 36%;
    margin-top: 8rem;
    color: white;
    font-size: 2rem;
    font-weight: normal;
  }

  .rate-limit-error {
    width: 39%;
    margin-top: 12rem;
    color: var(--title-font-color);
    font-size: 2rem;
    font-weight: normal;
  }
</style>
