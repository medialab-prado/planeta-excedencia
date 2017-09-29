
var Panels = function ()
{
  this.pages = [];
  this.currentPage = 0;
  this.currentPanel = 0;
  this.timer = null;
}

Panels.prototype.init = function ()
{
  var self = this;
  $(".fullpage").each(function(){
    var index = self.pages.push({
      "element": this,
      "panels": [],
      "current": 0
      }) - 1;
    $(this).find(".panel").each(function () {
      var newSize = self.pages[index]["panels"].push(this);
      if (newSize === 1)
      {
        $(this).show();
        $(this).animate({"opacity": 1}, 500);
      }
    });
  });
}

Panels.prototype.showPanel = function (index)
{
  var self = this;
  if(index < this.pages[this.currentPage].panels.length && index >= 0)
  {
    var done = false;
    for(var i=0; i<this.pages[this.currentPage].panels.length; i++)
    {
      if(i != index && parseInt($(this.pages[this.currentPage].panels[i]).css("opacity")) == 1)
      {
        $(this.pages[this.currentPage].panels[i]).animate({"opacity": 0}, 300, function(){
            $(this).hide();
            $(self.pages[self.currentPage].panels[index]).show();
            $(self.pages[self.currentPage].panels[index]).animate({"opacity": 1}, 300);
            done = true;
          });
      }
    }

    this.pages[this.currentPage]["current"] = index;

    if(this.timer)
    {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if(parseInt(this.pages[this.currentPage].panels[index].dataset.delay) != 0)
    {
      this.timer = setTimeout(function(){self.showPanel(index+1)}, parseInt(this.pages[this.currentPage].panels[index].dataset.delay));
    }

    this.updateArrows();

    if(this.currentPage === 0 && this.pages[this.currentPage]["current"] == 1)
    {
      var properties = {
       opacity : 0.5
      };

      $('#scrollTip').pulse(properties, {
        duration : 3250,
        pulses   : 5,
        interval : 800
      });
    }
  }
}

Panels.prototype.selectPage = function (index)
{
  var self = this;
  this.currentPage = index;
  this.updateArrows();

  if(parseInt(this.pages[this.currentPage].panels[this.pages[this.currentPage]["current"]].dataset.delay) != 0)
  {
    this.timer = setTimeout(function(){self.showPanel(self.pages[self.currentPage]["current"]+1)}, parseInt(self.pages[self.currentPage].panels[self.pages[self.currentPage]["current"]].dataset.delay));
  }

  if(this.currentPage == this.pages.length-1)
  {
    rollCredits();
  }
}

Panels.prototype.updateArrows = function ()
{
  if(this.pages[this.currentPage]["current"] == this.pages[this.currentPage].panels.length-1)
  {
    $("#arrow_right").hide();
  }
  else
  {
    $("#arrow_right").show();
  }

  if(this.pages[this.currentPage]["current"] == 0)
  {
    $("#arrow_left").hide();
  }
  else
  {
    $("#arrow_left").show();
  }
}

var panels = new Panels();

$(function(){

  setTimeout(function(){
    $("#logo").animate({opacity:0},300,function (){
        $("#logo").hide();
      })
    }, 1000);

  panels.init();
  panels.showPanel(0);

  panels.selectPage(Math.floor($(window).scrollTop()/$(window).height()));

  $(window).scroll(function() {

    var border_bottom = ($(window).height()*(panels.currentPage+1)) - $(window).height()/2;
    var border_top = ($(window).height()*(panels.currentPage)) - $(window).height()/2;

    if($(window).scrollTop() > border_bottom) {
      panels.selectPage(panels.currentPage+1);
    }

    if($(window).scrollTop() <= border_top) {
      panels.selectPage(panels.currentPage-1);
    }
  });

  $("#arrow_right").click(function(event){
      panels.showPanel(panels.pages[panels.currentPage]["current"]+1);
  });
  $("#arrow_left").click(function(event){
      panels.showPanel(panels.pages[panels.currentPage]["current"]-1);
  });

  $('#scrollTip').css({opacity: 0});
});
