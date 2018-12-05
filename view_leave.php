<?php
$mysqli = new mysqli("localhost", "root", "anusha@123", "leave_management");
$id = strval($_GET['id']);
$result = $mysqli->query("SELECT lm.type,ela.no_of_days,ela.updated_date,ela.status,ela.from_date,ela.to_date
                         FROM employee_leave_applied ela,leave_master lm 
                         where emp_id= '".$id."' and ela.type_id = lm.type_id order by ela.from_date");
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
