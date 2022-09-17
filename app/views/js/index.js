$(".toggle_img").on("click", function () {
  if ($(this).hasClass("change")) {
    $(this).attr("src", "/static/img/play-btn.PNG");
    $(this).toggleClass("change");
  } else {
    $(this).attr("src", "/static/img/stop-btn.PNG");
    $(this).toggleClass("change");
  }
});

// リストのまとめている親リストをクリックした時の処理
$(function() {
  $(".parent-li").click(function() {
    // console.log("parent list!");

    if($(this).hasClass("open")){
      // console.log("open now");

      var close_list = $(this).siblings(".hidden-list");
      $(close_list).fadeOut(200);

      $(this).find('.len p').css({
        'background-color': 'white',
        'border': 'solid 1px rgb(150, 150, 150)',
        'color': 'black'
    });

      $(this).toggleClass("open");
    }else {
      // console.log("not open");

      var open_list = $(this).siblings(".hidden-list");
      $(open_list).fadeIn(200);

      $(this).find('.len p').css({
        'background-color': '#B6D9D9',
        'border': 'none',
        'color' : '#1F9AC6'
    });

      $(this).toggleClass("open");
      }
  });
});

// 親タスクのカテゴリーの色設定
$(function(){
  var color_data = $('.parent-list .parent-title').find('.hidden').text();

  var color = color_data.split('/');
  color.pop();

  var id = [];
  var status = [];
  for(i = 0; i < color.length; i++){
    var split_data = color[i].split(':');
    id[i] = split_data[0];
    status[i] = split_data[1];

    var target = ".parent-bg-" + id[i];
    $(target).css(
      'background-color', status[i]
    );
  }
});