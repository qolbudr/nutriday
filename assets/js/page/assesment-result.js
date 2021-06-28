var result = new Result();
var savedData = localStorage.dataAssesment;
savedData = JSON.parse(savedData);

result.weight = savedData['weight'];
result.height = savedData['height'];
result.age = savedData['age'];
result.activity = savedData['activity'];
result.gender = savedData['gender'];

const bmi = result.BMI();
const bbi = result.BBI();
const activity = result.getActivity();
const calories = result.getCalories();
const bmi_sub = result.getStatus();

$("#bmi").text(bmi);
$("#bbi").text(bbi + ' Kg')
$("#activity").text(activity + '%');
$("#calories").text(calories + ' Kal');
$("#bmi-sub").text(bmi_sub);

firebase.auth().onAuthStateChanged((user) => {
	db.collection("assesment").doc(user.uid).set({
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
	})
	.catch((error) => {
	    swal({title: "Error", text: error, icon: "error", buttons: { hapus: "OK" }})
	});
})

