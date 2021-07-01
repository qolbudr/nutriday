var dbUser = window.localStorage.user;
dbUser = JSON.parse(dbUser);

var user = dbUser;

db.collection('assesment').doc(user.uid).get().then((snapshot) => {
	if(snapshot.exists) {
		var data = snapshot.data();
		var calory = parseFloat(data['calories']).toFixed();
		$("#counter").text(`0/${data['calories']} kkal`);
		$("#calory-progress").attr('aria-valuemax', calory);
	} else {
		Router.navigate('assesment');
	}
})

var dayArray = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUM\'AT', 'SABTU'];
var monthArray = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
var d = new Date();

var date = d.getDate();
var day = dayArray[d.getDay()];
var month = monthArray[d.getMonth()];
var fulldate = day + ' ' + date + ' ' +  month;


$("#name").text('Hai, ' + user.displayName);
$("#profile-picture").attr('src', user.photoURL);
$(".full-date").text(fulldate);

$(".bottom-navbar-item").click(function() {
	const page = $(this).attr('data');
	Router.navigate(page);
})