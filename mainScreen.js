import readFile from './util/readfile';
const catObject = {
    "Ganga": ["210", "211"],
    "Vyasa": ["301", "302", "303", "304", "305", "306", "307", "308", "309"],
    "Gautami": ["401", "402", "403"],
 }
 
 window.onload = function() {
    var catSel = document.getElementById("catSel"),
        roomSel = document.getElementById("roomSel"),
        catSel1 = document.getElementById("catSel1");
        
    for (var cat in catObject) {
       catSel1.options[catSel1.options.length] = new Option(cat, cat);
       catSel1.options.value =cat;
    }
    for (var cat in catObject) {
       catSel.options[catSel.options.length] = new Option(cat, cat);
       catSel.options.value = cat;
    }
    document.getElementById("mod_viewdetails").style.display = "none";
    document.getElementById("mod_Request").style.display = "none";
    document.getElementById("mod_viewStatus").style.display = "none";
 }
 
 function room() {
   var roomSel = document.getElementById("roomSel");
    roomSel.length = 1;
    if (this.selectedIndex < 1) return;
    var rooms = catObject[catSel.value];
    for (var i = 0; i < rooms.length; i++) {
       roomSel.options[roomSel.options.length] = new Option(rooms[i], rooms[i])
       roomSel.options.value = rooms[i];
    }
    roomsel();
 }

 function roomVS() {
   document.getElementById('cont_VS').innerHTML = '';
   var rooms = catObject[catSel1.value];
   var node = document.createElement('div');
    if (this.selectedIndex < 1) return;
    for (var i = 0; i < rooms.length; i++) {
       node = document.createElement('div');
       //node.innerHTML = '<label id="lbl' + i + '"class="clean" onclick="updatestat(document.getElementById(lbl' + i + '))">'+ rooms[i] +'</label>'; 
       node.innerHTML = '<label id="lbl' + i + '"class="clean" onclick="updatestat(this)")">'+ rooms[i] +'</label>'; 
       //node.innerHTML = '<label id="lbl' + i + '"class="clean")">'+ rooms[i] +'</label>'; 
       document.getElementById('cont_VS').appendChild(node);
       console.log(node);
    }
 }

function roomsel() {
   var x = document.getElementById("roomSel").value;
   if(x!='')
      document.getElementById("mod_viewdetails").style.display = "block";
   else
      document.getElementById("mod_viewdetails").style.display = "none";
      document.getElementById("mod_viewStatus").style.display = "none";
      document.getElementById("mod_Request").style.display = "none";
}

function initrequest() {
   document.getElementById("mod_Request").style.display = "block";
   document.getElementById("mod_viewStatus").style.display = "none";
   document.getElementById("home").style.display = "none";
   document.getElementById("mod_viewdetails").style.display = "none";
   document.getElementById("id_nav_IR").classList.add("active");
   if (document.getElementById('id_nav_home').classList.contains('active'))
      document.getElementById('id_nav_home').classList.remove("active")
   if (document.getElementById('id_nav_VS').classList.contains('active'))
      document.getElementById('id_nav_VS').classList.remove("active")
}

function viewstat() {
   document.getElementById("mod_Request").style.display = "none";
   document.getElementById("mod_viewStatus").style.display = "block";
   document.getElementById("home").style.display = "none";
   document.getElementById("mod_viewdetails").style.display = "none"; 
   document.getElementById("id_nav_VS").classList.add("active"); 
   if (document.getElementById('id_nav_IR').classList.contains('active'))
      document.getElementById('id_nav_IR').classList.remove("active")
   if (document.getElementById('id_nav_home').classList.contains('active'))
      document.getElementById('id_nav_home').classList.remove("active")
}

function home() {
   document.getElementById("mod_Request").style.display = "none";
   document.getElementById("mod_viewStatus").style.display = "none";
   document.getElementById("home").style.display = "block";
   document.getElementById("mod_viewdetails").style.display = "none";
   document.getElementById("roomSel").selectedIndex = 0
   document.getElementById("catSel").selectedIndex = 0
   document.getElementById("id_nav_home").classList.add("active");
   if (document.getElementById('id_nav_IR').classList.contains('active'))
      document.getElementById('id_nav_IR').classList.remove("active")
   if (document.getElementById('id_nav_VS').classList.contains('active'))
      document.getElementById('id_nav_VS').classList.remove("active")
}

function submitrequest() {
   console.log("Request has been submitted");
   const path = require('path');
   //home();
   //document.getElementById("id_nav_home").classList.add("active");
   //if (document.getElementById('id_nav_IR').classList.contains('active'))
   //   document.getElementById('id_nav_IR').classList.remove("active")
   //if (document.getElementById('id_nav_VS').classList.contains('active'))
   //   document.getElementById('id_nav_VS').classList.remove("active")

   var app = require('electron').remote;
   var fs = require('fs');
   var srcpath = path.resolve(__dirname, '../AVG/masterdata/RoomsCleanTransCopy.JSON');
   var txt = fs.readFileSync(srcpath, 'utf8');
   var additional = JSON.parse(txt);
   console.log(additional);
   additional.forEach(element => {
      if(element.RoomName == 210)
         if(element.CleanTranID == 5) {
            console.log(element);
            //updateJSON(element);
            element.CleanedBy = "Aswin";
            fs.writeFile(srcpath,JSON.stringify(element, null, 2));
            console.log(element);
         }
   });
   //var parsed = additional[0]["RoomName"];
   //console.log(parsed);
}

function updateJSON(data){
   const path = require('path');
   var fs = require('fs');
   var element = JSON.stringify(data);
   var srcpath = path.resolve(__dirname, '../AVG/masterdata/RoomsCleanTransCopy.JSON');
   fs.writeFileSync(srcpath, element);
}

function updatestat(lblid) {
   //console.log(lblid);
   //console.log(lblid.id);
   //var labelid = lblid.id;
   var label = labelid.slice(0,lblid.id.length)
   //console.log(label);
   document.getElementById(label).setAttribute("class", "cleaninprogress");
}
