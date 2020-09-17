

function populate_dropdown(){
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(function(data) {
     var names = data.names;
     names.forEach(element => {
         dropdown.append("option").text(element).property("value", element)
     });
     optionChanged(names[0])
   });
   
 }
 populate_dropdown();