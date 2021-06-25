const assesmentTitle = [
	"Isi assesment yuk!",
	"Berapa umur anda?",
	"Berapa tinggi badan anda?",
	"Berapa berat badan anda?",
	"Bagaimana aktivitas harian anda?"
]

$(".btn-next").click(function() {
	const next = $(this).attr('next')
	console.log(next)

	const age = $(`[name="age"]`).val()
	const height = $(`[name="height"]`).val()
	const weight = $(`[name="weight"]`).val()

	if((age == "" && next == 2) || (weight == "" && next == 4) || (height == "" && next == 3)) {
		return swal({
			title: "Error",
			text: "Maaf silahkan lengkapi form berikut",
			icon: "error",
			buttons: {
				hapus: "OK",
			},
		})
	}

	$(`.assesment-${next - 1}`).css('margin-left', "-20%")
	$(".assesment .title").text(assesmentTitle[next])
	$(".item").removeClass('active')
	$(`.indicator [index=${next}]`).addClass('active')
})