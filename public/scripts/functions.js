function login(){
	var user_nm = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	var formData = {user_nm: user_nm, password: password};

	var req = new XMLHttpRequest();
	req.open('POST', 'http://flip3.engr.oregonstate.edu:9477/authenticate', true); //this part authenticates the username and password with what's in the database
	req.setRequestHeader("Content-Type", "application/json");

	formData = JSON.stringify(formData);
	req.send(formData);

	req.addEventListener('load', function(){ //listen for a response
			if(req.status == 200){
				window.location = "http://flip3.engr.oregonstate.edu:9477/landing"; //this is the line that's executed upon successful login. for us, that will be the map
			}
			else{
				alert("The username/password combination supplied was incorrect."); 
			}
		});
}

function addUser(){
	var user_nm = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var rpt_password = document.getElementById("rpt-password").value;
	var user_email = document.getElementById("email").value;

	if (password != rpt_password){
		alert("The passwords entered do not match.");
	}
	else{
		var formData = {user_nm: user_nm, password: password, user_email: user_email};

		var req = new XMLHttpRequest();
		req.open('POST', 'http://flip3.engr.oregonstate.edu:9477/add_user', true);
		req.setRequestHeader("Content-Type", "application/json");

		formData = JSON.stringify(formData);
		req.send(formData);

		req.addEventListener('load', function(){
			if(req.status == 200){
				alert("Account created successfully!");
				window.location = "http://flip3.engr.oregonstate.edu:9477/";
			}
			else{
				alert("There was an error creating your account. Please try again later.");
			}
		});
	}
}