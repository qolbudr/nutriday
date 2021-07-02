var dbUser = window.localStorage.user;
dbUser = JSON.parse(dbUser);
var apiKey = 'app_id=7725e30f&app_key=baa5533ea9490b28a4c0d5242719c129';
var d = new Date();

var date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
var month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
var year = d.getFullYear();
var completeDate = `${year}-${month}-${date}`;

var constraints = { video: { facingMode: "environment" }, audio: false };

var cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")

function dataURItoBlob(dataURI)
{
    var byteString = atob(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
}

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

function cameraStop() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        stream.getTracks().forEach(function(track) {
				  track.stop();
				});
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/jpg");
    cameraOutput.classList.add("taken");
    var blob = dataURItoBlob(cameraOutput.src);
    var fd = new FormData();
		fd.append('image', blob, 'images.jpg');
		$("#loader").css('visibility', 'visible')
    $(".changed-wrapper").css('filter', 'blur(3px)');
    $("#camera").css('visibility', 'hidden');
    cameraStop();
    $.ajax({
	    url: 'https://api.logmeal.es/v2/recognition/complete/v0.8?language=eng',
	    type: 'POST',
	    processData: false,
	    contentType: false,
	    beforeSend: function (xhr) {
			    xhr.setRequestHeader ("Authorization", "Bearer bb73418215d3b71738d012139dd656e4fd8a2c69");
			},
	    data: fd,
	    success: function(data) {
	    	if('imageId' in data) {
	    		$.ajax({
				    url: 'https://api.logmeal.es/v2/recipe/nutritionalInfo/v0.8?language=eng',
				    type: 'POST',
				    processData: false,
				    contentType: "application/json",
				    beforeSend: function (xhr) {
						    xhr.setRequestHeader ("Authorization", "Bearer bb73418215d3b71738d012139dd656e4fd8a2c69");
						},
						data: `{"imageId": ${data['imageId']}}`,
						success: function(data) {
							$("#loader").css('visibility', 'hidden')
					    $(".changed-wrapper").css('filter', 'unset');
							var food = [];
			    		food['image'] = 'http://placekitten.com/100/100';
			    		food['calories'] = data['nutritional_info']['calories'].toFixed();
			    		food['label'] = data['foodName'];
			    		setRecognition(food);
						}
		    	})
	    	}
	    }
		})
};

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

function setRecognition(data, load) {
	var i = 0;
	var html = '';
		html += `<div class="col-12 mb-3 p-0 m-0">
							<div class="card p-3 shadowed" id="food-${i}">
								<div class="row align-items-start p-0 m-0">
									<div class="col-4 col-md-3 p-0 pr-3">
										<img class="w-100" src="${data['image']}">
									</div>
									<div class="col-8 col-md-9 p-0">
										<div class="row m-0 p-0 justify-content-end">
											<div class="col-12 col-md-6 p-0 pr-1">
												<h5 class="title mb-1">${data['label']}</h5>
												<span class="subtitle color-primary mb-3">${data['calories']} kkal</span>
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

$(".auto-ident").click(function() {
	$("#camera").css('visibility', 'visible');
	cameraStart();
})

$(".manual-ident").click(function() {
	$("#choose-type").hide();
	cameraStart(false);
})