<?php
$mysqli = new mysqli("localhost", "username", "password", "database_name");
$u = strval($_GET['u']);
$p = strval($_GET['p']);
$result = $mysqli->query("SELECT emp_id,emp_fname,emp_lname,emp_desig,dob,doj
                          FROM employee_master
                          where login_name='" . $u . "' and password='" . $p ."'");
if ($result->num_rows > 0) {
    foreach ($result as $r)
    {    
        echo(json_encode($r));
    }
}
else{
    http_response_code(400);
}

?>
