function getPlots(id) {
  //read the samples.json
  d3.json("samples.json").then (sampledata=>{
    console.log(sampledata)
    var ids = sampledata.samples[0].otu_ids;
    console.log(ids)
    var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
    console.log(sampleValues)
    var labels =  sampledata.samples[0].otu_labels.slice(0,10);
    console.log(labels)
  //narrow down the top 10 values for the plot and reverse it 
    var OTU_top_10 = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
    var OTU_id = OTU_top_10.map(d => "OTU" + d);
    console.log('OTU IDS: ${OTU_id}')
  //get the top 10 labels for the OTU plots
    var labels = sampledata.samples[0].otu_labels.slice(0,10);
    console.log('OTU_labels: ${labels}')
    var trace1 = {
      x: sampleValues,
      y: OTU_id,
      text: labels,
      marker: {color:'#FAA460'},
      type: "bar",
      orientation: "h",
    };

    //create variable for data1 
    var data1 = [trace1];
    //set the layout for the bar chart
    var layout = {
      title: "Top 10 OTU(operational taxonomic units)",
      yaxis: {tickmode:"linear"},
      margin: {l:100, r:100, t:100, b:40}
    };

    //create the bar plot for the top 10 otu
  Plotly.newPlot("bar", data1, layout);

    //time for the bubble chart!
    var trace2 ={
      x: sampledata.samples[0].otu_ids,
      y: sampledata.samples[0].sample_values,
      mode: "markers",
      marker: {
        size: sampledata.samples[0].sample_values,
        color: sampledata.samples[0].otu_ids},
        text: sampledata.samples[0].otu_labels
    };

    //set the layout for the bubble chart 
    var layout2 = {
      xaxis: {title: "OTU ID"},
      height:650, 
      width: 1000
    };
    //create variable for data2
    var data2 = [trace2];


  //create the bubble plot!!
  Plotly.newPlot("bubble", data2, layout2);
  });}

  // create the function to get the data
function getDemoInfo(id) {
  // read the json 
      d3.json("samples.json").then((data1)=> {
  // get the metadata info for the demographic panel
          var metadata = data1.metadata;
  
          console.log(metadata)
  
        // filter metadata by id
         var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data
         var demographicInfo = d3.select("#sample-metadata");
          
       // empty the demographic info panel each time before getting new id info
         demographicInfo.html("");
  
       // grab the demographic data data for the id and append the info to the panel
          Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
          });
      });
  }
  // create the function for the change event
  function optionChanged(id) {
      getPlots(id);
      getDemoInfo(id);
  }
  
  // create the function for the initial data rendering
  function init() {
      // select dropdown menu 
      var dropdown = d3.select("#selDataset");
  
      // read the data 
      d3.json("samples.json").then((data1)=> {
          console.log(data1)
  
          // get the id data to the dropdwown menu
          data1.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
  
          // call your functions to display the data and the plots to the page
          getPlots(data1.names[0]);
          getDemoInfo(data1.names[0]);
      });
  }
  
  init();


