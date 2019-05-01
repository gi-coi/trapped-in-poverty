(function () { 

    const data = {
      Issue: [
        'Wale_Male',
        'Wale_Female',
        'Cardiff_Male',
        'Cardiff_Female'
      ],

      Successful_prevention: [64.8, 67.3, 80.9, 68.7],
      Unsuccessful_prevention: [13.5, 16.4, 10.4, 21.3],
      Application_withdrawn: [14.9, 10.1, 7.5, 8.5],
      Other_reasons: [6.7, 6.2, 0.6, 1.5]
    };

    const width = 700,
      height = 600,
      margin = { top: 20, right: 200, bottom: 100, left: 40 },
      chartWidth = width - margin.left - margin.right,
      chartHeight = height - margin.top - margin.bottom;

    // convert to a list of { Issue, Approve, Disapprove, None }
    const transformedData = data.Issue.map((Issue, index) => ({
      Issue,
      Successful_prevention: data.Successful_prevention[index],
      Unsuccessful_prevention: data.Unsuccessful_prevention[index],
      Application_withdrawn: data.Application_withdrawn[index],
      Other_reasons: data.Other_reasons[index]

    }));

    const answers = ['Successful_prevention', 'Unsuccessful_prevention', 'Application_withdrawn', 'Other_reasons'];

    const x = d3
      .scaleBand()
      .paddingInner(0.2)
      .range([0, chartWidth])
      .domain(data.Issue);

    const y = d3.scaleLinear().range([chartHeight, 0]).domain([0, 100]);
    const z = d3
      .scaleOrdinal()
      .range(['#809ead', '#b1c0c9', '#d7d6cb', '#e8e5c5'])
      .domain(answers);

    const stack = d3.stack().keys(answers)(transformedData);

    const svg = d3
      .select('#gendergap_Vis')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const chart = svg
      .append('g')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add the X-axis
    const xAxis = d3.axisBottom().scale(x).tickSize(0);

    chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dy', '-0.35em')
      .attr('transform', 'translate(0, 10), rotate(-45)');

    // Add the Y-axis
    const yAxis = d3
      .axisLeft()
      .scale(y)
      .tickFormat(d => (d === 100 ? '100%' : d))
      .tickSize(18);

    chart
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-10, 0)')
      .call(yAxis)
      .selectAll('text')
      .attr('transform', 'translate(16, -10)');

    const serieColor = d => z(d.key);

    const serie = chart
      .selectAll('.serie')
      .data(stack)
      .enter()
      .append('g')
      .attr('class', 'serie')
      .attr('fill', serieColor)
      .on('mouseover', (d, i, nodes) => d3.select(nodes[i]).attr('fill', '#555'))
      .on('mouseout', (d, i, nodes) =>
        d3.select(nodes[i]).attr('fill', serieColor)
      );

    const bar = serie
      .selectAll('.bar')
      .data((data, i, nodes) =>
        data.map(d => {
          // use the parent node to get the value
          d.value = d.data[nodes[i].__data__.key];
          return d;
        })
      )
      .enter()
      .append('g')
      .attr('class', 'bar');

    bar
      .append('rect')
      .attr('x', d => x(d.data.Issue))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]));

    bar
      .append('text')
      .attr('x', d => x(d.data.Issue) + x.bandwidth() / 2)
      .attr('y', d => y(d[1]) + (y(d[0]) - y(d[1])) / 2)
      .attr('dy', '0.65em')
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .text(d => (d.value > 0 ? d.value : ''));

    bar.append('title').text(d => `${d.value}%`);

    const legend = serie
      .append('g')
      .attr('class', 'legend')
      .append('text')
      .attr('x', chartWidth + 80)
      .attr('y', d => {
        const last = d[d.length - 1];
        return y(last[1]) + (y(last[0]) - y(last[1])) / 2;
      })
      .attr('dy', '0.35em')
      .attr('fill', '#000')
      .text(d => d.key === 'None' ? 'No Opinion': d.key);
    
}) ();