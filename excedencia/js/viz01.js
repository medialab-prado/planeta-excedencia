var phi; // golden ratio
var ga;           // golden angle

var SpherePoint = function (lat, lon)
{
  this.lat = lat;
  this.lon = lon;
}

var Globe = function(centerX, centerY, value, minRadius, maxRadius, maxPoints, col)
{
  this.points = [];
  this.particlesIn = [];
  this.particlesOut = [];
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = minRadius;
  this.minRadius = minRadius;
  this.maxRadius = maxRadius;
  this.maxPoints = maxPoints;
  this.c = col;
  this.el = $('<div class="label">'+floor(value)+'</div>').css({"position": "absolute", "top": this.centerY - $(this.el).height()/2 + $(window).height()/2, "left": this.centerX - $(this.el).width()/2 + $(window).width()/2});
  this.setValue(value);
  $("body").append(this.el);

}

Globe.prototype.preSetValue = function (val)
{
  var diff = val - this.points.length;

  if(diff > 0)
  {
    for(var i=0; i<diff; i = i+10)
    {
      this.particlesIn.push({"x": this.centerX + random(-this.radius, this.radius), "y": -height/2});
    }
  }
  else
  {
    this.setValue(val);
    for(var i=diff; i>0; i = i+10)
    {
        this.particlesOut.push({"x": this.centerX + random(-this.radius, this.radius), "y": this.centerY});
    }
  }
}

Globe.prototype.setValue = function (val)
{
  this.points = [];

  for(var i=0; i<val; i++)
  {
    var lon = ga*this.points.length;
    lon /= 2*PI; lon -= floor(lon); lon *= 2*PI;
    if (lon > PI)  lon -= 2*PI;
    var lat = asin(-1 + 2*this.points.length / val);
    this.points.push(new SpherePoint(lat,lon));
  }

  this.radius = map(val, 0, this.maxPoints, this.minRadius, this.maxRadius)
  $(this.el).text(floor(val)).css({"top": this.centerY - $(this.el).height()/2 + $(window).height()/2, "left": this.centerX - $(this.el).width()/2 + $(window).width()/2});;
}

Globe.prototype.draw = function ()
{
  fill(this.c);

  //console.log(this.particlesIn.length);

  /*for(var p=0; p<this.particlesIn.length; p++)
  {
    ellipse(this.particlesIn[p]["x"], this.particlesIn[p]["y"], 2, 2);
    this.particlesIn[p]["y"] += 5;
    if(abs(this.particlesIn[p]["y"]-this.radius) < 4)
    {
      this.particlesIn.splice(p, 1);
      this.setValue(this.points.length+10);
    }
  }

  for(var p=0; p<this.particlesOut.length; p++)
  {
    ellipse(this.particlesOut[p]["x"], this.particlesOut[p]["y"], 2, 2);
    this.particlesOut[p]["y"] += 5;
    if(abs(this.particlesOut[p]["y"]-height) < 4)
    {
      this.particlesOut.splice(p, 1);
    }
  }*/

  push();
    translate(this.centerX, this.centerY);
    rotateY(frameCount/200.0);
    //rotateX(mouseY/1000.0);

    var step = 3;

    for(var i=0; i<this.points.length; i=i+step)
    {
      push();
      rotateY(this.points[i].lon);
      rotateZ(-this.points[i].lat);
      noStroke();
      ellipse(this.radius, 0, 2, 2);
      pop();
    }

  pop();
}

var globe;
var globe2;
var timeline;

function setup()
{
  cnv = createCanvas($(window).width(), $(window).height(), WEBGL);
  cnv.parent('viz01');
  phi = (Math.sqrt(5)+1)/2 - 1; // golden ratio
  ga = phi*2*PI;           // golden angle

  globe = new Globe(-200, 0, 27457, 5, 300, 37531, color("#96ce48"));
  globe2 = new Globe(200, 0, 946, 5, 100, 2986, color("#c12e1b"));

  timeline = 0;
}

function draw()
{
  //push();
  //rotateY(frameCount/100.0);
  globe.draw();
  globe2.draw();
  globe.setValue(map(timeline, 0, width, 27457, 37531));
  globe2.setValue(map(timeline, 0, width, 946, 2986));
  if(timeline < width)
  {
    timeline = timeline + 20;
  }
  //pop();
}

function mouseDragged() {
  globe.preSetValue(map(mouseX, 0, width, 27457, 37531));
  globe2.preSetValue(map(mouseX, 0, width, 946, 2986));
}
