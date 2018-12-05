<?php

$mysqli = new mysqli("localhost", "root", "anusha@123", "leave_management");
$id = strval($_GET['id']);
$applied_id = strval($_GET['applied_id']);
$status = strval($_GET['status']);
$udate = strval($_GET['udate']);
$no_of_days = strval($_GET['no_of_days']);

$result = $mysqli->query("UPDATE employee_leave_applied e SET e.updated_date = '" .$udate. "', e.status='".$status."' where e.status='applied' and e.emp_id='" . $id . "' and e.leave_applied_id='" . $applied_id . "'");
try{
if($status == "ACCEPTED"){
    $r = $mysqli->query("SELECT type_id from employee_leave_applied where leave_applied_id = ".$applied_id);
    if ($r->num_rows > 0) {
        foreach ($r as $res)
        {    
            $data = $res;
        }
        $type_name = $mysqli->query("SELECT lm.type from leave_master lm where lm.type_id = ".$data["type_id"]);
        if ($type_name->num_rows > 0) {
            foreach ($type_name as $res)
            {    
                $tn = $res;
            }
            $leave_no = $mysqli->query("SELECT days_available from employee_leave_availability where emp_id='".$id."' and type_id='".$tn["type"]."'");
            if ($leave_no->num_rows > 0) {
                foreach ($leave_no as $leaves)
                {    
                    $leave = $leaves;
                }
                var_dump($leave);

                $left_leaves = $leave["days_available"]- $no_of_days;
                var_dump($no_of_days);

                echo("UPDATE employee_leave_availability e SET e.days_available = ".$left_leaves." where e.emp_id = '".$id."'and e.type_id = '".$tn["type"]."'");
                $ress = $mysqli->query("UPDATE employee_leave_availability e SET e.days_available = ".$left_leaves." where e.emp_id = '".$id."'and e.type_id = '".$tn["type"]."'");
                }
            }
    }
    else{
        echo("No Records");
    }
    
    }   
}
catch(exception $e){
    var_dump($e);
}
$resp=[];
if ($result){
    http_response_code(200);
    
}
else{
    http_response_code(400);
}

?>