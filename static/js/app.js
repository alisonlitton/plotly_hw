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
    var trace = {
      x: sampleValues,
      y: OTU_id,
      text: labels,
      marker: {color: ''},
      type: "bar",
      orientation: "h",
    };

    //create variable for data 
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

    var data2 = [trace2];


  //create the bubble plot! 
  Plotly.newPlot("bubble", data2, layout2);
  });}

  

