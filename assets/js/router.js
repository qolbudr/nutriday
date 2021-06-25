const Router = {
	navigate: function(page, parameter) {
		window.location.hash = '/' + page
		$.ajax({
         type : 'get',
         url : `assets/js/page/${page}.html`,
         success : function(result){
            $(".changed-wrapper").html(result)
            if(typeof parameter != "undefined") {
            	param = parameter;
            }
            $.getScript(`assets/js/page/${page}.js`)
         }
     })
	}
}