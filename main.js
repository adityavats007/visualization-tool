

  function print2(){
    var pos1=document.getElementById('BODY')
    var content=pos1.innerHTML;
    pos1.innerHTML=content;
    var pos2=document.getElementById('chart');
    pos2.innerHTML='';
    var fromdate=document.getElementById('from');
    var todate=document.getElementById('to');
    console.log(fromdate.value);
    console.log(todate.value);
 
    call1((document.getElementById('checkbox')).checked,fromdate,todate);

  }

  function print1(){
    var pos1=document.getElementById('BODY')
    var content=pos1.innerHTML;
    pos1.innerHTML=content;
    var pos2=document.getElementById('chart');
    pos2.innerHTML='';
    filter((document.getElementById('checkbox')).checked);

  }
    function filter(onoff){
       var stan=document.getElementById('stan');
       stan1=stan.value;
       console.log(stan1);
        var client=new elasticsearch.Client();
     console.log(client);
 client.search({
        index: 'test11',
          from:0,
        size: 4000,
      "sort": [
  "timestamp.keyword:asc"
  ]
       
    }).then(function (resp) {
      data1=resp.hits.hits;
      var svg, tooltip, biHiSankey, path, defs, colorScale, highlightColorScale, isTransitioning;

var OPACITY = {
    NODE_DEFAULT: 0.9,
    NODE_FADED: 0.1,
    NODE_HIGHLIGHT: 0.8,
    LINK_DEFAULT: 0.6,
    LINK_FADED: 0.05,
    LINK_HIGHLIGHT: 0.9
  },
  //TYPES = ["Asset", "Expense", "Revenue", "Equity", "Liability"],

  TYPES = ["accounting", "authorization", "master-data-management", "notifications", "approval"],
  TYPE_COLORS = ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
  TYPE_HIGHLIGHT_COLORS = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494"],
  LINK_COLOR = "#b3b3b3",
  //LINK_COLOR="url(#svgGradient)";
  //INFLOW_COLOR = "url(#svgGradient)",
  //OUTFLOW_COLOR = "url(#svgGradient)",
  INFLOW_COLOR = "#2E86D1",
  OUTFLOW_COLOR = "#D63028",
  NODE_WIDTH = 36,
  COLLAPSER = {
    RADIUS: NODE_WIDTH / 2,
    SPACING: 2
  },
  OUTER_MARGIN = 10,
  MARGIN = {
    TOP: 2 * (COLLAPSER.RADIUS + OUTER_MARGIN),
   //TOP: -1,
    RIGHT: OUTER_MARGIN,
    BOTTOM: OUTER_MARGIN,
    LEFT: OUTER_MARGIN
  },
  TRANSITION_DURATION = 400,
  HEIGHT = 700 - MARGIN.TOP - MARGIN.BOTTOM,
  WIDTH = 560 - MARGIN.LEFT - MARGIN.RIGHT,
  LAYOUT_INTERATIONS = 32,
  REFRESH_INTERVAL = 7000;

var formatNumber = function (d) {
  var numberFormat = d3.format(",.0f"); // zero decimal places
  return numberFormat(d);
},

formatFlow = function (d) {
  var flowFormat = d3.format(",.0f"); // zero decimal places with sign
  return flowFormat(Math.abs(d));
},

// Used when temporarily disabling user interractions to allow animations to complete
disableUserInterractions = function (time) {
  isTransitioning = true;
  setTimeout(function(){
    isTransitioning = false;
  }, time);
},

hideTooltip = function () {
  return tooltip.transition()
    .duration(TRANSITION_DURATION)
    .style("opacity", 0);
},

showTooltip = function () {
  return tooltip
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + 15 + "px")
    .transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", 1);
};
showTooltip1 = function () {
  return tooltip
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + 15 + "px")
    .transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", 1);
};

colorScale = d3.scale.ordinal().domain(TYPES).range(TYPE_COLORS),
highlightColorScale = d3.scale.ordinal().domain(TYPES).range(TYPE_HIGHLIGHT_COLORS);

svg = d3.select("#chart").append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
        .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
        .style("fill","#09134c");
       /* svg = d3.select("#chart").append("div")
        .selectAll(svg)
        .data(d3.range(TYPES.length).map(function() { return {x: 240 / 2, y: 240 / 2}; }))
        .enter().append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
        .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");*/

svg.append("g").attr("id", "links");
svg.append("g").attr("id", function(){return "nodes"});
svg.append("g").attr("id", "collapsers");

tooltip = d3.select("#chart").append("div").attr("id", "tooltip");

tooltip.style("opacity", 0)
    .append("p")
      .attr("class", "value");

biHiSankey = d3.biHiSankey();

// Set the biHiSankey diagram properties
biHiSankey
  .nodeWidth(NODE_WIDTH)
  .nodeSpacing(20)
  .linkSpacing(40)
  .arrowheadScaleFactor(0.5) // Specifies that 0.5 of the link's stroke WIDTH should be allowed for the marker at the end of the link.
  .size([WIDTH, HEIGHT]);

path = biHiSankey.link().curvature(0.45);

defs = svg.append("defs");

function setgrad(node){ 
}
   

defs.append("marker")
  .style("fill", LINK_COLOR)
  .attr("id", "arrowHead")
  .attr("viewBox", "0 0 6 10")
  .attr("refX", "1")
  .attr("refY", "5")
  .attr("markerUnits", "strokeWidth")
  .attr("markerWidth", "1")
  .attr("markerHeight", "1")
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

defs.append("marker")
  .style("fill", OUTFLOW_COLOR)
  .attr("id", "arrowHeadInflow")
  .attr("viewBox", "0 0 6 10")
  .attr("refX", "1")
  .attr("refY", "5")
  .attr("markerUnits", "strokeWidth")
  .attr("markerWidth", "1")
  .attr("markerHeight", "1")
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

defs.append("marker")
  .style("fill", INFLOW_COLOR)
  .attr("id", "arrowHeadOutlow")
  .attr("viewBox", "0 0 6 10")
  .attr("refX", "1")
  .attr("refY", "5")
  .attr("markerUnits", "strokeWidth")
  .attr("markerWidth", "1")
  .attr("markerHeight", "1")
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");
 var z=document.getElementById('title');
  
  var z1=document.getElementById('stan');
  if(onoff){
  z.innerHTML=z1.value + "  "+ "By Count";}
  else
    z.innerHTML=z1.value + "  "+ "By Response Time";
function update () {
  var z=document.getElementById('title');
  
  var z1=document.getElementById('stan');
  /*if(onoff){
  z.innerHTML=z1.value + "  "+ "By Count";}
  else
    z.innerHTML=z1.value + "  "+ "By Response Time";*/
  var endColor;
  var link, linkEnter, node, nodeEnter, collapser, collapserEnter;
  endColor="green";
 var gradient = defs.append("linearGradient")
        
       .attr("id", "svgGradient")
       .attr("x1", "0%")
       .attr("x2", "100%")
       .attr("y1", "0%")
       .attr("y2", "100%");

    gradient.append("stop")
        
       .attr('class', 'start')
       .attr("offset", "0%")
       .attr("stop-color", "blue")
       .attr("stop-opacity", 1);
    
    gradient.append("stop")
    
       .attr('class', 'end')
       .attr("offset", "100%")
       .attr("stop-color", function(d){return endColor;})
       .attr("stop-opacity", 1);
     //setgrad(Nodes);

  function dragmove(node) {
    /*node.x = Math.max(0, Math.min(WIDTH - node.width, d3.event.x));
    node.y = Math.max(0, Math.min(HEIGHT - node.height, d3.event.y));
    d3.select(this).attr("transform", "translate(" + node.x + "," + node.y + ")");
    biHiSankey.relayout();
    svg.selectAll(".node").selectAll("rect").attr("height", function (d) { return d.height; });
    link.attr("d", path);*/
  }
  function setpos(node) {
    z=document.getElementById("accounting");
    node.x = Math.max(0, Math.min(WIDTH - node.width, d3.event.x));
    node.y = Math.max(0, Math.min(HEIGHT - node.height, d3.event.y));
    d3.select(this)
    .append("div")
    .attr("transform", "translate(" + z.offsetLeft + "," + z.offsetTop + ")");
    biHiSankey.relayout();
    svg.selectAll(".node").selectAll("rect").attr("height", function (d) { return d.height; });
    link.attr("d", path);
  }

  function containChildren(node) {
    node.children.forEach(function (child) {
      child.state = "contained";
      child.parent = this;
      child._parent = null;
      containChildren(child);
    }, node);
  }

  function expand(node) {
    node.state = "expanded";
    node.children.forEach(function (child) {
      child.state = "collapsed";
      child._parent = this;
      child.parent = null;
      containChildren(child);
    }, node);
  }

  function collapse(node) {
    node.state = "collapsed";
    containChildren(node);
  }

  function restoreLinksAndNodes() {
    link
      .style("stroke", function(d){if(d.status=="FAIL"){console.log("fail");return "red";}else return "url(#svgGradient)";})
      .style("marker-end", function () { return 'url(#arrowHead)'; })
      .transition()
        .duration(TRANSITION_DURATION)
        .style("opacity", OPACITY.LINK_DEFAULT);


    node
      .selectAll("rect")
        .style("fill", function (d) {
          d.color = colorScale(d.type.replace(/ .*/, ""));
          return d.color;
        })
        .style("stroke", function (d) {
          return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
        })
        .style("fill-opacity", OPACITY.NODE_DEFAULT);

    node.filter(function (n) { return n.state === "collapsed"; })
      .transition()
        .duration(TRANSITION_DURATION)
        .style("opacity", OPACITY.NODE_DEFAULT);
  }

  function showHideChildren(node) {
  
    disableUserInterractions(2 * TRANSITION_DURATION);
    hideTooltip();
    if (node.state === "collapsed") { expand(node); }
    else { collapse(node); }

    biHiSankey.relayout();
    update();
    link.attr("d", path);
    restoreLinksAndNodes();
  }

  function highlightConnected(g) {
    link.filter(function (d) { return d.source === g; })
      .style("marker-end", function () { return 'url(#arrowHeadInflow)'; })
      .style("stroke", OUTFLOW_COLOR)
      .style("opacity", OPACITY.LINK_DEFAULT);

    link.filter(function (d) { return d.target === g; })
      .style("marker-end", function () { return 'url(#arrowHeadOutlow)'; })
      .style("stroke", INFLOW_COLOR)
      .style("opacity", OPACITY.LINK_DEFAULT);
  }

  function fadeUnconnected(g) {
    link.filter(function (d) { return d.source !== g && d.target !== g; })
      .style("marker-end", function () { return 'url(#arrowHead)'; })
      .transition()
        .duration(TRANSITION_DURATION)
        .style("opacity", OPACITY.LINK_FADED);

    node.filter(function (d) {
      return (d.name === g.name) ? false : !biHiSankey.connected(d, g);
    }).transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", OPACITY.NODE_FADED);
  }

  link = svg.select("#links").selectAll("path.link")
    .data(biHiSankey.visibleLinks(), function (d) { return d.id; });

  link.transition()
    .duration(TRANSITION_DURATION)
    .style("stroke-WIDTH", function (d) { return Math.max(1, d.thickness); })
    .attr("d", path)
    .style("opacity", OPACITY.LINK_DEFAULT);


  link.exit().remove();


  linkEnter = link.enter().append("path")
    .attr("class", "link")
    .style("fill", "none");
    


  linkEnter.on('mouseenter', function (d) {
    if (!isTransitioning) {
      showTooltip().select(".value").text(function () {
        if (d.direction > 0) {
          return d.source.name + " → " + d.target.name + "\n" + formatNumber(d.value);
        }
        return d.target.name + " ← " + d.source.name + "\n" + formatNumber(d.value);
      });

      d3.select(this)
        .style("stroke", "url(#svgGradient)")
        .transition()
          .duration(TRANSITION_DURATION / 2)
          .style("opacity", OPACITY.LINK_HIGHLIGHT);
    }
  });

  linkEnter.on('click',function(d){
    console.log(d);
    showTooltip().select(".value").text(function () {
        if (d.direction > 0) {
         
          return d.status+"  "+d.id
        }
        if (d.direction < 0) {
         
          return d.status+"  "+d.id
        }
      
        
      });

   
  })


  linkEnter.on('mouseleave', function () {
    if (!isTransitioning) {
      hideTooltip();

      d3.select(this)
        .style("stroke", "url(#svgGradient)")
        .transition()
          .duration(TRANSITION_DURATION / 2)
          .style("opacity", OPACITY.LINK_DEFAULT);
    }
  });

  linkEnter.sort(function (a, b) { return b.thickness - a.thickness; })
    .classed("leftToRight", function (d) {
      return d.direction > 0;
    })
    .classed("rightToLeft", function (d) {
      return d.direction < 0;
    })
    .style("marker-end", function () {
      return 'url(#arrowHead)';
    })
    .style("stroke",function(d){console.log(d); return 'url(#svgGradient)';})
    .style("opacity", 0)
    .transition()
      .delay(TRANSITION_DURATION)
      .duration(TRANSITION_DURATION)
      .attr("d", path)
      .style("stroke-WIDTH", function (d) { return Math.max(1, 10); })
      //.style("stroke-WIDTH", function (d) { return Math.max(1, d.thickness); })
      .style("opacity", OPACITY.LINK_DEFAULT);


  node = svg.select("#nodes").selectAll(".node")
      .data(biHiSankey.collapsedNodes(), function (d) { return d.id; });


  node.transition()
    .duration(TRANSITION_DURATION)
    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
    .style("opacity", OPACITY.NODE_DEFAULT)
    .select("rect")
      .style("fill", function (d) {
        d.color = colorScale(d.type.replace(/ .*/, ""));
        return d.color;
      })
      .style("stroke", function (d) { return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1); })
      .style("stroke-WIDTH", "1px")
      .attr("height", function (d) { return d.height; })
      .attr("width", biHiSankey.nodeWidth());


  node.exit()
    .transition()
      .duration(TRANSITION_DURATION)
      .attr("transform", function (d) {
        var collapsedAncestor, endX, endY;
        collapsedAncestor = d.ancestors.filter(function (a) {
          return a.state === "collapsed";
        })[0];
        endX = collapsedAncestor ? collapsedAncestor.x : d.x;
        endY = collapsedAncestor ? collapsedAncestor.y : d.y;
        return "translate(" + endX + "," + endY + ")";
      })
      .remove();


  nodeEnter = node.enter().append("g").attr("class", "node");

 /* function opacity1(){
  console.log("h1");
  LINK_COLOR="red";
  //setInterval(opacity2,2000);
  setTimeout(opacity2, 100);
  
  // OPACITY.LINK_HIGHLIGHT=1;
}
function opacity2(){
  console.log("h2");
  LINK_COLOR="blue";
  //setTimeout(opacity1, 100);
}
setInterval(opacity1,1000);
setTimeout(function(){LINK_COLOR="red"}, 100);*/



   /*node.enter().append("svg:image")
        .attr("xlink:href","http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png")
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 50)
        .attr("width", 50);*/

  nodeEnter
    .attr("transform", function (d) {
      console.log(d);
     // var z=document.getElementById("accounting");
      var startX = d._parent ? d._parent.x : d.x,
          startY = d._parent ? d._parent.y : d.y;
         //console.log(d); console.log(startX);console.log(startY);console.log(z.offsetLeft); console.log(z.offsetTop);
      return "translate(" + startX + "," + startY + ")";
    })
    .style("opacity", 1e-6)
    .transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", OPACITY.NODE_DEFAULT)
      .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });


  nodeEnter.append("text");
  nodeEnter.append("rect")
    .style("fill", function (d) {
      d.color = colorScale(d.type.replace(/ .*/, ""));
      return d.color;
    })
    .style("stroke", function (d) {
      return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
    })
    .style("stroke-WIDTH", "1px")
    .attr("height", function (d) { console.log("hii");  return d.height; })
    .attr("width", biHiSankey.nodeWidth());
    //.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.on("mouseenter", function (g) {
    if (!isTransitioning) {
      restoreLinksAndNodes();
      highlightConnected(g);
      fadeUnconnected(g);

      d3.select(this).select("rect")
        .style("fill", function (d) {
          d.color = d.netFlow > 0 ? INFLOW_COLOR : OUTFLOW_COLOR;
          return d.color;
        })
        .style("stroke", function (d) {
          return d3.rgb(d.color).darker(0.1);
        })
        .style("fill-opacity", OPACITY.LINK_DEFAULT);

      tooltip
        .style("left", g.x + MARGIN.LEFT + "px")
        .style("top", g.y + g.height + MARGIN.TOP + 15 + "px")
        .transition()
          .duration(TRANSITION_DURATION)
          .style("opacity", 1).select(".value")
          .text(function () {
            var additionalInstructions = g.children.length ? "\n(Double click to expand)" : "";
            return g.name 
          });
    }
  });

  node.on("mouseleave", function () {
    if (!isTransitioning) {
      hideTooltip();
      restoreLinksAndNodes();
    }
  });

  /**
  * Fix to allow for dblclick on dragging element
  * This essentially checks to see if the vectors are in the same location once the drag
  * has ended.
  */

  var lastvector = []
  function isclicked(node){
    try {
      if( lastvector[node.id].toString() !== [node.x,node.y].toString() ){
        throw 'no match';
      }
      showHideChildren(node);
    }catch(err) {
      lastvector[node.id] = [node.x,node.y]
    }
  }

  // allow nodes to be dragged to new positions
  //node.call()
  node.call(d3.behavior.drag()
    .origin(function (d) { return d; })
    .on("dragstart", function () { node.event,this.parentNode.appendChild(this); })
    .on("dragend", isclicked)
    .on("drag", dragmove));

  // add in the text for the nodes
  node.filter(function (d) { return d.value !== 0; })
    .select("text")
      .attr("x", -6)
      .attr("y", function (d) { return d.height / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) { return d.name; })
    .filter(function (d) { return d.x < WIDTH / 2; })
      .attr("x", 6 + biHiSankey.nodeWidth())
      .attr("text-anchor", "start");


  collapser = svg.select("#collapsers").selectAll(".collapser")
    .data(biHiSankey.expandedNodes(), function (d) { return d.id; });


  collapserEnter = collapser.enter().append("g").attr("class", "collapser");

  collapserEnter.append("circle")
    .attr("r", COLLAPSER.RADIUS)
    .style("fill", function (d) {
      d.color = colorScale(d.type.replace(/ .*/, ""));
      return d.color;
    });

  collapserEnter
    .style("opacity", OPACITY.NODE_DEFAULT)
    .attr("transform", function (d) {
      return "translate(" + (d.x + d.width / 2) + "," + (d.y + COLLAPSER.RADIUS) + ")";
    });

  collapserEnter.on("dblclick", showHideChildren);

  collapser.select("circle")
    .attr("r", COLLAPSER.RADIUS);

  collapser.transition()
    .delay(TRANSITION_DURATION)
    .duration(TRANSITION_DURATION)
    .attr("transform", function (d, i) {
      return "translate("
        + (COLLAPSER.RADIUS + i * 2 * (COLLAPSER.RADIUS + COLLAPSER.SPACING))
        + ","
        + (-COLLAPSER.RADIUS - OUTER_MARGIN)
        + ")";
    });

  collapser.on("mouseenter", function (g) {
    if (!isTransitioning) {
      showTooltip().select(".value")
        .text(function () {
          return g.name + "\n(Double click to collapse)";
        });

      var highlightColor = highlightColorScale(g.type.replace(/ .*/, ""));

      d3.select(this)
        .style("opacity", OPACITY.NODE_HIGHLIGHT)
        .select("circle")
          .style("fill", highlightColor);

      node.filter(function (d) {
        return d.ancestors.indexOf(g) >= 0;
      }).style("opacity", OPACITY.NODE_HIGHLIGHT)
        .select("rect")
          .style("fill", highlightColor);
    }
  });

  collapser.on("mouseleave", function (g) {
    if (!isTransitioning) {
      hideTooltip();
      d3.select(this)
        .style("opacity", OPACITY.NODE_DEFAULT)
        .select("circle")
          .style("fill", function (d) { return d.color; });

      node.filter(function (d) {
        return d.ancestors.indexOf(g) >= 0;
      }).style("opacity", OPACITY.NODE_DEFAULT)
        .select("rect")
          .style("fill", function (d) { return d.color; });
    }
  });

  collapser.exit().remove();

}
    console.log(data1)
    console.log(stan1);
     var Nodes=[{"type":"mapi","id":"API-GATEWAY","parent":null,"number":1,"name":"API-GATEWAY","source":"","target":""},
    {"type":"mmas","id":"MASTERDATA","parent":null,"number":1,"name":"MASTERDATA","source":"","target":""},
     {"type":"mact","id":"ACTOR","parent":null,"number":1,"name":"ACTOR","source":"","target":""},
  {"type":"mnot","id":"NOTIFICATIONS","parent":null,"number":1,"name":"NOTIFICATIONS","source":"","target":""},
  {"type":"mapp","id":"APPROVAL","parent":null,"number":1,"name":"APPROVAL","source":"","target":""},
   {"type":"macc","id":"ACCOUNTING","parent":null,"number":1,"name":"ACCOUNTING","source":"","target":""},
   {"type":"maut","id":"AUTHORIZATION","parent":null,"number":1,"name":"AUTHORIZATION","source":"","target":""},
   {"type":"maud","id":"AUDIT","parent":null,"number":1,"name":"AUDIT","source":"","target":""},
   {"type":"mlim","id":"LIMITS","parent":null,"number":1,"name":"LIMITS","source":"","target":""},
   {"type":"mnul","id":"USER","parent":null,"number":1,"name":"USER","source":"","target":""},
  
   {"type":"mdms","id":"DMS","parent":null,"number":1,"name":"DMS","source":"","target":""}];
   //console.log(Nodes);
  var originalData=[];
    var Types=[];
     var Types1=[];
     var Links=[];
         for(var i=0;i<data1.length;i++)
{
  if(stan1==data1[i]._source.stan){
    originalData.push(data1[i]._source);
  }

}
console.log(originalData);

     originalData.forEach(function(child,i){
     
  var source=child.current_service;
  var target=child.called_service;
  
Nodes.forEach(function(data,i){

  if(child.current_service==data.name && child.current_service!=child.called_service){
    
    if(child.current_service=="USER" && child.called_service=="API-GATEWAY" && !(onoff))
{//originalData.forEach(function(child,i){})
  Links.push({"source":child.current_service,"target":child.called_service,"value":child.res_time,"time":child.res_time,"status":child.status});
}
else if(child.current_service=="USER" && child.called_service=="API-GATEWAY" && (onoff))
{
 // originalData.forEach(function(child,i){})
  Links.push({"source":child.current_service,"target":child.called_service,"value":1,"time":child.res_time,"status":child.status});
}
else
  {Links.push({"source":child.current_service,"target":child.called_service,"value":0,"time":child.res_time,"status":child.status});}

}
})

});
    
var countMap=new Map();
var responseTimeMap=new Map();
console.log(originalData);
console.log(Nodes);

originalData.forEach(function(child,i){

  if(true){
Nodes.forEach(function(data,i){


 
  if(!(Types1.includes(child.called_api)) && child.called_service==data.name && child.current_service!=child.called_service){
    if(child.called_api in countMap){
      countMap[child.called_api ]=countMap[child.called_api]+1;
      responseTimeMap[child.called_api ]= responseTimeMap[child.called_api]+child.res_time;
    }
    else{
      countMap[child.called_api ]=1;
       responseTimeMap[child.called_api ]=child.res_time;
    }
    Types1.push(child.called_api);
    Nodes.push({"type":data.type,"id":child.called_api,"parent":data.name,"number":4,"name":child.called_api,"source":child.called_api,"target":child.current_service,"timestamp":child.timestamp,"count":countMap[child.called_api],"status":child.status});
    
  }
      if(Types1.includes(child.called_api) && child.called_service==data.name)
   {
    if(child.called_api in countMap){
   //countMap[child.called_api ]=countMap[child.called_api]+1;
}
else{
  //countMap[child.called_api ]=1;
}
if(child.called_api in responseTimeMap){
  //responseTimeMap[child.called_api ]= responseTimeMap[child.called_api]+child.res_time;
}
 else{
 // responseTimeMap[child.called_api ]=child.res_time;
}

 }
   
    
})
}
})
console.log(Nodes);
Nodes.forEach(function(data,i){
if(onoff){
   if(data.parent!=null){
    Links.push({"source":data.target,"target":data.source,"value":countMap[data.source],"timestamp":data.timestamp,"status":data.status});
  }
  else{
    var val=countMap[data.source];
    Links.push({"source":data.target,"target":data.source,"value":val,"timestamp":data.timestamp,"status":data.status});
  }
}
else{
  if(data.parent!=null){
    Links.push({"source":data.target,"target":data.source,"value":responseTimeMap[data.source],"timestamp":data.timestamp,"status":data.status});
  }
  else{
    var val=responseTimeMap[data.source];
    Links.push({"source":data.target,"target":data.source,"value":val,"timestamp":data.timestamp,"status":data.status});
  }

}

})

console.log(Nodes);
console.log(Links);
biHiSankey
  .nodes(Nodes)
  .links(Links)
  .initializeNodes(function (node) {
    node.state = node.parent ? "contained" : "collapsed";
  })
  .layout(LAYOUT_INTERATIONS);

disableUserInterractions(2 * TRANSITION_DURATION);
 //var pos=document.getElementById('chart');
  //pos.innerHTML='';
update();

      });
  }


  var k2=0;
  function do1(){
console.log(k2);
k2++;
  };
  setInterval(do1, 1000);
  function call1(onoff,fromdate,todate){
  
  var from1;
  var to1;
  var stan1;
 // var change=function()

      {
      /*  var d=$.ajax({
  url: "http://192.168.150.35:9200/platform_perf/_search",
  data: data,
  success: success,
  dataType: dataType
});
        $.get("http://192.168.150.35:9200/platform_perf/_search",function(resp){
            console.log(resp);
        })*/

        var client=new elasticsearch.Client({
          host: 'localhost:9200',
  log: 'trace'
        });
     
 client.search({
        index: 'test11',
          from:0,
        size: 4000,
      "sort": [
  "timestamp.keyword:asc"
  ]
       
    }).then(function (resp) {
      originalData=resp.hits.hits;
//'use strict';
var countt=new Map();
var countt1=new Map();
var svg, tooltip, biHiSankey, path, defs, colorScale, highlightColorScale, isTransitioning;
var Nodes=[{"type":"mapi","id":"API-GATEWAY","parent":null,"number":1,"name":"API-GATEWAY","source":"","target":""},
    {"type":"mmas","id":"MASTERDATA","parent":null,"number":1,"name":"MASTERDATA","source":"","target":""},
  {"type":"mnot","id":"NOTIFICATIONS","parent":null,"number":1,"name":"NOTIFICATIONS","source":"","target":""},
  {"type":"mapp","id":"APPROVAL","parent":null,"number":1,"name":"APPROVAL","source":"","target":""},
   {"type":"macc","id":"ACCOUNTING","parent":null,"number":1,"name":"ACCOUNTING","source":"","target":""},
   {"type":"maut","id":"AUTHORIZATION","parent":null,"number":1,"name":"AUTHORIZATION","source":"","target":""},
   {"type":"maud","id":"AUDIT","parent":null,"number":1,"name":"AUDIT","source":"","target":""},
   {"type":"mlim","id":"LIMITS","parent":null,"number":1,"name":"LIMITS","source":"","target":""},
   {"type":"mnul","id":"USER","parent":null,"number":1,"name":"USER","source":"","target":""},
   {"type":"mact","id":"ACTOR","parent":null,"number":1,"name":"ACTOR","source":"","target":""},
   {"type":"mdms","id":"DMS","parent":null,"number":1,"name":"DMS","source":"","target":""}];
   var originalNodes=Nodes;

var OPACITY = {
    NODE_DEFAULT: 0.9,
    NODE_FADED: 0.1,
    NODE_HIGHLIGHT: 0.8,
    LINK_DEFAULT: 0.6,
    LINK_FADED: 0.05,
    LINK_HIGHLIGHT: 0.9
  },
  //TYPES = ["Asset", "Expense", "Revenue", "Equity", "Liability"],
  TYPES = ["accounting", "authorization", "master-data-management", "notifications", "approval"],
  TYPE_COLORS = ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
  TYPE_HIGHLIGHT_COLORS = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494"],
  LINK_COLOR = "#b3b3b3",
  INFLOW_COLOR = "#2E86D1",
  OUTFLOW_COLOR = "#D63028",
  NODE_WIDTH = 36,
  COLLAPSER = {
    RADIUS: NODE_WIDTH / 2,
    SPACING: 2
  },
  OUTER_MARGIN = 10,
  MARGIN = {
    TOP: 2 * (COLLAPSER.RADIUS + OUTER_MARGIN),
  // TOP: -1,
    RIGHT: OUTER_MARGIN,
    BOTTOM: OUTER_MARGIN,
    LEFT: OUTER_MARGIN
  },
  TRANSITION_DURATION = 400,
  HEIGHT = 1500 - MARGIN.TOP - MARGIN.BOTTOM,
  WIDTH = 1860 - MARGIN.LEFT - MARGIN.RIGHT,
  LAYOUT_INTERATIONS = 32,
  REFRESH_INTERVAL = 7000;

var formatNumber = function (d) {
  var numberFormat = d3.format(",.0f"); // zero decimal places
  return numberFormat(d);
},

formatFlow = function (d) {
  var flowFormat = d3.format(",.0f"); // zero decimal places with sign
  return flowFormat(Math.abs(d));
},

// Used when temporarily disabling user interractions to allow animations to complete
disableUserInterractions = function (time) {
  isTransitioning = true;
  setTimeout(function(){
    isTransitioning = false;
  }, time);
},

hideTooltip = function () {
  return tooltip.transition()
    .duration(TRANSITION_DURATION)
    .style("opacity", 0);
},

showTooltip = function () {
  return tooltip
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + 15 + "px")
    .transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", 1);
};
showTooltip1 = function () {
  return tooltip
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + 15 + "px")
    .transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", 1);
};

colorScale = d3.scale.ordinal().domain(TYPES).range(TYPE_COLORS),
highlightColorScale = d3.scale.ordinal().domain(TYPES).range(TYPE_HIGHLIGHT_COLORS);

svg = d3.select("#chart").append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
        .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");
       /* svg = d3.select("#chart").append("div")
        .selectAll(svg)
        .data(d3.range(TYPES.length).map(function() { return {x: 240 / 2, y: 240 / 2}; }))
        .enter().append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
        .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");*/

svg.append("g").attr("id", "links");
svg.append("g").attr("id", function(){return "nodes"});
svg.append("g").attr("id", "collapsers");

tooltip = d3.select("#chart").append("div").attr("id", "tooltip");

tooltip.style("opacity", 0)
    .append("p")
      .attr("class", "value");

biHiSankey = d3.biHiSankey();

// Set the biHiSankey diagram properties
biHiSankey
  .nodeWidth(NODE_WIDTH)
  .nodeSpacing(20)
  .linkSpacing(40)
  .arrowheadScaleFactor(0.5) // Specifies that 0.5 of the link's stroke WIDTH should be allowed for the marker at the end of the link.
  .size([WIDTH, HEIGHT]);

path = biHiSankey.link().curvature(0.45);

defs = svg.append("defs");

defs.append("marker")
  .style("fill", LINK_COLOR)
  .attr("id", "arrowHead")
  .attr("viewBox", "0 0 6 10")
  .attr("refX", "1")
  .attr("refY", "5")
  .attr("markerUnits", "strokeWidth")
  .attr("markerWidth", "1")
  .attr("markerHeight", "1")
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

defs.append("marker")
  .style("fill", OUTFLOW_COLOR)
  .attr("id", "arrowHeadInflow")
  .attr("viewBox", "0 0 6 10")
  .attr("refX", "1")
  .attr("refY", "5")
  .attr("markerUnits", "strokeWidth")
  .attr("markerWidth", "1")
  .attr("markerHeight", "1")
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

defs.append("marker")
  .style("fill", INFLOW_COLOR)
  .attr("id", "arrowHeadOutlow")
  .attr("viewBox", "0 0 6 10")
  .attr("refX", "1")
  .attr("refY", "5")
  .attr("markerUnits", "strokeWidth")
  .attr("markerWidth", "1")
  .attr("markerHeight", "1")
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

function update () {
  var link, linkEnter, node, nodeEnter, collapser, collapserEnter;

  function dragmove(node) {
   /* node.x = Math.max(0, Math.min(WIDTH - node.width, d3.event.x));
    node.y = Math.max(0, Math.min(HEIGHT - node.height, d3.event.y));
    d3.select(this).attr("transform", "translate(" + node.x + "," + node.y + ")");
    biHiSankey.relayout();
    svg.selectAll(".node").selectAll("rect").attr("height", function (d) { return d.height; });
    link.attr("d", path);*/
  }
  function setpos(node) {
    z=document.getElementById("accounting");
    node.x = Math.max(0, Math.min(WIDTH - node.width, d3.event.x));
    node.y = Math.max(0, Math.min(HEIGHT - node.height, d3.event.y));
    d3.select(this)
    .append("div")
    .attr("transform", "translate(" + z.offsetLeft + "," + z.offsetTop + ")");
    biHiSankey.relayout();
    svg.selectAll(".node").selectAll("rect").attr("height", function (d) { return d.height; });
    link.attr("d", path);
  }

  function containChildren(node) {
    node.children.forEach(function (child) {
      child.state = "contained";
      child.parent = this;
      child._parent = null;
      containChildren(child);
    }, node);
  }

  function expand(node) {
    node.state = "expanded";
    node.children.forEach(function (child) {
      child.state = "collapsed";
      child._parent = this;
      child.parent = null;
      containChildren(child);
    }, node);
  }

  function collapse(node) {
    node.state = "collapsed";
    containChildren(node);
  }

  function restoreLinksAndNodes() {
    link
      .style("stroke", LINK_COLOR)
      .style("marker-end", function () { return 'url(#arrowHead)'; })
      .transition()
        .duration(TRANSITION_DURATION)
        .style("opacity", OPACITY.LINK_DEFAULT);

    node
      .selectAll("rect")
        .style("fill", function (d) {
          d.color = colorScale(d.type.replace(/ .*/, ""));
          return d.color;
        })
        .style("stroke", function (d) {
          return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
        })
        .style("fill-opacity", OPACITY.NODE_DEFAULT);

    node.filter(function (n) { return n.state === "collapsed"; })
      .transition()
        .duration(TRANSITION_DURATION)
        .style("opacity", OPACITY.NODE_DEFAULT);
  }

  function showHideChildren(node) {
    disableUserInterractions(2 * TRANSITION_DURATION);
    hideTooltip();
    if (node.state === "collapsed") { expand(node); }
    else { collapse(node); }

    biHiSankey.relayout();
    update();
    link.attr("d", path);
    restoreLinksAndNodes();
  }

  function highlightConnected(g) {
    link.filter(function (d) { return d.source === g; })
      .style("marker-end", function () { return 'url(#arrowHeadInflow)'; })
      .style("stroke", OUTFLOW_COLOR)
      .style("opacity", OPACITY.LINK_DEFAULT);

    link.filter(function (d) { return d.target === g; })
      .style("marker-end", function () { return 'url(#arrowHeadOutlow)'; })
      .style("stroke", INFLOW_COLOR)
      .style("opacity", OPACITY.LINK_DEFAULT);
  }

  function fadeUnconnected(g) {
    link.filter(function (d) { return d.source !== g && d.target !== g; })
      .style("marker-end", function () { return 'url(#arrowHead)'; })
      .transition()
        .duration(TRANSITION_DURATION)
        .style("opacity", OPACITY.LINK_FADED);

    node.filter(function (d) {
      return (d.name === g.name) ? false : !biHiSankey.connected(d, g);
    }).transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", OPACITY.NODE_FADED);
  }

  link = svg.select("#links").selectAll("path.link")
    .data(biHiSankey.visibleLinks(), function (d) { return d.id; });

  link.transition()
    .duration(TRANSITION_DURATION)
    .style("stroke-WIDTH", function (d) { return Math.max(1, d.thickness); })
    .attr("d", path)
    .style("opacity", OPACITY.LINK_DEFAULT);


  link.exit().remove();


  linkEnter = link.enter().append("path")
    .attr("class", "link")
    .style("fill", "none");
    

if(onoff){
  linkEnter.on('mouseenter', function (d) {
    if (!isTransitioning) {
      showTooltip().select(".value").text(function () {
        console.log(d)
        console.log(Nodes);
        if(d.target.ancestors)
       { //console.log(countt1[d.target.ancestors.name][d.source.name][d.target.name]);
        console.log(d.source.name);
        console.log(d.target.type);
        console.log(d.target.name);
               console.log(countt1[d.source.name]["DMS"][d.target.name]);
             }
        if(countt[d.source.name][d.target.name]>0 && (onoff))
{        if (d.direction > 0) {
          return d.source.name + " → " + d.target.name + "\n" + countt[d.source.name][d.target.name];
        }
        return d.target.name + " ← " + d.source.name + "\n" + countt[d.source.name][d.target.name];}

      if(d.target.ancestors){ 
        var tar;
        for(var i=0;i<originalNodes.length;i++){
          //console.log(d.target.type+" "+originalNodes[i].type)
          
          if(d.target.type==originalNodes[i].type){
            console.log(Nodes);
              tar=originalNodes[i].name;
              break;
          }
        }

console.log(tar);

       if (d.direction > 0) {
                return d.source.name + " → " + d.target.name + "\n" + countt1[d.source.name][tar][d.target.name];
              }
              return d.target.name + " ← " + d.source.name + "\n" + countt1[d.source.name][tar][d.target.name];}
      });

      d3.select(this)
        .style("stroke", LINK_COLOR)
        .transition()
          .duration(TRANSITION_DURATION / 2)
          .style("opacity", OPACITY.LINK_HIGHLIGHT);
    }
  });}
  else{
    linkEnter.on('mouseenter', function (d) {
    if (!isTransitioning) {
      showTooltip().select(".value").text(function () {
        console.log(d)
        console.log(Nodes);
        if(d.target.ancestors)
       { //console.log(countt1[d.target.ancestors.name][d.source.name][d.target.name]);
        console.log(d.source.name);
        console.log(d.target.type);
        console.log(d.target.name);
               console.log(countt1[d.source.name]["DMS"][d.target.name]);
             }
        if(countt[d.source.name][d.target.name]>0)
{        if (d.direction > 0) {
          return d.source.name + " → " + d.target.name + "\n" + countt[d.source.name][d.target.name];
        }
        return d.target.name + " ← " + d.source.name + "\n" + countt[d.source.name][d.target.name];}

      if(d.target.ancestors){ 
        var tar;
        for(var i=0;i<originalNodes.length;i++){
          //console.log(d.target.type+" "+originalNodes[i].type)
          
          if(d.target.type==originalNodes[i].type){
            console.log(Nodes);
              tar=originalNodes[i].name;
              break;
          }
        }

console.log(tar);

       if (d.direction > 0) {
                return d.source.name + " → " + d.target.name + "\n" + countt1[d.source.name][tar][d.target.name];
              }
              return d.target.name + " ← " + d.source.name + "\n" + countt1[d.source.name][tar][d.target.name];}
      });

      d3.select(this)
        .style("stroke", LINK_COLOR)
        .transition()
          .duration(TRANSITION_DURATION / 2)
          .style("opacity", OPACITY.LINK_HIGHLIGHT);
    }
  });
  }

  linkEnter.on('click',function(d){
    showTooltip().select(".value").text(function () {
        if (d.direction > 0) {
         
          return d.children+"  "+d.id
        }
      
        
      });

   
  })


  linkEnter.on('mouseleave', function () {
    if (!isTransitioning) {
      hideTooltip();

      d3.select(this)
        .style("stroke", LINK_COLOR)
        .transition()
          .duration(TRANSITION_DURATION / 2)
          .style("opacity", OPACITY.LINK_DEFAULT);
    }
  });

  linkEnter.sort(function (a, b) { return b.thickness - a.thickness; })
    .classed("leftToRight", function (d) {
      return d.direction > 0;
    })
    .classed("rightToLeft", function (d) {
      return d.direction < 0;
    })
    .style("marker-end", function () {
      return 'url(#arrowHead)';
    })
    .style("stroke", LINK_COLOR)
    .style("opacity", 0)
    .transition()
      .delay(TRANSITION_DURATION)
      .duration(TRANSITION_DURATION)
      .attr("d", path)
      .style("stroke-WIDTH", function (d) { return Math.max(1, 10); })//Setting the thickness of link
      //.style("stroke-WIDTH", function (d) { return Math.max(1, d.thickness); })
      .style("stroke",function(d){console.log(countt[d.source.name][d.target.name]);return LINK_COLOR;})
      .style("opacity", OPACITY.LINK_DEFAULT);


  node = svg.select("#nodes").selectAll(".node")
      .data(biHiSankey.collapsedNodes(), function (d) { return d.id; });


  node.transition()
    .duration(TRANSITION_DURATION)
    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
    .style("opacity", OPACITY.NODE_DEFAULT)
    .select("rect")
      .style("fill", function (d) {
        d.color = colorScale(d.type.replace(/ .*/, ""));
        return d.color;
      })
      .style("stroke", function (d) { return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1); })
      .style("stroke-WIDTH", "1px")
      .attr("height", function (d) { return d.height; })
      .attr("width", biHiSankey.nodeWidth());


  node.exit()
    .transition()
      .duration(TRANSITION_DURATION)
      .attr("transform", function (d) {
        var collapsedAncestor, endX, endY;
        collapsedAncestor = d.ancestors.filter(function (a) {
          return a.state === "collapsed";
        })[0];
        endX = collapsedAncestor ? collapsedAncestor.x : d.x;
        endY = collapsedAncestor ? collapsedAncestor.y : d.y;
        return "translate(" + endX + "," + endY + ")";
      })
      .remove();


  nodeEnter = node.enter().append("g").attr("class", "node");


   /*node.enter().append("svg:image")
        .attr("xlink:href","http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png")
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 50)
        .attr("width", 50);*/

  nodeEnter
    .attr("transform", function (d) {
      console.log(d);
      var z=document.getElementById("accounting");
      var startX = d._parent ? d._parent.x : d.x,
          startY = d._parent ? d._parent.y : d.y;
         //console.log(d); console.log(startX);console.log(startY);console.log(z.offsetLeft); console.log(z.offsetTop);
      return "translate(" + startX + "," + startY + ")";
    })
    .style("opacity", 1e-6)
    .transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", OPACITY.NODE_DEFAULT)
      .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });


  nodeEnter.append("text");
  nodeEnter.append("rect")
    .style("fill", function (d) {
      d.color = colorScale(d.type.replace(/ .*/, ""));
      return d.color;
    })
    .style("stroke", function (d) {
      return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
    })
    .style("stroke-WIDTH", "1px")
    .attr("height", function (d) { console.log("hii");  return d.height; })
    .attr("width", biHiSankey.nodeWidth());
    //.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.on("mouseenter", function (g) {
    if (!isTransitioning) {
      restoreLinksAndNodes();
      highlightConnected(g);
      fadeUnconnected(g);

      d3.select(this).select("rect")
        .style("fill", function (d) {
          d.color = d.netFlow > 0 ? INFLOW_COLOR : OUTFLOW_COLOR;
          return d.color;
        })
        .style("stroke", function (d) {
          return d3.rgb(d.color).darker(0.1);
        })
        .style("fill-opacity", OPACITY.LINK_DEFAULT);

      tooltip
        .style("left", g.x + MARGIN.LEFT + "px")
        .style("top", g.y + g.height + MARGIN.TOP + 15 + "px")
        .transition()
          .duration(TRANSITION_DURATION)
          .style("opacity", 1).select(".value")
          .text(function () {
            var additionalInstructions = g.children.length ? "\n(Double click to expand)" : "";
            return g.name 
          });
    }
  });

  node.on("mouseleave", function () {
    if (!isTransitioning) {
      hideTooltip();
      restoreLinksAndNodes();
    }
  });

  /**
  * Fix to allow for dblclick on dragging element
  * This essentially checks to see if the vectors are in the same location once the drag
  * has ended.
  */

  var lastvector = []
  function isclicked(node){
    try {
      if( lastvector[node.id].toString() !== [node.x,node.y].toString() ){
        throw 'no match';
      }
      showHideChildren(node);
    }catch(err) {
      lastvector[node.id] = [node.x,node.y]
    }
  }

  // allow nodes to be dragged to new positions
  //node.call()
  node.call(d3.behavior.drag()
    .origin(function (d) { return d; })
    .on("dragstart", function () { node.event,this.parentNode.appendChild(this); })
    .on("dragend", isclicked)
    .on("drag", dragmove));

  // add in the text for the nodes
  node.filter(function (d) { return d.value !== 0; })
    .select("text")
      .attr("x", -6)
      .attr("y", function (d) { return d.height / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) { return d.name; })
    .filter(function (d) { return d.x < WIDTH / 2; })
      .attr("x", 6 + biHiSankey.nodeWidth())
      .attr("text-anchor", "start");


  collapser = svg.select("#collapsers").selectAll(".collapser")
    .data(biHiSankey.expandedNodes(), function (d) { return d.id; });


  collapserEnter = collapser.enter().append("g").attr("class", "collapser");

  collapserEnter.append("circle")
    .attr("r", COLLAPSER.RADIUS)
    .style("fill", function (d) {
      d.color = colorScale(d.type.replace(/ .*/, ""));
      return d.color;
    });

  collapserEnter
    .style("opacity", OPACITY.NODE_DEFAULT)
    .attr("transform", function (d) {
      return "translate(" + (d.x + d.width / 2) + "," + (d.y + COLLAPSER.RADIUS) + ")";
    });

  collapserEnter.on("dblclick", showHideChildren);

  collapser.select("circle")
    .attr("r", COLLAPSER.RADIUS);

  collapser.transition()
    .delay(TRANSITION_DURATION)
    .duration(TRANSITION_DURATION)
    .attr("transform", function (d, i) {
      return "translate("
        + (COLLAPSER.RADIUS + i * 2 * (COLLAPSER.RADIUS + COLLAPSER.SPACING))
        + ","
        + (-COLLAPSER.RADIUS - OUTER_MARGIN)
        + ")";
    });

  collapser.on("mouseenter", function (g) {
    if (!isTransitioning) {
      showTooltip().select(".value")
        .text(function () {
          return g.name + "\n(Double click to collapse)";
        });

      var highlightColor = highlightColorScale(g.type.replace(/ .*/, ""));

      d3.select(this)
        .style("opacity", OPACITY.NODE_HIGHLIGHT)
        .select("circle")
          .style("fill", highlightColor);

      node.filter(function (d) {
        return d.ancestors.indexOf(g) >= 0;
      }).style("opacity", OPACITY.NODE_HIGHLIGHT)
        .select("rect")
          .style("fill", highlightColor);
    }
  });

  collapser.on("mouseleave", function (g) {
    if (!isTransitioning) {
      hideTooltip();
      d3.select(this)
        .style("opacity", OPACITY.NODE_DEFAULT)
        .select("circle")
          .style("fill", function (d) { return d.color; });

      node.filter(function (d) {
        return d.ancestors.indexOf(g) >= 0;
      }).style("opacity", OPACITY.NODE_DEFAULT)
        .select("rect")
          .style("fill", function (d) { return d.color; });
    }
  });

  collapser.exit().remove();

}

var exampleNodes = [

  {"type":"m1","id":"l","parent":null,"number":"l","name":"api-Gateway","source":"","target":""},
    {"type":"m2","id":"eq","parent":null,"number":"eq","name":"master-data-management","source":"","target":""},
  {"type":"m3","id":"r","parent":null,"number":"r","name":"notifications","source":"","target":""},
  {"type":"m4","id":"a","parent":null,"name":"approval","source":"","target":""},
   {"type":"m5","id":"ex","parent":null,"number":"ex","name":"accounting","source":"","target":""},
  {"type":"m1","id":11,"parent":"l","number":"210","name":"M1api1","source":"","target":""},
  {"type":"m1","id":12,"parent":"l","number":"215","name":"M1api2","source":"","target":""},
  {"type":"m1","id":13,"parent":"l","number":"220","name":"M1api3","source":"","target":""},
  {"type":"m1","id":14,"parent":"l","number":"230","name":"M1api4","source":"","target":""},
  {"type":"m1","id":15,"parent":"l","number":"240","name":"M1api5","source":"","target":""},
  {"type":"m1","id":16,"parent":"l","number":"250","name":"M1api6","source":"","target":""},

  {"type":"m3","id":"or","parent":"r","number":"","name":"M3api2","source":"","target":""},
  {"type":"m3","id":17,"parent":"or","number":"310","name":"M3api3","source":"","target":""},
  {"type":"m3","id":"nor","parent":"r","number":"","name":"M3api4","source":"","target":""},
  {"type":"m3","id":18,"parent":"nor","number":"810","name":"M3api5","source":"","target":""},
    
  {"type":"m4","id":1,"parent":"a","number":"101","name":"M4api2","source":"","target":""},
  {"type":"m4","id":2,"parent":"a","number":"120","name":"M4api3","source":"","target":""},
  {"type":"m4","id":3,"parent":"a","number":"140","name":"M4api4","source":"","target":""},
  {"type":"m4","id":4,"parent":"a","number":"150","name":"M4api5","source":"","target":""},
  {"type":"m4","id":5,"parent":"a","number":"160","name":"M4api6","source":"","target":""},
  {"type":"m4","id":6,"parent":"a","number":"170","name":"M4api7","source":"","target":""},
  {"type":"m4","id":7,"parent":"a","number":"175","name":"M4api8","source":"","target":""},
  {"type":"m4","id":8,"parent":"a","number":"178","name":"M4api9","source":"","target":""},
  {"type":"m4","id":9,"parent":"a","number":"180","name":"M4api10","source":"","target":""},
  {"type":"m4","id":10,"parent":"a","number":"188","name":"M4api11","source":"","target":""},
  {"type":"m3","id":19,"parent":"nor","number":"910","name":"M3api6","source":"","target":""},
  {"type":"m3","id":20,"parent":"nor","number":"960","name":"M3api7","source":"","target":""},
 
  {"type":"m5","id":21,"parent":"ex","number":"500","name":"M5api2","source":"","target":""},
  {"type":"m5","id":22,"parent":"ex","number":"510","name":"M5api3","source":"","target":""},
  {"type":"m5","id":23,"parent":"ex","number":"540","name":"M5api4","source":"","target":""},
  {"type":"m5","id":24,"parent":"ex","number":"560","name":"M5api5","source":"","target":""},
  {"type":"m5","id":25,"parent":"ex","number":"570","name":"M5api6","source":"","target":""},
  {"type":"m5","id":26,"parent":"ex","number":"576","name":"M5api7","source":"","target":""},
  {"type":"m5","id":27,"parent":"ex","number":"610","name":"M5api8","source":"","target":""},
  {"type":"m5","id":28,"parent":"ex","number":"750","name":"M5api9","source":"","target":""}
]
for(var i=1;i<originalData.length;i++){
  var type;
  var id;
  var parent;
  var number;
  var name;
  for(var j=0;j<exampleNodes.length;j++){
    if(originalData[i]._source.current_service==exampleNodes[j].name){
      type=exampleNodes[j].type;
      id=originalData[i]._source.timestamp;
      parent=exampleNodes[j].id;
      number=345;
      name=originalData[i]._source.called_api;
    

      exampleNodes.push({"type":exampleNodes[j].type,"id":originalData[i]._source.timestamp,"parent":exampleNodes[j].id,"number":"4","name":originalData[i]._source.called_api});
    }
    else{
     type=originalData[i]._source.current_service+"hi";
     id=originalData[i]._source.timestamp;
     parent=null;
      number=345;
       name=originalData[i]._source.current_service;

    }

  }
}

var exampleLinks = [
  {"source":8, "target":28, "value":Math.floor(Math.random() * 100)},
  {"source":17, "target":18, "value":Math.floor(Math.random() * 100)},
  {"source":22, "target":24, "value":Math.floor(Math.random() * 100)},
  {"source":3, "target":13, "value":Math.floor(Math.random() * 100)},
  {"source":24, "target":24, "value":Math.floor(Math.random() * 100)},
  {"source":5, "target":4, "value":Math.floor(Math.random() * 100)},
  {"source":15, "target":5, "value":Math.floor(Math.random() * 100)},
  {"source":18, "target":8, "value":Math.floor(Math.random() * 100)},
  {"source":3, "target":20, "value":Math.floor(Math.random() * 100)},
  {"source":17, "target":18, "value":Math.floor(Math.random() * 100)},
  {"source":22, "target":5, "value":Math.floor(Math.random() * 100)},
  {"source":4, "target":24, "value":Math.floor(Math.random() * 100)},
  {"source":26, "target":16, "value":Math.floor(Math.random() * 100)},
  {"source":27, "target":6, "value":Math.floor(Math.random() * 100)},
  {"source":23, "target":4, "value":Math.floor(Math.random() * 100)},
  {"source":10, "target":24, "value":Math.floor(Math.random() * 100)},
  {"source":17, "target":16, "value":Math.floor(Math.random() * 100)},
  {"source":5, "target":12, "value":Math.floor(Math.random() * 100)},
  {"source":12, "target":16, "value":Math.floor(Math.random() * 100)},
  {"source":19, "target":5, "value":Math.floor(Math.random() * 100)},
  {"source":15, "target":24, "value":Math.floor(Math.random() * 100)},
  {"source":27, "target":2, "value":Math.floor(Math.random() * 100)},
  {"source":26, "target":28, "value":Math.floor(Math.random() * 100)},
  {"source":22, "target":24, "value":Math.floor(Math.random() * 100)},
  {"source":3, "target":18, "value":Math.floor(Math.random() * 100)},
  {"source":18, "target":5, "value":Math.floor(Math.random() * 100)},
  {"source":25, "target":28, "value":Math.floor(Math.random() * 100)},
  {"source":12, "target":1, "value":Math.floor(Math.random() * 100)},
  {"source":28, "target":21, "value":Math.floor(Math.random() * 100)},
  {"source":9, "target":16, "value":Math.floor(Math.random() * 100)},
  {"source":14, "target":23, "value":Math.floor(Math.random() * 100)},
  {"source":6, "target":1, "value":Math.floor(Math.random() * 100)},
  {"source":9, "target":15, "value":Math.floor(Math.random() * 100)},
  {"source":16, "target":24, "value":Math.floor(Math.random() * 100)},
  {"source":22, "target":28, "value":Math.floor(Math.random() * 100)},
  {"source":8, "target":21, "value":Math.floor(Math.random() * 100)},
  {"source":22, "target":7, "value":Math.floor(Math.random() * 100)},
  {"source":18, "target":10, "value":Math.floor(Math.random() * 100)},
  {"source":"eq", "target":1, "value":Math.floor(Math.random() * 100)},
  {"source":1, "target":21, "value":Math.floor(Math.random() * 100)},
  {"source":1, "target":24, "value":Math.floor(Math.random() * 100)},
  {"source":17, "target":1, "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)},
  {"source":Math.ceil(Math.random() * 28), "target":Math.ceil(Math.random() * 28), "value":Math.floor(Math.random() * 100)}
]


var array=[]
Nodes.forEach(function(data){
  Nodes.forEach(function(data1){
    //array
  })
})
   //var countt=new Map();
   Nodes.forEach(function(data){
   var map=new Map();
   Nodes.forEach(function(data1){
    map[data1.name]=0;
   })
    countt[data.name]=map;
   })
  // console.log(countt);
  var f1=moment("2000-01-01 00:00").format("YYYY-MM-DD HH:mm:ss.SSS");
var t1=moment("2050-01-01 00:00").format("YYYY-MM-DD HH:mm:ss.SSS");

console.log(f1);
console.log(t1);
f=f1;
t=t1;
var f=moment(fromdate.value).format("YYYY-MM-DD HH:mm:ss.SSS");
var t=moment(todate.value).format("YYYY-MM-DD HH:mm:ss.SSS");
if(f!='Invalid date' && t!='Invalid date'){
  console.log(f);
  f1=f;
  t1=t;
}
else{
  f=f1;
  t=t1;
}

   originalData.forEach(function(child){
    if(f<=child._source.timestamp && t>=child._source.timestamp)
(countt[child._source.current_service][child._source.called_service]=countt[child._source.current_service][child._source.called_service]+1)

   })
   /*originalData.forEach(function(data){
   var map=new Map();
   originalData.forEach(function(data1){
    map[data1._source.called_api]=0
   })
    countt[data._source.current_service]=map;
   })
   console.log(countt);
     originalData.forEach(function(child){
(countt[child._source.current_service][child._source.called_api]=countt[child._source.current_service][child._source.called_api]+1)

   })*/
console.log(countt);

Nodes.forEach(function(data){
   var map=new Map();
   Nodes.forEach(function(data1){
    map[data1.name]=0;
   })
    countt1[data.name]=map;
   })
console.log(countt1);
originalData.forEach(function(child){
  var map=new Map();
  map[child._source.called_api]=0;
  countt1[child._source.current_service][child._source.called_service]=map;
})
originalData.forEach(function(child){
(countt1[child._source.current_service][child._source.called_service][child._source.called_api]=countt1[child._source.current_service][child._source.called_service][child._source.called_api]+1)

   })
console.log(countt1);

var Links=[];
var Types=[];
var Types1=[]
var stanNodes=Nodes;
var stanLinks=Links;

originalData.forEach(function(child,i){
  var source=child._source.current_service;
  var target=child._source.called_service;
  if(i>=0 && f<=child._source.timestamp && t>=child._source.timestamp){
Nodes.forEach(function(data,i){
  if(child._source.current_service==data.name && f<=child._source.timestamp && t>=child._source.timestamp){
Links.push({"source":child._source.current_service,"target":child._source.called_service,"value":1});
}
})
}
});
console.log(Links);

var Nodes1=Nodes;

var Types1=[];
var countMap=new Map();
var responseTimeMap=new Map();
//countMap["getNotificationMessage"]=0;

 // .on('tick', tick)
  //.start();

/*originalData.forEach(function(child,i){
  if(i>=0){
Nodes.forEach(function(data,i){

 
  if(!(Types1.includes(child._source.called_api)) && child._source.called_service==data.name){

    Types1.push(child._source.called_api);
    Nodes.push({"type":data.type,"id":child._source.called_api,"parent":data.name,"number":4,"name":child._source.called_api,"source":child._source.called_api,"target":child._source.current_service,"timestamp":child._source.timestamp,"count":countMap[child._source.called_api]});
    
  }
      if(Types1.includes(child._source.called_api) && child._source.called_service==data.name)
   {
    if(child._source.called_api in countMap){
   countMap[child._source.called_api ]=countMap[child._source.called_api]+1;
}
else{
  countMap[child._source.called_api ]=1;
}
if(child._source.called_api in responseTimeMap){
  responseTimeMap[child._source.called_api ]= responseTimeMap[child._source.called_api]+child._source.res_time;
}
 else{
  responseTimeMap[child._source.called_api ]=child._source.res_time;
}

 }
   
    
})
}
})

Nodes.forEach(function(data,i){
if(i>=0){
  if(data.parent!=null && onoff){
    Links.push({"source":data.target,"target":data.source,"value":countMap[data.source],"timestamp":data.timestamp});
  }
  else{
    var val=responseTimeMap[data.source]/countMap[data.source];
    Links.push({"source":data.target,"target":data.source,"value":val,"timestamp":data.timestamp});
  }
}

})*/
var count=[];
originalData.forEach(function(child,i){


})

originalData.forEach(function(child,i){

  if(true && f<=child._source.timestamp && t>=child._source.timestamp){
Nodes.forEach(function(data,i){


 
  if(!(Types1.includes(child._source.called_api)) && child._source.called_service==data.name && child._source.current_service!=child._source.called_service){
    if(child._source.called_api in countMap){
      countMap[child._source.called_api ]=countMap[child._source.called_api]+1;
      responseTimeMap[child._source.called_api ]= responseTimeMap[child._source.called_api]+child._source.res_time;
    }
    else{
      countMap[child._source.called_api ]=1;
       responseTimeMap[child._source.called_api ]=child._source.res_time;
    }
    Types1.push(child._source.called_api);
      console.log(835);
    Nodes.push({"type":data.type,"id":child._source.called_api,"parent":data.name,"number":4,"name":child._source.called_api,"source":child._source.called_api,"target":child._source.current_service,"timestamp":child._source.timestamp});
    
  }
      if(Types1.includes(child._source.called_api) && child._source.called_service==data.name  && child._source.current_service!=child._source.called_service)
   {
    if(child._source.called_api in countMap){
   //countMap[child._source.called_api ]=countMap[child._source.called_api]+1;
}
else{
  //countMap[child._source.called_api ]=1;
}
if(child._source.called_api in responseTimeMap){
  //responseTimeMap[child._source.called_api ]= responseTimeMap[child._source.called_api]+child._source.res_time;
}
 else{
 //responseTimeMap[child._source.called_api ]=child._source.res_time;
}

 }
   
    
})
}
})

console.log(Nodes);
console.log(countMap);
Nodes.forEach(function(data,i){
if(onoff){
   if(data.parent!=null){
    Links.push({"source":data.target,"target":data.source,"value":countMap[data.source],"timestamp":data.timestamp});
  }
  else{
    var val=countMap[data.target];
    Links.push({"source":data.target,"target":data.source,"value":val,"timestamp":data.timestamp});
  }
}
else{
  if(data.parent!=null){
    Links.push({"source":data.target,"target":data.source,"value":responseTimeMap[data.source],"timestamp":data.timestamp});
  }
  else{
    var val=responseTimeMap[data.source];
    Links.push({"source":data.target,"target":data.source,"value":val,"timestamp":data.timestamp});
  }

}

})




var MasterNodes=[];
var MasterLinks=[];
f1=moment(fromdate.value).format("YYYY-MM-DD HH:mm:ss.SSS");
t1=moment(todate.value).format("YYYY-MM-DD HH:mm:ss.SSS");
/*Nodes.forEach(function(child,i){
  if(i<=10){
    MasterNodes.push(child);
  }
  if((child.timestamp>=f1) && (child.timestamp<=t1) &&  i>10){

    MasterNodes.push(child);
  }
})
Links.forEach(function(child,i){
  if(i<=10){
    MasterLinks.push(child);
  }
  if((child.timestamp>=f1) && (child.timestamp<=t1) &&   i>10){
    MasterLinks.push(child);
  }
})
console.log(Nodes);
console.log(Links);

Nodes.forEach(function(child,i){
  if((child.timestamp>=f1) && (child.timestamp<=t1)){

    MasterNodes.push(child);
  }
})
Links.forEach(function(child,i){
  if((child.timestamp>=f1) && (child.timestamp<=t1) ){
    MasterLinks.push(child);
  }
})*/


var force = d3.layout.force()
  .nodes(Nodes)
  .charge(function(d) {
    return -5 ;
  });
  console.log(Nodes);
  console.log(Links);
if(true){
 
biHiSankey
  .nodes(Nodes)
  .links(Links)
  .initializeNodes(function (node) {
    node.state = node.parent ? "contained" : "collapsed";
  })
  .layout(LAYOUT_INTERATIONS);

disableUserInterractions(2 * TRANSITION_DURATION);
update();
}
if(false){

  console.log("MasterNODES");
  biHiSankey
  .nodes(MasterNodes)
  .links(MasterLinks)
  .initializeNodes(function (node) {
    node.state = node.parent ? "contained" : "collapsed";
  })
  .layout(LAYOUT_INTERATIONS);

disableUserInterractions(2 * TRANSITION_DURATION);
update();
}



});
 }
}

//print();

