var excedencia_quotes = [];
var delay = 5000; //3 seconds per quote

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var changeQuotes = function()
{
  $(".quote").each(function () {
    var pro = parseInt(this.dataset["profile"]);
    var quote = excedencia_quotes[pro][getRandomInt(0,excedencia_quotes[pro].length)];
    var self = this;

    $(this).animate({"opacity":0}, 500, function(){
      $(self).text("\"" + quote + "\"");
      $(self).animate({"opacity":1}, 500);
    });

  });
}

$(function (){
  Plotly.d3.csv('data/quotes.csv', function(err, rows){
    //console.log(rows);

    var quotes = [];

    for (var i=0; i < rows.length; i++)
    {
      var pro = parseInt(rows[i]["Profile"]);
      var quote = rows[i]["Quotes"]

      if(excedencia_quotes[pro] == undefined)
      {
        excedencia_quotes[pro] = [];
      }

      excedencia_quotes[pro].push(quote);
    }

    setInterval(changeQuotes, delay);
  });
});
