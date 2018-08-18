function update(){
  console.log("fn called");
    var client=new elasticsearch.Client();
    console.log(client);
 client.search({
        index: 'test10',
          from:0,
        size: 1000,
      "sort": [
  "timestamp.keyword:asc"
  ]
       
    }).then(function (resp) {
    //  console.log(resp.hits.hits);
                originalData=resp.hits.hits;
       
                var api ='example.json';
            $.getJSON(api, function(data) {

}).then(function(data1){
 // console.log(data1);
 // console.log(originalData);

  var data=[];
  for(var i=0;i<originalData.length;i++){
    var c=0;
    console.log(originalData[i]._source)
    var obj={name:"",parent:"",depth:0}
   obj.name=originalData[i]._source.called_service;
   obj.api=originalData[i]._source.called_api;
   obj.parent=originalData[i]._source.current_service;
    obj.res_time=originalData[i]._source.res_time;
    obj.timestamp=originalData[i]._source.timestamp;
  // obj.depth=0;
   data.push(obj);
  }
  console.log(data);
  var data1=[]
  for(var i in data){
    var c=0
    for(var j=0;j<data.length;j++){
      if(data[i].depth==data[j].depth && data[i].name==data[j].name ){
        c++;

      }
    }
    if(c==1)
data1.push(data[i])
  }
  console.log(data1);

  var map1=new Map();
var dataMap = data.reduce(function(map, node) {
 

  map1[node.timestamp] = node.name+node.parent;
  map[node.name] = node;
  return map;
}, {});
 console.log(map1);

// create the tree array
var parent
var treeData = [];
data.forEach(function(node) {

  // add to parent
   parent = dataMap[node.parent];
  if (parent) {if(parent.children)console.log(parent.children);
    // create child array if it doesn't exist
    (parent.children || (parent.children = []))
      // add node to child array
      .push(node);
  } else {
    // parent is null or missing
    console.log(node);
    treeData.push(node);
  }

});
for(var i=0;i<treeData.length;i++){
 console.log(treeData[i]);
}


// show what we've got
d3.select('#area1').append('pre')
    .text(JSON.stringify(treeData, null, '  '));

// ************** Generate the tree diagram  *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
  width = 1260 - margin.right - margin.left,
  height = 700 - margin.top - margin.bottom;
  
var i = 0,
  duration = 750,
  root;

var tree = d3.layout.tree()
  .size([height, width]);

var diagonal = d3.svg.diagonal()
  .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#area2").append("svg")
  .attr("background-color","red")
  .attr("width", width + margin.right + margin.left+50)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 // DEF=treeData[0].name;

//d3.json("example.json", function(error, DEF) {
 // console.log(data[0]);
   //console.log(data);
   var array=[]
   console.log(data)
   array.push(data[2])
data[1].children=array;
data[1].name=" BASE --> "+data[1].name;
console.log(data[1]);
console.log(data[2]);
  root = data[1];
  root.x0 = height / 2;
  root.y0 = 0;
  var data2=[]

  function collapse(d) {
    
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
  }

  root.children.forEach(collapse);

  update(root);
  
//});

d3.select(self.frameElement).style("height", "1000px");

function update(source) {
 // for(var i=0;i<source.children.length;i++)
 
 

  // Compute the new tree layout.
 // var pos=[][];

 // var nodes = tree.nodes(root).reverse()
   var nodes = tree.nodes(root).reverse()
  var  links = tree.links(nodes);

    //console.log(links);

   /* var nodes1=[];
    for(var i=0;i<nodes.length;i++)
   {
    var c=0;
    for(var j=i+1;j<nodes.length;j++){
      if(nodes[i].name==nodes[j].name && c==0){
        nodes1.push(nodes[i]);
        c++;
      }
    }
   }
   nodes1.push(nodes[nodes.length-1]);
   console.log(nodes1);
   console.log(nodes);*/
   

 //   console.log(links);

var nodes1=nodes;

/* for(var i=0;i<nodes.length;i++){
  var array=[];
  var c=0;
  for(var j=i;j<nodes.length;j++){

    if(array[i]==array[j]){
      c++;
    }
     if(c>1){
    nodes1.splice(j,1);
  }
  }
 
}*/
console.log(nodes1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) {

for(var i=0;i<nodes.length;i++){
  var array=[];
  for(var j=0;j<nodes.length;j++){
    array[j]=nodes[j].name;
  }
}


   d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.y0+ "," + source.x0 + ")" ; })
    .on("click", click);

  nodeEnter.append("circle")
    .attr("r", 1e-6)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
    .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
    .attr("dy", ".35em")
    .attr("transform", function(d) {return "rotate("+(-60)+")"})
    .attr("fill",function(d){if(d.res_time>15)return "red"; else return "Black"} )
    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
    .text(function(d) { return d.name+"  /  "+d.api+"  ("+d.res_time+")  "; })
    .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
    .attr("r", 4.5)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
    .remove();

  nodeExit.select("circle")
    .attr("r", 1e-6);

  nodeExit.select("text")
    .style("fill-opacity", 1e-6);

  // Update the links…

  var link = svg.selectAll("path.link")
    .data(links, function(d) { return d.target.id; })

    

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
    var o = {x: source.x0, y: source.y0};
    return diagonal({source: o, target: o});
    });

  // Transition links to their new position.
  link.transition()
    .duration(function(){return duration;})
    .attr("d", diagonal)
    .style("stroke-width", function(d){return 1;});;

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
    var o = {x: source.x, y: source.y};
    return diagonal({source: o, target: o});
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
  d.x0 = d.x;
  d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
  d._children = d.children;
  d.children = null;
  } else {
  d.children = d._children;
  d._children = null;
  }
  update(d);
}










 
});
});


}
