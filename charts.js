var dataglobal = []

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    dataglobal = data
    var sampleNames = dataglobal.names;
    console.log(dataglobal)

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  //d3.json("samples.json").then((data) => {
    var metadata = dataglobal.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

//)}
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  //d3.json("samples.json").then((data) => {
    //console.log(data);
  console.log(sample)
    // Deliverable 1: 3. Create a variable that holds the samples array. 
    var samples_array = dataglobal.samples;
    console.log(samples_array)
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    var samples_filter = samples_array.filter(sample1 => sample1.id == sample);
    //function handleClick() {
      //let filteredData = tableData;
      //if (sampleNames) {
        // Apply `filter` to the table data to only keep the
        // rows where the `datetime` value matches the filter value
        //filteredData = filteredData.filter(row => row.sampleNames === sampleNames);
      //};
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = dataglobal.metadata;
    var metadata_filter = metadata.filter(metadataObj => metadataObj.id == sample);
    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    var first_sample = samples_filter[0];
    console.log(first_sample)
    console.log(samples_filter)
    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    var metadata1 = metadata_filter[0];
    console.log(metadata1)
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = first_sample.otu_ids;
    console.log(otu_ids)
    var otu_labels = first_sample.otu_labels;
    var sample_values = first_sample.sample_values;
    // Deliverable 3: 3. Create a variable that holds the washing frequency.
    var wfreq = metadata1.wfreq

    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    var topOTU_ids = otu_ids.slice(0, 10).reverse();
    var yticks = topOTU_ids.map(d => "OTU " + d);
    // Deliverable 1: 8. Create the trace for the bar chart. 
    var barData = [{
      x: sample_values,
      y: yticks,
      text: otu_labels,
      type: "bar",
      orientation: 'h'
    }];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    var barlayout = {
      title: "Top 10 Bacteria Cultures Found"
    };

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bellybar", barData, barlayout);
    // Deliverable 2: 1. Create the trace for the bubble chart.
    var trace1 = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,

      }
    }];
    // Deliverable 2: 2. Create the layout for the bubble chart.
   var bubblelayout = {
    title: "Bacteria Cultures per Sample",
    xaxis: {title: "OTU IDs"},
   }
    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bellybubble", trace1, bubblelayout);
    // Deliverable 3: 4. Create the trace for the gauge chart.
    var trace2 = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black" },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2,4], color: "orange" },
            {range: [4,6], color: "yellow"},
            {range: [6,8], color: "lightgreen"},
            {range: [8,10], color: "green"}
          ],
        }
      }
    ];
    // Deliverable 3: 5. Create the layout for the gauge chart.
    var gaugelayout = {
       width: 600, height: 500, margin: { t: 0, b: 0 } 
    };
    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("bellygauge", trace2, gaugelayout);
  //});
}
