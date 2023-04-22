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
   listCleaningRecords();
   listUsers();

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

   roomSelected();
}

function roomVS() {
   //document.getElementById("chk_multi").checked = false
   //document.getElementById("chk_multi").setAttribute("name", "uncheck");
   document.getElementById("chk_container").style.display = "block";
   const fs = require('fs');
   document.getElementById('cont_VS').innerHTML = '';
   var node = document.createElement('div');
   var roomsObj = JSON.parse(fs.readFileSync('../AVG/masterdata/Rooms.JSON', 'utf8'));
   var roomsObjFiltered = roomsObj.filter(obj => obj.BlockID == document.getElementById('catSel1').value);
   if (this.selectedIndex < 1) return;
   console.log(roomsObjFiltered);
   for (var room in roomsObjFiltered) {

      console.log(roomsObjFiltered[room].RoomName);
      node = document.createElement('div');
      //node.innerHTML = '<label id="lbl' + i + '"class="clean" onclick="updatestat(document.getElementById(lbl' + i + '))">'+ rooms[i] +'</label>'; 
      //node.innerHTML = '<label id="lbl' + room + '"class="clean" onclick="updatestat(this)")">' + roomsObjFiltered[room].RoomName + '</label>';
      node.innerHTML = '<input type="checkbox" class="chk_hide" onclick="checkSin(this)" name="check" id="chk_' + roomsObjFiltered[room].RoomName + '" value="'+ roomsObjFiltered[room].RoomName +'"><label id="lbl_' + roomsObjFiltered[room].RoomName + '"class="clean" onclick="updatestat(this)")">' + roomsObjFiltered[room].RoomName + '</label>';
      //node.innerHTML = '<label id="lbl' + i + '"class="clean")">'+ rooms[i] +'</label>'; 
      document.getElementById('cont_VS').appendChild(node);
      console.log(node);
   }


}

function roomSelected() {
   var x = document.getElementById("roomSel").value;
   if (x != null)
      document.getElementById("mod_viewdetails").style.display = "block";
   else
      document.getElementById("mod_viewdetails").style.display = "none";

   document.getElementById("mod_viewStatus").style.display = "none";
   document.getElementById("mod_Request").style.display = "none";

   listCleaningRecords();
}

function initrequest() {
   document.getElementById("mod_Request").style.display = "none";
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

   var app = require('electron').remote;
   var fs = require('fs');
   var srcpath = path.resolve(__dirname, '../AVG/masterdata/RoomsCleanTransCopy.JSON');
   var txt = fs.readFileSync(srcpath, 'utf8');
   var additional = JSON.parse(txt);
   console.log(additional);
   additional.forEach(element => {
      if (element.RoomName == 210)
         if (element.CleanTranID == 5) {
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

function updateJSON(data) {
   const path = require('path');
   var fs = require('fs');
   var element = JSON.stringify(data);
   var srcpath = path.resolve(__dirname, '../AVG/masterdata/RoomsCleanTransCopy.JSON');
   fs.writeFileSync(srcpath, element);
}

function updatestat(lblid) {
   if (lblid != 'cont_VS') {
      var labelid = lblid.id;
      var label = labelid.slice(0, lblid.id.length)
      document.getElementById(label).setAttribute("class", "cleaninprogress");
      console.log(lblid);
      console.log(label);
      return;
   }
}

function listUsers() {

   const fs = require('fs');
   var peopleObject = JSON.parse(fs.readFileSync('../AVG/masterdata/People.JSON', 'utf8'));

   var requesterObj = document.getElementById("requestor"),
      assigneeObj = document.getElementById("assignee");

   for (var person in peopleObject) {
      var personName = peopleObject[person].DisplayName;
      var personID = peopleObject[person].PeopleID;

      requesterObj.options[person] = new Option(person, person);

      requesterObj.options[person].text = personName;
      requesterObj.options[person].value = personID;

      assigneeObj.options[person] = new Option(person, person);

      assigneeObj.options[person].text = personName;
      assigneeObj.options[person].value = personID;

   }
}

function listCleaningRecords() {
   
   document.getElementById("mod_viewdetails").style.display = "block";
   var roomCleanRectbl = document.getElementById("tbl_viewdetails");

   var roomSelID = document.getElementById("roomSel").value;
   const fs = require('fs');
   var roomCleanRecordsObj = JSON.parse(fs.readFileSync('../AVG/masterdata/RoomsCleanTrans.JSON', 'utf8'));
   var roomsCleanTranFiltered = roomCleanRecordsObj.filter(obj => obj.RoomID == roomSelID);
   
   if (roomsCleanTranFiltered == [] || roomsCleanTranFiltered == null)
      return;

  // var rowCount = roomsCleanTranFiltered.length; // Only past 5 cleaning records will  be stored and shown for initial version
   var cellCount = 4;
   
   roomCleanRectbl.innerHTML = "";
   var header = roomCleanRectbl.createTHead();
   var headrow = header.insertRow(0); 
   var headcell1 = headrow.insertCell(0);
   headcell1.innerHTML = '<th id="vd_th">Nos. </th >';
   var headcell2 = headrow.insertCell(1);
   headcell2.innerHTML = '<th id="vd_th">Requested by</th>';
   var headcell3 = headrow.insertCell(2);
   headcell3.innerHTML = '<th id="vd_th">Room Last cleaned on </th>';
   var headcell4 = headrow.insertCell(3);
   headcell4.innerHTML = '<th id="vd_th">Assigned To </th></tr >';

   for (var cleanRec in roomsCleanTranFiltered) {
      var row = roomCleanRectbl.insertRow(Number(cleanRec)+1);
      for (var i = 0; i < cellCount; i++) {
         var cell = row.insertCell(i);
         switch (i) {

            case 0:
               cell.innerHTML = Number(cleanRec) + 1 ;
               break;

            case 1:
               cell.innerHTML = roomsCleanTranFiltered[cleanRec].RequestedBy;
               break;

            case 2:
               cell.innerHTML = roomsCleanTranFiltered[cleanRec].Date;
               break;

            case 3:
               cell.innerHTML = roomsCleanTranFiltered[cleanRec].CleanedBy;
               break;
         }

      }
   }

}

function checkAll(chk) {
   //console.log(chk);
var chk_box = document.getElementsByTagName("input");
for(var x=0;x<chk_box.length;x++) {
   var obj = chk_box[x];
   if(obj.type=="checkbox"){
      //console.log(obj.type);
      if(obj.name=="check"){
         obj.checked =true;
         //console.log(chk.checked);
         //console.log("checked");
         document.getElementById(obj.id).setAttribute("name", "uncheck");
         //document.getElementById('chk_single').disabled = true;
         document.getElementById(obj.id).disabled = true;
      }
      else if(obj.name=="uncheck"){
         obj.checked =false;
         //console.log("unchecked");
         document.getElementById(obj.id).setAttribute("name", "check");
         //document.getElementById('chk_single').disabled = false;
         document.getElementById(obj.id).disabled = false;
      }
   }
}

}

/*function clean(lblid) {
   if (lblid != 'cont_VS') {
      var labelid = lblid.id;
      var label = labelid.slice(0, lblid.id.length)
      document.getElementById(label).setAttribute("class", "cleaninprogress");
      return;
   }

}*/
function getSelectedChk() {
   var chk_box = document.getElementsByTagName("input");
   var selected = new Array();
   for(var x=0;x<chk_box.length;x++) {
      var obj = chk_box[x];
      if(obj.type=="checkbox"){
         //console.log(obj.type);
         if(obj.name=="uncheck"){
            selected[x-1] = obj.value;
            //console.log(obj.value);
         }
      } 
   }
   return(selected);
}

function inProgress() {
   document.getElementById("btn_inpro").classList.add("active");
   document.getElementById("btn_clean").classList.remove("active");
   document.getElementById("btn_initiate").classList.remove("active");
   document.getElementById("mod_Request").style.display = "none";
   var selected = new Array()
   selected = getSelectedChk();
   //console.log(selected);
   for(var x=0;x<selected.length;x++){
      //document.getElementById(label).setAttribute("class", "cleaninprogress");
      document.getElementById("lbl_" + selected[x]).classList.remove("notclean");
      document.getElementById("lbl_" + selected[x]).classList.add("cleaninprogress");
      document.getElementById("lbl_" + selected[x]).classList.remove("clean");
   }
}

function initateClean() {
   document.getElementById("btn_initiate").classList.add("active");
   document.getElementById("btn_inpro").classList.remove("active");
   document.getElementById("btn_clean").classList.remove("active");
   document.getElementById("mod_Request").style.display = "block";
   var selected = new Array()
   selected = getSelectedChk();
   for(var x=0;x<selected.length;x++){
      //document.getElementById(label).setAttribute("class", "cleaninprogress");
      document.getElementById("lbl_" + selected[x]).classList.remove("clean");
      document.getElementById("lbl_" + selected[x]).classList.remove("cleaninprogress");
      document.getElementById("lbl_" + selected[x]).classList.add("notclean");
   }
}

function clean() {
   document.getElementById("btn_clean").classList.add("active");
   document.getElementById("btn_inpro").classList.remove("active");
   document.getElementById("btn_initiate").classList.remove("active");
   document.getElementById("mod_Request").style.display = "none";
   var selected = new Array()
   selected = getSelectedChk();
   for(var x=0;x<selected.length;x++){
      document.getElementById("lbl_" + selected[x]).classList.remove("notclean");
      document.getElementById("lbl_" + selected[x]).classList.remove("cleaninprogress");
      document.getElementById("lbl_" + selected[x]).classList.add("clean");
   }
}

function checkSin(chk) {
   if(chk.name == "check"){
      document.getElementById(chk.id).setAttribute("name","uncheck");
   }
   else if(chk.name == "uncheck"){
      document.getElementById(chk.id).setAttribute("name","check");
   }
}