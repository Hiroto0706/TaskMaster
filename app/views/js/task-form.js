// ボタンアクションに関するjs
$('.modal-content__form__update-btn').click(function() {
  $(this).parents('form').attr('action', $(this).data('action'));
  $(this).parents('form').submit();
});

$('.modal-content__form__delete-btn').click(function() {
	if(!confirm('このタスクを削除してもよろしいですか？')){
		return false;
	}else {
		$(this).parents('form').attr('action', $(this).data('action'));
		$(this).parents('form').submit();
	}
});

$('.modalArea-edit__content .update-btn').click(function() {
  $(this).parents('form').attr('action', $(this).data('action'));
	
	var post_category = $(this).siblings('input').val();
	$("[name='category-name']").val(post_category);

	var post_color = $(this).siblings(".flex-content").find(".selected-color").val();
	$("[name='category-color']").val(post_color);

  $(this).parents('form').submit();
});

$('.modalArea-edit__content .delete-btn').click(function() {
	if(!confirm('このカテゴリーを削除してもよろしいですか？')){
		return false;
	}else {
		$(this).parents('form').attr('action', $(this).data('action'));
		$(this).parents('form').submit();
	}
});


// monthの表示に関するjs
var lis = $(".task-a").find(".hidden");

for(i = 0; i < lis.length; i++){
	var id = $(lis[i]).text();

	var target = ".modal-content__form__date-section__month-" + id;

	var month = $(target).val();

	switch(month){
		case "January":
			$(target).val(1);
			break;
		case "February":
			$(target).val(2);
			break;
		case "March":
			$(target).val(3);
			break;
		case "April":
			$(target).val(4);
			break;
		case "May":
			$(target).val(5);
			break;
		case "June":
			$(target).val(6);
			break;
		case "July":
			$(target).val(7);
			break;
		case "August":
			$(target).val(8);
			break;
		case "September":
			$(target).val(9);
			break;
		case "October":
			$(target).val(10);
			break;
		case "November":
			$(target).val(11);
			break;
		case "December":
			$(target).val(12);
			break;
	}
}


// subtimeに関するjs
for(i = 0; i < lis.length; i++){
	var id = $(lis[i]).text();

	var target = ".task-content__time__subtime" + "-" + id;

	var subTime = $(target).text();

	var subTime = convert(subTime);

	$(target).text(subTime);
}

function convert(arg)
{
		const found = arg.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
		let h = found[1] ? found[1] : 0;
		let m = found[2] ? found[2] : 0;
		let s = found[3] ? found[3] : 0;
	
		// let hh = h < 10 ? "0"+h : h;
		let mm = m < 10 ? "0"+m : m;
		let ss = s < 10 ? "0"+s : s;
		return h+':'+mm+':'+ss;
}

var contents_sum = $('.contents').children('.task-content');
var sum = $(".contents").children(".task-content").children(".flex-content").find(".subtime-sum").text();



// タスクの履歴のカテゴリーのカラーに関する処理
$(function(){
	var color = $(".category-color-span .hidden").text();
	// console.log(color);

	var color_data = color.split("/");
	color_data.pop();
	// console.log(color_data);

	var id = [];
	var status = [];
	for(i = 0; i < color_data.length; i++){
		var split_data = color_data[i].split(":");

		id[i] = split_data[0];
		status[i] = split_data[1];
	}

	// console.log(id, status);

	for(i = 0; i < id.length; i++){
		var target = ".task-color-" + id[i];
		// console.log(target);

		$(target).find(".color-span").css(
			'background-color', status[i]
		);

		$(target).find(".category").css(
			'color', status[i]
		);
	}
});



// タスクの履歴をクリックした時の処理
$(function(){
	$(".workspace__content li").click(function(){
		console.log("clicked!");
		var color = $(this).find(".hidden").text();
		// console.log(color);

		var color_data = color.replace("/", "");
		// console.log(color_data);

		var split_data = color_data.split(":");
		// var id = split_data[0];
		var status = split_data[1];

    var background_color;
    switch(status){
      case "#DF1313":
        background_color = "#F6BBBB";
        break;
      case "#9C169C":
        background_color = "#F7AAF7";
        break;
      case "#1F80C6":
        background_color = "#AADBFE";
        break;
      case "#12BEB2":
        background_color = "#C7EAE7";
        break;
      case "#379137":
        background_color = "#A6EBA6";
        break;
      case "#E1E12F":
        background_color = "#FFFFDA";
        break;
      case "#784C29":
        background_color = "#E5C5AC";
        break;
      case "#E9900A":
        background_color = "#FFE8C9";
            break;
      case "#323232":
        background_color = "#C5C5C5";
        break;
      case "#60253F":
        background_color = "#BB9EAA";
        break;
      case "#202F55":
        background_color = "#848EA6";
        break;
      case "#576128":
        background_color = "#ABAE99";
        break;
      case "#FF9898":
        background_color = "#FFD9D9";
        break;
      case "#A0D8EF":
        background_color = "#E8F8FF";
        break;
      case "#90EE90":
        background_color = "#E5FFE5";
        break;
      default:
        background_color = "#F5F5F5"
        break;
    }

		// console.log(background_color);

		$("#color-selector").css(
			"background-color", status
		);
		$(".input-form__category").css(
			"color", status
		);
		$(".input-form__category-div").css(
			"background-color", background_color
		);
	});
});
