// ボタンアクションに関するjs
$('.modal-content__form__update-btn').click(function() {
  $(this).parents('form').attr('action', $(this).data('action'));
  $(this).parents('form').submit();
});

$('.modal-content__form__delete-btn').click(function() {
  $(this).parents('form').attr('action', $(this).data('action'));
  $(this).parents('form').submit();
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


