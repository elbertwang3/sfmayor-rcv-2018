import React, {Component}  from 'react';
import '../../css/App.css';
import * as d3 from 'd3';
import {sankey} from '../scripts/sankey.js';

export default class Rcvsankey extends Component {
  constructor(props){
    super(props);

    this.state = {

    };
  }


  componentDidMount() {
    const {data} = this.props
    const that = this


    let chart = rcvchart()
    const el = d3.select('.rcv')

    let width = 0
    let height = 0
    let chartWidth = 0
    let chartHeight = 0
    let rightoffset = 0
    let margin = {top: 25, bottom: 100, right: 25, left: 40}

    let pathLength = 0

    let lastIndex = 0
    let activeIndex = 0
    let tooltip = d3.select("#article")
      .append("div")
      .attr("class", "tooltip")
      .style("visibility", "hidden")
      .on("click",function(){
        console.log("click!")
        d3.select(this).style("visibility","hidden");
      });

    const formatNumber = d3.format(",d")
    const formatPercent = d3.format(".2%")

    const candidates = data.nodes.map(d => d['candidate']).filter((v, i, a) => a.indexOf(v) === i)
    const topThree = candidates.slice(1,4)

    const colorScale = d3.scaleOrdinal()
    const picScale = d3.scaleLinear()
    const fontScale = d3.scaleLinear()

    function resize() {
      //const width = window.innerWidth > 730 ? document.getElementById('article').clientWidth : window.innerWidth
      width = Math.min(window.innerWidth, 1000)
      height = 1000
      //margin.right = width < 600 ? 75 : 125
      rightoffset = width < 600 ? 50 : 100
      chart.width(width).height(height)
      el.call(chart)
    }


    function rcvchart() {
      function enter({ container, data }) {
        /*const photos = container.selectAll(".photos").data([data])
        const photosEnter = photos.enter().append("div").attr("id", "photos")*/

        const svg = container.selectAll('svg').data([data])
        const svgEnter = svg.enter().append('svg').attr("class", "rcvsvg")
        const gEnter = svgEnter.append('g')
        gEnter.append("g").attr("class", "nodes")
        gEnter.append("g").attr("class", "links")
        gEnter.append("g").attr("class", "photos")
        gEnter.append("g").attr("class", "bottomAnnos")
        gEnter.append("g").attr("class", "sideAnnos")
        gEnter.append("g").attr("class", "names")
        gEnter.append("g").attr("class", "voteAnnos")



      }

      function updateScales({ data }) {  

        colorScale
          .domain(candidates)
          .range(["#AB7967", "#EC5F67", "#FAC863", "#5FB3B3", "#6699CC","#C594C5","#99C794","#F99157","#4F5B66"]);

        picScale
          .domain([300,1000])
          .range([20,50])
        fontScale
          .domain([300,1000])
          .range([8, 16])
      }

      
      function updateDom({ container, data}) {
        const svg = container.select('svg')
        svg
          .attr('width', width)
          .attr('height', height)

        const g = svg.select('g')

        g.attr('transform', `translate(${margin.left}, ${margin.top})`)

        const nodes = g.select(".nodes")
        const links = g.select(".links")
        const photos = g.select(".photos")
        const bottomAnnos = g.select(".bottomAnnos")
        const sideAnnos = g.select(".sideAnnos")
        const names = g.select(".names")
        const voteAnnos = g.select(".voteAnnos")

        var sank = sankey()
          .nodeWidth(16) // was 15
          .nodePadding(25) // was 10
          .size([chartWidth, chartHeight]);
        
        var path = sank.link();

        sank
          .nodes(data.nodes)
          .links(data.links)
          .layout(32); // what is this? iterations

        pathLength = data.nodes[2]['y']

        const link = links.selectAll(".linkg")
           .data(data.links)
        link.exit().remove()
        const linkEnter = link
          .enter()
          .append("g")
          .attr("class", "linkg")
        .merge(link)

        const linkpath = linkEnter.selectAll(".link")
          .data(d => [d])
        linkpath.exit().remove()
        linkpath
          .enter()
          .append("path")
          .attr("class", "link")
        .merge(linkpath)
          .attr("d", path)
          .attr("stroke-width", function(d) { return Math.max(2, d.dy); })
          .attr("stroke", function(d) { 
            return colorScale(d['source']['candidate'])
          })
          .attr("stroke-opacity", d => d['source']['candidate'] == "Jane Kim" && d['target']['candidate'] == "Mark Leno" ? 1 : 0.25)
          //.sort(function(a, b) { return b.dy - a.dy; });
          .on("mouseover", function(d) {
            let datum = d
            if (d['source']['candidate'] == d['target']['candidate']) {
              if (d['source']['candidate'] != "Exhausted Ballots") {
                if (d['source']['round'] == 1) {
                  tooltip.text(`${d['source']['candidate']} wins ${formatNumber(d['source']['votes'])} votes (${formatPercent(d['source']['votes']/d3.sum(data.nodes.filter(d => d['round'] == datum['source']['round'] && d['candidate'] != "Exhausted Ballots").map(d => d['votes'])))}) first-choice votes.`)
                } else {
                  tooltip.text(`${d['source']['candidate']} carried ${formatNumber(d['source']['votes'])} votes (${formatPercent(d['source']['votes']/d3.sum(data.nodes.filter(d => d['round'] == datum['source']['round'] && d['candidate'] != "Exhausted Ballots").map(d => d['votes'])))}) to the next round of elimination.`)
                }
              } else {
                tooltip.text(`${d['value']} votes have been exhausted.`)
              }
            } else {
              if (d['target']['candidate'] != "Exhausted Ballots") {
                tooltip.text(`${formatNumber(d['value'])} votes (${formatPercent(d['value']/d['source']['votes'])}) from ${d['source']['candidate']} are redistributed to ${d['target']['candidate']}.`)
              } else {
                tooltip.text(`${formatNumber(d['value'])} votes (${formatPercent(d['value']/d['source']['votes'])}) from ${d['source']['candidate']} are exhausted.`)
              }
      
            }
            tooltip
              .style("visibility", "visible")
              tooltip
              .style("top", function(d) {
                const tooltipheight = tooltip.node().getBoundingClientRect().height

                /*if (d3.event.pageY + tooltipheight + 10 > chartHeight) {
                  return (d3.event.pageY - tooltipheight - 10) +"px"
                } else {
                  return (d3.event.pageY + 10) +"px"
                }*/
                return (d3.event.pageY + 10) +"px"
              })
              .style("left", function(d) {
                const tooltipwidth = tooltip.node().getBoundingClientRect().width
                if (d3.event.pageX + tooltipwidth + 10 > chartWidth) {
                  return (d3.event.pageX - tooltipwidth - 10) +"px"
                } else {
                  return (d3.event.pageX+10)+"px"
                }
                
              })
          })
          .on("mousemove", function(d) {
            tooltip
              .style("top", function(d) {
                const tooltipheight = tooltip.node().getBoundingClientRect().height

                /*if (d3.event.pageY + tooltipheight + 10 > chartHeight) {
                  return (d3.event.pageY - tooltipheight - 10) +"px"
                } else {
                  return (d3.event.pageY + 10) +"px"
                }*/
                return (d3.event.pageY + 10) +"px"
              })
              .style("left", function(d) {
                const tooltipwidth = tooltip.node().getBoundingClientRect().width
                if (width <= 480) {
                  const offset = (width - tooltipwidth)/2
                  return offset + "px"
                }
                else if (d3.event.pageX + tooltipwidth + 10 > width) {
                  return (d3.event.pageX - tooltipwidth - 10) +"px"
                } else {
                  return (d3.event.pageX+10)+"px"
                }
              })
          })
          .on("mouseout", function(d) {
            tooltip
              .style("visibility", "hidden")
          })

          
        const node = nodes.selectAll(".node")
          .data(data.nodes, d => d['name'])
        node.exit().remove()
        const nodeEnter = node
          .enter()
          .append("g")
          .attr("class", "node")
        .merge(node)
          .attr("transform", d => `translate(${d.x}, ${d.y})`)

        
        const nodeRect = nodeEnter.selectAll(".nodeRect")
          .data(d => [d])
        nodeRect.exit().remove()
        nodeRect
          .enter()
          .append("rect")
          .attr("class", "nodeRect")
        .merge(nodeRect)
          .attr("height", sank.nodeWidth())
          .attr("width", function(d) { return Math.max(2, d.dy); })
          .attr("fill", function(d) {
            return d.color = colorScale(d['candidate'])
          })

        /*const picg = photos.selectAll(".picg")
          .data(d => data.nodes.filter(d => d['round'] == 1))
        picg.exit().remove()
        const picgEnter = picg
          .enter()
          .append("g")
          .attr("class", "picg")
        .merge(picg)
          .attr("transform", d => `translate(${d.x + (d.dy/2)-(picScale(width)/2)}, ${d.y - picScale(width)*1.05})`)
        const pic = picgEnter.selectAll(".pic")
          .data(d => [d])
        pic.exit().remove()
        pic
          .enter()
          .append('svg:image')
          .attr("class", "pic")
          .attr("xlink:href", d => `./assets/photos/${d['candidate'].replace(/\s/g, '')}.gif`)
        .merge(pic)
          .attr("width", d => picScale(width))
          .attr("height", d => picScale(width))*/

        const bottomAnno = bottomAnnos.selectAll(".bottomAnno")
          .data(data.nodes.filter(d => d['round'] == 7))

        bottomAnno.exit().remove()
        const bottomAnnoEnter = bottomAnno
          .enter()
          .append("g")
          .attr("class", "bottomAnno")
        .merge(bottomAnno)
          .attr("transform", d => `translate(${d.x + (d.dy/2)}, ${chartHeight + sank.nodeWidth()/4})`)
        
        const wrapWidth = chartWidth/8

        const bottomTextName = bottomAnnoEnter.selectAll(".bottomTextName")
          .data(d => [d])

        bottomTextName.exit().remove()
        bottomTextName
          .enter()
          .append("text")
          .attr("class", "bottomTextName")
          .attr("dy", "1em")
        .merge(bottomTextName)
          .text(d => width < 600 && d['candidate'] == 'Exhausted Ballots' ? 'Exhausted' : d['candidate'])
          .attr("text-anchor", d => width < 390 && d['candidate'] == "Exhausted Ballots" ? "start" : "middle")
          .style("font-size", `${fontScale(width)}px`)


        const bottomTextVotes = bottomAnnoEnter.selectAll(".bottomTextVotes")
          .data(d => [d])


        bottomTextVotes.exit().remove()
        bottomTextVotes
          .enter()
          .append("text")
          .attr("class", "bottomTextVotes")
          .attr("dy", "1em")
        .merge(bottomTextVotes)
          .text(d => `${formatNumber(d['votes'])} votes`)
          .attr("x", 0)
          .attr("y", fontScale(width) * 1.5)
          .attr("text-anchor", d => width < 390 && d['candidate'] == "Exhausted Ballots" ? "start" : "middle")
          .style("font-size", `${fontScale(width)}px`)
          //.call(wrap, wrapWidth)

        const bottomTextPercent = bottomAnnoEnter.selectAll(".bottomTextPercent")
          .data(d => [d])

        bottomTextVotes.exit().remove()
        bottomTextVotes
          .enter()
          .append("text")
          .attr("class", "bottomTextPercent")
          .attr("dy", "1em")
        .merge(bottomTextPercent)
          .text(d => d['candidate'] != 'Exhausted Ballots' ? `${formatPercent(d['votes']/d3.sum(data.nodes.filter(d => d['round'] == 7 && d['candidate'] != "Exhausted Ballots").map(d => d['votes'])))}` : '')
          .attr("x", 0)
          .attr("y", fontScale(width) * 1.5 * 2)
          .attr("text-anchor", d => width < 390 && d['candidate'] == "Exhausted Ballots" ? "start" : "middle")
          .style("font-size", `${fontScale(width)}px`)


        const eliminated = d3.nest()
          .key(function(d) { return d['round']; })
          .rollup(function(v) { 
            return v[v.map(d => d['votes']).indexOf(d3.min(v.filter(d => d['candidate'] != "Exhausted Ballots"), d => d['votes']))]; 
          })
          .entries(data.nodes)
          .map(d => d['value'])
          .slice()

        eliminated.pop()

        const sideAnno = sideAnnos.selectAll(".sideAnno")
          .data(eliminated)

        sideAnno.exit().remove()
        const sideAnnoEnter = sideAnno
          .enter()
          .append("g")
          .attr("class", "sideAnno")
        .merge(sideAnno)
          .attr("transform", function(d) { 
            return `translate(${chartWidth + rightoffset*3/4}, ${d.y + pathLength/2})`
          })

        /*const sideText = sideAnnoEnter.selectAll(".sideText")
          .data(d => [d])

        sideText.exit().remove()
        sideText
          .enter()
          .append("text")
          .attr("class", "sideText")
          .attr("dy", "1em")
        .merge(sideText)
          .text(d => `${d['candidate']}'s votes are redistributed and exhausted`)
          .call(wrap, rightoffset)
          .attr("y", function(d) {
            const height = d3.select(this).node().getBBox().height
            return -height/2
          })*/

        const name = names.selectAll(".name")
          .data(data.nodes.filter(d => d['round'] == 1 || d['name'] == "Exhausted Ballots round2"))
        name.exit().remove()
        name
          .enter()
          .append("text")
          .attr("class", "name")
        .merge(name)
          .text(d => d['candidate'])
          .attr("transform", d => `translate(${d.x - picScale(width)/8}, ${d.y}) rotate(-90)`)



        const voteAnno = voteAnnos.selectAll(".voteAnno")
          .data(data.nodes.filter(d => topThree.includes(d['candidate']) && d['round'] != 7))

        voteAnno.exit().remove()
        voteAnno
          .enter()
          .append("text")
          .attr("class", "voteAnno")
        .merge(voteAnno)
          .text(d => `${formatNumber(d['votes'])} votes`)
          //.attr("transform", d => `translate(${d['source'].x + picScale(width)/8}, ${d['source'].y + 3}) rotate(-90)`)
          .attr("transform", d => width < 700 ? `translate(${d.x + picScale(width)/8}, ${d.y + 3}) rotate(-90)` : `translate(${d.x + d.dy/2}, ${d.y + sank.nodeWidth()/2})`)
          .attr("text-anchor", d => width < 700 ? "end" : "middle")
          .attr("alignment-baseline", d => width < 700 ? "hanging" : "middle")









      }

      function chart(container) {
        const data = container.datum()
        enter({ container, data })
        updateScales({ container, data})
        updateDom({ container, data })

      }

      chart.width = function(...args) {
        if (!args.length) return width
        width = args[0]
        chartWidth = width - margin.left - margin.right
        return chart
      }

      chart.height = function(...args) {
        if (!args.length) return height
        height = args[0]
        chartHeight = height - margin.top - margin.bottom
        return chart
      }
      return chart
    }

    function init() {
      el.datum(data)
      resize()
      window.addEventListener('resize', resize)
    }



    init()


    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("dy", lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      })
    }
  }

  render() {
    return <div className="rcv">
    </div>
  }
}