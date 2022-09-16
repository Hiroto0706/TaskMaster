$(".toggle_img").on("click", function () {
  if ($(this).hasClass("change")) {
    $(this).attr("src", "/static/img/play-btn.PNG");
    $(this).toggleClass("change");
  } else {
    $(this).attr("src", "/static/img/stop-btn.PNG");
    $(this).toggleClass("change");
  }
});

// タスク編集のカテゴリーセレクトに関する処理
$(function() {
  
});