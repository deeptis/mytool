<?php

require_once 'connect.php';


 	$type = $_POST['type'];
 	$name = $_POST['name'];
 
   
	foreach ($_POST['vi'] as $v){
		if ($_POST['vi']){
			$su = $_POST[$v];
		}
	}

	
 if ($type == 'p'){
 	$type = 'a';
 }
 else{
 	$type = 'p';
 }
 
 $int_header= "$type - $v - $s \n";
 $posts = "$type - $v - $s \n" . $posts;

/* display to comapny table */
if ($sub == 'all'){
	 $sql_display = "select w.name from company w, subvertical s where w.company_type='$type' and s.name='$v' and w.company_id=s.fk__id order by w.name;";  
}
else{
 $sql_display_company = "select w.company_name from win_company w, win_subvertical s where w.company_type='$comp_type' and s.vertical_name='$vertical' and s.subvertical_name='$sub' and w.company_id=s.fk_company_id order by w.company_name;
 "; 
 }
 
 
$type = mysqli_query($dbhandle, $sql_display);
 while($row = mysqli_fetch_array($type))
  {
 	 $type = $row[0];
 	 echo $type;
  }
  
  $header = "$comp_name - $company_type \n";
  
  $comp_result = mysqli_query($dbhandle, $sql_display_comp);
 $total_comp_rows = mysqli_num_rows($comp_result);
 
  
  $comp_table .= "<table border='1' class='comp' style='margin-left:150px; width:200px; text-align: left'><tr>";
  $comp_table .= "<th style='background-color:#FFFFE0;'>$header</th></tr>";
if ($total_comp_rows > 0){
	while ($row = mysqli_fetch_array($comp_result)) {
   		$comp_table .= "<tr class='comp_list'><td>" . $row[0]."---".$row[1]. "</td></tr>";
	}

	$comp_table .= "</table>";
	echo $comp_table;
}
else 
	//echo "Sorry, No data found in the database!";
	


$vert_table .= "<table border='1'  class='vert' style='margin-left:350px; margin-top:-250px; width:200px; display:none; background-color: #F6F9ED;'>";
if ($total_vert_rows > 0){
		while ($row = mysqli_fetch_array($vert_result)) {
 			 $vert_table .= "<tr class='vert_list'><td>" . $row[0] ."</td><td>";
 			 $vert_table .= "<select name=stat class='stat_op'><option value=0>";
  			 $vert_table .= "option1</option><option value=1>option2</option></select></td></tr>"; 
}
$vert_table .= "</table>";
echo $vert_table ;
}
  
  if (!mysqli_query($dbhandle, $sql_display_company)){
	die ('Error1: ' .mysqli_error($dbhandle));
	echo "sorry, information couldn't be found.";
}
if (!mysqli_query($dbhandle, $sql_display_inter)){
	die ('Error2: ' .mysqli_error($dbhandle));
	echo "sorry, information couldn't be found.";
}


 //$sql_display_company = substr($sql_display_company, 0, -1);
 $result = mysqli_query($dbhandle, $sql_display_company);
 $total_rows = mysqli_num_rows($result);

 
 $result_inter = mysqli_query($dbhandle, $sql_display_inter);
 $total_int_rows = mysqli_num_rows($result_inter);
 

$account_table .= "<table border='1' class='matrix' style='margin-left:150px; width:200px; text-align: left'><tr>";
$account_table .= "<th style='background-color:#FFFFE0;'>$posts</th></tr>";
if ($total_rows > 0){
	while ($row = mysqli_fetch_array($result)) {
   		$account_table .= "<tr class='company_list'><td>" . $row[0]. "</td></tr>";
	}

	$account_table .= "</table>";
	echo $account_table;
}
else 
	echo "Sorry, No data found in the database!";

	
include 'test.css';
?>

<script language='javascript'>

$(document).ready(function(){
   $('.company_list').click(function(){
   var offset = $(this).offset();
   $('.inter').offset({ top: offset.top}).css('text-align', 'left').show();
   $("tr").removeClass("highlight");
   $(this).addClass("highlight");
     
      return false;
   }); 
    
});

$(document).ready(function(){
$('.comp_list').click(function(){
   var offset = $(this).offset();
   $('.vert').offset({ top: offset.top}).css('text-align', 'left').show();
   $("tr").removeClass("highlight");
   $(this).addClass("highlight");
     
      return false;
   }); 
   });
			

</script>