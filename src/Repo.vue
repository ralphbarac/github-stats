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
      <h1 class="section-title">Statistics</h1>
      <p class="section-description">The charts here are very much a WIP and being built with d3js.</p>
      <div class="stats-container">
        <div class="graph-container">
          <h1 class="chart-title">Primary Language Distribution</h1>
          <svg id="donut-chart" width="300" height ="300"></svg>
        </div>
        <!--
        <div class="graph-container">
          <h1 class="chart-title">Most Starred Repositories</h1>
          <svg id="bar-chart" width="300" height ="300"></svg>
        </div>
        -->
      </div>
  </div>
</div>
</template>

<script>

import * as d3 from 'd3'

export default {
  methods: {
    calcLanguagePerc: function () {
      const languageArray = []
      for (let i = 0; i < this.repoData.length; i++) {
        if (this.repoData[i].language != null) {
          languageArray.push(this.repoData[i].language)
        }
      }

      const percentArray = []

      const totalLangs = languageArray.length
      const uniqueLangs = [...new Set(languageArray)]
      uniqueLangs.forEach(currLang => {
        const numLangs = languageArray.filter(languageArray => languageArray === currLang)
        percentArray.push({ language: currLang, percent: (numLangs.length * 100 / totalLangs).toFixed(3) })
      })

      return percentArray
    },
    graph1: function () {
      const svg = d3.select('#donut-chart')

      const data = this.calcLanguagePerc()

      const h = 300
      const w = 300

      const colours = d3.scaleOrdinal(data.map(d => d.language), d3.schemeSet3)

      const arc = d3.arc()
        .innerRadius(0.5 * h / 2)
        .outerRadius(0.85 * h / 2)
        .cornerRadius(5)

      const pie = d3.pie()
        .value(d => d.percent)

      const pieArcs = pie(data)

      const arcLabel = d3.arc()
        .innerRadius(0.5 * h / 2)
        .outerRadius(0.85 * h / 2)

      svg.append('g')
        .attr('transform', `translate(${w / 2}, ${h / 2})`)
        .selectAll('path')
        .data(pieArcs)
        .join('path')
        .style('stroke', '#3036c6')
        .style('stroke-width', 1)
        .style('fill', d => colours(d.data.language))
        .attr('d', arc)
      svg.append('g')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${w / 2}, ${h / 2})`)
        .selectAll('text')
        .data(pieArcs)
        .join('text')
        .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
        .attr('y', '-0.4em')
        .attr('font-weight', 'bold')
        .text(d => d.data.language)
    },
    graph2: function () {
      const margin = 30
      const width = 250
      const height = 250

      const svg = d3.select('#bar-chart')

      const dataUnfiltered = []
      const data = []

      this.repoData.forEach(repo => dataUnfiltered.push({ name: repo.name, stars: repo.stargazers_count }))

      dataUnfiltered.sort(function (a, b) { return b.stars - a.stars })

      for (let i = 0; i < 5; ++i) {
        data.push(dataUnfiltered[i])
      }

      let maxStars = 0
      data.forEach(el => {
        if (el.stars > maxStars) {
          maxStars = el.stars
        }
      })

      const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, maxStars])

      const yAxis = d3.axisLeft(yScale)
        .ticks(5, 'f')

      const xScale = d3.scaleBand()
        .range([0, width])
        .domain(data.map(s => s.name))

      svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`)
        .call(yAxis)

      svg.append('g')
        .attr('transform', `translate(${margin}, ${height + 30})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .style('text-anchor', 'start')
        .attr('transform', 'rotate(90)')
    }
  },
  beforeUpdate () {
    this.graph1()
    this.graph2()
  },
  props: {
    repoData: {
      type: Array
    },
    userData: {
      type: Object
    }
  }
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  background-color: var(--accent-three-color);
  margin-top: 5rem;
  flex-direction: column;
  align-items: center;
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
  color: var(--main-bg-color);
  margin-bottom: 7rem;
  margin-top: 3rem;
}

.section-description {
  font-size: 1.5rem;
  color: var(--main-bg-color);
  margin-top: -5rem;
  margin-bottom: 5rem;
}

.section-stats {
  display: flex;
  flex-direction: column;
}

.repositories {
 display: flex;
 justify-content: center;
 width: 100%;
 flex-wrap: wrap;
}

.repo-card {
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
  color: var(--main-bg-color);
  text-decoration: none;
  cursor: pointer;
  border: 1px solid var(--main-bg-color)
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

.stats-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
}

.graph-container {
  margin-bottom: 3rem;
}

.chart-title {
  text-align: center;
  font-size: 1.5rem;
  color: var(--main-bg-color);
}

</style>
