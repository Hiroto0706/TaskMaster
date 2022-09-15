// ボタンアクションに関するjs
$('.create-task-form .play').click(function() {
  $(this).parents('form').attr('action', $(this).data('action'));
  $(this).parents('form').submit();
});

$('.create-task-form .stop').click(function() {
  $(this).parents('form').attr('action', $(this).data('action'));
  $(this).parents('form').submit();
});

$(function (){
  var page = $("#this-page").text();
  console.log(page);

  switch(page){
    case "list":
      $(".list-color").css("color", "rgb(31, 154, 198)");
      break;
    case "timeline":
      $(".timeline-color").css("color", "rgb(31, 154, 198)");
      break;
    case "calender":
      $(".calender-color").css("color", "rgb(31, 154, 198)");
      break;
  }
});