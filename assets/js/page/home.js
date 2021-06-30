var data = param['assesment']
var user = param['user']
var calory = parseFloat(data['calories']).toFixed();
var paramHome = param;

var dayArray = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUM\'AT', 'SABTU'];
var monthArray = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
var d = new Date();

var date = d.getDate();
var day = dayArray[d.getDay()];
var month = monthArray[d.getMonth()];
var fulldate = day + ' ' + date + ' ' +  month;


$("#name").text('Hai, ' + user.displayName);
$("#profile-picture").attr('src', user.photoURL);
$("#calory-progress").attr('aria-valuemax', calory);
$("#counter").text(`0/${data['calories']} kkal`);
$(".full-date").text(fulldate);

$(".bottom-navbar-item").click(function() {
	const page = $(this).attr('data');
	Router.navigate(page, paramHome);
})