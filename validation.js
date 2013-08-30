function formValidation(){
		var first_name = document.user_form.first_name;
		var last_name = document.user_form.last_name;
		var email = document.user_form.login_id;
		var phone = document.user_form.phone;
		var dept = document.user_form.dept;
		var mypassword = document.getElementById("paswd");
		var repeat_password = document.getElementById("repeat_password");

		if (checkName(first_name) && checkName(last_name)){} else return false;
		if (checkLetters(first_name) && checkLetters(last_name)) {}
		if (validatePhoneNum(phone)) {}
		if (validateEmail(email)) {}
		if (validateDept(dept)) {}

}

function checkName(name){
	if(name.value == null || name.value == ""){
	//	$('#errors').text(*please enter your username*);
	 //  document.getElementById('errors').innerHTML="*Name can't be blank*";
	  
       alert ("First or last name can't be blank!")
		name.focus();
		return false;
	}
	else{	
		//document.getElementById('errors').style.display="none";
		return true;
	}
}
function checkLetters(name){
	var letters = /^[A-Za-z]+$/;
	
	if (name.value.match(letters)){
		return true;
	}
	else{
		alert ("Name must contain letters only!")
		//document.getElementById('errors').innerHTML="*First and Last Names must contain letters only!*";
		name.focus();
		return false;
	}	
}

function validateEmail(email){
		var mailChar = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/;
		//\w matches any aphanumeric char including underscore(short for [a-zA-Z0-9_])
		if (email.value.match(mailChar)){
			return true;
		}
		else{
			alert("Please enter a valid email address");
			//document.getElementById('errors').innerHTML="*Please correct the email field.*";
			email.focus();
			return false;
		}
	}

function validatePhoneNum(phone){
	var phonenum = /^(?:\(\d{3}\)|\d{3})(?: *- *)?\d{3}(?: *- *)?\d{4}$/;
    var valid_num =/^\d[2-9]$/;
	if (phone.value.match(phonenum)){
		return true;
	}
	else{
		alert("Please enter a valid phone number");
		//document.getElementById('errors').innerHTML="*Invalid Phone*";
		phone.focus();
		return false;
	}
}
function validateDept(dept){

	if(dept.value == null || dept.value == ""){
	//	$('#errors').text(*please enter your username*);
		 alert("Please select a Department");
	   	 //document.getElementById('errors').innerHTML="*Please Select a Department*";
		 dept.focus();
		 return false;
	}
	else{	
		return true;
	}
}
 

	function validatePswd(mypassword){
               
		if (mypassword.value.length < 7){
			alert("password must be atleast 7 charatcers");
	   	 	//document.getElementById('errors').innerHTML="*password must be atleast 7 charatcers*";
		 	password.focus();
		 	return false;
		}
		else{
			return true;
		}
	}
	
	
	function chkPswd(repeat_password){
		var mypassword = document.getElementById("paswd"); 
		if (mypassword.value != repeat_password.value){
			alert("password didn't match");
			//document.getElementById('errors').innerHTML="*password didn't match*";
			repeat_password.focus();
		 	return false;
		}
		else{
			//alert("password did match");
			return true;
		}
	}
