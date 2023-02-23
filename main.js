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
        return black;
    }
};

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
     LEFT.append('g')
     .selectAll("dot")
     .data(data)
     .enter()
     .append("circle")
         .attr("class", "point")
         .attr("id", (d) => {return d.id})
         .attr("cx", (d) => { return (x(d.Sepal_Length) + MARGINS.left); } )
         .attr("cy", (d) =>{ return (y(d.Petal_Length) + MARGINS.top); } )
         .style("fill", (d) => {return map_color(d.Species)})
         .attr("r", 3);

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
    MIDDLE.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("class", "point")
        .attr("id", (d) => {return d.id})
        .attr("cx", (d) => { return (x(d.Sepal_Width)) + MARGINS.left; } )
        .attr("cy", (d) =>{ return (y(d.Petal_Width)) + MARGINS.bottom; } )
        .style("fill", (d) => {return map_color(d.Species)})
        .attr("r", 3);


});

// ------------------ RIGHT PLOT -----------------------------------------
const RIGHT = d3.select("#right") 
.append("svg") 
    .attr("height", FRAME_HEIGHT)   
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

d3.csv("data/iris.csv").then((data) => {

    
});
