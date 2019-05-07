(function () {

    // basic dimensions
    var width = 850;
    var height = 600;
    var margin = { top: 30, right: 100, bottom: 50, left: 40 };


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


    var fills = d3.scaleOrdinal().range(['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0']);

    // axis scales
    var xScale = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]).padding(0.3);
    var yScale = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]);

    var svg = d3
        .select("#childVis")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
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
    var colours = d3.scaleOrdinal()
    .range(['#882D60', '#7A9F35']);




    d3.csv(
        'csv/child_poverty_total.csv',
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
                d3.select('#childVis')
                .append('p')
                .attr('class', 'source')
                .html('Source: Department of Work and Pensions, ')
                .append('a')
                .attr('href', 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2')
                .attr('target', '_blank')
                .text('HBAI');

            // event listener to toggle housing costs
            document.getElementById("housing_costs_child").addEventListener("change", function () {
                var filteredData = filterData(poverty_data);
                return update(filteredData);
            });


            document.getElementById('poverty_type_child').addEventListener('change', function () {
                var filteredData = filterData(poverty_data);

                return update(filteredData);
            })



        }
    );


// data on child poverty in Welsh households
    d3.csv(
        'csv/cp_households_wales.csv',
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


                svg2.append("text")             
                .attr("transform",
                      "translate(" + (width / 2 - margin.left) + " ," + 
                                     (height - margin.bottom + 3) + ")")
                .style("text-anchor", "middle")
                .attr('class', 'x axisLabel')
                .text("Year");
   
   
                svg2.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .attr('class', 'y axisLabel')
                .text("% of households");





                d3.select('#childWales')
                .append('p')
                .attr('class', 'source')
                .html('Source: ')
                .append('a')
                .attr('href', 'https://statswales.gov.wales/Catalogue/Community-Safety-and-Social-Inclusion/Poverty/childreninrelativeincomepoverty-by-economicstatusofhousehold')
                .attr('target', '_blank')
                .text('StatsWales');



            var resetButton = d3.select('#householdFilter')
                .append('button')
                .attr('id', 'resetButton')
                .attr('class', 'styled-button')
                .attr('value', 'Reset')
                .text('Back to line chart');


            document.getElementById('resetButton').addEventListener('click', function () {
                document.getElementById('catSelector').value = 'All households';
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


        // multiple nesting - rollup to add ID (makes chart update easier) and values for label positioning
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

// if overlapping labels
        relax(nested);

            console.log(nested)
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

                return colours(d.region)
            })



        // connect labels to paths

        var marker = svg.selectAll(".marker")
            .data(nested);


        var new_marker = marker.enter()
            .append("line")
            .attr('class', 'marker');


        new_marker.merge(marker)
            .attr("x1", function (d) {
               
                return xScale(d.value.labelX);
            })
            .attr("y1", function (d) {
                return yScale(d.value.labelY);
            })
            .attr("x2", function (d) {
                return xScale(d.value.labelX) + 30;
            })
            .attr("y2", function (d) {
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


        var new_vr = vr
            .enter()
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
                    .style('font', '13px sans-serif')





            })
            .on("mouseout", function (d) {
                focus.attr("transform", "translate(-100,-100)");
            }, true);


        vr.exit().remove();



    }



    var filterData = function (data) {

        var HCselector = document.getElementById("housing_costs_child");
        var housing_costs = HCselector.options[HCselector.selectedIndex].value;
        var Pselector = document.getElementById('poverty_type_child');
        var poverty_type = Pselector.options[Pselector.selectedIndex].value;

        var filteredData = data.filter(function (d) {
            return (d.housing_costs == housing_costs) & (d.poverty_type == poverty_type);
        });


        return filteredData;
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


        fills.domain(nest.map(function (d) { return d.key }))

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
                return fills(d.key)
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
            .style('font', '13px sans-serif')
            .text(function (d) {
                return d.region
            })

        var dt = d3.merge(nest.map(function (d) {
            return d.value.leaves
        }))


        var vr = svg2.selectAll('.voronoi')
            .data(voronoiW.polygons(dt));


        var new_vr = vr
            .enter()
            .append('path');


        new_vr.merge(vr)
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
                    .style('font', '13px sans-serif')





            })
            .on("mouseout", function (d) {
                focus2.attr("transform", "translate(-100,-100)");
            }, true)
            .on('click', function (d) {
                document.getElementById('catSelector').value = d.data.household;
                toBar(d.data.household, data);
            })


        vr.exit().remove();

        // update Y axis
        d3.select("#childWales svg")
            .select(".y.axis")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(yScaleW));


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



        svg2.selectAll('.line').remove();
        svg2.selectAll('.voronoi').remove();
        focus2.attr("transform", "translate(-100,-100)");

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
            .attr('fill', function (d) {
                return fills(d.household);
            })
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


    function relax(data) {
        var spacing = 16;
        var dy = 2;
        var repeat = false;
        var count = 0;
        data.forEach(function (dA, i) {

            var yA = dA.value.labelY;

            data.forEach(function (dB, j) {

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






