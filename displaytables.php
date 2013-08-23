<?php

//session_start();
require_once 'connect.php';


 	$comp_type = $_POST['comp_type'];
 	$comp_name = $_POST['companyname'];
 	
   
// $_SESSION['comp_type']  = $comp_type;
// $_SESSION['bd_email']  = $bd_email;
   
	foreach ($_POST['vertical_name'] as $vertical){
		if ($_POST['vertical_name']){
			$sub = $_POST[$vertical];
		}
	}

	
 if ($comp_type == 'publisher'){
 	$type = 'advertiser';
 }
 else{
 	$type = 'publisher';
 }
 
 $int_header= "$type - $vertical - $sub \n";
 $posts = "$comp_type - $vertical - $sub \n" . $posts;

/* display to comapny table */
if ($sub == 'all'){
	 $sql_display_company = "select w.company_name from win_company w, win_subvertical s where w.company_type='$comp_type' and s.vertical_name='$vertical' and w.company_id=s.fk_company_id order by w.company_name;"; 
	 $sql_display_inter = "select w.company_name from win_company w, win_subvertical s where w.company_type not in (select company_type from win_company where company_type='$comp_type') and s.vertical_name='$vertical' and w.company_id=s.fk_company_id order by w.company_name;"; 
}
else{
 $sql_display_company = "select w.company_name from win_company w, win_subvertical s where w.company_type='$comp_type' and s.vertical_name='$vertical' and s.subvertical_name='$sub' and w.company_id=s.fk_company_id order by w.company_name;
 "; 
 $sql_display_inter= "select w.company_name from win_company w, win_subvertical s where w.company_type not in (select company_type from win_company where company_type='$comp_type') and s.vertical_name='$vertical' and s.subvertical_name='$sub' and w.company_id=s.fk_company_id order by w.company_name;"; 
 }
 
 
 	$sql_display_comp = "select vertical_name, subvertical_name from  win_subvertical s, win_company w where s.company_name='$comp_name' and w.company_id=s.fk_company_id;"; 
 	$sql_display_type = "select company_type from win_company where company_name='$comp_name';";
 	$sql_display_compIn = "select w.company_name from win_company w, win_subvertical s where w.company_type not in (select company_type from win_company where company_type='$company_type') and s.vertical_name='$rowvert[0]' and s.subvertical_name='$rowvert[1]' and w.company_id=s.fk_company_id order by w.company_name;"; 
 
$com_type = mysqli_query($dbhandle, $sql_display_type);
 while($row = mysqli_fetch_array($com_type))
  {
 	 $company_type = $row[0];
 	 echo $company_type;
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
	
$sql_display_compIn = "select w.company_name from win_company w, win_subvertical s where w.company_type not in (select company_type from win_company where company_type='$company_type') and s.vertical_name='$rowvert[0]' and s.subvertical_name='$rowvert[1]' and w.company_id=s.fk_company_id order by w.company_name;"; 
$vert_result = mysqli_query($dbhandle, $sql_display_compIn);

$total_vert_rows = mysqli_num_rows($vert_result);

$vert_table .= "<table border='1'  class='vert' style='margin-left:350px; margin-top:-250px; width:200px; display:none; background-color: #F6F9ED;'>";
if ($total_vert_rows > 0){
		while ($row = mysqli_fetch_array($vert_result)) {
 			 $vert_table .= "<tr class='vert_list'><td>" . $row[0] ."</td><td>";
 			 $vert_table .= "<select name=stat class='stat_op'><option value=0>";
  			 $vert_table .= "Opportunity</option><option value=1>Live</option></select></td></tr>"; 
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
 //echo "c_rows " . $total_rows;
 
 $result_inter = mysqli_query($dbhandle, $sql_display_inter);
 $total_int_rows = mysqli_num_rows($result_inter);
 //echo "int_rows " . $total_int_rows;
 
 
 



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


$inter_table .= "<table border='1'  class='inter' style='margin-left:350px; margin-top:-250px; width:200px; display:none; background-color: #F6F9ED;'> <tr>";
$inter_table .= "<th style='background-color:#FFFFE0; width:200px'>corresponding companies</th><th>Status</th></tr>";
if ($total_int_rows > 0){
		while ($row = mysqli_fetch_array($result_inter)) {
 			 $inter_table .= "<tr class='inter_list'><td>" . $row[0] ."</td><td>";
 			 $inter_table .= "<select name=stat class='stat_op'><option value=0>";
  			 $inter_table .= "Opportunity</option><option value=1>Live</option></select></td></tr>"; 
	}
	$inter_table .= "</table>";
     echo $inter_table ;
}

 
//testing before adding data to win_intersect_status

	
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