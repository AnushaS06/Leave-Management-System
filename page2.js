window.onload = function(){
    var x = document.getElementById("employee-details");
    var emp = document.cookie;
    if(document.cookie == "null"){
        cookies = emp.split(",");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf(":");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : "null";
            document.cookie = name;
        }
        window.location.href = "login.html";
    }

    var add_on = document.getElementById("add-ons");
    add_on.innerHTML = ('<input type=button onClick="logout()" id="logout" value="LOG OUT">');
    var empp = JSON.parse(emp);
    var emp_id = empp.emp_id;
    var emp_name = empp.emp_fname;
    var emp_desig = empp.emp_desig;
    var emp_doj = empp.doj;
    x.innerHTML = ('<div id="emp_id" width="30" height="30" > Employee ID: ' + emp_id + '</div>&nbsp;<div id="emp_name" width="30" height="30" > Employee Name: '+ emp_name + '</div>&nbsp;<div id="emp_designation" width="30" height="30" > Employee Designation: '+ emp_desig +' </div>&nbsp;<div id="emp_department" width="30" height="30" > Employee Date of Joining: ' + emp_doj + '</div>&nbsp;');
    var y = document.getElementById("buttons")
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        console.log(this.responseText)
        if(this.responseText == "YES"){
            y.innerHTML = ('<input type=button onClick="location.href=\'manage_leave.html\'" id="manage_leave" value="MANAGE LEAVE">');
            y.innerHTML += ('<input type=button onClick="location.href=\'apply_leave.html\'" id="apply_leave" value="APPLY LEAVE">');
            y.innerHTML += ('<input type=button onClick="location.href=\'view_leave.html\'" id="view_leave" value="VIEW LEAVE">');
        }
        else{
            console.log(1)
            y.innerHTML = ('<input type=button onClick="location.href=\'apply_leave.html\'" id="apply_leave" value="APPLY LEAVE">');
            y.innerHTML += ('<input type=button onClick="location.href=\'view_leave.html\'" id="view_leave" value="VIEW LEAVE">')
        }    
    };
    xmlhttp.open("GET", "page2.php?id=" + emp_id,true);
    xmlhttp.send();
}

function logout(){
    var cookies = document.cookie.split (",");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf(":");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : "null";
        document.cookie = name;
    }
    window.location.href = "login.html";
}