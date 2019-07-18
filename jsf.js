class User 
{
  constructor(id,phone, email,password) 
  	{
  	this.id = id;
    this.phone = phone;
    this.email = email;
    this.password = password;
	}
	getname() 
	{
    alert(this.name);
  	}
}
var arrUser = [];
var k = 0;


function clear_table(){	
	for(var i = document.getElementById("tab").rows.length; i > 0;i--)
		{
		document.getElementById("tab").deleteRow(i -1);
		}
}
function check_user(){
	 for(var j = 0; j < arrUser.length; j++){
	 	for(var l = 0; l <arrUser.length; l++){
			if((j != l) && (arrUser[j].id == arrUser[l].id)){
				return 0;
		}
	}
}
}
function delete_user(user_id){
	for(var j = 0; j < arrUser.length; j++){		
		if(arrUser[j].id == user_id){
			arrUser.splice(j, 1);
			var table = document.getElementById("tab");
			table.deleteRow(user_id);
			print_table();
		}
		
	}
}
function valid_phone(number,id) {
	var phone = number;
	var re = /^\d[\d]{10,10}\d$/;
	var valid = re.test(phone);
	if (valid) {
		if (id == "phone") {
			document.getElementById("label-phone").innerText = "";
		} else {
			document.getElementById("label-p").innerText = "";
		}
		return true;
	} else {
		if (id == "phone") {
			document.getElementById("label-phone").innerText = "Format is uncorrected";
			document.getElementById("label-phone").style.color = "red";
		} else {
			document.getElementById("label-p").innerText = "Format is uncorrected";
			document.getElementById("label-p").style.color = "red";
			return false;
		}
	}
}
function valid_email(mail,id){
	var email = mail;
	var re = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
	var valid = re.test(email);
	if(valid){
		if(id =="email") {
			document.getElementById("label-email").innerText = "";
		}else{
			document.getElementById("label-e").innerText = "";
		}
		return true;
	}else {
		if(id =="email") {
			document.getElementById("label-email").innerText = "E-mail is uncorrected";
			document.getElementById("label-email").style.color = "red";
		}else{
			document.getElementById("label-e").innerText = "E-mail is uncorrected";
			document.getElementById("label-e").style.color = "red";
		}
		return false;
	}
}
function valid_password(password,id) {
	var pas = password;
	var re = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	var valid = re.test(pas);
	if(valid){
		if(id == "password") {
			document.getElementById("label-password").innerText = "";
		}else{
			document.getElementById("label-pas").innerText = "";
		}
		return true;
	}else {
		if(id == "password") {
			document.getElementById("label-password").style.color = "red";
			document.getElementById("label-password").innerText = "Password is uncorrected";
		}else{
			document.getElementById("label-pas").style.color = "red";
			document.getElementById("label-pas").innerText = "Password is uncorrected";
		}
		return false;
	}
}


function add_user()
{
	if((valid_phone(document.getElementById("phone").value) == false)
		|| (valid_email(document.getElementById("email").value) == false)
		||(valid_password(document.getElementById("password").value) == false)){
		alert("Uncorrected data");
	}
	else {
		if (check_user() == 0) {
			alert("Such user is exist");
		} else {

			var user = new User(++k, document.getElementById("phone").value, document.getElementById("email").value,
				document.getElementById("password").value);
			arrUser.push(user);
			print_table();
			document.getElementById("phone").value = "";
			document.getElementById("email").value = "";
			document.getElementById("password").value = "";
		}
	}
}

function print_table(){
	if(document.getElementById("tab") != null){
		clear_table();
		var tbl = document.getElementById("tab");
		}else{
			var tbl = document.createElement("table");
			tbl.id = "tab";
		}
	var body = document.getElementsByTagName("body")[0];
	var tblBody = document.createElement("tbody");

	var row = document.createElement("tr");
	var cell_id = document.createElement("td");
	var cell = document.createElement("td");
	var cell1 = document.createElement("td");
	var cell2 = document.createElement("td");
	var cell_idText = document.createTextNode("ID");
	var cellText = document.createTextNode("Number");
	var cell1Text = document.createTextNode("E-mail");
	var cell2Text = document.createTextNode("Password");
	cell_id.appendChild(cell_idText);
	cell.appendChild(cellText);
	cell1.appendChild(cell1Text);
	cell2.appendChild(cell2Text);
	row.appendChild(cell_id);
	row.appendChild(cell);
	row.appendChild(cell1);
	row.appendChild(cell2);
	tblBody.appendChild(row);
	    	for (var i = 0; i < arrUser.length; i++) {
	    		var row = document.createElement("tr");
	    		var cell_id = document.createElement("td");
		      	var cell = document.createElement("td");
		      	var cell1 = document.createElement("td");
		      	var cell2 = document.createElement("td");
		      	var cell_idText = document.createTextNode(arrUser[i].id);
		      	var cellText = document.createTextNode(arrUser[i].phone);
		      	var cell1Text = document.createTextNode(arrUser[i].email);
		      	var cell2Text = document.createTextNode(arrUser[i].password);
		      	cell_id.appendChild(cell_idText);
		      	cell.appendChild(cellText);
		      	cell1.appendChild(cell1Text);
		      	cell2.appendChild(cell2Text);
		      	row.appendChild(cell_id);
		      	row.appendChild(cell);
		      	row.appendChild(cell1);
		      	row.appendChild(cell2);
		      	var button = document.createElement("button");
		      	button.id = arrUser[i].id;
		      	button.innerHTML = "Edit";
		      	button.addEventListener ("click", function() {	      		
		      		edit(this.id);
				});
		      	row.appendChild(button);
		      	var button =  document.createElement("button");
		      	button.id = arrUser[i].id;
		      	button.innerHTML = "Delete";
		      	button.addEventListener ("click", function() {	      		
		      		delete_user(this.id);
				});
		      	row.appendChild(button);	      	
		      	tblBody.appendChild(row);
	    	}
	    	var bl = document.getElementById("main");

		  tbl.appendChild(tblBody);
		  bl.appendChild(tbl);
		  body.appendChild(tbl);
		  tbl.setAttribute("border", "1");
}

function edit(user_id) {

	var modal = document.getElementById("modal");
	var btn = document.getElementById(user_id);
	var span = document.getElementsByClassName("close")[0];
	for(var i = 0; i < arrUser.length; i++){
		if(user_id == arrUser[i].id){
			document.getElementById("p").value = arrUser[i].phone;
			document.getElementById("e").value = arrUser[i].email;
			document.getElementById("pas").value = arrUser[i].password;
		}
	}
	var btn_save = document.getElementById("save-button");

	btn_save.onclick = function(){
		if((valid_phone(document.getElementById("p").value,"p") == false)
			|| (valid_email(document.getElementById("e").value,"e") == false)
			||(valid_password(document.getElementById("pas").value,"pas") == false)){
			alert("Uncorrected data");
		}
		else {
			for (var i = 0; arrUser.length; i++) {
				if (user_id == arrUser[i].id) {
					alert(arrUser[i].phone);
					arrUser[i].phone = document.getElementById("p").value;
					arrUser[i].email = document.getElementById("e").value;
					arrUser[i].password = document.getElementById("pas").value;
				}
			}
		}
		modal.style.display = "none";
		print_table();
	}

	btn.onclick = function() {
		modal.style.display = "block";
	}
	span.onclick = function() {
		modal.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}