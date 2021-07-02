var dbUser = window.localStorage.user;
dbUser = JSON.parse(dbUser);
var apiKey = 'app_id=7725e30f&app_key=baa5533ea9490b28a4c0d5242719c129';
var d = new Date();

var date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
var month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
var year = d.getFullYear();
var completeDate = `${year}-${month}-${date}`;

function setResult(search, load) {
	$.ajax({
		url: `https://api.edamam.com/api/recipes/v2?${apiKey}&type=public&q=${encodeURI(search)}`,
		method: 'get',
		success: function(result) {
			var html = '';
			for(var i = 0; i < 5; i++) {
				html += `<div class="col-12 mb-3 p-0 m-0">
									<div class="card p-3 shadowed" id="food-${i}">
										<div class="row align-items-start p-0 m-0">
											<div class="col-4 col-md-3 p-0 pr-3">
												<img class="w-100" src="${result['hits'][i]['recipe']['image']}">
											</div>
											<div class="col-8 col-md-9 p-0">
												<div class="row m-0 p-0 justify-content-end">
													<div class="col-12 col-md-6 p-0 pr-1">
														<h5 class="title mb-1">${result['hits'][i]['recipe']['label']}</h5>
														<span class="subtitle color-primary mb-3">${(result['hits'][i]['recipe']['calories'] / result['hits'][i]['recipe']['yield']).toFixed()} kkal</span>
													</div>
													<div class="col-12 col-md-6 p-0">
														<div id="selector" class="d-flex align-items-center">
															<select class="form-control mr-2 px-1 py-1 select-type">
																<option value="0">Sarapan</option>
																<option value="1">Makan Siang</option>
																<option value="2">Cemilan</option>
																<option value="3">Makan Malam</option>
															</select>
															<button class="btn btn-primary p-2 px-3 btn-add-food" data="${i}"><i class="fa fa-plus"></i></button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>`
			}
			if(load == true) {
				 $("#loader").css('visibility', 'hidden')
         $(".changed-wrapper").css('filter', 'unset');
			}

			$("#food-item").html(html);

			$(".btn-add-food").click(function() {
				var id = $(this).attr('data');
				var image = $(`#food-${id} img`).attr('src');
				var title = $(`#food-${id} .title`).text();
				var calories = parseFloat($(`#food-${id} .subtitle`).text());
				var type = $(`#food-${id} .select-type option:selected`).val();
				db.collection('tracker').doc(dbUser.uid).collection(type).doc().set({
					date: completeDate,
					image: image,
					calories: calories,
					title: title
				})
				.then(() => {
				    swal({title: "Success", text: 'Data telah ditambahkan', icon: "success", buttons: { hapus: "OK" }})
				})
				.catch((error) => {
				    swal({title: "Error", text: error, icon: "error", buttons: { hapus: "OK" }})
				});
			})
		}
	})
}

$(".bottom-navbar-item").click(function() {
	const page = $(this).attr('data');
	Router.navigate(page);
})

var arrayFood = ['Nasi Goreng', 'Sate', 'Sayur Lodeh'];
var el = Math.floor(Math.random() * arrayFood.length);

$("#search").keyup(function(e) {
	const value = $(this).val();
	if(e.keyCode == 13) {
		$("#loader").css('visibility', 'visible')
    $(".changed-wrapper").css('filter', 'blur(3px)');
		setResult(value, true);
	}
})

setResult(arrayFood[el]);

function cameraStart() {
	var constraints = { video: { facingMode: "user" }, audio: false };
	var track = null;
  navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(stream) {
      track = stream.getTracks()[0];
      $("#camera--view").srcObject = stream;
  })
  .catch(function(error) {
      alert("Oops. Something is broken.", error);
  });
}

$("#camera--trigger").onclick = function() {
    $("#camera--sensor").width = $("#camera--view").videoWidth;
    $("#camera--sensor").height = $("#camera--view").videoHeight;
    $("#camera--sensor").getContext("2d").drawImage($("#camera--view"), 0, 0);
    $("#camera--output").src = $("#camera--sensor").toDataURL("image/webp");
    $("#camera--output").classList.add("taken");
};

$(".btn-camera").click(function() {
	cameraStart()
})

cameraStart()