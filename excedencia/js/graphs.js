
var Graphs1 = function()
{
  Plotly.d3.csv('data/cuidadoDeHijos.csv', function(err, rows){

  //console.log(rows);

  dataMash = [];
  for (var i=0; i < rows.length; i++)
  {
    var data =
      {
        x: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        y: [
            parseFloat(rows[i]['2005']),
            parseFloat(rows[i]['2006']),
            parseFloat(rows[i]['2007']),
            parseFloat(rows[i]['2008']),
            parseFloat(rows[i]['2009']),
            parseFloat(rows[i]['2010']),
            parseFloat(rows[i]['2011']),
            parseFloat(rows[i]['2012']),
            parseFloat(rows[i]['2013']),
            parseFloat(rows[i]['2014']),
            parseFloat(rows[i]['2015']),
            parseFloat(rows[i]['2016'])
            ],
        type: 'line',
        name: rows[i]["Type"]
      };
      dataMash.push(data);
  }

  var layout = {
    title: "Totals in Spain",
  }

  Plotly.plot("totals", dataMash, layout, {showLink: false});
  });
}

var Graphs2 = function()
{
  Plotly.d3.csv('data/BothRegion.csv', function(err, rows){

  //console.log(rows);

  dataMash = [];

  for (var i=0; i < rows.length; i++)
  {
    var data =
      {
        x: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        y: [
            parseFloat(rows[i]['2005']),
            parseFloat(rows[i]['2006']),
            parseFloat(rows[i]['2007']),
            parseFloat(rows[i]['2008']),
            parseFloat(rows[i]['2009']),
            parseFloat(rows[i]['2010']),
            parseFloat(rows[i]['2011']),
            parseFloat(rows[i]['2012']),
            parseFloat(rows[i]['2013']),
            parseFloat(rows[i]['2014']),
            parseFloat(rows[i]['2015']),
            parseFloat(rows[i]['2016'])
            ],
        type: 'line',
        name: rows[i]["Region"],
      };

    dataMash.push(data);
  }

  var layout = {
    title: "Total per Region",
  }

  console.log(dataMash);

  Plotly.plot("perRegion", dataMash,layout, {showLink: false});
  });
}

var Graphs3 = function()
{
  Plotly.d3.csv('data/PadresRegion.csv', function(err, rows){

  //console.log(rows);

  dataMash = [];

  for (var i=0; i < rows.length; i++)
  {
    var data =
      {
        x: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        y: [
            parseFloat(rows[i]['2005']),
            parseFloat(rows[i]['2006']),
            parseFloat(rows[i]['2007']),
            parseFloat(rows[i]['2008']),
            parseFloat(rows[i]['2009']),
            parseFloat(rows[i]['2010']),
            parseFloat(rows[i]['2011']),
            parseFloat(rows[i]['2012']),
            parseFloat(rows[i]['2013']),
            parseFloat(rows[i]['2014']),
            parseFloat(rows[i]['2015']),
            parseFloat(rows[i]['2016'])
            ],
        type: 'line',
        name: rows[i]["Region"],
      };

    dataMash.push(data);
  }

  var layout = {
    title: "Fathers per Region",
  }

  console.log(dataMash);

  Plotly.plot("fathersPerRegion", dataMash,layout, {showLink: false});
  });
}


var Survey = function()
{
  Plotly.d3.csv('data/survey.csv', function(err, rows)
  {
    var el = document.getElementById("survey");
    var keys = Object.keys(rows[0]);
    answers = {};

    keys.forEach(function(element) {
      $(el).append($('<div id="'+element+'"><h2>'+element+'<h2> <ul></ul></div>'));
      answers[element]={"ans": [], "amount": []};
    });

    for (var i=0; i < rows.length; i++)
    {
      keys.forEach(function(element) {
        var found = answers[element]["ans"].indexOf(rows[i][element]);
        if(found == -1)
        {
          answers[element]["ans"].push(rows[i][element]);
          answers[element]["amount"].push(1);
        }
        else
        {
          answers[element]["amount"][found]++;
        }
      });
    }

    keys.forEach(function(element) {
      for(var i=0; i<answers[element]["ans"].length; i++)
      {
        $("#"+element+" ul").append($('<li><span class="amount">'+answers[element]["amount"][i]+' -- </span>'+answers[element]["ans"][i]+'</li>'));
      }
    });


    answers["q27_experience_description"]["ans"];
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  Graphs1();
  Graphs2();
  Graphs3();
  Survey();
});
