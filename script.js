


// function newEvent() {
// 	// function that does a post request to the node
// 	var eventId= document.getElementById("eventId").value;
// 	var eventName = document.getElementById("eventName").value;
// 	console.log(`newEvent in script js ${eventId} , ${eventName}`)
// 	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
// 	xmlhttp.open("POST", "http://localhost:9001/newevent", true);
// 	xmlhttp.setRequestHeader("Content-Type", "application/json");
// 	xmlhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200) {
// 			console.log(this.response)
			
// 		}
// 	}
// 	xmlhttp.send(JSON.stringify({event_id:eventId, event_name:eventName}));



// }

function retrieve(){
		console.log("entered");
		var username= document.getElementById("user_name").value;
		// var firstname = document.getElementById('user_first_name').value;
		// var lastname = document.getElementById('user_last_name').value;
		var password = document.getElementById('user_password').value;
		var email = document.getElementById('user_email').value;
		var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
		xmlhttp.open("POST", "http://localhost:3000/retrieve", true);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(this.response)
				
			}
		}
		xmlhttp.send(JSON.stringify({username_id:username, password_id:password,email_id:email}));
	}



