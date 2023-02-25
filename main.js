const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 30, right: 20, top: 20, bottom: 20};

function map_color(species){
    if(species == "setosa"){
        return "coral";
    }
    if(species == "versicolor"){
        return "orchid";
    }
    if(species == "virginica"){
        return "cornflowerblue";
    }
    else{
        return "black";
    }
};

let left_dots, right_dots, bars;

// ------------ LEFT PLOT -----------------
// Make svg to house visualization
const LEFT = d3.select("#left") 
.append("svg") 
    .attr("height", FRAME_HEIGHT)   
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

d3.csv("data/iris.csv").then((data) => {
    // console.log(data);
    const X_MAX = d3.max(data, (d) => {return (d.Sepal_Length)});
    const Y_MAX = d3.max(data, (d) => { return (d.Petal_Length); });

    // TITLE
    LEFT.append("text")
    .attr("x", FRAME_WIDTH/2)
    .attr("y", MARGINS.top)
    .attr("class", "plot_titles")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Sepal Length vs Petal Length");

    // Make x-axis based on petal length
    let x = d3.scaleLinear()
    .domain([0, parseInt(X_MAX) + 1])
    .range([ 0, FRAME_WIDTH - MARGINS.left - MARGINS.right]);
    // Add X-axis
    LEFT.append("g")
    .attr("transform", "translate(" +  MARGINS.left +","+ (FRAME_HEIGHT - MARGINS.top) + ")")
    .call(d3.axisBottom(x));

    // y-Scale
    let y = d3.scaleLinear()
    .domain([0, parseInt(Y_MAX) + 1])
    .range([FRAME_HEIGHT - MARGINS.top - MARGINS.bottom, 0]);
    // Add Y axis
    LEFT.append("g")
    .attr("transform", "translate(" + MARGINS.left + ","+ MARGINS.top +")")
    .call(d3.axisLeft(y));

     // Add points from data
     left_dots = LEFT.append('g')
     .selectAll("dot")
     .data(data)
     .enter()
     .append("circle")
         .attr("class",  (d) => {return "point " + d.Species})
         .attr("id", (d) => {return d.id})
         .attr("cx", (d) => { return (x(d.Sepal_Length) + MARGINS.left); } )
         .attr("cy", (d) =>{ return (y(d.Petal_Length) + MARGINS.top); } )
         .style("fill", (d) => {return map_color(d.Species)})
         .attr("r", 5);

});

// -------------------- MIDDLE PLOT -------------------------
const MIDDLE = d3.select("#middle") 
.append("svg") 
    .attr("height", FRAME_HEIGHT)   
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

d3.csv("data/iris.csv").then((data) => {
    const X_MAX = d3.max(data, (d) => {return (d.Sepal_Width)});
    const Y_MAX = d3.max(data, (d) => { return (d.Petal_Width); });
    console.log("SEPAL" + X_MAX, "PETAL" + Y_MAX);

    // TITLE
    MIDDLE.append("text")
    .attr("x", FRAME_WIDTH/2)
    .attr("y", MARGINS.top)
    .attr("class", "plot_titles")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Sepal Width vs Petal Width");

    // Make x-axis based on petal width
    let x = d3.scaleLinear()
    .domain([0, parseInt(X_MAX) + 1])
    .range([ 0, FRAME_WIDTH - MARGINS.left - MARGINS.right]);

    // Add X-axis
    MIDDLE.append("g")
    .attr("transform", "translate(" +  MARGINS.left +","+ (FRAME_HEIGHT - MARGINS.top) + ")")
    .call(d3.axisBottom(x));

    // y-Scale
    let y = d3.scaleLinear()
    .domain([0, parseInt(Y_MAX) + 1])
    .range([FRAME_HEIGHT - MARGINS.top - MARGINS.bottom, 0]);
    // Add Y axis
    MIDDLE.append("g")
    .attr("transform", "translate(" + MARGINS.left + ","+ MARGINS.top +")")
    .call(d3.axisLeft(y));

    // Add points from data
    let middle_dots = MIDDLE.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("class", (d) => {return "point " + d.Species})
        .attr("id", (d) => {return d.id })
        .attr("cx", (d) => { return (x(d.Sepal_Width)) + MARGINS.left; } )
        .attr("cy", (d) =>{ return (y(d.Petal_Width)) + MARGINS.bottom; } )
        .style("fill", (d) => {return map_color(d.Species)})
        .attr("r", 5);

           // Add brushing
  MIDDLE.call(d3.brush()                 // Add the brush feature using the d3.brush function
  .extent( [[0,0], [FRAME_WIDTH, FRAME_HEIGHT] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
)

// Function that is triggered when brushing is performed
function updateChart(event) {
extent = event.selection
middle_dots.classed("selected", function(d){ return isBrushed(extent, (x(d.Sepal_Width) + MARGINS.left), (y(d.Petal_Width) + MARGINS.top)) } )

}

// A function that return TRUE or FALSE according if a dot is in the selection or not
function isBrushed(brush_coords, cx, cy) {
   var x0 = brush_coords[0][0],
       x1 = brush_coords[1][0],
       y0 = brush_coords[0][1],
       y1 = brush_coords[1][1];
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
}

});

// ------------------ RIGHT PLOT -----------------------------------------
// Add the SVG
const RIGHT = d3.select("#right") 
.append("svg") 
    .attr("height", FRAME_HEIGHT)   
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");


d3.csv("data/iris.csv").then((data) => {

    // Makes a Map with the species name, and the number of times that species appears in the column
    let species_counts = Array.from(d3.rollup(data, v => v.length, d => d.Species));
    let species_amt = species_counts.map(function(x){
        return x[1];
    });

    // Gets the hightest amount
    const Y_MAX = d3.max(species_amt);

    // TITLE
    RIGHT.append("text")
    .attr("x", FRAME_WIDTH/2)
    .attr("y", MARGINS.top)
    .attr("class", "plot_titles")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Counts of Species");


    // Add X axis
    let x = d3.scaleBand()
        .range([ 0, FRAME_WIDTH - MARGINS.left - MARGINS.right ])
        .domain(species_counts.map(function(d) { return d[0]; }))
        .padding(0.2);

    RIGHT.append("g")
        .attr("transform", "translate(" +  MARGINS.left +","+ (FRAME_HEIGHT - MARGINS.top) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");

    // Add Y axis
    let y = d3.scaleLinear()
        .domain([0, Y_MAX + 5])
        .range([FRAME_HEIGHT- MARGINS.top - MARGINS.bottom, 0]);
    RIGHT.append("g")
        .attr("transform", "translate(" +  MARGINS.left +","+(MARGINS.top)+ ")")
        .call(d3.axisLeft(y));

    // Add Bars
    bars = RIGHT.selectAll("mybar")
        .data(species_counts)
        .enter()
        .append("rect")
        .attr("class", "bars")
        .attr("x", function(d) { return x(d[0]) + MARGINS.left; })
        .attr("y", function(d) { return y(d[1]) + MARGINS.top; })
        .style("fill", (d) => {return map_color(d[0])})
        .attr("width", x.bandwidth())
        .attr("height", function(d) { 
            return FRAME_HEIGHT- MARGINS.top - MARGINS.bottom - y(d[1]); 
    });
});

// ---------------------- BRUSHING CODE ------------------------------------------------

