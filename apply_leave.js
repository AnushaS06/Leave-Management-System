var leave_id;
var leaves_left = [];

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
    var x = document.getElementById("employee-details");
    var empp = JSON.parse(emp);
    var emp_id = empp.emp_id;
    var emp_name = empp.emp_fname;
    var emp_desig = empp.emp_desig;
    var emp_doj = empp.doj;
    
    var y = document.getElementById("button");
    y.innerHTML = ('<input type=button onClick="great(\''+ emp_id +'\')" id="apply_leave" value="APPLY LEAVE" >');
    y.innerHTML += ('<input type=button onClick="location.href=\'page2.html\'" id="back" value="BACK">');
    
    x.innerHTML = ('<div id="emp_id" width="30" height="30" > Employee ID: ' + emp_id + '</div>&nbsp;<div id="emp_name" width="30" height="30" > Employee Name: '+ emp_name + '</div>&nbsp;<div id="emp_designation" width="30" height="30" > Employee Designation: '+ emp_desig +' </div>&nbsp;<div id="emp_department" width="30" height="30" > Employee Date of Joining: ' + emp_doj + '</div>&nbsp;');    var id = empp.emp_id;
    x = document.getElementById("table");
    var r = x.insertRow(1);
    var r1 = r.insertCell(0);
    var r2 = r.insertCell(1);
    var r3 = r.insertCell(2);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "left_leave.php?id=" +id,true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText)              
                r1.innerHTML = data[0].days_available+"/12";                
                r2.innerHTML = data[1].days_available+"/10";               
                r3.innerHTML = data[2].days_available+"/30";
                leaves_left.push(data[0].days_available);
                leaves_left.push(data[1].days_available);
                leaves_left.push(data[2].days_available);
        }
        if(this.status == 400){
            r1.innerHTML = "Nil"      
            r2.innerHTML = "Nil"               
            r3.innerHTML = "Nil"
        }
    };

    var leave = document.getElementById("leave_select");
    leave.innerHTML = ('<input type="radio" name="leave" id="butn1" onClick="select_leave(1)">CL&#8195&#8195&#8195');
    leave.innerHTML += ('<input type="radio" name="leave" id="butn2" onClick="select_leave(2)">SL&#8195&#8195&#8195');
    leave.innerHTML += ('<input type="radio" name="leave" id="butn3" onClick="select_leave(3)">PL');

    var d,m,y,set_date;
    var date = new Date();
    console.log(date)
    d = date.getDate();
    console.log(d)
    m = date.getMonth()+1;
    console.log(m)
    y = date.getFullYear();

    if(m < 10)
        m = '0' + m.toString();
    if(d < 10)
        d = '0' + d.toString();
    set_date = (y+'-'+m+'-'+d);
    document.getElementsByName("trip1")[0].setAttribute('min', set_date);
    document.getElementsByName("trip2")[0].setAttribute('min', set_date);
    m = m + 3 < 12 ? m + 3 : (m == 10 ? m = 1 : (m == 11 ? m = 2 : m = 3)) 
    if(m < 4)
        m = '0' + m.toString();
        y = date.getFullYear()+1
    set_date = (y+'-'+m+'-'+d);
    document.getElementsByName("trip1")[0].setAttribute('max', set_date);
    document.getElementsByName("trip2")[0].setAttribute('max', set_date);
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

function select_leave(v){
    leave_id = v;
}

function great(e){
    var x=document.getElementById("start").value;
    var y2=document.getElementById("end").value;
    var z=document.getElementById("calender");
    x1 = new Date(x);
    console.log(x,y2,z,x1)
    y1 = new Date(y2);
    var diffDays = parseInt((y1 - x1) / (1000 * 60 * 60 * 24)); 
    if(diffDays < 1){
        alert("Invalid choice");
        window.location.href="apply_leave.html";
    }
    else if(diffDays > leaves_left[leave_id-1]){
        alert("Required No Of Leaves Not Available");
        window.location.href="apply_leave.html";
    }
    else{
    var d,m,y,set_date;
    var date = new Date();
    d = date.getDate();
    m = date.getMonth() < 12 ? date.getMonth() + 1 : 1
    y = date.getFullYear();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "apply_leave.php?id=" +e+"&no="+diffDays+"&fdate="+x.toString()+"&tdate="+y2.toString()+"&udate="+(y+"-"+m+"-"+d).toString()+"&type="+leave_id+"&status=APPLIED",true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200){
            window.location.href="page2.html";
         }
         else if(this.readyState == 4){
             alert("Please Validate the details");
             window.location.href="apply_leave.html";
         }
      };
    }
}

