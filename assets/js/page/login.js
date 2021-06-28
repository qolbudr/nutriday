var user;

$(".btn-login").click(function() {
	const email = $(`[name='email']`).val()
	const password = $(`[name='password']`).val()
	user = new User();
	user.email = email;
	user.password = password;
	user.login();
})

$(".btn-login-google").click(function() {
	user = new User();
	user.loginWithGoogle();
})

$(".btn-logout").click(function() {
	user.logout();
})

$(".goto-register").click(function() {
	Router.navigate('register')
})