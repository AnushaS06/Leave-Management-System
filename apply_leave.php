<?php
 $mysqli = new mysqli("localhost", "root", "anusha@123", "leave_management");
// $id = strval($_GET['id']);
// $no_of_days=strval($_GET['no']);
// $from_date=strval($_GET['fdate']);
// $to_date=strval($_GET['tdate']);
// $updated_date=strval($_GET['udate']);
// $type_id=strval($_GET['type']);
// $status=strval($_GET['status']);
// //echo("INSERT into employee_leave_applied (type_id,emp_id,from_date,to_date,no_of_days,status,updated_date)
// //VALUES (".$type_id." ,'".$id."', '".$from_date."', '".$to_date."', ".$no_of_days.", '".$status."', '".$updated_date."')");
// $result = $mysqli->query("INSERT into employee_leave_applied ela (ela.type_id,ela.emp_id,ela.from_date,ela.to_date,ela.no_of_days,ela.status,ela.updated_date) VALUES (".$type_id." ,'".$id."', '".$from_date."', '".$to_date."', ".$no_of_days.", '".$status."', '".$updated_date."')");
// var_dump($result);

// if ($result)
//     http_response_code(200);
// else 
//     http_response_code(400);
$id = strval($_GET['id']);
$no_of_days=strval($_GET['no']);
$from_date=strval($_GET['fdate']);
$to_date=strval($_GET['tdate']);
$updated_date=strval($_GET['udate']);
$type_id=strval($_GET['type']);
$status=strval($_GET['status']);

$result = $mysqli->query("INSERT into employee_leave_applied (type_id,emp_id,from_date,to_date,no_of_days,status,updated_date) VALUES (".$type_id." ,'".$id."', '".$from_date."', '".$to_date."', ".$no_of_days.", '".$status."', '".$updated_date."')");


if ($result)
     http_response_code(200);
else 
     http_response_code(400);
?>