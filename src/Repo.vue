<template>
<div class="container">
  <div class="section-repositories">
    <h1 class="section-title">Repositories</h1>
    <div class="repositories">
      <a :href="'https:\/\/github.com/' + repo.owner.login + '/' + repo.name" class="repo-card" v-for='repo in repoData' :key='repo.name'>
        <h2 class="repo-card-name">{{ repo.name }}</h2>
        <p class="repo-card-description">{{ repo.description }}</p>
        <div class="repo-card-info">
          <p class="repo-card-language">{{ repo.language }}</p>
          <p class="repo-card-stars"><img class="star-icon" height='15px' width='15px' src="https://img.icons8.com/material-outlined/24/000000/star--v2.png"/>{{ repo.stargazers_count }}</p>
          <p class="repo-card-size">{{ repo.size }} KB</p>
        </div>
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    repoData: {
      type: Array
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  background-color: var(--title-font-color);
  margin-top: 5rem;
}

.section-repositories {
  width: 80%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.section-title {
  font-size: 2.5rem;
  color: var(--accent-three-color);
  margin-bottom: 7rem;
  margin-top: 3rem;
}

.repositories {
 display: flex;
 justify-content: flex-start;
 margin-bottom: 10rem;
 width: 80%;
 flex-wrap: wrap;
}

.repo-card {
  border: 1px solid var(--accent-three-color);
  -webkit-box-shadow: 10px 12px 17px -7px rgba(5,56,107,1);
  -moz-box-shadow: 10px 12px 17px -7px rgba(5,56,107,1);
  box-shadow: 10px 12px 17px -7px rgba(5,56,107,1);
  height: 18rem;
  width: 35rem;
  padding: 2rem;
  margin: 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: var(--accent-three-color);
  text-decoration: none;
  cursor: pointer;
}

.repo-card-name {
  font-size: 1.8rem;
  font-weight: bold;
}

.repo-card-description {
  font-size: 1.2rem;
  line-height: 1.6rem;
}

.repo-card-info {
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: space-between;
}

.repo-card-stars {
  display: flex;
  align-items: center;
  text-align: center;
}

.star-icon {
  margin-right: 2px;
}

</style>
