var start_time = $(".run-time").val();
// console.log(start_time);

var date = $(".run-time-date").text();
var date_split = date.split("/");
// console.log(date_split);

var start_year = date_split[0];
var start_month = date_split[1];
switch(start_month){
  case "January":
    start_month = 1;
    break;
  case "February":
    start_month = 2;
    break;
  case "March":
    start_month = 3;
    break;
  case "April":
    start_month = 4;
    break;
  case "May":
    start_month = 5;
    break;
  case "June":
    start_month = 6;
    break;
  case "July":
    start_month = 7;
    break;
  case "August":
    start_month = 8;
    break;
  case "September":
    start_month = 9;
    break;
  case "October":
    start_month = 10;
    break;
  case "November":
    start_month = 11;
    break;
  case "December":
    start_month = 12;
    break;
}
var start_day = date_split[2];

// console.log(start_year, start_month, start_day);

// var start_year = new Date().getFullYear();
// var start_month = new Date().getMonth() + 1;
// var start_day = new Date().getDate();

// console.log(start_year, start_month, start_day);
var format = start_year + "-" + start_month + "-" + start_day + " " + start_time;

// console.log(format);

var start = new Date(format);
// console.log(start);

function send() {
  $.get("/index").done(function(){
    var target = new Date();
    // console.log(target);
    var diff = target.getTime() - start.getTime();
    
    // console.log("diffHour = "+diff/(1000*60*60)+"時間");
    // console.log("diffMinute = "+diff/(1000*60)+"分");
    // console.log("diffSec = "+diff/(1000)+"秒");

    diff_h = Math.floor(diff/(1000*60*60))
    diff_m = Math.floor((diff/(1000*60) % 60))
    diff_s = Math.floor((diff/(1000) % 60))

    diff_mm = diff_m < 10 ? "0"+diff_m : diff_m
    diff_ss = diff_s < 10 ? "0"+diff_s : diff_s

    diff = diff_h + ":" + diff_mm + ":" + diff_ss
    // console.log(diff)

    $(".run-time").val(diff);
  })
}
setInterval(send, 1000)
window.onload = function(){
  send()
}