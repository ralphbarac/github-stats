<template>
  <div class="container">
     <div class="user-account-overview">
        <h1 class="user-name">{{ userData.name }}</h1>
        <h2 class="github-link"><a href="userData.username">@{{ userData.username }}</a></h2>
        <p class="creation-date">{{ userData.joinDate }}</p>
        <div class="basic-stat-container">
          <div class="basic-stat-block">Repos: {{ userData.repositories.length }}</div>
          <div class="basic-stat-block">Followers: {{ userData.followers }}</div>
          <div class="basic-stat-block">Following: {{userData.following }}</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object
    }
  }
}
</script>

<style>
</style>
