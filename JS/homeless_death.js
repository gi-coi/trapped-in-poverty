
           
    (function  () { 
            // set the dimensions of the graph
            var margin = {top: 30, right: 20, bottom: 70, left: 70},
                width = 800 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;
            
            // parse the year
            var parseYear = d3.timeParse("%Y");
            
            // set the ranges
            var x = d3.scaleTime().range([0, width-20]);
            var y = d3.scaleLinear().range([height, 0]);
            
            // define the lines
            var numbersline = d3.line()
                .x(function(d) { return x(d.year); })
                .y(function(d) { return y(d.numbers); });
            
            // add the svg 
            var svg = d3.select("#deaths_Vis")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            // import the data
            d3.csv("homelessness_deaths.csv", function(error, data) {
                
                data.forEach(function(d) {
                    d.year = parseYear(d.year);
                    d.numbers = +d.numbers;
                    // check the data 
                    console.log(d);
                });
                
                // scale the range of the data
                x.domain(d3.extent(data, function(d) { return d.year; }));
                y.domain([0, d3.max(data, function(d) { return d.numbers; })]);
                
                // nest the entries by disease
                var dataNest = d3.nest()
                                 .key(function(d) { return d.case; })
                                 .entries(data);
                
                // set the colour scale and legend space
                var colour = d3.scaleOrdinal(d3.schemeCategory10);
                legendSpace = width / dataNest.length;
                
                // loop through each key(disease)
                dataNest.forEach(function(d, i) {
                    
                    svg.append("path")
                       .attr("class", "line")
                       .transition().duration(1000) 
                       .style("stroke", function() {
                            return d.colour = colour(d.key); })
                       .attr("d", numbersline(d.values));
    
                    // add the legend
                    svg.append("text")
                      .attr("x", (legendSpace/2) + i * legendSpace)
                      .attr("y", height + (margin.bottom/2) + 5)
                      .attr("class", "legend")
                      .style("fill", function() {
                         return d.colour = colour(d.key); })
                      .text(d.key);
                    
                });
                
                // add the x axis
                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));
                
                // add the y axis
                svg.append("g")
                    .attr("class", "axis")
                    .call(d3.axisLeft(y));
                
            });
    }) ();
        