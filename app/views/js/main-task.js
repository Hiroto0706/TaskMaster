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

$(function(){
  var data = $("#openModal .hidden-status").text();
  // console.log(data);

  var set = data.split("/");
  set.pop();
  // console.log(set);

  var id = [];
  var status = [];
  var name = [];
  for(i = 0; i < set.length; i++) {
    split_data = set[i].split(":");

    id[i] = split_data[0];
    status[i] = split_data[1];
    name[i] = split_data[2];
  }

  for(i = 0; i < id.length; i++) {
    var target = ".category-color-" + id[i];
    // console.log(target);
    // console.log(status[i]);

    $(target).css(
      'background-color', status[i]
    );
  }

  console.log(id, status, name);
  for(i = 0; i < id.length; i++){
    var target = "#modalArea-" + id[i];
    $(target).find("select").val(name[i]);
  }
});