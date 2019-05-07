
(function ()   {
   
    // tooltip
    var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

    var tooltipText = tooltip
    .append('p')
    .attr('class', 'tooltipText');
  
    
    var width = 800;
    var height = 600;

    var margin = {top: 20, bottom: 40, left: 60, right: 20}
    var svg = d3.select('#stackedBar')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;
    var yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1);

    var xScale = d3.scaleLinear().rangeRound([0, width]);

    var colours = d3.scaleOrdinal(d3.schemeCategory10);

    var fills = d3.scaleOrdinal()
    .range(['#882D60', '#7A9F35']);


    d3.csv('csv/cp_households_cat.csv', 
     function(data) {
        


        update(data);


        svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (height) + ')')
            .call(d3.axisBottom(xScale).ticks(5))
           
     



        svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yScale));


        svg.append("text")             
        .attr("transform",
              "translate(" + (width / 2 ) + " ," + 
                             (height + margin.bottom - 2) + ")")
        .style("text-anchor", "middle")
        .attr('class', 'x axisLabel')
        .text("% of households in poverty");


        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr('class', 'y axisLabel')
        .text("Year");



        document.getElementById("housing_costs").addEventListener("change", function () {
         
            return update(data);
        });
    }
    )



    var update = function(data) {
    var filteredData = filterData(data);


    let maxVal = d3.max(filteredData, function (d) {
        var vals = d3.keys(d).map(function (key) { return key !== 'year' ? d[key] : 0 });
        return d3.sum(vals);
    });
   





       var keys= data.columns.slice((1,2));


    var stack = d3.stack()
    .keys(keys)
    .offset(d3.stackOffsetNone);


    var stacked = stack(filteredData);





    yScale.domain(filteredData.map( function (d) { return d.year}));

    fills.domain([keys]);
    xScale.domain([0, maxVal]);


    var groups = svg.selectAll('.group')
    .data(stacked, function (d) { return d})
    .enter()
    .append('g')
    .attr('class', 'group')
    .attr('fill', function (d) {
 
        return fills(d.key)
    })

groups.selectAll('.legendText').remove();
    
  var rects=  groups
    .selectAll('.bar')
    .data(function (d) {return d});


var new_rects = rects
    .enter()
    .append('rect')
    .attr('class', 'bar');

    new_rects.merge(rects)
    .attr('x', function (d) {return xScale(d[0])})
    .attr('y', function (d) { return yScale(d.data.year)})
    .attr('width', function (d) { return xScale(d[1] - d[0]) })
    .attr('height', yScale.bandwidth())
    .on("mouseover", function(d) {    
  
        tooltip.transition()        
            .duration(200)      
            .style("opacity", .9) 
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");


            tooltipText.text(( d[1] - d[0] )+ '%');
        })                  
    .on("mouseout", function(d) {       
        tooltip.transition()        
            .duration(500)      
            .style("opacity", 0);   
    });
    
 rects.exit().remove();
 
 
groups
.append('text')
.attr('class', 'legendText')
.datum(function (d) {
   return {
       text: d.key,
       xPos: d[d.length - 1][0],
       yPos: d[d.length - 1].data.year
   }
})
.text(function (d) {

    return d.text
})
.attr('x', function (d) { return xScale(d.xPos + 3)})
.attr('dy', function(d) {return yScale(d.yPos) - 4} )
.style('font', '16px courier')

// caption for data source
d3.select('#stackedBar')
.append('p')
.attr('class', 'source')
.html('Source: Department of Work and Pensions, ')
.append('a')
.attr('href', 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2')
.attr('target', '_blank')
.text('HBAI');



    }

  




    var filterData = function (data) {
var HCselector = document.getElementById("housing_costs");
var housing_costs = HCselector.options[HCselector.selectedIndex].value;

var filteredData = data.filter(function (d) {
    return (d.housing_costs == housing_costs)
});


return filteredData;
}

})();
