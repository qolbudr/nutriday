class User {
	constructor() {
		this.email;
		this.password;
		this.name;
	}

	login() {
		firebase.auth().signInWithEmailAndPassword(this.email, this.password)
	  .then((userCredential) => {
	  	const user = firebase.auth().currentUser;
	  	if(user.emailVerified == true) {
	  		const localData = {
	  			'uid': user.uid,
	  			'email': user.email,
	  			'displayName': user.displayName
	  		}

	  		window.localStorage.setItem('auth', JSON.stringify(localData));
	  	} else {
	  		
	  	}
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    return swal({title: "Error", text: errorMessage, icon: "error", buttons: { hapus: "OK" }})
	  });
	}

	loginWithGoogle() {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth()
	  .signInWithPopup(provider)
	  .then((result) => {
	    var credential = result.credential;
	    var token = credential.accessToken;
	    var user = result.user;
	  }).catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	  });
	}

	register() {
		firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((userCredential) => {
	    firebase.auth().currentUser.sendEmailVerification();
	    firebase.auth().currentUser.updateProfile({
			  displayName: this.name
			}).then(() => {
				return swal({title: "Success", text: "Registrasi berhasil silahkan konfirmasi email anda", icon: "success", buttons: { hapus: "OK" }})
			})
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    return swal({title: "Error", text: errorMessage ,icon: "error", buttons: { hapus: "OK" }})
	  });
	}

	logout() {
		firebase.auth().signOut().then(() => {
			console.log('signOut');
		}).catch((error) => {
		  return swal({title: "Error", text: error.message ,icon: "error", buttons: { hapus: "OK" }})
		});
	}
}