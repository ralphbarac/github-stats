<template>
<div>
  <div class="user-account-overview">
    <nav class="nav">
      <button class='back-button' @click=submitChange()>Home</button>
    </nav>
    <img :src='userData.profileImage' alt="" class="image-container">
    <h1 class="user-name">{{ userData.name }}</h1>
    <h2 class="github-link"><a :href="'https:\/\/github.com/' + userData.username">@{{ userData.username }}</a></h2>
    <p class="creation-date">Joined: {{ userData.joinDate }}</p>
    <div class="basic-stat-container">
      <div class="basic-stat-block"><p class="stat-number">{{ userData.repositories.length }}</p><p class="stat-name">Repositories</p></div>
      <div class="basic-stat-block"><p class="stat-number">{{ userData.followers }}</p><p class="stat-name">Followers</p></div>
      <div class="basic-stat-block"><p class="stat-number">{{ userData.following }}</p><p class="stat-name">Following</p></div>
    </div>
  </div>
  <gs-repo :repoData='userData.repositories'></gs-repo>
</div>
</template>

<script>
import { eventBus } from './main'

export default {
  props: {
    userData: {
      type: Object
    }
  },
  methods: {
    submitChange: function () {
      eventBus.$emit('submitChange', false)
    }
  }
}
</script>

<style scoped>
.user-account-overview {
  height: 40rem;
  margin-top: 8rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.nav {
  width: 80%;
  display: flex;
}

.back-button {
  background-color: var(--main-bg-color);
  border: none;
  text-decoration: none;
  font-size: 2rem;
  color: var(--title-font-color);
}

.back-button:hover {
  color: var(--accent-three-color);
  cursor: pointer;
}

.user-name {
  font-size: 4rem;
  color: var(--title-font-color);
}

.image-container {
  height: 12rem;
  width: 12rem;
  border-radius: 6rem;
  border: 4px solid var(--accent-three-color);
}

.github-link a {
  color: var(--accent-three-color);
  text-decoration: none;
  font-size: 2rem;
}

.github-link a:hover {
  border-bottom: 1px solid var(--accent-three-color);
}

.creation-date {
  color: var(--accent-three-color);
  font-size: 1.5rem;
  font-weight: bold;
}

.basic-stat-container {
  height: 25%;
  width: 80%;
  display: grid;
  grid-gap: 7rem;
  grid-template-columns: repeat(3, minmax(10rem, 15rem));
  justify-content: center;
}

.basic-stat-block {
  height: 100%;
  width: 18rem;
  border-radius: 1rem;
  background-color: var(--title-font-color);
  border: 1px solid var(--accent-three-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: var(--accent-three-color);
}
.stat-name {
  font-size: 2rem;
  color: var(--accent-three-color);
}
</style>
