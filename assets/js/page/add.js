var dbUser = window.localStorage.user;
dbUser = JSON.parse(dbUser);
var apiKey = 'app_id=7725e30f&app_key=baa5533ea9490b28a4c0d5242719c129';
var apiKey2 = 'app_id=3b8cf1fb&app_key=8aae497cd0410ba3325e1e38296d58af';
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

var cameraStream;

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
        cameraStream = stream;
        track = cameraStream.getTracks()[0];
        cameraView.srcObject = cameraStream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

function cameraStop() {
	cameraStream.getTracks().forEach(function(track) {
		track.stop();
	})
}

function scanFood(type) {
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
    cameraStop();
    if(type == true) {
    	$.ajax({
		    url: 'https://api.logmeal.es/v2/recognition/complete/v0.8?language=eng',
		    type: 'POST',
		    processData: false,
		    contentType: false,
		    beforeSend: function (xhr) {
				    xhr.setRequestHeader ("Authorization", "Bearer e1fbe4c69584baad775d8b72f2eb64c0255a7dab");
				},
		    data: fd,
		    error: function (request, status, error) {
		    	swal({title: "Error", text: "Food unrecognized", icon: "error", buttons: { hapus: "OK" }})
	    		$("#loader").css('visibility', 'hidden')
				$(".changed-wrapper").css('filter', 'unset');
		    },
		    success: function(data) {
		    	$("#camera").css('visibility', 'hidden');
		    	if('imageId' in data) {
		    		$.ajax({
					    url: 'https://api.logmeal.es/v2/recipe/nutritionalInfo/v0.8?language=eng',
					    type: 'POST',
					    processData: false,
					    contentType: "application/json",
					    beforeSend: function (xhr) {
						    xhr.setRequestHeader ("Authorization", "Bearer e1fbe4c69584baad775d8b72f2eb64c0255a7dab");
						},
						data: `{"imageId": ${data['imageId']}}`,
						error: function (request, status, error) {
				      		swal({title: "Error", text: "Food unrecognized", icon: "error", buttons: { hapus: "OK" }})
				    		$("#loader").css('visibility', 'hidden')
							$(".changed-wrapper").css('filter', 'unset');
					    },
						success: function(data) {
							if('foodName' in data) {
								var ref = firebase.storage().ref().child('uploads/' + Date.now() + '.jpg');
								ref.putString(cameraOutput.src, 'data_url').then(function(snapshot) {
									snapshot.ref.getDownloadURL().then(function(url) {
										var food = [];
										food['image'] = url;
										food['calories'] = data['nutritional_info']['calories'].toFixed();
						    		food['label'] = data['foodName'];
						    		setRecognition(food);
									})
								});
							} else {
								swal({title: "Error", text: "Food unrecognized", icon: "error", buttons: { hapus: "OK" }})
							}
							$("#loader").css('visibility', 'hidden')
						  	$(".changed-wrapper").css('filter', 'unset');
						}
			    	})
		    	} else {
			    	swal({title: "Error", text: "Food unrecognized", icon: "error", buttons: { hapus: "OK" }})
			    	$("#loader").css('visibility', 'hidden')
					$(".changed-wrapper").css('filter', 'unset');
			    }
		    }
		})
    } else {
    	var data = [];
    	data['image'] = cameraOutput.src;
    	setManualRecognition(data);
    }
    
};

function setResult(search, load) {
	$.ajax({
		url: `https://api.edamam.com/api/recipes/v2?${apiKey}&type=public&q=${encodeURI(search)}`,
		method: 'get',
		success: function(result) {
			if(load == true) {
				$("#loader").css('visibility', 'hidden')
         		$(".changed-wrapper").css('filter', 'unset');
			}

			if(result['count'] > 0) {
				var html = '';
				var end = result['count'] > 5 ? 5 : result['count']
				for(var i = 0; i < end; i++) {
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

				$("#food-item").html(html);

				$(".btn-add-food").click(function() {
					$("#loader").css('visibility', 'visible')
				    $(".changed-wrapper").css('filter', 'blur(3px)');
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
						$("#loader").css('visibility', 'hidden')
					    $(".changed-wrapper").css('filter', 'unset');
					    swal({title: "Success", text: 'Data sucessfully added', icon: "success", buttons: { hapus: "OK" }})
					})
					.catch((error) => {
					    swal({title: "Error", text: error, icon: "error", buttons: { hapus: "OK" }})
					});
				})
			} else {
				swal({title: "Error", text: 'Food not found', icon: "error", buttons: { hapus: "OK" }})
			}
		},
		error: function(error) {
			swal({title: "Error", text: error, icon: "error", buttons: { hapus: "OK" }})
		}
	})
}

function setManualRecognition(data) {
	$("#loader").css('visibility', 'hidden')
	$(".changed-wrapper").css('filter', 'unset');
	$("#camera").css('visibility', 'hidden');
	var html = '';
		html += `<div class="col-12 mb-3 p-0 m-0" id="food-0">
					<div class="card p-3 shadowed">
						<div class="row align-items-start p-0 m-0">
							<div class="col-4 col-md-5 p-0 pr-3">
								<img class="w-100" src="${data['image']}">
							</div>
							<div class="col-8 col-md-7 p-0">
								<div class="row m-0 p-0 justify-content-end">
									<div class="col-12 col-md-12 p-0">
										<input class="form-control py-2 bordered mb-2" type="text" placeholder="Nama Makanan" name="food-name">
										<textarea class="form-control py-2 bordered mb-2" type="text" placeholder="Komposisi\nContoh: 1 sdm gula, 1 sdt garam, 1 piring nasi (pisahkan dengan koma)" name="food-composition" rows="5"></textarea>
										<span class="subtitle color-primary" style="visibility: hidden;">0</span>
									</div>
								</div>
							</div>
							<div class="col-12 col-md-12 p-0 mt-3">
								<div id="selector" class="d-flex align-items-center">
									<select class="form-control mr-2 px-1 py-1 select-type">
										<option value="0">Sarapan</option>
										<option value="1">Makan Siang</option>
										<option value="2">Cemilan</option>
										<option value="3">Makan Malam</option>
									</select>
									<button class="btn btn-dark p-2 px-3 btn-calculate mr-2"><i class="fa fa-search"></i></button>
									<button class="btn btn-primary p-2 px-3 btn-add-food"><i class="fa fa-plus"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>`
	$("#food-item").html(html);

	$(".btn-calculate").click(function() {
		var value = $(this).val();
		var text = $("[name=food-composition]").val()
		$(".subtitle").css('visibility', 'visible');
		$(".subtitle").text('Menghitung nutrisi....');
		$.ajax({
			type: 'get',
			url: 'https://api.mymemory.translated.net/get?q=' + text + '&langpair=id|en',
			success: function(result) {
				if(result.responseStatus == 200) {
					var object = {};
					object.ingr = result.responseData.translatedText.split(',')
					$.ajax({
						type: 'post',
						url: `https://api.edamam.com/api/nutrition-details?${apiKey2}`,
						contentType: 'application/json',
						data: JSON.stringify(object),
						success: function(response) {
							var calories = response.calories
							$(".subtitle").text(calories + ' kkal');
						},
						error: function(error) {
							swal({title: "Error", text: 'Nutrition not identified', icon: "error", buttons: { hapus: "OK" }})
							$(".subtitle").text(0 + ' kkal');
						}
					})
				} else {
					swal({title: "Error", text: 'Nutrition not identified', icon: "error", buttons: { hapus: "OK" }})
					$(".subtitle").text(0 + ' kkal');
				}
			}
		})
	})

	$(".btn-add-food").click(function() {
		$("#loader").css('visibility', 'visible')
	    $(".changed-wrapper").css('filter', 'blur(3px)');
		var image = $(`#food-0 img`).attr('src');
		var title = $(`#food-0 [name=food-name]`).val();
		var calories = parseFloat($(`#food-0 .subtitle`).text());
		var type = $(`#food-0 .select-type option:selected`).val();
		db.collection('tracker').doc(dbUser.uid).collection(type).doc().set({
			date: completeDate,
			image: image,
			calories: calories,
			title: title
		})
		.then(() => {
			$("#loader").css('visibility', 'hidden')
		    $(".changed-wrapper").css('filter', 'unset');
		    swal({title: "Success", text: 'Data sucessfully added', icon: "success", buttons: { hapus: "OK" }})
		})
		.catch((error) => {
		    swal({title: "Error", text: error, icon: "error", buttons: { hapus: "OK" }})
		});
	})
}

function setRecognition(data) {
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
	$("#food-item").html(html);

	$(".btn-add-food").click(function() {
		$("#loader").css('visibility', 'visible')
	    $(".changed-wrapper").css('filter', 'blur(3px)');
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
			$("#loader").css('visibility', 'hidden')
		    $(".changed-wrapper").css('filter', 'unset');
		    swal({title: "Success", text: 'Data sucessfully added', icon: "success", buttons: { hapus: "OK" }})
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
	$("#camera--trigger").click(function() {
		scanFood(true);
	})
})

$(".manual-ident").click(function() {
	$("#camera").css('visibility', 'visible');
	cameraStart();
	$("#camera--trigger").click(function() {
		scanFood(false);
	})
})