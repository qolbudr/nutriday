class Result {
	constructor() {
		this.weight
		this.height
		this.age
		this.gender
		this.activity
		this._bmi
		this._bbi
		this._activity

	}

	BMI() {
		this._bmi = this.weight / ((this.height / 100) * (this.height / 100));
		return this._bmi.toFixed(2);
	}

	BBI() {
		this._bbi = (this.height - 100) - (0.1 * (this.height - 100));
		return this._bbi.toFixed()
	}

	getActivity() {
		if(this.activity == 0) {
			this._activity = 15
		} else if(this.activity == 1) {
			this._activity = 25;
		} else {
			this._activity = 40;
		}

		return this._activity;
	}

	getCalories() {
		var kkb;
		var kal;

		if(this.gender == 0) {
			kkb = 25 * this._bbi;
		} else {
			kkb = 30 * this._bbi;
		}

		if(this.age >= 40 && this.age < 60) {
			kal = kkb + ((this._activity / 100) * kkb) - (0.05 * kkb);
		} else if(this.age >= 60 && this.age < 70) {
			kal = kkb + ((this._activity / 100) * kkb) - (0.1 * kkb);
		} else if(this.age >= 70) {
			kal = kkb + ((this._activity / 100) * kkb) - (0.2 * kkb);	
		} else {
			kal = kkb + ((this._activity / 100) * kkb)
		}

		return kal.toFixed(2);
	}

	getStatus() {
		const status = [
			"Badan anda terlalu kurus, cobalah makan makanan bergizi ya :)",
			"Badan anda normal, tetap jaga kesehatan biar nggak sakit ya :)",
			"Badan anda gemuk, coba untuk mengurangi makanan berlemak :)",
			"Anda mengalami obesitas, coba untuk melakukan diet dengan rutin :)"
		];

		if(this.age > 20 && this.gender == 0) {
			if(this._bmi < 17) {
				return status[0];
			} else if (this._bmi >= 17 && this._bmi <= 23) {
				return status[1];
			} else if (this._bmi >= 24 && this._bmi <= 27) {
				return status[2];
			} else {
				return status[3];
			}
		} else if (this.age > 20 && this.gender == 1) {
			if(this._bmi < 18) {
				return status[0];
			} else if (this._bmi >= 18 && this._bmi <= 25) {
				return status[1];
			} else if (this._bmi >= 25 && this._bmi <= 27) {
				return status[2];
			} else {
				return status[3];
			}
		} else {
			if(this.age < 12 && this.gender == 1) {
				if(this._bmi < 13.5) {
					return status[0];
				} else if (this._bmi >= 13.5 && this._bmi <= 17.9) {
					return status[1];
				} else if (this._bmi >= 18.0 && this._bmi <= 19.5) {
					return status[2];
				} else {
					return status[3];
				}
			} else if(this.age < 12 && this.gender == 0) {
				if(this._bmi < 14.5) {
					return status[0];
				} else if (this._bmi >= 14.5 && this._bmi <= 17.5) {
					return status[1];
				} else if (this._bmi >= 17.6 && this._bmi <= 19.5) {
					return status[2];
				} else {
					return status[3];
				}
			} else if(this.age >= 12 && this.gender == 0) {
				if(this._bmi < 17.4) {
					return status[0];
				} else if (this._bmi >= 17.5 && this._bmi <= 21.5) {
					return status[1];
				} else if (this._bmi >= 21.6 && this._bmi <= 26.0) {
					return status[2];
				} else {
					return status[3];
				}
			} else {
				if(this._bmi < 16.5) {
					return status[0];
				} else if (this._bmi >= 16.5 && this._bmi <= 20.5) {
					return status[1];
				} else if (this._bmi >= 20.6 && this._bmi <= 26.0) {
					return status[2];
				} else {
					return status[3];
				}
			}
		}
	}
}