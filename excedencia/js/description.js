var descriptions;
var colors = [["#c12e1b", "#111111"], ["#ffffff", "#111111"], ["#7ea1cc", "#efefef"], ["#96ce48","#efefef"]];


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var Survey = function()
{
  Plotly.d3.csv('data/survey.csv', function(err, rows)
  {
    var el = document.getElementById("survey");
    var keys = Object.keys(rows[0]);
    answers = {};

    keys.forEach(function(element) {
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

    var chosen = answers["q27_experience_description"]["ans"][getRandomInt(0, answers["q27_experience_description"]["ans"].length)];

    console.log(chosen);

    $("#answer").animate({"opacity": 0}, 800, function(){
      $("#answer").text('"'+ chosen +'"');
      $("#answer").css('margin-top', ($( window ).height()/2 - $("#answer").height()/2) +  "px");
      var col = colors[getRandomInt(0,colors.length)];
      $("#answer").css({"color":col[1]});
      $("#answer").animate({"opacity": 1}, 800, function(){});
      $("#description").animate({"background-color": col[0]}, 800, function(){});
    });




  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  Survey();

  $("html").click(function(){
    Survey();
  });

  setInterval(Survey, 5000)
});
