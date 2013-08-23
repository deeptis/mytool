<?php


session_start();
require_once 'connect.php';

 $name = $_POST['name'];
 $type = $_POST['type'];
 $email = $_POST['email']; 
 $comment = $_POST['comments'];
 
 
  


 
/* insert to comapny table */


$sql_insert_company="insert into win_company(name, type, email, add_date) 
          values ('$name','$type', '$email', now())"; 
          


if (!mysqli_query($dbhandle, $sql_insert_company)){
	die ('Error: ' .mysqli_error($dbhandle));
	echo "sorry, information couldn't be updated for company.";
}

$id= "SELECT company_id FROM company WHERE name='$name';";

  $q_id = mysqli_query($dbhandle, $id);
  $f_id = mysqli_fetch_array($q_id);
  $result_id = $f_id['id'];
  echo "result== " . $result_id. "...";
 /* insert into subvertical table */ 
 
 $sql_insert_vertical = "insert into sutical(sname, vname, cname, fk_c_id) values";
 
 foreach ($_POST['v_name'] as $vl){
 
		if ($_POST['v_name']){
			$sub = $_POST[$vl];
		}
 	 $sql_in_al .=  "('".$sub."','" . $vl. "' ,'" . $name. "',". $result_id. "),";
 	  
}


$sql_in_al = substr($sql_insert_vertical, 0, -1);
 
 //echo $sql_in_al;
 
 

 
if (!mysqli_query($dbhandle, $sql_in_al)){
	die ('Error: ' .mysqli_error($dbhandle));
	echo "sorry, information couldn't be updated for verticals.";
}

 


?>