import User from '../model/user.js';

var user = new User();

$(".btn-login").click(function() {
	const email = $(`[name='email']`).val()
	const password = $(`[name='password']`).val()
	user.email = email;
	user.password = password;
	user.login();
})

$(".btn-login-google").click(function() {
	user.loginWithGoogle();
})

$(".btn-logout").click(function() {
	user.logout();
})

$(".btn-register").click(function() {
	Router.navigate('register')
})