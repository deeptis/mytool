function copyFromAdmin_Fin(adminContact_id){

	if(adminContact_id.checked){
		 var fin_name = document.getElementById("admin_name").value;
		 var fin_email = document.getElementById("admin_email").value;
		 var fin_phone = document.getElementById("admin_phone").value;
	}
	else{
		var fin_name ='';
		var fin_email = '';
		var fin_phone = '';
	}
	
	document.getElementById("fin_name").value = fin_name;
	document.getElementById("fin_email").value = fin_email;
	document.getElementById("fin_phone").value = fin_phone;

}

function copyFromAdmin_Tech(adminContact_id){

	if(adminContact_id.checked){
		 var tech_name = document.getElementById("admin_name").value;
		 var tech_email = document.getElementById("admin_email").value;
		 var tech_phone = document.getElementById("admin_phone").value;
	}
	else{
		var tech_name ='';
		var tech_email = '';
		var tech_phone = '';
	}
	
	document.getElementById("tech_name").value = tech_name;
	document.getElementById("tech_email").value = tech_email;
	document.getElementById("tech_phone").value = tech_phone;

}

function copyFromFin_Tech(adminContact_id){

	if(adminContact_id.checked){
		 var tech_name = document.getElementById("fin_name").value;
		 var tech_email = document.getElementById("fin_email").value;
		 var tech_phone = document.getElementById("fin_phone").value;
	}
	else{
		var tech_name ='';
		var tech_email = '';
		var tech_phone = '';
	}
	
	document.getElementById("tech_name").value = tech_name;
	document.getElementById("tech_email").value = tech_email;
	document.getElementById("tech_phone").value = tech_phone;

}