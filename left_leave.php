<?php
$mysqli = new mysqli("localhost", "root", "anusha@123", "leave_management");
$id = strval($_GET['id']);
//echo($id);
//$p = strval($_GET['p']);
//echo($p);
$result = $mysqli->query("SELECT e.type_id,e.days_available FROM employee_leave_availability e where e.emp_id='" . $id . "'");
$resp=[];
//var_dump($result,$id);
if ($result->num_rows > 0) {
    foreach ($result as $r)
    {    
        array_push($resp,$r);
    }
    echo(json_encode($resp));
}
else{
    http_response_code(400);
}

?>
