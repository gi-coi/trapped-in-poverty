
(function  () { // basic dimensions
 var width = 700;
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


     
        // voronoi   
        var voronoi = d3.voronoi()
        .x(function (d) {
            return xScale(d.year)
        })
        .y(function (d) {
            return yScale(d.value)
        })
        .extent([
            [-margin.left, -margin.top],
            [width - margin.left, height - margin.top]
        ])
 
 
            

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
     .append("g")
     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
     

 // linegroups is just a group to hold the lines, it never needs to change, so lets declare it here


 var focus = svg.append("g")
 .attr("transform", "translate(-100,-100)")
 .attr("class", "focus");

focus.append("circle")
 .attr("r", 3.5);

focus.append("text")
 .attr("y", -10);


 d3.csv(
     "poverty_total.csv",
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
         var filteredData = filterData(poverty_data);
        update(filteredData);

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
             // filter based on housing costs
             var filteredData = filterData(poverty_data);
             return update(filteredData);
         });


         document.getElementById('poverty_type').addEventListener('change', function () {
            var filteredData = filterData(poverty_data);
            return update(filteredData);
        })

     }
 );

 var update = function (data) {
    // set the domains on the scales
    yScale.domain([
        0,
        d3.max(data, function (d) {
            return d.value;
        })
    ]);

    xScale.domain(
        data.map(function (d) {
            return d.year;
        })
    );


    // attempt at multiple nesting? 
    var nested = d3.nest()
        .key(function (d) { return d.Region })
        .rollup(function (leaves) {
            var poverty = leaves[0].poverty_type;
            var housing = leaves[0].housing_costs;



            var labelX = leaves[leaves.length - 1].year;
            var labelY = leaves[leaves.length - 1].value;
            return { poverty: poverty, housing: housing, labelX: labelX, labelY: labelY, leaves: leaves }
        })
        .entries(data);

        var group = svg.selectAll('.lineGroup')
        .data(nested, function (d) {

            return d.value.housing + d.value.poverty;
        })


    var new_group = group
        .enter()
        .append("g")
        .attr("class", "lineGroup");


    new_group
        .merge(group);


    group.exit().remove();

    // text labels
    new_group
        .append('text')
        .datum(function (d) {

            return {
                region: d.key,
                value: d.value.leaves,
                labelY: d.value.labelY,
                labelX: d.value.labelX
            }
        })


        .attr('transform', function (d) {

            return ('translate(' + (xScale(d.labelX) + 3) + ',' + yScale(d.labelY) + ')')

        })
        .attr('x', 3)
        .attr('dy', '0.35em')
        .attr('class', 'label')
        .style('font', '16px courier')
        .text(function (d) {
            return d.region
        })






    new_group
        .append('path')
        .attr('class', 'line')
        .call(transition)
        .attr('d', function (d) {

            return lineGen(d.value.leaves);
        })
        .attr('stroke', function (d) {
            return colours(d.key)
        })
        .attr('stroke-width', '3px')
        .attr('fill', 'none');


        svg
        .select(".y.axis")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yScale));



    var dt = d3.merge(nested.map(function (d) {
        return d.value.leaves
    }))



    var vr = svg.selectAll('.voronoi')
        .data(voronoi.polygons(dt));



    var new_vr = vr.enter()
        .append('path');


    new_vr.merge(vr)
        .attr('class', 'voronoi')
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
        .on("mouseout", function (d) {
            focus.attr("transform", "translate(-100,-100)");
        }, true);

    vr.exit().remove();

}

 // filter data
 

 var filterData = function (data) {

    var HCselector = document.getElementById("housing_costs");
    var housing_costs = HCselector.options[HCselector.selectedIndex].value;
    var Pselector = document.getElementById('poverty_type');
    var poverty_type = Pselector.options[Pselector.selectedIndex].value;

    var filteredData = data.filter(function (d) {
        return (d.housing_costs == housing_costs) & (d.poverty_type == poverty_type);
    });


    return filteredData;
}



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
})();