$(function(){
  $(".input-form__category").click(function(){
    // console.log("clicked!");
    $(".workspace-color").fadeOut(100);
    $(".workspace").fadeOut(100);

    $(".workspace-category").fadeIn(100);
  });

  $("#color-selector").click(function(){
    // console.log("color selector!!");
    $(".workspace-category").fadeOut(100);
    $(".workspace").fadeOut(100);

    $(".workspace-color").fadeIn(100);
  });

  $(".input-form__task").click(function(){
    // console.log("task!");
    $(".workspace-color").fadeOut(100);
    $(".workspace-category").fadeOut(100);

    // var inputFormTaskShow = true;
    // console.log(inputFormTaskShow);

    $(".workspace").fadeIn(100);
  });


  $(".cancel").click(function(){
    // console.log("cancel");
    // var inputFormTaskShow = false;

    $(".workspace-color").fadeOut(100);
    $(".workspace-category").fadeOut(100);
    $(".workspace").fadeOut(100);
  });

  $('.cancel__edit, .cancel-btn-edit').click(function(){
    // console.log("cancel!");
    $('.workspace-category__edit').fadeOut(100);
  });

  //categoryの初期状態に関するjs
  const color_id = $("#workspace-category__edit-1").find(".color-status").text();

  switch(color_id){
    case '1':
      $(".selected-color option[value='1']").prop('selected', true);
      break;
    case '2':
      $(".selected-color option[value='2']").prop('selected', true);
      break;
    case '3':
      $(".selected-color option[value='3']").prop('selected', true);
      break;
    case '4':
      $(".selected-color option[value='4']").prop('selected', true);
      break;
    case '5':
      $(".selected-color option[value='5']").prop('selected', true);
      break;
    case '6':
      $(".selected-color option[value='6']").prop('selected', true);
      break;
    case '7':
      $(".selected-color option[value='7']").prop('selected', true);
      break;
    case '8':
      $(".selected-color option[value='8']").prop('selected', true);
      break;
    case '9':
      $(".selected-color option[value='9']").prop('selected', true);
      break;
    case '10':
      $(".selected-color option[value='10']").prop('selected', true);
      break;
    case '11':
      $(".selected-color option[value='11']").prop('selected', true);
      break;
    case '12':
      $(".selected-color option[value='12']").prop('selected', true);
      break;
    case '13':
      $(".selected-color option[value='13']").prop('selected', true);
      break;
    case '14':
      $(".selected-color option[value='14']").prop('selected', true);
      break;
    case '15':
      $(".selected-color option[value='15']").prop('selected', true);
      break;
  }

  // categoryに関するjs
  $(".update-span").click(function(){
    // console.log("update!");

    var id = $(this).find(".id").text();
    // console.log(id);

    var target = "#workspace-category__edit-" + id;
    $(target).fadeIn(100);

    var color_data = $(this).find(".color-data").text();
    var color = color_data.split(":");
    var color_id = color[0];
    var color_name = color[1];
    var color_status = color[2];
    // console.log(color);

    $('.modalArea-edit__wrapper__span').css(
      "background-color", color_status
    );

    $(".selected-color option").attr("selected", false);

    switch(color_id){
      case '1':
        $(".selected-color option[value='1']").prop('selected', true);
        break;
      case '2':
        $(".selected-color option[value='2']").prop('selected', true);
        break;
      case '3':
        $(".selected-color option[value='3']").prop('selected', true);
        break;
      case '4':
        $(".selected-color option[value='4']").prop('selected', true);
        break;
      case '5':
        $(".selected-color option[value='5']").prop('selected', true);
        break;
      case '6':
        $(".selected-color option[value='6']").prop('selected', true);
        break;
      case '7':
        $(".selected-color option[value='7']").prop('selected', true);
        break;
      case '8':
        $(".selected-color option[value='8']").prop('selected', true);
        break;
      case '9':
        $(".selected-color option[value='9']").prop('selected', true);
        break;
      case '10':
        $(".selected-color option[value='10']").prop('selected', true);
        break;
      case '11':
        $(".selected-color option[value='11']").prop('selected', true);
        break;
      case '12':
        $(".selected-color option[value='12']").prop('selected', true);
        break;
      case '13':
        $(".selected-color option[value='13']").prop('selected', true);
        break;
      case '14':
        $(".selected-color option[value='14']").prop('selected', true);
        break;
      case '15':
        $(".selected-color option[value='15']").prop('selected', true);
        break;
    }
  });


  // セレクトのカラーが変わった時の処理
  $(".selected-color").change(function(){
    // console.log("changed!");

    var selected = $(this).val();
    // console.log(selected);

    switch(selected){
      case '1':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#DF1313"
        );
        break;
      case '2':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#9C169C"
        );
        break;
      case '3':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#1F80C6"
        );
        break;
      case '4':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#12BEB2"
        );
        break;
      case '5':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#379137"
        );
        break;
      case '6':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#E1E12F"
        );
        break;
      case '7':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#784C29"
        );
        break;
      case '8':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#E9900A"
        );
        break;
      case '9':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#323232"
        );
        break;
      case '10':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#60253F"
        );
        break;
      case '11':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#202F55"
        );
        break;
      case '12':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#576128"
        );
        break;
      case '13':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#FF9898"
        );
        break;
      case '14':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#A0D8EF"
        );
        break;
      case '15':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#90EE90"
        );
        break;
      case '16':
        $('.modalArea-edit__wrapper__span').css(
          "background-color", "#969696"
        );
        break;
    }
  });
});


// タスクの履歴に関する処理
$(function(){
  $(".workspace__content li").click(function(){
    // console.log("li clicked!");

    var title = $(this).find(".task-title").text();
    // console.log(title);

    var category = $(this).find(".category-color-span .category").text();
    // console.log(category);

    var color_data = $(this).find(".category-color-span .hidden").text();
    var color = color_data.split(":");
    var color_id = color[2].replace("/", "");
    // console.log(color);
    // console.log(color_id);

    $(".input-form__task").val(title);
    $(".input-form__category").val(category);
    $("#color-selector .category-color").val(color_id);

    $(".workspace-color").fadeOut(100);
    $(".workspace-category").fadeOut(100);
    $(".workspace").fadeOut(100);
  });


  // category一覧の中の要素をクリックした時の処理
  $(".workspace-category__content li .category").click(function(){
    // console.log("category span clicked!");
    var category = $(this).find(".category-span").text();
    // console.log(category);

    $(".input-form__category").val(category);

    $(".workspace-color").fadeOut(100);
    $(".workspace-category").fadeOut(100);
    $(".workspace").fadeOut(100);

    var color_data = $(this).siblings(".category__span").find(".color-data").text();
    var color = color_data.split(":");
    var color_id = color[0];
    var color_name = color[1];
    var color_status = color[2];

    // console.log(color);

    var background_color;
    switch(color_name){
      case "red":
        background_color = "#F6BBBB";
        break;
      case "purple":
        background_color = "#F7AAF7";
        break;
      case "blue":
        background_color = "#AADBFE";
        break;
      case "bluegreen":
        background_color = "#C7EAE7";
        break;
      case "green":
        background_color = "#A6EBA6";
        break;
      case "yellow":
        background_color = "#FFFFDA";
        break;
      case "brown":
        background_color = "#E5C5AC";
        break;
      case "orange":
        background_color = "#FFE8C9";
            break;
      case "black":
        background_color = "#C5C5C5";
        break;
      case "bordo":
        background_color = "#BB9EAA";
        break;
      case "navy":
        background_color = "#848EA6";
        break;
      case "olive":
        background_color = "#ABAE99";
        break;
      case "pink":
        background_color = "#FFD9D9";
        break;
      case "skyblue":
        background_color = "#E8F8FF";
        break;
      case "lightgreen":
        background_color = "#E5FFE5";
        break;
      default:
        background_color = "#F5F5F5"
        break;
    }

    $("#color-selector").css(
      'background-color', color_status
    );
    $(".input-form__category").css(
      'color', color_status
    );
    $('.input-form__category-div').css(
      'background-color', background_color
    );

    $('[name="color"]').val(color_id);
    // console.log($('[name="color"]').val());
  });
});

$(function(){
  $(".create-category").click(function(){
    if(!confirm('このカテゴリーを新たに作成してもよろしいですか？')){
      return false;
    }else {
      var category = $(this).siblings("input").val();
  
      var test = $(this).parents('form').attr('action', "/index/create-category");
      $(this).parents('form').attr('action', "/index/create-category");
  
      $(this).parents('form').submit();
    }

    return false;
  });
});

$(function(){
  var color_id = $(".category__span .color-id").text();
  var id_array = color_id.split("/");
  id_array.pop();

  for(i = 0; i < id_array.length; i++) {
    var target_id = id_array[i];
    // console.log(target_id);

    var target_color = "#color-span-" + target_id;
    var target_category = "#category-span-" + target_id;

    var target_span = "#category__span-" + target_id;
    var color_data = $(target_span).find(".color-data").text();
    var color = color_data.split(":");
    var color_status = color[2];

    // console.log(color_status);

    $(target_color).css(
      'background-color', color_status
    );
    $(target_category).css(
      'color', color_status
    );
  }
});



// // タスクを矢印で操作できるようにする機能
// $(function(){
//   $(window).on("keydown", function(e) {
//     if(e.keyCode === 40) {
//           // 「↓」キーが押されました
//           console.log("40");
//           focus_next();
//     }else if(e.keyCode === 38) {
//           // 「↑」キーが押されました
//           console.log("38");
//           focus_prev();
//     }
//   });
// });

// /**
//  * フォーカスを前に移動する
//  */
//  function focus_prev() {
//   // 現在のフォーカスを取得
//   var currentFocusIndex = $('.task-li').index($(':focus'));
//   console.log(currentFocusIndex);

//   if(currentFocusIndex > -1) {
//       for (var i = 0; i < $('.task-li').length; i++) {
//           if(i === currentFocusIndex && i > 0) {
//               $('.task-li').eq(i - 1).focus();
//           }
//       }
//   }
// }

// /**
// * フォーカスを次に移動する
// */
// function focus_next() {
//   // 現在のフォーカスを取得
//   var currentFocusIndex = $('.task-li').index($(':focus'));
//   console.log(currentFocusIndex);

//   if(currentFocusIndex > -1) {
//       for (var i = 0; i < $('.task-li').length; i++) {
//           if(i === currentFocusIndex && i < $('.task-li').length - 1) {
//               $('.task-li').eq(i + 1).focus();
//           }
//       }
//   } else {
//       $('.task-li').eq(0).focus();
//   }
// }
