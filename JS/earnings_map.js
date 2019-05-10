// map for weekly full-time earnings in Great Britain
// Data for UK unavailable


var width;
var height;
var svg;
var legend;
var g;
var min;
var max;


var legendWidth = 200;




//var colours = d3.scaleSequential(d3.interpolateGnBu);

var colours = d3.scaleSequential().interpolator(d3.interpolateYlGnBu);
var projection;



var path;

var pay_data;


var zoom = d3.zoom()
.on('zoom', zoomFunc);




var centered;

var zoomFunc = function() {
            g.attr('transform', d3.event.transform);
        }


        var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

    var tooltipText = tooltip
    .append('p')
    .attr('class', 'tooltipText');
  

  var mp = d3.map();  
    

var draw = function(geo_data) {


    projection
    .scale(1)
    .translate([0, 0]);



    // this will be used to add the data to the TopoJSON file
pay_data.forEach(function (d) {
    mp.set(String(d.code), +d.pay_week);
})


// realistic scale, excluding outliers and null values
var no_empty = pay_data.filter(function (d) {
    return (!d.pay_week == '') & (+d.pay_week < 750)
})




min = d3.min(no_empty, function (d) {
    return +d.pay_week
})

max = d3.max(no_empty, function (d) {
    return +d.pay_week
})





/* var deciles = []
for (var i = 0.2; i < 1.09; i += 0.2) {
    var decile = d3.quantile(no_empty.map(function(d) {
        return +d.pay_week
    }), i);
    
    deciles.push(decile);
  
}
var firstQuartile = d3.quantile(no_empty.map(function(d) {
  return +d.pay_week
}), 0.25);
var median = d3.median(no_empty.map(function(d) {
  return +d.pay_week
}));
var lastQuartile = d3.quantile(no_empty.map(function(d) {
  return +d.pay_week
}), 0.75);

console.log(deciles)
deciles.push(800) */



colours.domain([min, max]);



    var b = path.bounds(topojson.feature(geo_data, geo_data.objects['lad']));
            var s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
            var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
            projection
                .scale(s)
                .translate(t);

// merge and exit patterns aren't currently necessary but might be if I add features

            var areas = g.selectAll(".area")
                .data(topojson.feature(geo_data, geo_data.objects['lad']).features);


var new_areas= areas
                .enter()
                .append("path")
                .attr("class", "area");


          new_areas.merge(areas)
        
                .attr("fill", function (d) {
                    d.properties.pay_week = mp.get(d.properties.LAD13CD)
                // console.log(d)
                if (d.properties.pay_week == 0) {
                    // null values
                    // otherwise they are forced to 0
                    d.properties.pay_week = 'No data';
                    return '#B0B0B0';
                } else {
                    return colours(d.properties.pay_week);
                }
                 
                })
             
               
                .attr("id", function (d) {  return d.id; })
                .attr("d", path)
                .on('mouseenter', function (d) {
                    // tooltip on map
                    tooltip.transition()        
            .duration(100)      
            .style("opacity", .9) 
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");


            tooltipText.html(d.properties.LAD13NM + '<br>' + d.properties.pay_week);
        })                  
    
              
                .on("mouseout", function(d) {       
        tooltip.transition()        
            .duration(500)      
            .style("opacity", 0);   
    })
    .on('click', function (d){
       // zoom
        return clicked(d);
    });


            areas.exit().remove();


// legend colour scale
            var legData = []

for (var i = 3; i < pay_data.length; i += 10) {
    // sample values from original data
    legData.push(+(pay_data[i]['pay_week']))
}

colours.domain([d3.min(legData, function (d) {
    return d;
}), d3.max(legData, function (d) {
    return d;
})])

var sections = legData.length;
var sectionWidth = Math.floor(legendWidth / sections);


legData.sort(function(x, y){
   return d3.ascending(x, y);
})


var indices = []

for (var i = 0; i < legData.length; i ++) {
    indices.push(String(i));
}
// scale for gue legend
xScale = d3.scaleBand()
.range([0, legendWidth])
.domain(indices)
.paddingInner(0);


legend.selectAll('rect')
.data(legData)
.enter()
.append('rect')
.attr('x', function (d, i ) { return xScale(i)})
.attr('y', 10)
.attr('width', sectionWidth)
.attr('height', 20)
.attr('fill', function (d, i) { return colours(d)});



// add numbers to legend
var linearS = d3.scaleLinear()
.range([0, legendWidth])
.domain(d3.extent(legData, function (d) {
    return d;
}))
legend.append('g').attr('transform', 'translate(0,' + 30 + ')').attr('class', 'x axis').call(d3.axisBottom(linearS)
    .ticks(8)
      .tickSize(2)
      );

      legend.append("text")             
      .attr("transform",
            "translate(" + (legendWidth/2) + " ," + 
                           (60) + ")")
      .style("text-anchor", "middle")
      .style('font-size', 10)
      .text("Gross earnings (£/week)");



}




function clicked(d) {

    // handles zoom
   // Bostock block
 var x, y, k;
 if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll(".area")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");

}


// 

        var init = function () {
   width = document.getElementById('payMap').clientWidth;

    height = document.getElementById('payMap').clientHeight;

    svg = d3.select("#payMap")
                .append("svg")
                .attr("width", width)
                .attr("height", height);


            g = svg.append("g");


      legend = svg.append("g").attr("class", "legend").attr("transform", "translate(20,20)");

 
         
            projection = d3.geoAlbers()
                .rotate([0, 0]);


        

d3.queue()
.defer(d3.json, "map/uk.json")
.defer(d3.csv, 'csv/pay_week.csv')
.await(function (error, boundary_data, p_data) {


    pay_data = p_data;

   

    draw(boundary_data);


})

}();