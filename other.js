let categories = ['White', 'Mixed', 'Asian', 'Black', 'Other'];

let width = 800;
let height = 540;

let margin = { top: 20, right: 20, bottom: 30, left: 50 };

let incomeColours = ["#bd0026", "#f03b20", "#fd8d3c", "#fecc5c", "#ffffb2"]

let myCols = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3']
let incomeCats = ['Bottom', 'Second', 'Third', 'Fourth', 'Top']
var colors = d3.scaleOrdinal()
    .domain(categories)
    .range(incomeColours);



let formatYear = d3.timeParse('%Y');

var stacker = d3.stack()
.keys(incomeCats)
.offset(d3.stackOffsetNone);




function lineChart() {
    d3.csv('poverty_all.csv', function (data) {
        data.forEach(function (d) {
            d.year = formatYear(d.year);
        })



        categories = ['child', 'overall'];




        let filteredData = filterHCosts(data);
        let svg = d3.select('#poverty_overtime')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('id', 'rel_p_svg')
            .attr('class', 'svgVis')
            .call(responsivefy);

        let group = svg
            .append('g')
            .attr('class', 'chartG')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        let maxVal = d3.max(filteredData, function (d) {
            var vals = d3.keys(d).map(function (key) { return key !== 'year' ? d[key] : 0 });
            return d3.sum(vals);
        });
        console.log(filteredData);



        let xScale = d3.scaleTime()
            .range([margin.left, width])
            .domain(d3.extent(data, function (d) {
                return d.year;
            }))

        let yScale = d3.scaleLinear()
            .range([height, margin.bottom])
            .domain([0, maxVal]);




   


        let xAxis = d3.axisBottom(xScale);


        let yAxis = d3.axisLeft(yScale);


        let nestedData = d3.nest()
            .key(function (d) { return d.area })
            .key(function (d) { return d.type })
            .entries(filteredData);


            let legendSpace = width/nestedData.length;
        var line = d3.line()
            .x(function (d) { return xScale(d.year) })
            .y(function (d) { return yScale(+d.rel_poverty) });


            



     let lineGroups = svg.selectAll('.lineGroup')
            .data(nestedData)
            .enter()
            .append('g')
            .classed('lineGroup', true)
            .attr('stroke', function (d) {
                return stroke(d.key);
                
            })


let legendCategories = ['Wales', 'United Kingdom'];
                    

        let lines = lineGroups.selectAll('.line')
        .data(function (d) {
            return d.values
        })
        .enter()
        .append('path');

    lines
        .attr('class', 'line')
        .attr('d', function (d) {
            return line(d.values);
        })
        .attr('fill', 'none')
        .style("stroke-dasharray", function (d) {
            return (d.key == 'overall') ? ("3, 3") : ("0, 0")
        });

let legend = svg
.insert('g', '.chartG');


            nestedData.forEach(function(d,i) { 
               let legGroup = legend.append('g')
               .attr('transform' , 'translate(' +( margin.left + i*margin.left) + ',0)')
                // Add the Legend
                legGroup.append("rect")
                    .attr("x", margin.left +i*margin.left)  // space legend
                    .attr("y",  (margin.bottom/2)+ 5)
                    .attr("class", "legend")    // style the legend
                    .style("fill", function() { // Add the colours dynamically
                        return d.color = stroke(d.key); })
                    .attr('height', 20)
                    .attr('width', 20);


                legGroup.append('text')
                .attr('x', margin.left + i * margin.left + 22)
                .attr('y', (margin.bottom))
                .text(legendCategories[i]);
            });

       

    
        /* for (i in categories) {
            console.log(i);
            var lineFunction = multiLine(categories[i]);
            group.append('path')
            .datum(nestedData)
            .attr('class', 'line')
            .style('stroke', colour(i))
            .attr('d', lineFunction);
        }
         */


        group
            .append('g')
            .classed('x axis', true)
            .attr('transform', 'translate(' + -margin.left + ', ' + height + ')')
            .call(xAxis);


        group
            .append('g')
            .classed('y axis', true)
            .call(yAxis);


            var legend_keys = ["Wales", "United Kingdom"]


        document.getElementById('poverty_hc').addEventListener('change', function () {
            return updateRelP(data, xScale, yScale);
        })

    })




}

lineChart();



function filterHCosts(data) {
    let housing_costs = document.getElementById('poverty_hc').value;
    let new_data = data.filter(function (d) { return d.housing_costs == housing_costs });
    return new_data;
}

function filterDate(data) {
    let dateSlider = document.getElementById('yearRange').value;
    let new_data = data.filter(function (d) { return d.Time.getTime() == new Date(dateSlider).getTime() });
    new_data = new_data.filter(function (d) { return d.Measure == 'Quintile distribution of income After Housing Costs' })
    return new_data;
}




function filterEthnicity(data) {
    let selector = document.getElementById('selectEthnicity');
    let ethnicity = selector.options[selector.selectedIndex].value;
    let costSelector = document.getElementById('housingCosts');
    let housingCosts = costSelector.options[costSelector.selectedIndex].value;
    let new_data = data.filter(function (d) { return d.Measure == housingCosts });
    new_data = new_data.filter(function (d) { return d.Ethnicity == ethnicity });
    return new_data;
}


let stroke = d3.scaleOrdinal(d3.schemeCategory10);


const updateRelP = function (data, xScale, yScale) {
    let filteredData = filterHCosts(data);

    xScale
        .domain(d3.extent(filteredData, function (d) {
            return d.year;
        }))

    let maxVal = d3.max(filteredData, function (d) {
        var vals = d3.keys(d).map(function (key) { return key !== 'year' ? d[key] : 0 });
        return d3.sum(vals);
    });


    yScale
        .domain([0, maxVal]);




    let nestedData = d3.nest()
        .key(function (d) { return d.area })
        .key(function (d) { return d.type })
        .entries(filteredData);





    var line = d3.line()
        .x(function (d) { return xScale(d.year) })
        .y(function (d) { return yScale(+d.rel_poverty) });


    let lineGroups = d3.select('#rel_p_svg').selectAll('.lineGroup')
        .data(nestedData);




    lineGroups.selectAll("path.line")
        .data(function (d) {
            return (d.values);
        })
        .transition()
        .duration(1000)
        .attr("d", function (d) {
         
            return line(d.values)
        })


    /* 
    lines
    .attr('class', 'line')
    .transition()
    .attr('d', function (d) {
        return line(d.values);
    })
    .attr('fill', 'none')
    .style("stroke-dasharray", function(d){ 
        return (d.key == 'overall') ? ("3, 3") : ("0, 0")});
     */

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



// ethnicity

function launch() {
    // document.getElementById('vis').innerHTML = '';





    //   document.getElementById('chartG').innerHTML = '';
    d3.csv('income_wide.csv', function (data) {
        data.forEach(function (d) {
            d.Time = formatYear(d.Time);
            // d.Income_Quintile_Distribution = replacer(d.Income_Quintile_Distribution);
        })


console.log(data);




            d3.selectAll('.inequalityDiv')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'svgVis')
            .call(responsivefy);




        let gr = d3.select('#area_ineq svg')
            .attr('id', 'svg_areaIneq')
            .append('g')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'chartG')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


        let grBar = d3.select('#bar_ineq svg')
            .attr('id', 'svg_barIneq')
            .append('g')
            .attr('width', width )
            .attr('height', height )
            .attr('class', 'chartG')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



        /*        svg.selectAll('.axis').remove(); */


        var area = d3.area()
            .x(function (d) { return xScale(d.data.Time) })
            .y0(function (d) { return yScale(d[0]) })
            .y1(function (d) { return yScale(d[1]) });


        let filteredData = filterEthnicity(data);
        let stackedData = stacker(filteredData);


        // scale for area chart

        let xScale = d3.scaleTime()
            .range([0, width])
            .domain(d3.extent(filteredData, function (d) { return d.Time }));

        let yScale = d3.scaleLinear()
            .range([height, 0]); // output 



        let xAxis = d3.axisBottom(xScale);


        let yAxis = d3.axisLeft(yScale);






        var maxDateVal = d3.max(filteredData, function (d) {
            var vals = d3.keys(d).map(function (key) { return key !== 'Time' ? d[key] : 0 });
            return d3.sum(vals);
        });


        yScale
            .domain([0, maxDateVal]);









        let layerGroup = gr.selectAll('.layerGroup')
            .data(stackedData)
            .enter()
            .append('g')
            .attr('class', 'layerGroup');


        layerGroup
            .append('path')
            .attr('class', 'area')
            .attr('d', area)
            .style('fill', function (d) { return colors(d.key) })


        gr
            .append('g')
            .classed('x axis', true)
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);


        gr.append('g')
            .classed('y axis', true)
            .call(yAxis);




        // bar chart

        let filteredByYear = filterDate(data);
        let stackedForBar = stacker(filteredByYear);



        let xBScale = d3.scaleBand()
            .range([0, width])
            .padding(0.3)
            .domain(filteredByYear.map(function (d) { return d.Ethnicity }))




        var yBScale = d3.scaleLinear()
            .range([height, 0]);
        var maxDateVal = d3.max(filteredByYear, function (d) {
            var vals = d3.keys(d).map(function (key) { return key !== 'Time' ? d[key] : 0 });

            return d3.sum(vals);
        });


        yBScale
            .domain([0, maxDateVal]);


        let xBarAxis = d3.axisBottom(xBScale);

        let yBarAxis = d3.axisLeft(yBScale);



        let barLayer = grBar.selectAll('.barLayer')
            .data(stackedForBar)
            .enter()
            .append('g')
            .attr('class', 'barLayer')
            .style('fill', function (d) { return colors(d.key) });





        let rect = barLayer.selectAll('rect')
            .data(function (d) { return d })
            .enter()
            .append('rect')
            .attr('width', xBScale.bandwidth())
            .attr('x', function (d) { return xBScale(d.data.Ethnicity) })
            .attr("y", function (d) { return yBScale(d[1]); })
            .attr("height", function (d) { return yBScale(d[0]) - yBScale(d[1]); })

        grBar
            .append('g')
            .classed('x axis', true)
            .attr('transform', 'translate(0,' + height + ')')
            .call(xBarAxis);





        grBar.append('g')
            .classed('y axis', true)
            .call(yBarAxis);


        // event listener to change bar chart

        document.getElementById('yearRange').addEventListener('input', function () {
            return editBar(data, xBScale, yBScale);
        })


        document.getElementById('housingCosts').addEventListener('change', function () {
            return editArea(data, xScale, yScale);
        })

        document.getElementById('selectEthnicity').addEventListener('change', function () {
            return editArea(data, xScale, yScale);
        })
    })
}

launch();


function editBar(data, xscale, yscale) {
    let filtered = filterDate(data);

    let stack = stacker(filtered);





    xscale
        .domain(filtered.map(function (d) { return d.Ethnicity }))





    var maxDateVal = d3.max(filtered, function (d) {
        var vals = d3.keys(d).map(function (key) { return key !== 'Time' ? d[key] : 0 });

        return d3.sum(vals);
    });


    yscale
        .domain([0, maxDateVal]);

    let barLayer = d3.select('#svg_barIneq > g')
    .selectAll('.barLayer')
        .data(stack);


    let rect = barLayer.selectAll('rect')
        .data(function (d) { return d });



let sliderValue = document.querySelector('span.setyear');

sliderValue.innerText = document.getElementById('yearRange').value;



    let new_rect = rect
        .enter()
        .append('rect')
        .attr('width', xscale.bandwidth());


    new_rect.merge(rect)
        .transition()
        .attr('x', function (d) { return xscale(d.data.Ethnicity) })
        .attr("y", function (d) { return yscale(d[1]); })
        .attr("height", function (d) { return yscale(d[0]) - yscale(d[1]); })


}



function editArea(data, xScale, yScale) {

    let filtered = filterEthnicity(data);



    let stack = stacker(filtered);

    console.log(stack);


    var maxDateVal = d3.max(filtered, function (d) {
        var vals = d3.keys(d).map(function (key) { return key !== 'Time' ? d[key] : 0 });

        return d3.sum(vals);
    });


    yScale
        .domain([0, maxDateVal]);

    d3.select('#svg_areaIneq .y.axis')
        .transition()
        .call(d3.axisLeft(yScale));


    var area = d3.area()
        .x(function (d) { return xScale(d.data.Time) })
        .y0(function (d) { return yScale(d[0]) })
        .y1(function (d) { return yScale(d[1]) });



    let layerGroup = d3.select('#svg_areaIneq > g').selectAll('.layerGroup')
        .data(stack);

    let areas = layerGroup.selectAll('.area')
        .attr('d', area);

    areas.enter()
        .append('path')
        .merge(areas);



    /* let areaPath = layerGroup.selectAll('.area')
    .enter()
    .append('path')  
         .attr('class', 'area')
         .attr('d', area)
         .style('fill', function (d) { return colors(d.key) }) */
}
