var dbUser = window.localStorage.user;
dbUser = JSON.parse(dbUser);

var user = dbUser;

$(".bottom-navbar-item").click(function() {
	const page = $(this).attr('data');
	Router.navigate(page);
})

function getCalories(range) {
	var calories = 0;
	db.collection('assesment').doc(user.uid).get().then(function(snapshot) {
		var data = snapshot.data();
		calories = data['calories'];
		setChart(calories, range)
	})
}

function setChart(calories, range) {
	var setter = new Date();
	var now = new Date();
	var before = new Date(setter.setDate(setter.getDate() - range));

	var modulo = (range == 7) ? modulo = 1 : (range == 30) ? modulo = 5 : modulo = 15;

	var targetCalories = [];
	var calLabels = [];
	var labels = [];
	var data = [];

	db.collection('totalCalories').where('date', '>=', before).where('date', '<=', now).get().then(function(snapshot) {
		snapshot.forEach(function(doc) {
			var dbData = doc.data();
			for(var i = 0; i < range; i++) {
				var date = new Date(setter.setDate(setter.getDate() + 1));
				var dbDate = new Date(dbData['date'].toDate());

				var stringDate = date.getDate() + ' ' + date.getMonth() + ' ' + date.getFullYear();
				var stringDb = dbDate.getDate() + ' ' + dbDate.getMonth() + ' ' + dbDate.getFullYear();

				if(i % modulo == 0) {
					labels.push(date.getDate() + '/' + date.getMonth());
				} else {
					labels.push(date.getDate() + '/' + date.getMonth());
				}

				if(stringDate == stringDb) {
					data.push(dbData['total']);
				} else {
					data.push(0);
				}

				calLabels.push(calories);
			}
		})

		$(".chart").html('<canvas id="chart-track"></canvas>');
		var ctx = document.getElementById("chart-track").getContext('2d');

		var myChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		        labels: labels,
		        datasets: [
		        	{
			            label: 'Target',
			            data: calLabels,
			            fill: false,
			            borderColor: '#000000',
			            backgroundColor: '#000000',
			            borderWidth: 1
			        },
			        {
			            label: 'Kalori',
			            data: data,
			            fill: true,
			            borderColor: '#2196f3',
			            backgroundColor: '#8b81f89c',
			            borderWidth: 1
			        }
		        ]
		      },
		    options: {
		    	legend: {
		        display: false
			    },
			    elements: {
            point:{
                radius: 0
            }
          },
		      responsive: true,
		      maintainAspectRatio: false,
		    }
		});
	})
}

$(".chart-items .btn").click(function() {
	$(".chart-items .btn").removeClass('btn-primary');
	$(".chart-items .btn").addClass('btn-primary-o');
	$(this).removeClass('btn-primary-o');
	$(this).addClass('btn-primary');
	let data = $(this).attr('data');
	var ctx = document.getElementById("chart-track").getContext('2d');
	getCalories(data)
})

getCalories(7)

