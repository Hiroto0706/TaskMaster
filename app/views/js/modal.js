$(function () {
  $('.task-a').click(function(){
    var id = $(this).children(".hidden").text();
    // console.log(id);
    var modalArea = "#modalArea" + "-" + id;
      $(modalArea).fadeIn(100);
  });

  $('.cancel').click(function(){
    var id = $(this).children(".hidden").text();
    // console.log(id);
    var modalArea = "#modalArea" + "-" + id;
    $(modalArea).fadeOut(100);
  });
});