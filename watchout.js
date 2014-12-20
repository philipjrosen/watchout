var stage = d3.select('body')
              .append('svg')
              .attr('width', 800)
              .attr('height', 600);

///Player Setup

var dragstarted = function() {
  console.log("dragstarted");
};

//may need to modify event if multiple events?
var dragged = function() {
  svgPlayer.attr("cx", d3.event.x).attr("cy", d3.event.y);
};

var dragended = function () {
  console.log('drag end');
};

var drag = d3.behavior.drag()
  .on("dragstart", dragstarted)
  .on("drag", dragged)
  .on("dragend", dragended);

var svgPlayer = stage.append('circle')
    .attr({'class':'player', 'r':10})
    .attr({'cx': 400, 'cy':300})
    .call(drag);

//Enemy Setup
var enemies = d3.range(0,50).map(function(enemy){
  return enemy;
});

stage.selectAll('.enemy')
  .data(enemies)
  .enter()
  .append('circle')
  .attr({'class':'enemy', 'r':10})
  .attr('cy', function(d, i){
    return (Math.random() * 600);
  })
  .attr('cx', function(d, i){
    return (Math.random() * 800);
  });

var update = function(){
  stage.selectAll('.enemy')
    .transition()
    .duration(1000)
    .attr('cy', function(d, i){
      return (Math.random() * 600);
    })
    .attr('cx', function(d, i){
      return (Math.random() * 800);
    });
};

update(enemies);

setInterval(function(){
  update(enemies);
},1000);
