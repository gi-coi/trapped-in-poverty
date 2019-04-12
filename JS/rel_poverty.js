 // basic dimensions
 var width = 900;
 var height = 600;
 var margin = { top: 30, right: 30, bottom: 30, left: 30 };

 // line generator
 var lineGen = d3
     .line()
     .curve(d3.curveMonotoneX)
     .x(function(d) {
         return xScale(d.year);
     })
     .y(function(d) {
         return yScale(d.value);
     });

 // SCALES

 // colour scale
 var colours = d3.scaleOrdinal(d3.schemeCategory10);

 // axis scales
 var xScale = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]);
 var yScale = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]);

 var svg = d3
     .select("#povertyVis")
     .append("svg")
     .attr("height", height)
     .attr("width", width)
     .call(responsivefy)
     .append("g")
     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
     

 // linegroups is just a group to hold the lines, it never needs to change, so lets declare it here


 d3.csv(
     "rel_poverty_wuk.csv",
     // do the conversion to number with an accessor function on loading, rather than looping through the data later
     function(d) {
         d.value = +d.value;
         return d;
     },
     function(poverty_data) {
         // better to write one function that can draw the lines when its passed data
         // than to write one bit of code that draws things the first time,
         // then another that handles all the subsequent drawing.
         // That way you only have to get one bit of code right, not two
         updateHC(poverty_data);

         svg.append("g")
             .attr("class", "x axis")
             .attr(
                 "transform",
                 "translate(0," + (height - margin.top - margin.bottom) + ")"
             )
             .call(d3.axisBottom(xScale));

         svg.append("g")
             .attr("class", "y axis")
             .call(d3.axisLeft(yScale));

         // event listener to toggle housing costs
         document.getElementById("housing_costs").addEventListener("change", function() {
             return updateHC(poverty_data);
         });
     }
 );

 var updateHC = function(data) {
     // filter based on housing costs
     var filteredData = filterHC(data);

     // set the domains on the scales
     yScale.domain([
         0,
         d3.max(filteredData, function(d) {
             return d.value;
         })
     ]);

     xScale.domain(
         filteredData.map(function(d) {
             return d.year;
         })
     );

     // nested data for multiline chart
     var nested = d3
         .nest()
         .key(function(d) {
             return d.Region;
         })
         .entries(filteredData);


 nested.forEach(function (n) {
     n.poverty = n.values[0].poverty_
     n.hc = n.values[0].housing_costs;
     n.labelY = n.values[n.values.length - 1].value;
 })


  var lineGroups = svg.selectAll('.lineGroup')
  .data(nested, function (d) { return d.hc});


  var new_groups = lineGroups
  .enter()
  .append("g")
  .attr("class", "lineGroup");


 new_groups
  .merge(lineGroups);


  
lineGroups.exit().remove();



 new_groups
  .append('path')
  .attr('class', 'line')
  .call(transition)
  .attr('d', function (d) {
      return lineGen(d.values);
  })
  .attr('stroke', function (d ) {
      return colours(d.key)
  })
  .attr('stroke-width', '3px')
  .attr('fill', 'none');




  new_groups
  .append('text')
  .datum(function (d){
      return {
          region: d.key,
          value: d.values[d.values.length - 1],
          labelY: d.labelY
      }
  } )
  
  
  .attr('transform', function (d ) {
    
      return('translate(' + (xScale(d.value.year) + 3) + ',' + yScale(d.labelY) + ')')
      
  })
  .attr('x', 3)
  .attr('dy', '0.35em')
  .attr('class', 'label')
  .style('font', '16px courier')
  .text(function (d) {
      return d.region
  })
  var focus = svg.append("g")
.attr("transform", "translate(-100,-100)")
.attr("class", "focus");

focus.append("circle")
.attr("r", 3.5);

focus.append("text")
.attr("y", -10);

  var voronoi = d3.voronoi()
  .x (function (d) {
      return xScale(d.year)
  })
  .y(function (d) {
      return yScale(d.value)
  })
  .extent([
      [-margin.left, -margin.top],
      [width - margin.left, height - margin.top]
  ])


  var dt = d3.merge(nested.map(function (d) {
      return d.values
  }))
  
  
  var vr = svg.selectAll('.voronoi')
  .data(voronoi.polygons(dt));


  vr.enter()
  .append('path')
  .attr('d', function (d, i) {
      return d ? 'M' + d.join('L') + 'Z' : null;
  })
  .style('fill', 'none')
  .style('pointer-events', 'all')
  .on('mouseenter', function (d) {
     
      focus.attr('transform', 'translate(' + xScale(d.data.year) + ',' + yScale(d.data.value) + ')')
      focus.select('text')
    
      
         .text(d.data.value + '%')
         .style('font', '13px courier')
       
        


   
  })
  .on("mouseout", function(d) {
 focus.attr("transform", "translate(-100,-100)");
}, true);


  /*    // grab hold of all existing lines and update their data to the new data
     var lines = lineGroups.selectAll("path").data(nested);

     // do we need to create any new lines? if so, we'll do it here and set
     // their basic properties
     var new_lines = lines
         .enter()
         .append("path")
         .attr("class", "line");

     // do we need to remove any lines? if so, we'll do it here
     lines.exit().remove();

     // let's take our existing lines, merge with any new lines we made, and update their path
     lines
         .merge(new_lines)
         .call(transition)
         .attr("d", function(d) {
             return lineGen(d.values);
         })
         .attr("fill", "none")
         .attr("stroke", function(d) {
             return colours(d.key);
         }); */

     // update Y axis
     d3.select("#povertyVis svg")
         .select(".y.axis")
         .transition()
         .duration(1000)
         .call(d3.axisLeft(yScale));
 };

 // tool functions
 // smooth transition function for the paths
 function transition(path) {
     path.transition()
         .duration(2000)
         .attrTween("stroke-dasharray", tweenDash);
 }
 function tweenDash() {
     var l = this.getTotalLength(),
         i = d3.interpolateString("0," + l, l + "," + l);
     return function(t) {
         return i(t);
     };
 }

 // filter data
 var filterHC = function(data) {
     var selector = document.getElementById("housing_costs");
     var housing_costs = selector.options[selector.selectedIndex].value;

     var filteredData = data.filter(function(d) {
         return d.housing_costs == housing_costs;
     });

     return filteredData;
 };


 function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}
