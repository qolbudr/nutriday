var user;

$(".btn-register").click(function() {
	const username = $(`[name="name"]`).val()
	const email = $(`[name="email"]`).val()
	const password = $(`[name="password"]`).val()
	const c_password = $(`[name="c_password"]`).val();
	if(password !== c_password) {
		return swal({title: "Error", text: 'Konfirmasi password tidak sesuai', icon: "error", buttons: { hapus: "OK" }})
	}

	user = new User();

	user.name = username
	user.email = email
	user.password = password
	user.register()
	$(`[name="name"],[name="email"],[name="password"],[name="c_password"]`).val('');
})

$(".goto-login").click(function() {
	Router.navigate('login');
})