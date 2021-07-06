class User {
	constructor() {
		this.email;
		this.password;
		this.name;
	}

	login() {
    $("#loader").css('visibility', 'visible')
    $(".changed-wrapper").css('filter', 'blur(5px)');
		firebase.auth().signInWithEmailAndPassword(this.email, this.password)
	  .then((userCredential) => {
	  	$("#loader").css('visibility', 'hidden')
      $(".changed-wrapper").css('filter', 'unset');
	  	const user = firebase.auth().currentUser;
	  	if(user.emailVerified == true) {
	  		Router.navigate('assesment')
	  	} else {
	  		$("#loader").css('visibility', 'hidden')
      	$(".changed-wrapper").css('filter', 'unset');
	  		return swal({title: "Error", text: 'Please verify your email', icon: "error", buttons: { hapus: "OK" }})
	  	}
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    $("#loader").css('visibility', 'hidden')
      $(".changed-wrapper").css('filter', 'unset');
	    return swal({title: "Error", text: errorMessage, icon: "error", buttons: { hapus: "OK" }})
	  });
	}

	loginWithGoogle() {
		var provider = new firebase.auth.GoogleAuthProvider();
    $("#loader").css('visibility', 'visible')
    $(".changed-wrapper").css('filter', 'blur(5px)');
		firebase.auth()
	  .signInWithRedirect(provider)
	  .then((result) => {
	    var credential = result.credential;
	    var token = credential.accessToken;
	    var user = result.user;
  		$("#loader").css('visibility', 'hidden')
      $(".changed-wrapper").css('filter', 'unset');
	  	Router.navigate('assesment')
	  }).catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    $("#loader").css('visibility', 'hidden')
      $(".changed-wrapper").css('filter', 'unset');
	    return swal({title: "Error", text: errorMessage ,icon: "error", buttons: { hapus: "OK" }})
	  });
	}

	register() {
    $("#loader").css('visibility', 'visible')
    $(".changed-wrapper").css('filter', 'blur(5px)');
		firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((userCredential) => {
	    firebase.auth().currentUser.sendEmailVerification();
	    firebase.auth().currentUser.updateProfile({
			  displayName: this.name,
			  photoURL: 'https://ui-avatars.com/api/?name='+ encodeURI(this.name) +'&background=random'
			}).then(() => {
				$("#loader").css('visibility', 'hidden')
	      $(".changed-wrapper").css('filter', 'unset');
	      window.localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser));
				return swal({title: "Success", text: "Registrtion success please check your email for confirmation", icon: "success", buttons: { hapus: "OK" }})
			})
	  })
	  .catch((error) => {
	  	$("#loader").css('visibility', 'hidden')
      $(".changed-wrapper").css('filter', 'unset');
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    return swal({title: "Error", text: errorMessage, icon: "error", buttons: { hapus: "OK" }})
	  });
	}
}