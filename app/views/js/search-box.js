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

    $(".workspace").fadeIn(100);
  });


  $(".cancel").click(function(){
    // console.log("cancel");
    $(".workspace-color").fadeOut(100);
    $(".workspace-category").fadeOut(100);
    $(".workspace").fadeOut(100);
  });

  $('.cancel__edit, .cancel-btn-edit').click(function(){
    // console.log("cancel!");
    $('.workspace-category__edit').fadeOut(100);
  });


  // categoryに関するjs
  $(".update-span").click(function(){
    console.log("update!");

    var id = $(this).find(".id").text();
    console.log(id);

    var target = "#workspace-category__edit-" + id;
    $(target).fadeIn(100);

    var color_data = $(this).find(".color-data").text();
    var color = color_data.split(":");
    var color_id = color[0];
    var color_name = color[1];
    var color_status = color[2];
    console.log(color);

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
          "background-color", "#969696"
        );
        break;
    }
  });
});

$(function(){
  $(".workspace__content li").click(function(){
    // console.log("li clicked!");

    var title = $(this).find(".task-title").text();
    // console.log(title);

    var category = $(this).find(".category-color-span .category").text();
    // console.log(category);

    $(".input-form__task").val(title);
    $(".input-form__category").val(category);

    $(".workspace-color").fadeOut(100);
    $(".workspace-category").fadeOut(100);
    $(".workspace").fadeOut(100);
  });


  // category一覧の中の要素をクリックした時の処理
  $(".workspace-category__content li .category").click(function(){
    console.log("category span clicked!");
    var category = $(this).find(".category-span").text();
    console.log(category);

    $(".input-form__category").val(category);

    $(".workspace-color").fadeOut(100);
    $(".workspace-category").fadeOut(100);
    $(".workspace").fadeOut(100);

    var color_data = $(this).siblings(".category__span").find(".color-data").text();
    var color = color_data.split(":");
    var color_id = color[0];
    var color_name = color[1];
    var color_status = color[2];

    console.log(color);

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
  });
});

$(function(){
  $(".create-category").click(function(){
    var category = $(this).siblings("input").val();

    var test = $(this).parents('form').attr('action', "/index/create-category");
    $(this).parents('form').attr('action', "/index/create-category");

    $(this).parents('form').submit();
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


