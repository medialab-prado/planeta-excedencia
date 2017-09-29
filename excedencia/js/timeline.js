var graphPointsAll = null;
var currentPercentage = 92.63;
var graphPercentages = null;
var percentSmooth = 92.63;

var laws = [
  {year: 2007.2, id: "#LeyOrganica", loader: 0},
  {year: 2012, id: "#PPIINA", loader: 0},
  {year: 2015, id: "#Decreto2015", loader: 0}
];

Plotly.d3.csv('data/cuidadoDeHijos.csv', function(err, rows){
  //console.log(rows);
  graphPointsAll = rows[1];
  graphPercentages = rows[0];
});

function preload() {
  myFont = loadFont('fonts/Graphik/Graphik-Light.otf');
  myFontBold = loadFont('fonts/Graphik/Graphik-Bold.otf');
}

function setup()
{
  cnv = createCanvas($("#timeline").width(), $("#timeline").height());
  cnv.parent('timeline');
  textFont(myFont);
  textSize(10);
}

function draw()
{
  clear();

  var currentLine;

  for(var i=0; i<50000; i=i+5000)
  {
    currentLine = map(i, 0, 50000, height-100, 0);
    stroke(240, 10);
    fill(240, 30);
    line(0,currentLine,width,currentLine);
    if(i!=0)
    {
      text(i.toLocaleString("es"),10,currentLine+10);
    }
  }

  var currentYear;
  var pastYear = null;

  if(graphPointsAll != null)
  {
    for(var i=2005; i<2017; i=i+1)
    {
      currentYear = map(i, 2005, 2017, 0, width);
      stroke(240, 30);
      fill(240, 30);
      line(currentYear,height-90,currentYear,height-110);
      text(i,currentYear+5, height-85);

      fill(187, 140, 86, 200);
      var value = map(parseInt(graphPointsAll[i]), 0, 50000, height-100, 0);
      ellipse(currentYear, value, 3, 3);

      if(mouseX > currentYear - 10 && mouseX < currentYear + 10)
      {
        var tooltipX = currentYear+10;
        if(i == 2016) tooltipX = currentYear - 50;
        textSize(12);
        textFont(myFontBold);
        noStroke();
        text(parseFloat(graphPointsAll[i]).toLocaleString("es"), tooltipX, value);
        textFont(myFont);
        textSize(10);
        fill(187, 140, 86, 100);
        ellipse(currentYear, value, 5, 5);
        ellipse(currentYear, value, 10, 10);
        currentPercentage = parseFloat(graphPercentages[i]);
      }

      if(pastYear)
      {
        stroke(187, 140, 86, 200);
        line(pastYear.x, pastYear.y, currentYear, value);
      }

      pastYear = {x: currentYear, y: value};
    }
  }

  stroke(240);
  line(0,height-100,width,height-100);
  stroke(240, 100);
  line(mouseX,height,mouseX,0);
  stroke(187, 140, 86);
  line(mouseX,height-80,mouseX,height-120);

  //percentages
  var diff = currentPercentage - percentSmooth;
  percentSmooth += diff * 0.1;

  push();
    var ballSize = 148;
    var ballY = 50;

    if(width < 700)
    {
      ballSize = 100;
      ballY = 10;
    }

    translate(width/2 - 150, ballY);

    fill(187, 140, 86, 20);
    stroke(187, 140, 86, 100);
    ellipse(75,50,ballSize,ballSize);
    ellipse(225,50,ballSize,ballSize);

    noStroke();
    fill(187, 140, 86, 100);
    ellipse(75,50,map(percentSmooth, 0, 100, 10, ballSize), map(percentSmooth, 0, 100, 10, ballSize));
    ellipse(225,50,map(100 - percentSmooth, 0, 100, 10, ballSize), map(100 - percentSmooth, 0, 100, 10, ballSize));

    textAlign(CENTER, CENTER);
    fill("#eeeeee");
    var womanLabel = currentPercentage + "% Mujeres";
    var manLabel = (100 - currentPercentage).toFixed(2) + "% Hombres";
    text(womanLabel.replace(".", ","), 75, 50);
    text(manLabel.replace(".", ","), 225, 50);
    textAlign(LEFT, TOP);
  pop();

  for(var l=0; l<laws.length; l++)
  {
    var lawX = map(laws[l].year, 2005, 2017, 0, width);
    //stroke(187, 140, 86, 100);
    stroke(240, 80);
    line(lawX, height-100, lawX, height-30);

    if(mouseX > lawX-20 && mouseX < lawX+20)
    {
      if(laws[l].loader < 10)
      {
        laws[l].loader = laws[l].loader + 0.5;
      }
      else
      {
        if(laws[l].id === "#Decreto2015")
        {
          $(laws[l].id).css({"bottom": 110, "right": width-lawX});
        }
        else
        {
          $(laws[l].id).css({"bottom": 110, "left":lawX});
        }
        $(laws[l].id).show();
      }
      fill(187, 140, 86, 100);
    }
    else
    {
      if(laws[l].loader > 0)
      {
        laws[l].loader = laws[l].loader - 0.5;
      }
      else
      {
        $(laws[l].id).hide();
      }
      fill(240, 80);
    }

    ellipse(lawX, height-30, 3+(laws[l].loader/2), 3+(laws[l].loader/2));
    ellipse(lawX, height-30, 8+laws[l].loader, 8+laws[l].loader);
    ellipse(lawX, height-30, 13+laws[l].loader*2, 13+laws[l].loader*2);
  }
}

function windowResized(){
    resizeCanvas($("#timeline").width(), $("#timeline").height());
}
