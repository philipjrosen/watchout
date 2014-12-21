var stage = d3.select('body')
              .append('svg')
              .attr('width', 800)
              .attr('height', 600);

var highScore = 0;
var currentScore = 0;
var collisions = 0;

///Player Setup
var dragstarted = function() {
};

var dragged = function() {
  svgPlayer.attr("cx", d3.event.x).attr("cy", d3.event.y);
};

var dragended = function () {
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
  .append('image')
  .attr('class', 'enemy rotate')
  .attr({'height': 50, 'width': 50})
  .attr('xlink:href', 'shuriken.png')
  .attr('y', function(d, i){
    return (Math.random() * 600);
  })
  .attr('x', function(d, i){
    return (Math.random() * 800);
  });

var isTouching = function(enemy){
  var x1 = enemy.x.animVal.value;
  var y1 = enemy.y.animVal.value;
  // test if overlapping player
  var x2 = d3.select('.player').attr('cx');
  var y2 = d3.select('.player').attr('cy');

  var deltaX = x2 - x1;
  var deltaY = y2 - y1;

  var sum = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
  var distance = Math.sqrt(sum);

  if( distance <= 20){
    collisions++;
    currentScore = 0;
    d3.select('.collisions').text("Collisions: "+collisions);
  }
}

var collision = function(){
  var enemies = stage.selectAll('.enemy')[0];
  enemies.forEach(function(e){
    isTouching(e);
  });
}

var update = function(){
  stage.selectAll('.enemy')
    .transition()
    .duration(2000)
    .attr('y', function(d, i){
      return (Math.random() * 600);
    })
    .attr('x', function(d, i){
      return (Math.random() * 800);
    });
};

setInterval(function(){
  collision();
  currentScore++;
  d3.select('.current').text("Current score: "+Math.floor(currentScore/10));
  if(currentScore > highScore){
    highScore = currentScore;
    d3.select('.high').text("High score: "+Math.floor(highScore/10));
  }
}, 10);

update(enemies);

setInterval(function(){
  update();
}, 2000);
