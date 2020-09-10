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
      <p class="section-description">Due to the high potential number of elements some of these graphs may have, I decided to go with hover effects to display data (to remove the need for legends with 20-30 elements). I understand that at a glance these visualizations are not ideal for actually displaying data, they are mostly for me to learn the ropes of d3js (data binding, animations, etc). </p>
      <div class="stats-container">
        <div class="graph-container">
          <h1 class="chart-title">Primary Language Distribution</h1>
          <svg id="donut-chart" width="500" height ="500"></svg>
        </div>
        <div class="graph-container">
          <h1 class="chart-title">Top 5 Starred Repos</h1>
          <svg id="bar-chart" width="500" height ="700"></svg>
        </div>
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
        percentArray.push({ language: currLang, percent: (numLangs.length * 100 / totalLangs).toFixed(2) })
      })

      return percentArray
    },
    calcStarRepos: function () {
      const starArray = []
      for (let i = 0; i < this.repoData.length; i++) {
        starArray.push({ name: this.repoData[i].name, stars: this.repoData[i].stargazers_count })
      }
      return starArray.sort((a, b) => (b.stars - a.stars)).slice(0, 5)
    },
    graph1: function () {
      const svg = d3.select('#donut-chart')

      const data = this.calcLanguagePerc()

      data.sort(function (a, b) { return b.percent - a.percent })

      const h = 500
      const w = 500

      const colours = d3.scaleOrdinal(data.map(d => d.language), d3.schemeCategory10)

      const arc = d3.arc()
        .innerRadius(0.5 * h / 2)
        .outerRadius(0.85 * h / 2)
        .cornerRadius(5)

      const pie = d3.pie()
        .value(d => d.percent)

      const pieArcs = pie(data)

      svg.append('g')
        .attr('transform', `translate(${w / 2}, ${h / 2})`)
        .selectAll('path')
        .data(pieArcs)
        .join('path')
        .style('stroke', '#3036c6')
        .style('stroke-width', 1)
        .style('fill', d => colours(d.data.language))
        .attr('d', arc)
        .on('mouseenter', function (d, i) {
          const lang = d.data.language
          const percent = d.data.percent
          d3.select('circle').transition()
            .style('fill', d => colours(lang))
            .duration(50)
          d3.select('g')
            .append('text')
            .style('fill', d => colours(lang))
            .attr('text-anchor', 'middle')
            .style('font-weight', 'bold')
            .style('font-size', '4em')
            .text(lang)
          d3.select('g')
            .append('text')
            .style('font-size', '1.5em')
            .attr('y', 30)
            .style('fill', d => colours(lang))
            .attr('text-anchor', 'middle')
            .style('font-weight', 'bold')
            .text(percent + '%')
        })
        .on('mouseout', function (d, i) {
          d3.select('circle').transition()
            .style('fill', '#d2fdff')
            .duration(50)
          svg.selectAll('text').remove()
        })

      svg.append('circle')
        .data(pieArcs)
        .attr('cx', w / 2)
        .attr('cy', h / 2)
        .attr('r', 0.5 * h / 2)
        .style('fill', '#d2fdff')
        .attr('opacity', 0.65)
    },
    graph2: function () {
      const data = this.calcStarRepos()

      const h = 450
      const w = 450

      const margin = { top: 20, right: 0, bottom: 30, left: 50 }

      const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, w - margin.right])
        .padding(0.1)

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.stars)]).nice()
        .range([h - margin.bottom, margin.top])

      const yAxis = g => g
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y))
        .attr('text-anchor', 'end')

      const xAxis = g => g
        .attr('transform', `translate(0, ${h - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0))
        .selectAll('text')
        .attr('transform', 'rotate(90)')
        .attr('text-anchor', 'start')
        .attr('dy', '-0.6em')
        .attr('dx', '1em')

      const svg = d3.select('#bar-chart')

      svg.append('g')
        .attr('fill', '#3036C6')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d.stars))
        .attr('height', d => y(0) - y(d.stars))
        .attr('width', x.bandwidth())
        .on('mouseenter', function (d, i) {
          const data = d.stars
          d3.select(this).transition()
            .attr('fill', '#fbe8a6')
            .duration(50)
          svg.select('g')
            .append('text')
            .attr('class', 'number')
            .style('font-size', '2em')
            .attr('text-anchor', 'middle')
            .style('font-weight', 'bold')
            .style('fill', '#303c6c')
            .attr('x', (i * 80) + 90)
            .attr('y', d => y(data) - 10)
            .text(d.stars)
        })
        .on('mouseout', function (d, i) {
          d3.select(this).transition()
            .attr('fill', '#3036C6')
            .duration(50)
          svg.select('g').selectAll('text').remove()
        })

      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)
    }
  },
  mounted () {
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
  display: flex;
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
