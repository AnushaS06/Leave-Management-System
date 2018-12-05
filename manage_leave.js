 var arr = [];
 var sl_no = [];
 var no_of_days = [];
 window.onload=function(){
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
   var y = document.getElementById("buttons");
   y.innerHTML = ('<input type=button onClick="submit()" id="submit" value="SUBMIT">'); 
   y.innerHTML += ('<input type=button onClick="location.href=\'page2.html\'" id="back" value="BACK">');
   var empp = JSON.parse(emp)
   var emp_id = empp.emp_id;
   var x = document.getElementById("employee-details");
   var emp_name = empp.emp_fname;
   var emp_desig = empp.emp_desig;
   var emp_doj = empp.doj;
   x.innerHTML = ('<div id="emp_id" width="30" height="30" > Employee ID: ' + emp_id + '</div>&nbsp;<div id="emp_name" width="30" height="30" > Employee Name: '+ emp_name + '</div>&nbsp;<div id="emp_designation" width="30" height="30" > Employee Designation: '+ emp_desig +' </div>&nbsp;<div id="emp_department" width="30" height="30" > Employee Date of Joining: ' + emp_doj + '</div>&nbsp;');
   x = document.getElementById("table");
   var xmlhttp = new XMLHttpRequest();
   
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
           var r8 = r.insertCell(7);
           r8.innerHTML = "Nil";
           var r9 = r.insertCell(8);
           r9.innerHTML = "Nil";
           var r10 = r.insertCell(9);
           r10.innerHTML = "Nil";
         }
        else{
          var det = JSON.parse(this.responseText);
          for(var i=0;i<det.length+1;i++){
            arr.push(0);
            sl_no.push(0);
            no_of_days.push(0);
          }
          x = document.getElementById("table")
          for (var i=0;i<det.length;i++) {
            var r = x.insertRow(i+1);
            var r1 = r.insertCell(0);
            r1.innerHTML = i+1;
            var r2 = r.insertCell(1);
            r2.innerHTML = det[i].emp_fname;
            var r3 = r.insertCell(2);
            r3.innerHTML = det[i].emp_lname;
            var r4 = r.insertCell(3);
            r4.innerHTML = det[i].type;
            var r5 = r.insertCell(4);
            r5.innerHTML = det[i].no_of_days;
            var r6 = r.insertCell(5);
            var q = det[i].updated_date.split("-");
            r6.innerHTML = q[2]+"-"+q[1]+"-"+q[0];
            var r7 = r.insertCell(6)
            q = det[i].from_date.split("-");
            r7.innerHTML = q[2]+"-"+q[1]+"-"+q[0];
            var r8 = r.insertCell(7)
            q = det[i].to_date.split("-");
            r8.innerHTML = q[2]+"-"+q[1]+"-"+q[0];
            var r9 = r.insertCell(8)
            r9.innerHTML = '<input type="radio" onClick="accept_or_reject_leave('+(i+1)+', this.value,'+det[i].leave_applied_id+', '+det[i].no_of_days+')" name = '+(i+1)+' value="accept" id='+ det[i].emp_id +'>  '
            var r10 = r.insertCell(9)
            r10.innerHTML = '<input type="radio" onClick="accept_or_reject_leave('+(i+1)+', this.value,'+det[i].leave_applied_id+', '+det[i].no_of_days+')" name = '+(i+1)+' value="reject" id='+ det[i].emp_id +'>  '
        }
      }}
  };
   xmlhttp.open("GET", "manage_leave.php?id=" +emp_id,true);
   xmlhttp.send();    
 
}

function accept_or_reject_leave(sl, value, date, days){
    var name = document.getElementsByName(sl);
    arr[sl] = value;
    sl_no[sl] = date;
    no_of_days[sl] = days;
 }
function submit(){
   for(var i=1;i<arr.length;i++){
     var data = document.getElementsByName(i);
     if(arr[i] == "accept")
       update_leave(data[0].id, sl_no[i], "ACCEPTED", no_of_days[i]);
     else if(arr[i] == "reject")
       update_leave(data[0].id, sl_no[i], "REJECTED", no_of_days[i]);
   }
 }

 function update_leave(emp_id, sl_no, state, days){
   var date = new Date();
   var d = date.getDate()+1;
   var m = date.getMonth() < 12 ? date.getMonth() + 1 : 1
   var y = date.getFullYear();
   var xmlhttp = new XMLHttpRequest(); 
   xmlhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200){
           window.location.href="page2.html"
         }
     }
 
   xmlhttp.open("GET", "update_leave.php?id=" + emp_id + "&applied_id=" + sl_no +"&status="+ state + "&udate=" + (y+"-"+m+"-"+d).toString() +"&no_of_days=" +days,true);
   xmlhttp.send();
   console.log("inside update");
   if (xmlhttp.readyState == 4 && xmlhttp.status == 200){ 
     console.log("123");
     window.location.href="page2.html";
   }
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