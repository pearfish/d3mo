var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;

var i = 0;

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
	.range([height, 0]);

var y1 = d3.scale.linear()
    .range([height, 0]);


var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

var y1Axis = d3.svg.axis()
    .scale(y1)
    .orient("right")
    .ticks(10, "%");

var color = d3.scale.ordinal()
	.range(['#ED7124', '#224D74', '#D6D64C', '#00AFD8']);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>"+ d.name +":</strong> <span style='color:white'>" + d.value + "</span>";
    });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

var thing = d3.select('body').append('div');

// load the external data
d3.json("datas", function(error, data) {
	var statNames = d3.keys(data[0].stats).filter(function(key) { return key !== "month"; });

	data.forEach(function(d){
		d.statz = statNames.map(function(name){	return {name: name, value: d.stats[name]}; });
        d.stuff = d.stats.Prints / d.stats.Views; // the *960 is a hack, and a bad performing one
	});

	x.domain(data.map(function(d) { return d.month; }));
	x1.domain(statNames).rangeRoundBands([0, x.rangeBand()]);
	y.domain([0, d3.max(data, function(d) { return d.stats.Views; })]);
    y1.domain([0, 1]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 2)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("events");

    svg.append('g')
        .attr('class', 'y axis')
        .attr("transform", "translate(" + width + ", 0)")
        .call(y1Axis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -10)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("redemption rate");


	var monthBlocks = svg.selectAll('.month')
		.data(data)
		.enter().append('g')
		.attr('class', 'g')
		.attr("transform", function(d) { return "translate(" + x(d.month) + ",0)"; });

	monthBlocks.selectAll('rect')
		.data(function(d) { return d.statz })
		.enter().append('rect')
		.attr('width', x1.rangeBand())
		.attr("x", function(d) { return x1(d.name); })
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); })
		.style("fill", function(d) { return color(d.name); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);


    //redemption rate line stuff
    var lineFunsies = d3.svg.line()
        .x(function(d){
            return x(d.month);
        })
        .y(function(d){
            return y1(d.stuff);
        })
        .interpolate('basis');

    svg.append('svg:path')
        .attr('d', lineFunsies(data))
        .attr('class', 'lineavg')
        .attr('transform', 'translate(80)' ); //this translate is a hacks

var legend = svg.selectAll(".legend")
	.data(statNames.slice().reverse())
	.enter().append("g")
	.attr("class", "legend")
	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
		.attr("x", width + 37)
		.attr("width", 120)
		.attr("height", 18)
		.style("fill", color);

legend.append("text")
		.attr("x", width + 120)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.style("fill", 'white')
		.text(function(d) { return d; });
});