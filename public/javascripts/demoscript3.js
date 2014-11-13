var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;

var i = 0;

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");
	//.ticks(10, "%");

var color = d3.scale.ordinal()
	.range(['#ED7124', '#224D74', '#D6D64C', '#00AFD8']);

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var thing = d3.select('body').append('div');

// load the external data
d3.json("datas", function(error, data) {
	var statNames = d3.keys(data[0].stats).filter(function(key) { return key !== "month"; });

	data.forEach(function(d){
		d.statz = statNames.map(function(name){	return {name: name, value: d.stats[name]}; });
	});


	x.domain(data.map(function(d) { return d.month; }));
	x1.domain(statNames).rangeRoundBands([0, x.rangeBand()]);
	y.domain([0, d3.max(data, function(d) { return d.stats.Views; })]);
	//y.domain([0, d3.max(data, fucntion(d){ return d3.max(d.stats.Views, function(d) { return d.value; }); })]);


	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("events");


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
		.style("fill", function(d) { return color(d.name); });

/*
	data.forEach(function(d){
		thing.append('p')
			.text(d.month);
		for(key in d.stats) {
			thing.append('span')
				.text(key+": "+d.stats[key]+"\t");
		}
		console.log(d);
		appendRect(svg, x(d.month), y(d.stats.Views), x.rangeBand()/4);
		appendRect(svg, x(d.month), y(d.stats.Prints), x.rangeBand()/4);
		appendRect(svg, x(d.month), y(d.stats.Transactions), x.rangeBand()/4);
		appendRect(svg, x(d.month), y(d.stats.MobileViews), x.rangeBand()/4);
		/*
		svg.append("rect")
			.attr("class", "bar")
			.attr("x", 2)
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.stats.Views); })
			.attr("height", function(d) { return height - y(d.stats.Views); });
*/

/*
function appendRect(svg, x, y, w){
	svg.append('rect')
		.attr('x', x)
		.attr('y', y)
		.attr("width", w/4)
		.attr('height', height-y);

	/*
	 .attr("y", function(d) { return y(d.stats.views); })
	 .attr("height", function(d) { return height - y(d.stats.views); });
	 */

/*
	x.domain(data.map(function(d) { return d.months; }));
	y.domain([0, d3.max(data, function(d) { return d.stats.views; })]);
 */
//START AXES

var legend = svg.selectAll(".legend")
	.data(statNames.slice().reverse())
	.enter().append("g")
	.attr("class", "legend")
	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
	.attr("x", width - 18)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", color);

legend.append("text")
	.attr("x", width - 24)
	.attr("y", 9)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) { return d; });

//END AXES
/*
	svg.selectAll(".bar")
		.data(data)
		.enter().append('p')
		.text(data);
*//*
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.month); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(5); })
		.attr("height", function(d) { return height - y(5); });
			*/
});


