var data = param['assesment']
var user = param['user']
var calory = parseFloat(data['calories']).toFixed();

const dayArray = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUM\'AT', 'SABTU'];
const monthArray = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
const d = new Date();

const date = d.getDate();
const day = dayArray[d.getDay()];
const month = monthArray[d.getMonth()];

const fulldate = day + ' ' + date + ' ' +  month;


$("#name").text('Hai, ' + user.displayName);
$("#profile-picture").attr('src', user.photoURL);
$("#calory-progress").attr('aria-valuemax', calory);
$("#counter").text(`0/${data['calories']} kkal`);
$(".full-date").text(fulldate);