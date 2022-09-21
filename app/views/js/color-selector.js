$(function() {    
  var color_data = $('#color-selector').find('.color-status').text();
  console.log(color_data);
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
        background_color = "#FFFFCA";
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
        background_color = "#F5F5F5";
        break;
    }


  $("#color-selector").css(
    'background-color',color_status
  );
  $(".input-form__category-div").css(
    'background-color', background_color,
  );
  $('.input-form .input-form__category').css(
    'color', color_status
  );



  $("#color-selector__modal .flex-content li").click(function(){
    console.log("color clicked!");
    var color_data = $(this).find("div").text();
    var color = color_data.split(":");
    var color_id = color[0];
    var color_name = color[1];
    var color_status = color[2];

    console.log(color_status);

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
        background_color = "#FFFFCA";
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
        background_color = "#F5F5F5";
        break;
    }

    // console.log(color_id, color_name, color_status);

    $("#color-selector").css(
      'background-color',color_status
    );
    $(".input-form__category-div").css(
      'background-color', background_color,
    );
    $('.input-form .input-form__category').css(
      'color', color_status
    );

    $('#color-selector .category-color').val(color_id);
    // console.log($('#color-selector input').val());
  });

});

