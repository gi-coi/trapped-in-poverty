// code base for tooltip and line labels: https://bl.ocks.org/martinjc/980a2fcdbf0653c301dc2fb52750b0d9
(function  () { 
    
    // timeline for poverty in UK-WALES
    //absolute-relative poverty, before-after housing costs
    
    // basic dimensions
 var width = 850;
 var height = 600;
 var margin = { top: 30, right: 100, bottom: 50, left: 40 };

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
 
 
// COLOUR SCALE
// First colour is blue, second is red. Use these ase base colours
// colourblind-friendly https://venngage.com/blog/color-blind-friendly-palette/
var fills = d3.scaleOrdinal().range(['#27647b','#ca3542', '#aecbc9', '#b49fad',  '#57575f']);

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
     
     



 var focus = svg.append("g")
 .attr("transform", "translate(-100,-100)")
 .attr("class", "focus");

focus.append("circle")
 .attr("r", 3.5);

focus.append("text")
 .attr("y", -10);


 d3.csv(
     "csv/poverty_total.csv",
     // do the conversion to number with an accessor function on loading, rather than looping through the data later
     function(d) {
         d.value = +d.value;
         return d;
     },
     function(poverty_data) {
     
         var filteredData = filterData(poverty_data);
         // first call of line chart
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
// axis labels

         svg.append("text")             
             .attr("transform",
                   "translate(" + (width / 2 - margin.left) + " ," + 
                                  (height - margin.bottom + 3) + ")")
             .style("text-anchor", "middle")
             .attr('class', 'x axisLabel')
             .text("Year");


             svg.append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 0 - margin.left)
             .attr("x",0 - (height / 2))
             .attr("dy", "1em")
             .style("text-anchor", "middle")
             .attr('class', 'y axisLabel')
             .text("% of households");

                  // caption for data source
        
        d3.select('#povertyVis')
        .append('p')
        .attr('class', 'source')
        .html('Source: Department of Work and Pensions, ')
        .append('a')
        .attr('href', 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2')
        .attr('target', '_blank')
        .text('HBAI');

       

         // event listener to toggle housing costs
         document.getElementById("housing_costs").addEventListener("change", function() {
             // filter based on housing costs
             var filteredData = filterData(poverty_data);
             return update(filteredData);
         });


         document.getElementById('poverty_type').addEventListener('change', function () {
             // filter based on absolute-relative poverty
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


// nest data to add information on label positioning + unique keys (makes it easier to update chart)
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


     relax(nested);

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
                labelY: d.labelY,
                labelX: d.value.labelX
            }
        })


        .attr('transform', function (d, i) {
                
                
            return ('translate(' + (xScale(d.labelX) + 30) + ',' + yScale(d.labelY) + ')')

        })
        .attr('x', 3)
        .attr('dy', '0.35em')
        .attr('class', 'label')
        .style('font', '16px sans-serif')
        .text(function (d) {
            return d.region
        })
        .attr('stroke', function (d) {
            return fills(d.region)
        })


// connect labels to paths
        var marker = svg.selectAll(".marker")
        .data(nested);


    var new_marker = marker.enter()
        .append("line")
        .attr('class', 'marker');


    new_marker.merge(marker)
        .attr("x1", function(d) {
         
            return xScale(d.value.labelX);
        })
        .attr("y1", function(d) {
            return yScale(d.value.labelY);
        })
        .attr("x2", function(d) {
            return xScale(d.value.labelX) + 30;
        })
        .attr("y2", function(d) {
            return yScale(d.labelY);
        })
        .attr('stroke', 'black')
        .attr('stroke-width', '0.5px');


marker.exit().remove();


    new_group
        .append('path')
        .attr('class', 'line')
        .call(transition)
        .attr('d', function (d) {

            return lineGen(d.value.leaves);
        })
        .attr('stroke', function (d) {
            return fills(d.key)
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




 

 var filterData = function (data) {
      // filter data using dropdown menus
      // the same filter is used for all the charts on the page
    var HCselector = document.getElementById("housing_costs");
    var housing_costs = HCselector.options[HCselector.selectedIndex].value;
    var Pselector = document.getElementById('poverty_type');
    var poverty_type = Pselector.options[Pselector.selectedIndex].value;

    var filteredData = data.filter(function (d) {
        return (d.housing_costs == housing_costs) & (d.poverty_type == poverty_type);
    });


    return filteredData;
}



// Martin's blocks (referenced previously)

function relax(data) {
    var spacing = 16;
    var dy = 2;
    var repeat = false;
    var count = 0;
    data.forEach(function(dA, i) {
        
        var yA = dA.value.labelY;
       
        data.forEach(function(dB, j) {
           
            var yB = dB.value.labelY;
           
            if (i === j) {
                return;
            }
            diff = yA - yB;
            if (Math.abs(diff) > spacing) {
                return;
            }
            repeat = true;
            magnitude = diff > 0 ? 1 : -1;
            adjust = magnitude * dy;
            dA.labelY = +yA + adjust;
            dB.labelY = +yB - adjust;
            dB.labelY = dB.labelY > height ? height : dB.labelY
            dA.labelY = dA.labelY > height ? height : dA.labelY
        })
    })
   return data;
} 

})();


