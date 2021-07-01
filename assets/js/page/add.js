var apiKey = 'app_id=7725e30f&app_key=baa5533ea9490b28a4c0d5242719c129';

function setResult(search, load) {
	$.ajax({
		url: `https://api.edamam.com/api/recipes/v2?${apiKey}&type=public&q=${encodeURI(search)}`,
		method: 'get',
		success: function(result) {
			var html = '';
			for(var i = 0; i < 5; i++) {
				html += `<div class="col-12 mb-3 p-0 m-0">
									<div class="card p-3 shadowed">
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
															<select class="form-control mr-2 px-1 py-1">
																<option>Sarapan</option>
																<option>Makan Siang</option>
																<option>Cemilan</option>
																<option>Makan Malam</option>
															</select>
															<button class="btn btn-primary p-2 px-3"><i class="fa fa-plus"></i></button>
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