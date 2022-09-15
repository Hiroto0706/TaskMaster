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


  // categoryに関するjs
  $(".update-span").click(function(){
    console.log("update!");
  });

  $(".delete-span").click(function(){
    console.log("delete!");
  });
});

$(function(){
  $(".workspace__content li").click(function(){
    console.log("li clicked!");

    var title = $(this).find(".task-title").text();
    console.log(title);

    var category = $(this).find(".category-color-span .category").text();
    console.log(category);

    $(".input-form__task").val(title);
    $(".input-form__category").val(category);

    $(".workspace-color").fadeOut(100);
    $(".workspace-category").fadeOut(100);
    $(".workspace").fadeOut(100);
  });

  $(".workspace-category__content li .category").click(function(){
    console.log("category span clicked!");
    var category = $(this).find(".category-span").text();
    console.log(category);

    $(".input-form__category").val(category);

    $(".workspace-color").fadeOut(100);
    $(".workspace-category").fadeOut(100);
    $(".workspace").fadeOut(100);
  });
});

$(function(){
  $(".create-category").click(function(){
    var category = $(this).siblings("input").val();

  var test = $(this).parents('form').attr('action', "/index/create-category");
  $(this).parents('form').attr('action', "/index/create-category");

  console.log(test.attr("action"));
  // $(this).parents('form').submit();
  });
});

