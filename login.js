window.onload = function(){
    console.log(document.cookie)
    var cookies = document.cookie.split (",");
    console.log(document.cookie)
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf(":");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : "null";
        document.cookie = name;
    }
    console.log(document.cookie)
    
    var y = document.getElementById("buttons");
    y.innerHTML = ('<input type="button" onclick="check(this.form)" value="LOGIN" id="login-button"/>');
}

function check(form){
    var uid=form.elements.userid.value;
    var pass=form.elements.pswrd.value;
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.cookie = this.responseText;
            var a=JSON.parse(document.cookie);
            console.log(a.emp_id);
            window.location.href = "page2.html";
        }
        if(this.status == 400){
            var x = document.getElementById("showError");
            x.innerHTML=" * Invalid UserID or Password";
        }
    };
    xmlhttp.open("GET", "login.php?u=" +uid + "&p="+pass,true);
    xmlhttp.send();
}