window.onload = function(){
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

    var add_ons = document.getElementById("add-ons");
    add_ons.innerHTML = ('<input type=button onClick="logout()" id="logout" value="LOG OUT">'); 

    var empp = JSON.parse(emp)
    var emp_id = empp.emp_id;
    var x = document.getElementById("employee-details");
    var emp_name = empp.emp_fname;
    var emp_desig = empp.emp_desig;
    var emp_doj = empp.doj;
    x.innerHTML = ('<div id="emp_id" width="30" height="30" > Employee ID: ' + emp_id + '</div>&nbsp;<div id="emp_name" width="30" height="30" > Employee Name: '+ emp_name + '</div>&nbsp;<div id="emp_designation" width="30" height="30" > Employee Designation: '+ emp_desig +' </div>&nbsp;<div id="emp_department" width="30" height="30" > Employee Date of Joining: ' + emp_doj + '</div>&nbsp;');
    var y = document.getElementById("buttons");
    y.innerHTML = ('<input type=button onClick="location.href=\'page2.html\'" id="back" value="BACK">');
    //console.log(1)
    
    var id = empp.emp_id;
    var x = document.getElementById("table");
    var r = x.insertRow(1);
    var r1 = r.insertCell(0);
    var r2 = r.insertCell(1);
    var r3 = r.insertCell(2);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText)              
                r1.innerHTML = data[0].days_available+"/12";               
                r2.innerHTML = data[1].days_available+"/10";               
                r3.innerHTML = data[2].days_available+"/30";                
        }
        if(this.status == 400){
            r1.innerHTML = "Nil"      
            r2.innerHTML = "Nil"               
            r3.innerHTML = "Nil"
        }
    };
    xmlhttp.open("GET", "left_leave.php?id=" +id,true);
    xmlhttp.send();

    x = document.getElementById("table2");
    var xmlhttp = new XMLHttpRequest();
    i=1;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        if(this.responseText == "No Records"){
            var r = x.insertRow(i);
            var r1 = r.insertCell(0);
            r1.innerHTML = "Nil";
            var r2 = r.insertCell(1);
            r2.innerHTML = "Nil";
            var r3 = r.insertCell(2);
            r3.innerHTML = "Nil";
            var r4 = r.insertCell(3);
            r4.innerHTML = "Nil";
            var r5 = r.insertCell(4);
            r5.innerHTML = "Nil";
            var r6 = r.insertCell(5);
            r6.innerHTML = "Nil";
            var r7 = r.insertCell(6);
            r7.innerHTML = "Nil";
            
            
        }
        else{
          var det = JSON.parse(this.responseText);
          console.log(det)
          x = document.getElementById("table2");
          for (var i=0;i<det.length;i++) {
            var r = x.insertRow(i+1);
            var r1 = r.insertCell(0);
            r1.innerHTML = i+1;
            var r2 = r.insertCell(1);
            r2.innerHTML = det[i].type.toUpperCase();
            var r3 = r.insertCell(2);
            r3.innerHTML = det[i].no_of_days;
            var r4 = r.insertCell(3);
            r4.innerHTML = det[i].updated_date;
            var r5 = r.insertCell(4);
            r5.innerHTML = det[i].from_date;
            var r6 = r.insertCell(5);
            r6.innerHTML = det[i].to_date;
            var r7 = r.insertCell(6);
            r7.innerHTML = det[i].status;
            
            }
        }

    }

  };
  xmlhttp.open("GET", "view_leave.php?id=" +emp_id,true);
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