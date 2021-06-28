const assesmentTitle = [
	"Isi assesment yuk!",
	"Berapa umur anda?",
	"Berapa tinggi badan anda?",
	"Berapa berat badan anda?",
	"Bagaimana aktivitas harian anda?"
]

var dataAssesment = {};

$(".btn-next").click(function() {
	const next = $(this).attr('next')

	const age = $(`[name="age"]`).val()
	const height = $(`[name="height"]`).val()
	const weight = $(`[name="weight"]`).val()

	if((age == "" && next == 2) || (weight == "" && next == 4) || (height == "" && next == 3)) {
		return swal({
			title: "Error",
			text: "Please complete the form",
			icon: "error",
			buttons: {
				hapus: "OK",
			},
		})
	}

	if(next == 1) {
		dataAssesment["gender"] = $(this).attr('data');
	} else if(next == 5) {
		dataAssesment["activity"] = $(this).attr('data');
		const submitedData = JSON.stringify(dataAssesment);
		localStorage.setItem('dataAssesment', submitedData);
		Router.navigate('assesment-result');
	} else {
		dataAssesment["age"] = age;
		dataAssesment["height"] = height;
		dataAssesment["weight"] = weight;
	}

	const submitedData = JSON.stringify(dataAssesment);
	localStorage.setItem('dataAssesment', submitedData);

	$(`.assesment-${next - 1}`).css('margin-left', "-20%")
	$(".assesment .title").text(assesmentTitle[next])
	$(".item").removeClass('active')
	$(`.indicator [index=${next}]`).addClass('active')
})