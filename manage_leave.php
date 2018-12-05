<?php
$mysqli = new mysqli("localhost", "username", "password", "database_name");

$id = strval($_GET['id']);

$result = $mysqli->query(
    "SELECT ela.leave_applied_id,ela.emp_id,e.emp_fname,e.emp_lname,ela.no_of_days,ela.updated_date,t.type, ela.from_date, ela.to_date FROM 
    employee_leave_applied ela,employee_master e,leave_master t 
    where e.mgr_id='" . $id . "' and e.emp_id = ela.emp_id and t.type_id = ela.type_id and status='APPLIED'");

$data = [];
if ($result->num_rows > 0) {
    foreach ($result as $r)
    {    
        array_push($data,$r);
    }
    echo(json_encode($data));
}
else{
    echo("No Records");
}

?>
