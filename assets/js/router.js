const Router = {
	navigate: function(page, parameter) {
		window.location.hash = '/' + page
      $("#loader").css('visibility', 'visible')
      $(".changed-wrapper").css('filter', 'blur(5px)');
		$.ajax({
         type : 'get',
         url : `assets/js/page/${page}.html`,
         success : function(result){
            setTimeout(function() {
               $("#loader").css('visibility', 'hidden')
               $(".changed-wrapper").css('filter', 'unset');
            }, 1500)

            if(typeof parameter != "undefined") {
            	param = parameter;
            }

            $(".changed-wrapper").html(result)
            $.getScript(`assets/js/page/${page}.js`)
         }
     })
	}
}