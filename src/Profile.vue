<template>
<div class="container">
  <div class="user-account-overview">
    <img :src='userData.profileImage' alt="" class="image-container">
    <h1 class="user-name">{{ userData.name }}</h1>
    <h2 class="github-link"><a :href="'https:\/\/github.com/' + userData.username">@{{ userData.username }}</a></h2>
    <p class="creation-date">{{ userData.joinDate }}</p>
    <div class="basic-stat-container">
      <div class="basic-stat-block"><p class="stat-number">{{ userData.repositories.length }}</p><p class="stat-name">Repositories</p></div>
      <div class="basic-stat-block"><p class="stat-number">{{ userData.followers }}</p><p class="stat-name">Followers</p></div>
      <div class="basic-stat-block"><p class="stat-number">{{ userData.following }}</p><p class="stat-name">Following</p></div>
    </div>
  </div>
</div>
</template>

<script>
// import { eventBus } from './main'

export default {
  props: {
    userData: {
      type: Object
    }
  }
}
</script>

<style>

.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  margin: 0 auto;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.user-account-overview {
  width: 60%;
  height: 40%;
  margin-top: 10rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
}

.user-name {
  font-size: 4rem;
  color: var(--title-font-color);
}

.image-container {
  height: 12rem;
  width: 12rem;
  border-radius: 6rem;
  border: 4px solid var(--accent-one-color);
}

.github-link a {
  color: var(--accent-one-color);
  text-decoration: none;
  font-size: 2rem;
}

.creation-date {
  color: var(--accent-one-color);
  font-size: 1.5rem;
  font-weight: bold;
}

.basic-stat-container {
  height: 25%;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.basic-stat-block {
  height: 100%;
  width: 20%;
  border-radius: 1rem;
  background-color: var(--title-font-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: var(--main-bg-color);
}
.stat-name {
  font-size: 2rem;
  color: var(--accent-one-color);
}
</style>
