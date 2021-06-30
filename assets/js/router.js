const Router = {
	navigate: function(page, parameter) {
      $("#loader").css('visibility', 'visible')
      $(".changed-wrapper").css('filter', 'blur(3px)');
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

            window.location.hash = '/' + page
         }
     })
	}
}