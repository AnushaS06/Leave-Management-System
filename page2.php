<?php
$mysqli = new mysqli("localhost", "root", "anusha@123", "leave_management");
$id = strval($_GET['id']);
$result = $mysqli->query("SELECT emp_id FROM employee_master where mgr_id='" . $id . "'");
if ($result->num_rows > 0) {
    echo("YES");
}
else{
    echo("NO");
}
?>
