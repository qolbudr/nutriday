export default class User {
	constructor() {
		this.email;
		this.password;
		this.user;
	}

	login() {
		firebase.auth().signInWithEmailAndPassword(this.email, this.password)
	  .then((userCredential) => {
	  	user = firebase.auth().currentUser;
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    return swal({title: "Error", text: errorMessage ,icon: "error", buttons: { hapus: "OK" }})
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