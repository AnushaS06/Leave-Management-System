<?php
$mysqli = new mysqli("localhost", "username", "password", "database_name");
$id = strval($_GET['id']);
$result = $mysqli->query("SELECT e.type_id,e.days_available FROM employee_leave_availability e where e.emp_id='" . $id . "'");
$resp=[];
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
