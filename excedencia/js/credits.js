

function rollCredits()
{
  $("#credits").stop();
  $("#credits").css("margin-top", -$(window).height()/2);
  if($("#credits").width() > $(window).width())
  {
    $("#credits").css("left", -($("#credits").width() - $(window).width())/2);
  }
  $("#credits").animate({"margin-top": -$("#credits").height()*2}, 40000, "linear",function(){
    rollCredits();
  });
}
