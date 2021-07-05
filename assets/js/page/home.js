var dbUser = window.localStorage.user;
dbUser = JSON.parse(dbUser);

var user = dbUser;
var totalCalories = 0;

var dayArray = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUM\'AT', 'SABTU'];
var monthArray = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];

if(typeof param != "undefined") {
	var d = param;
} else {
	var d = new Date();
}

function logout() {
	firebase.auth().signOut().then(() => {
    window.localStorage.removeItem('user');
    Router.navigate('login');
	}).catch((error) => {
		$("#loader").css('visibility', 'hidden')
    $(".changed-wrapper").css('filter', 'unset');
	  return swal({title: "Error", text: error.message ,icon: "error", buttons: { hapus: "OK" }})
	});
}

var date = d.getDate();
var day = dayArray[d.getDay()];
var month = monthArray[d.getMonth()];
var fulldate = day + ' ' + date + ' ' +  month;

var date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
var month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
var year = d.getFullYear();
var completeDate = `${year}-${month}-${date}`;

db.collection('tracker')
	.doc(dbUser.uid).collection('0')
	.where('date', '==', completeDate)
	.get().then(function(snapshot) {
		var html = '';
		var breakfastTotal = 0;
		snapshot.forEach(function(doc) {
			var data = doc.data();
			html += `<div class="card food-item mb-3">
									<div class="row align-items-start p-0 m-0">
										<div class="col-4 col-md-3 p-0 pr-3">
											<img class="w-100" src="${data.image}">
										</div>
										<div class="col-8 col-md-9 p-0">
											<div class="row m-0 p-0 justify-content-end">
												<div class="col-9 col-md-12 p-0 pr-1">
													<h5 class="title mb-1">${data.title}</h5>
													<span class="subtitle color-primary mb-3">${data.calories} kkal</span>
												</div>
												<div class="col-3 col-md-12 p-0">
													<div id="selector" class="d-flex align-items-center">
														<button class="btn btn-danger p-1 px-3 mt-2 btn-delete-food" data="${doc.id}"><i class="fa fa-trash"></i></button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>`;
			breakfastTotal += data.calories;
	});
	$(".breakfast-box").html(html);
	$("#breakfast-total").text(breakfastTotal + ' kkal');
	totalCalories += breakfastTotal;
	$(".btn-delete-food").click(function() {
		var id = $(this).attr('data');
		db.collection('tracker')
			.doc(dbUser.uid).collection('0')
			.doc(id).delete().then(() => {
				swal({
					title: "Success", 
					text: 'Data sucessfully deleted', 
					icon: "success", 
					buttons: { 
						hapus: "OK" 
					}
				}).then(function(value) {
					Router.navigate('home')
				})
		})
	})
})


db.collection('tracker')
	.doc(dbUser.uid).collection('1')
	.where('date', '==', completeDate)
	.get().then(function(snapshot) {
		var html = '';
		var lunchTotal = 0;
		snapshot.forEach(function(doc) {
			var data = doc.data();
			html += `<div class="card food-item mb-3">
									<div class="row align-items-start p-0 m-0">
										<div class="col-4 col-md-3 p-0 pr-3">
											<img class="w-100" src="${data.image}">
										</div>
										<div class="col-8 col-md-9 p-0">
											<div class="row m-0 p-0 justify-content-end">
												<div class="col-9 col-md-12 p-0 pr-1">
													<h5 class="title mb-1">${data.title}</h5>
													<span class="subtitle color-primary mb-3">${data.calories} kkal</span>
												</div>
												<div class="col-3 col-md-12 p-0">
													<div id="selector" class="d-flex align-items-center">
														<button class="btn btn-danger p-1 px-3 mt-2 btn-delete-food" data="${doc.id}"><i class="fa fa-trash"></i></button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>`;
			lunchTotal += data.calories;
	});
	$(".lunch-box").html(html);
	$("#lunch-total").text(lunchTotal + ' kkal');
	totalCalories += lunchTotal;
	$(".btn-delete-food").click(function() {
		var id = $(this).attr('data');
		db.collection('tracker')
			.doc(dbUser.uid).collection('1')
			.doc(id).delete().then(() => {
				swal({
					title: "Success", 
					text: 'Data sucessfully deleted', 
					icon: "success", 
					buttons: { 
						hapus: "OK" 
					}
				}).then(function(value) {
					Router.navigate('home')
				})
		})
	})
})

db.collection('tracker')
	.doc(dbUser.uid).collection('2')
	.where('date', '==', completeDate)
	.get().then(function(snapshot) {
		var html = '';
		var snacksTotal = 0;
		snapshot.forEach(function(doc) {
			var data = doc.data();
			html += `<div class="card food-item mb-3">
									<div class="row align-items-start p-0 m-0">
										<div class="col-4 col-md-3 p-0 pr-3">
											<img class="w-100" src="${data.image}">
										</div>
										<div class="col-8 col-md-9 p-0">
											<div class="row m-0 p-0 justify-content-end">
												<div class="col-9 col-md-12 p-0 pr-1">
													<h5 class="title mb-1">${data.title}</h5>
													<span class="subtitle color-primary mb-3">${data.calories} kkal</span>
												</div>
												<div class="col-3 col-md-12 p-0">
													<div id="selector" class="d-flex align-items-center">
														<button class="btn btn-danger p-1 px-3 mt-2 btn-delete-food" data="${doc.id}"><i class="fa fa-trash"></i></button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>`;
			snacksTotal += data.calories;
	});
	$(".snacks-box").html(html);
	$("#snacks-total").text(snacksTotal + ' kkal');
	totalCalories += snacksTotal;
	$(".btn-delete-food").click(function() {
		var id = $(this).attr('data');
		db.collection('tracker')
			.doc(dbUser.uid).collection('2')
			.doc(id).delete().then(() => {
				swal({
					title: "Success", 
					text: 'Data sucessfully deleted', 
					icon: "success", 
					buttons: { 
						hapus: "OK" 
					}
				}).then(function(value) {
					Router.navigate('home')
				})
		})
	})
})

db.collection('tracker')
	.doc(dbUser.uid).collection('3')
	.where('date', '==', completeDate)
	.get().then(function(snapshot) {
		var html = '';
		var dinnerTotal = 0;
		snapshot.forEach(function(doc) {
			var data = doc.data();
			html += `<div class="card food-item mb-3">
									<div class="row align-items-start p-0 m-0">
										<div class="col-4 col-md-3 p-0 pr-3">
											<img class="w-100" src="${data.image}">
										</div>
										<div class="col-8 col-md-9 p-0">
											<div class="row m-0 p-0 justify-content-end">
												<div class="col-9 col-md-12 p-0 pr-1">
													<h5 class="title mb-1">${data.title}</h5>
													<span class="subtitle color-primary mb-3">${data.calories} kkal</span>
												</div>
												<div class="col-3 col-md-12 p-0">
													<div id="selector" class="d-flex align-items-center">
														<button class="btn btn-danger p-1 px-3 mt-2 btn-delete-food" data="${doc.id}"><i class="fa fa-trash"></i></button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>`;
			dinnerTotal += data.calories
	});
	$(".dinner-box").html(html);
	$("#dinner-total").text(dinnerTotal + ' kkal');
	totalCalories += dinnerTotal;
	$(".btn-delete-food").click(function() {
		var id = $(this).attr('data');
		db.collection('tracker')
			.doc(dbUser.uid).collection('3')
			.doc(id).delete().then(() => {
				swal({
					title: "Success", 
					text: 'Data sucessfully deleted', 
					icon: "success", 
					buttons: { 
						hapus: "OK" 
					}
				}).then(function(value) {
					Router.navigate('home')
				})
		})
	})
})

console.log(d + ' - ' + completeDate)

db.collection('assesment').doc(user.uid).get().then((snapshot) => {
	if(snapshot.exists) {
		var data = snapshot.data();
		var calory = parseFloat(data['calories']).toFixed();
		$("#counter").text(`${totalCalories}/${data['calories']} kkal`);
		$("#calory-progress").attr('aria-valuemax', totalCalories);
		$("#calory-progress").css('width', ((totalCalories / data['calories']) * 100).toFixed() + '%');
		db.collection('totalCalories').doc(completeDate).set({
			uid: user.uid,
			date: d,
			total: totalCalories
		})
	} else {
		Router.navigate('assesment');
	}
})


$("#name").text('Hai, ' + user.displayName);
$("#profile-picture").attr('src', user.photoURL);
$(".full-date").text(fulldate);

$(".bottom-navbar-item").click(function() {
	const page = $(this).attr('data');
	Router.navigate(page);
})

$(".btn-next").click(function() {
	d.setDate(d.getDate() + 1);
	Router.navigate('home', d);
})

$(".btn-prev").click(function() {
	d.setDate(d.getDate() - 1);
	Router.navigate('home', d);
})

$(".btn-now").bootstrapMaterialDatePicker({ 
	time:false,
	format : 'YYYY-MM-DD',
	clearButton: false,
	switchOnClick : true,
	cancelButton: false,
}).on('dateSelected',function(e, date){
	$(".dtp-close").click();
	Router.navigate('home', date._d);
});

$(".btn-logout").click(function() {
	swal({
		title: "Keluar", 
		text: 'Apakah anda yakin ingin keluar ?', 
		icon: "info", 
		buttons: { 
			cancel: "Batal",
			keluar: "OK"
		}
	}).then(function(value) {
		if(value == 'keluar') {
			logout();
		}
	})
})