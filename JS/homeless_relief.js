// This is for the third bar chart in the housing page.
// I referred to the book 'Interactive Data Visualization for the Web' of Scott Murray (Chapter 9: Updates, Transitions, and Motion) and the code provided by the author. And then I changed the details to adjust to my data.
            
    (function () {
            var margin = { top: 20, right: 10, bottom: 130, left: 40 },
                width = 800,
                height = 500;
            
            var svg = d3.select('#relief_Vis')
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
        
            d3.csv("csv/households_relieved.csv", function(d) {
                
                d.percentage = +d.percentage;
                d.cities = d.cities;
                return d;
                
            },
      
                // sort the data from greatest to smallest
                
            function(data) {      
                   
                data.sort(function(a,b) {
                    return b.percentage - a.percentage;
                });    
                
                // specify the domains
                xScale.domain(data.map(function(d) { return d.cities; }) );
                yScale.domain([0, d3.max(data, function(d) {return d.percentage; }) ] );
                console.log(data)
                
                // draw the bars
                svg.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr("height", function(d) { return height - yScale(d.percentage); })
                    .attr("y", function(d) { return yScale(d.percentage); })
                    .attr("x", function(d) { return xScale(d.cities); })
                    .attr("width", xScale.bandwidth())
		    //// adjusted colour with the charts of the 'data' page. (colourblind-friendly https://venngage.com/blog/color-blind-friendly-palette/)
                    .attr("fill", "#27647b")
                    .on("mouseover", function() {
                        d3.select(this)
                            .attr("fill", "#ca3542");
                    })
                    .on("mouseout", function() {
                        d3.select(this)
                            .attr("fill", "#27647b");
                    });
                
                // label the bars
                svg.selectAll('text')
                    .data(data)
                    .enter()
                    .append('text')
                    .text(function(d) {return d.percentage; })
                    .attr('x', function(d) {return xScale(d.cities) + xScale.bandwidth() / 2; })
                    .attr('y', function(d) {return yScale(d.percentage) - 6; })
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
            
