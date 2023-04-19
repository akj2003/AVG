
window.onload = function () {
   const fs = require('fs');
   var catObject = JSON.parse(fs.readFileSync('../AVG/masterdata/Block.JSON', 'utf8'));



   var catSel = document.getElementById("catSel"),
      catSel1 = document.getElementById("catSel1");

   for (var cat in catObject) {
      catSel.options[cat] = new Option(cat, cat);
      catSel.options[cat].text = catObject[cat].BlockName;
      catSel.options[cat].value = catObject[cat].BlockID;

      catSel1.options[cat] = new Option(cat, cat);
      catSel1.options[cat].text = catObject[cat].BlockName;
      catSel1.options[cat].value = catObject[cat].BlockID;
   }

   listRooms();

   document.getElementById("mod_viewdetails").style.display = "none";
   document.getElementById("mod_Request").style.display = "none";
   document.getElementById("mod_viewStatus").style.display = "none";
}

function listRooms() {
   const fs = require('fs');
   var blockSelected = document.getElementById("catSel").value;
   document.getElementById("roomSel").innerText = null;
   var roomSel = document.getElementById("roomSel");

   var roomsObj = JSON.parse(fs.readFileSync('../AVG/masterdata/Rooms.JSON', 'utf8'));
   var roomsObjFiltered = roomsObj.filter(obj => obj.BlockID == blockSelected);


   for (var room in roomsObjFiltered) {
      roomSel.options[room] = new Option(room, room);
      roomSel.options[room].text = roomsObjFiltered[room].RoomName;
      roomSel.options[room].value = roomsObjFiltered[room].RoomID;
   }

   /* roomSel.length = 1;
    if (this.selectedIndex < 1) return;
    var rooms = catObject[catSel.value];
    for (var i = 0; i < rooms.length; i++) {
       roomSel.options[roomSel.options.length] = new Option(rooms[i], rooms[i])
       roomSel.options.value = rooms[i];
    }
    roomsel();
    */
}

 function roomVS() {
   const fs = require('fs');
   document.getElementById('cont_VS').innerHTML = '';
   var node = document.createElement('div');
   var roomsObj = JSON.parse(fs.readFileSync('../AVG/masterdata/Rooms.JSON', 'utf8'));
   var roomsObjFiltered = roomsObj.filter(obj => obj.BlockID == document.getElementById('catSel1').value);
   if (this.selectedIndex < 1) return;
   console.log(roomsObjFiltered);
   for (var room in roomsObjFiltered) {
      //roomSel.options[room] = new Option(room, room);
      //roomSel.options[room].text = roomsObjFiltered[room].RoomName;
      //roomSel.options[room].value = roomsObjFiltered[room].RoomID;
      console.log(roomsObjFiltered[room].RoomName);
      node = document.createElement('div');
       //node.innerHTML = '<label id="lbl' + i + '"class="clean" onclick="updatestat(document.getElementById(lbl' + i + '))">'+ rooms[i] +'</label>'; 
       node.innerHTML = '<label id="lbl' + room + '"class="clean" onclick="updatestat(this)")">'+ roomsObjFiltered[room].RoomName +'</label>'; 
       //node.innerHTML = '<label id="lbl' + i + '"class="clean")">'+ rooms[i] +'</label>'; 
       document.getElementById('cont_VS').appendChild(node);
       //console.log(node);
   }
   
   //var rooms = catObject[catSel1.value];
   //var rooms = document.getElementById('catSel1').value;
   //console.log(rooms);
   
    
    //for (var i = 0; i < rooms.length; i++) {
       
    //}
 }

function roomsel() {
   var x = document.getElementById("roomSel").value;
   if (x != '')
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
            //fs.writeFile(srcpath,JSON.stringify(element, null, 2));
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
   if(lblid != 'cont_VS')
   {
      var labelid = lblid.id;
      var label = labelid.slice(0,lblid.id.length)
      document.getElementById(label).setAttribute("class", "cleaninprogress");
      return;
   }
}
