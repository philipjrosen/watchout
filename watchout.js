var stage = d3.select('body')
              .append('svg')
              .attr('width', 800)
              .attr('height', 600);

var svgPlayer = stage.append('circle');

var enemies = d3.range(0,50).map(function(enemy){
  return enemy;
});

svgPlayer.attr({'class':'player', 'cx': 400, 'cy':300, 'r':10});

svgPlayer.on('click', function(e){
  console.log('clicked');
});

var update = function(data){

  stage.selectAll('.enemy')
    .data(data)
    .enter()
    .append('circle')
    .attr({'class':'enemy', 'r':10})
    .attr('cy', function(d, i){
      return (Math.random() * 600);
    })
    .attr('cx', function(d, i){
      return (Math.random() * 800);
    });
}

update(enemies);
