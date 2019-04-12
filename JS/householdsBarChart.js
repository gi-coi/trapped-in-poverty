
 var stackedBar = function ()   {
     
    
    var width = 900;
    var height = 600;

    var margin = {top: 20, bottom: 20, left: 20, right: 20}
    var svg = d3.select('#householdBarChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;
    var xScale = d3.scaleBand().rangeRound([0, width]);

    var yScale = d3.scaleLinear().rangeRound([height, 0]);


    var colours = d3.scaleOrdinal(d3.schemeCategory10);


    d3.csv('cp_households_cat.csv', 
     function(data) {
        


        update(data);


        svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (height) + ')')
        .call(d3.axisBottom(xScale));


        svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yScale));
    }
    )



    var update = function(data) {
    var filteredData = filterData(data);


    let maxVal = d3.max(filteredData, function (d) {
        var vals = d3.keys(d).map(function (key) { return key !== 'year' ? d[key] : 0 });
        return d3.sum(vals);
    });
   console.log(maxVal)

 




       var keys= data.columns.slice((1,2));
/* 
for (let n = 0; n < filteredData.length; n ++) {
    for (let i = 0; i < keys.length; i ++) {
        
        filteredData[n][keys[i]] = +filteredData[n][keys[i]];
    }
}
 */

    var stack = d3.stack()
    .keys(keys)
    .offset(d3.stackOffsetNone);
    var stacked = stack(filteredData);


    console.log(stacked)



    xScale.domain(filteredData.map( function (d, i) { return d.year})).padding(0.3)
    yScale.domain([0, maxVal]);


    var groups = svg.selectAll('.group')
    .data(stacked);


    var new_groups = groups
    .enter()
    .append('g')
    .attr('class', 'group');

    new_groups.merge(groups)
    .attr('fill', function (d) {
 
        return colours(d.key)
    })

    groups.exit().remove();

    
    new_groups
    .selectAll('.bar')
    .data(function (d) { return d})
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) {  return xScale(d.data.year)})
    .attr('y', function (d) { return yScale(d[1])})
    .attr('height', function (d) { return yScale(d[0] - d[1]) })
    .attr('width', xScale.bandwidth())
    
    



    }

  




    var filterData = function (data) {
var HCselector = document.getElementById("hcFilter");
var housing_costs = HCselector.options[HCselector.selectedIndex].value;

var filteredData = data.filter(function (d) {
    return (d.housing_costs == housing_costs)
});


return filteredData;
}

}();
