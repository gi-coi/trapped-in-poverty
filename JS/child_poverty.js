        // basic dimensions
        var width = 900;
        var height = 600;
        var margin = { top: 30, right: 30, bottom: 30, left: 30 };




        // FIRST CHART
        // line generator
        var lineGen = d3
            .line()
            .curve(d3.curveMonotoneX)
            .x(function (d) {
                return xScale(d.year);
            })
            .y(function (d) {
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



        // axis scales
        var xScale = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]).padding(0.3);
        var yScale = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]);

        var svg = d3
            .select("#childVis")
            .append("svg")
            .attr("height", height)
            .attr("width", width + 200)
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");




        var focus = svg.append("g")
            .attr("transform", "translate(-100,-100)")
            .attr("class", "focus");

        focus.append("circle")
            .attr("r", 3.5);

        focus.append("text")
            .attr("y", -10);







        // SECOND CHART
        var h_line = d3.line()
            .curve(d3.curveMonotoneX)
            .x(function (d) { return xScaleW(d.year) })
            .y(function (d) { return yScaleW(d.value) })





        var voronoiW = d3.voronoi()
            .x(function (d) {
                return xScaleW(d.year)
            })
            .y(function (d) {
                return yScaleW(d.value)
            })
            .extent([
                [-margin.left, -margin.top],
                [width - margin.left, height - margin.top]
            ])



        var svg2 = d3
            .select('#childWales')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .append('g')
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        var menu = d3.select('#householdFilter')
            .append('select')
            .attr('id', 'catSelector')
            .attr('class', 'styled-select');

        var xScaleW = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]);
        var yScaleW = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]);

        var focus2 = svg2.append("g")
            .attr("transform", "translate(-100,-100)")
            .attr("class", "focus");

        focus2.append("circle")
            .attr("r", 3.5);

        focus2.append("text")
            .attr("y", -10);





        // SCALES

        // colour scale
        var colours = d3.scaleOrdinal(d3.schemeCategory10);








        d3.csv(
            'child_poverty_total.csv',
            function (d) {
                d.value = +d.value;
                return d;
            },
            function (poverty_data) {
                update(poverty_data);

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
                document.getElementById("housing_costs").addEventListener("change", function () {
                    return update(poverty_data);
                });


                document.getElementById('poverty_type').addEventListener('change', function () {
                    return update(poverty_data);
                })



            }
        );



        d3.csv(
            'cp_households_wales.csv',
            function (d) {
                d.value = +d.value;
                return d;
            },
            function (data) {


                householdsChart(data);
                svg2.append("g")
                    .attr("class", "x axis")
                    .attr(
                        "transform",
                        "translate(0," + (height - margin.top - margin.bottom) + ")"
                    )
                    .call(d3.axisBottom(xScaleW));

                svg2.append("g")
                    .attr("class", "y axis")
                    .call(d3.axisLeft(yScaleW));









                var resetButton = d3.select('#householdFilter')
                    .append('button')
                    .attr('id', 'resetButton')
                    .attr('class', 'styled-button')
                    .attr('value', 'Reset')
                    .text('Reset');


                document.getElementById('resetButton').addEventListener('click', function () {
                    householdsChart(data);
                })


                document.getElementById('catSelector').addEventListener('change', function () {
                    var cat = this[this.selectedIndex].value;

                    toBar(cat, data);


                })

            }
        )


        var update = function (data) {


            // filter based on housing costs
            var filteredData = filterData(data);

           

            // set the domains on the scales
            yScale.domain([
                0,
                d3.max(filteredData, function (d) {
                    return d.value;
                })
            ]);

            xScale.domain(
                filteredData.map(function (d) {
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
                .entries(filteredData);



            /* 
                        nested.forEach(function (n) {
                            n.poverty = n.values[0].poverty_type;
                            n.hc = n.values[0].housing_costs;
                            n.labelY = n.values[n.values.length - 1].value;
                        }) */











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











            d3.select("#childVis svg")
                .select(".y.axis")
                .transition()
                .duration(1000)
                .call(d3.axisLeft(yScale));



            var dt = d3.merge(nested.map(function (d) {
                return d.value.leaves
            }))
       


            var vr = svg.selectAll('.voronoi')
                .data(voronoi.polygons(dt));


            vr.enter()
                .append('path')
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






        }



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



        // smooth transition function for the paths
        function transition(path) {
            path.transition()
                .duration(2000)
                .attrTween("stroke-dasharray", tweenDash);
        }
        function tweenDash() {
            var l = this.getTotalLength(),
                i = d3.interpolateString("0," + l, l + "," + l);
            return function (t) {
                return i(t);
            };
        }





        var householdsChart = function (data) {
            var nest = d3.nest()
                .key(function (d) { return d.household })
                .rollup(function (leaves) {
                    var labelX = leaves[leaves.length - 1].year;
                    var labelY = leaves[leaves.length - 1].value;
                    return { labelX: labelX, labelY: labelY, leaves: leaves }
                })
                .entries(data);

console.log(nest)


            menu
                .selectAll('option')
                .data(nest, function (d) { return d.key })
                .enter()
                .append('option')
                .attr('value', function (d) {
                    return d.key
                })
                .text(function (d) {
                    return d.key
                });


            xScaleW.domain(data.map(function (d) {
                return d.year
            }))




            yScaleW.domain([0, d3.max(data, function (d) {
                return d.value;
            })])


            var groups = svg2.selectAll('.h_group')
                .data(nest, function (d) { return d.key });


            var new_groups = groups
                .enter()
                .append('g')
                .attr('class', 'h_group');

            new_groups.merge(groups);


            groups.exit().remove();

            new_groups
                .append('path')
                .attr('class', 'line')
                .call(transition)
                .attr('d', function (d) {

                    return h_line(d.value.leaves)
                })
                .attr('stroke', function (d) {
                    return colours(d.key)
                })
                .attr('stroke-width', '3px')
                .attr('fill', 'none');



            new_groups
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

                    return ('translate(' + (xScaleW(d.labelX) + 3) + ',' + yScaleW(d.labelY) + ')')

                })
                .attr('x', 3)
                .attr('dy', '0.35em')
                .attr('class', 'label')
                .style('font', '16px courier')
                .text(function (d) {
                    return d.region
                })

            var dt = d3.merge(nest.map(function (d) {
                return d.value.leaves
            }))


            var vr = svg2.selectAll('.voronoi')
                .data(voronoiW.polygons(dt));


            vr.enter()
                .append('path')
                .attr('class', 'voronoi')
                .attr('d', function (d, i) {
                    return d ? 'M' + d.join('L') + 'Z' : null;
                })
                .style('fill', 'none')
                .style('pointer-events', 'all')
                .on('mouseenter', function (d) {

                    focus2.attr('transform', 'translate(' + xScaleW(d.data.year) + ',' + yScaleW(d.data.value) + ')')
                    focus2.select('text')


                        .text(d.data.value + '%')
                        .style('font', '13px courier')





                })
                .on("mouseout", function (d) {
                    focus2.attr("transform", "translate(-100,-100)");
                }, true);






        }


        var toBar = function (cat, data) {
            var filtered = data.filter(function (d) {
                return d.household == cat;
            })

            yScaleW.domain([0, d3.max(filtered, function (d) {
                return d.value;
            })])




            xScaleW.domain(data.map(function (d) {
                return d.year
            }))
                .round(true)
                .padding(.1);



            svg2.selectAll('.line').exit().remove();

            var groups = svg2.selectAll('.h_group')
                .data(filtered, function (d) {

                    return d.year + d.household
                })



            var new_groups = groups
                .enter()
                .append('g')
                .attr('class', 'h_group');


            new_groups.merge(groups);

            groups.exit().remove();



            new_groups
                .append('rect')
                .attr('class', 'bar')
                .attr('y', (height - margin.top - margin.bottom))
                .attr('x', function (d) {
                    return xScaleW(d.year)
                })
                .attr('width', xScaleW.bandwidth())

                .transition()
                .duration(1000)
                .attr('y', function (d) {
                    return yScaleW(d.value)
                })
                .attr('height', function (d) {
                    return (height - margin.top - margin.bottom) - yScaleW(d.value)
                })
                .attr('fill', 'red')
                .style('padding', '5px')

            d3.select("#childWales svg")
                .select(".y.axis")
                .transition()
                .duration(1000)
                .call(d3.axisLeft(yScaleW));

            document.getElementById('catSelector').addEventListener('change', function () {
                var cat = this[this.selectedIndex].value;

                toBar(cat, data);


            })
        }




