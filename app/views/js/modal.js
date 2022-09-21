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

$(function() {
  var data = $('.workspace-color').find('.color-status').text();
  var split_data = data.split('/');
  console.log(split_data);

  for(i = 0; i < split_data.length; i++){
    var split_target = split_data[i].split(':');

    var id = split_target[0];
    var status = split_target[1];
    console.log(id, status);

    var target = ".color-selector__span-" + id;
    $(target).css(
      'background-color', status
    );
    $(target).parents('li').css(
      'color', status
    );
  }
});
