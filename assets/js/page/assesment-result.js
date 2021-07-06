var result = new Result();
var savedData = localStorage.dataAssesment;
savedData = JSON.parse(savedData);

result.weight = savedData['weight'];
result.height = savedData['height'];
result.age = savedData['age'];
result.activity = savedData['activity'];
result.gender = savedData['gender'];

var bmi = result.BMI();
var bbi = result.BBI();
var activity = result.getActivity();
var calories = result.getCalories();
var bmi_sub = result.getStatus();

var dbUser = window.localStorage.user;
dbUser = JSON.parse(dbUser);

$("#bmi").text(bmi);
$("#bbi").text(bbi + ' Kg')
$("#activity").text(activity + '%');
$("#calories").text(calories + ' Kal');
$("#bmi-sub").text(bmi_sub);

$(".btn-home").click(function() {
	db.collection("assesment").doc(dbUser.uid).set({
	  weight: result.weight,
	  height: result.height,
	  age: result.age,
	  activity: result.activity,
	  gender: result.gender,
	  bmi: bmi,
	  bbi: bbi,
	  precentage_activity: activity,
	  calories: calories
	})
	.then(() => {
	    localStorage.removeItem('dataAssesment');
	    Router.navigate('home');
	})
	.catch((error) => {
	    swal({title: "Error", text: error, icon: "error", buttons: { hapus: "OK" }})
	});
})

