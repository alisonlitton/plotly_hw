// Use the D3 library to read in samples.json
function init() {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

  // read the samples.json 
  d3.json("samples.json").then((data)=> {
      console.log(data)

      // get the id data to the dropdwown menu
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      // call the functions to display the data and the plots to the page
      getPlots(data.names[0]);
      getDemoInfo(data.names[0]);
  });
}

init();
