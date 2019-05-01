            
    (function  () { 
            var margin = { top: 20, right: 10, bottom: 130, left: 40 },
                width = 800,
                height = 500;
            
            var svg = d3.select('#roughsleepers_Vis')
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .append('g')
                        .attr("transform", "translate(" + margin.left + ',' + margin.top + ')');
            
            
            width = width - margin.right - margin.left;
            height = height - margin.top - margin.bottom;
            
            var xScale = d3.scaleBand()
                            .range([0, width]);
            
            var yScale = d3.scaleLinear()
                            .range([height, 0]);
        
            d3.csv("csv/rough_sleepers.csv", function(d) {
                
                d.numbers = +d.numbers;
                d.cities = d.cities;
                return d;
                
            },
      
                // sort the data from greatest to smallest
                
            function(data) {      
                   
                data.sort(function(a,b) {
                    return b.numbers - a.numbers;
                });    
                
                // specify the domains
                xScale.domain(data.map(function(d) { return d.cities; }) );
                yScale.domain([0, d3.max(data, function(d) {return d.numbers; }) ] );
                console.log(data)
                
                // draw the bars
                svg.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .transition().duration(1000) 
                    .delay(function(d,i) {return i*200; })
                    .attr("height", function(d) { return height - yScale(d.numbers); })
                    .attr("y", function(d) { return yScale(d.numbers); })
                    .attr("x", function(d) { return xScale(d.cities); })
                    .attr("width", xScale.bandwidth())
                    .style("fill", function(d,i) {return 'rgb(20, 20, '+ ((i*30) +100) + ')' });
                
                // label the bars
                svg.selectAll('text')
                    .data(data)
                    .enter()
                    .append('text')
                    .text(function(d) {return d.numbers; })
                    .attr('x', function(d) {return xScale(d.cities) + xScale.bandwidth() / 2; })
                    .attr('y', function(d) {return yScale(d.numbers) - 6; })
                    .style("full", "white")
                    .style("text-anchor", "middle");
                
                // draw the xAxis 
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(xScale))
                    .selectAll('text')
                    .attr("transform", "rotate(-60)")
                    .attr("dx", "-.8em")
                    .attr("dy", ".25em")
                    .style("text-anchor", "end") // pull the labels out to avoid the overlapping
                    .style("font-size", "13px");
                    
                // draw the yAxis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(d3.axisLeft(yScale))
                    .style("font-size", "12px");
                     
            });
    }) ();