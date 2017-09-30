
$(function () {
    $(".flipButton").click(function (){
        var profile = $(this).siblings(".profile")[0];
        var itinerary = $(this).siblings(".itinerary")[0];


        if(!$(profile).hasClass("rotate"))
        {
          $(profile).addClass("rotate");
          setTimeout(function(){
            $(itinerary).removeClass("rotate");
          }, 350);
        }else
        {
          $(itinerary).addClass("rotate");
          setTimeout(function(){
            $(profile).removeClass("rotate");
          }, 350);
        }
    });
});
