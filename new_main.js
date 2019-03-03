let margin = { top: 20, right: 20, bottom: 30, left: 50 };

var svg_group = d3.selectAll('.svgVis'),
width = parseInt(svg_group.style('width')),
height = parseInt(svg_group.style('height'));

console.log(width);
console.log(height);
/* let width = window.innerWidth / 2;// Use the window's width 
let height = window.innerHeight; */




let categories = ['White', 'Mixed', 'Asian', 'Black', 'Other'];

let incomeColours = ["#bd0026", "#f03b20", "#fd8d3c", "#fecc5c", "#ffffb2"]

let myCols = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3']
let incomeCats = ['Bottom', 'Second', 'Third', 'Fourth', 'Top']
var colors = d3.scaleOrdinal()
    .domain(categories)
    .range(incomeColours);



let formatYear = d3.timeParse('%Y');

/* 
let svg = d3.select('#vis')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'chartSvg');

let svg 
    
    let svgBar = d3.select('#barVis')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
 */


width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

let gr = d3.select('#svgArea').append('g')
    .attr('class', 'chartG');

let grBar = d3.select('#svgBar').append('g')
    .attr('class', 'chartG');


d3.selectAll('.chartG')
.attr('width', width)
.attr('height', height)
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


    
    var stacker = d3.stack()
    .keys(incomeCats)
    .offset(d3.stackOffsetNone);


    // scale for area chart

    let xScale = d3.scaleTime()
    .range([0, width])

var yScale = d3.scaleLinear()
    .range([height, 0]); // output 




function launch() {
    // document.getElementById('vis').innerHTML = '';







    //   document.getElementById('chartG').innerHTML = '';
    d3.csv('income_wide.csv', function (data) {
        data.forEach(function (d) {
            d.Time = formatYear(d.Time);
            // d.Income_Quintile_Distribution = replacer(d.Income_Quintile_Distribution);
        })


 /*        svg.selectAll('.axis').remove(); */


        var area = d3.area()
            .x(function (d) { return xScale(d.data.Time) })
            .y0(function (d) { return yScale(d[0]) })
            .y1(function (d) { return yScale(d[1]) });


        let filteredData = filterEthnicity(data);
        let stackedData = stacker(filteredData);



        xScale
            .domain(d3.extent(filteredData, function (d) { return d.Time }));


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
                return editArea(data);
            })

            document.getElementById('selectEthnicity').addEventListener('change', function (){
                return editArea(data);
            })
    })
}


launch();


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

        let barLayer = grBar.selectAll('.barLayer')
        .data(stack);
      

let rect = barLayer.selectAll('rect')
    .data(function (d) { return d });
    
  



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



function editArea (data) {

    let filtered = filterEthnicity(data);

  

    let stack = stacker(filtered);

    console.log(stack);


    var maxDateVal = d3.max(filtered, function (d) {
        var vals = d3.keys(d).map(function (key) { return key !== 'Time' ? d[key] : 0 });

        return d3.sum(vals);
    });


yScale
.domain([0, maxDateVal]);

d3.select('.y.axis')
.transition()
.call(d3.axisLeft(yScale));


var area = d3.area()
.x(function (d) { return xScale(d.data.Time) })
.y0(function (d) { return yScale(d[0]) })
.y1(function (d) { return yScale(d[1]) });

   

        let layerGroup = gr.selectAll('.layerGroup')
        .data(stack);

    let areas=    layerGroup.selectAll('.area')
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