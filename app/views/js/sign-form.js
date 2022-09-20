$(function() {
// ログアウトに関する処理
$('.mypage-content .logout').click(function(){
  if(!confirm('ログアウトしてよろしいですか？')){
    return false;
  }else {
    $(".mypage-content .logout").attr("href", "/logout");
  }
});
});