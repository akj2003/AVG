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
   //console.log(roomsObjFiltered);
   for (var room in roomsObjFiltered) {
      //console.log(roomsObjFiltered[room].RoomName);
      node = document.createElement('div');
      //node.innerHTML = '<label id="lbl' + i + '"class="clean" onclick="updatestat(document.getElementById(lbl' + i + '))">'+ rooms[i] +'</label>'; 
      //node.innerHTML = '<label id="lbl' + room + '"class="clean" onclick="updatestat(this)")">' + roomsObjFiltered[room].RoomName + '</label>';
      node.innerHTML = '<input type="checkbox" class="chk_hide" onclick="checkSin(this)" name="check" id="chk_' + roomsObjFiltered[room].RoomID + '" value="' + roomsObjFiltered[room].RoomName + '"><label id="lbl_' + roomsObjFiltered[room].RoomName + '"class="clean" onclick="updatestat(this)")">' + roomsObjFiltered[room].RoomName + '</label>';
      //node.innerHTML = '<label id="lbl' + i + '"class="clean")">'+ rooms[i] +'</label>'; 
      document.getElementById('cont_VS').appendChild(node);
      //console.log(node);
   }

   getroomstatus();
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
   if (document.getElementById('id_nav_home').classList.contains('active'))
      document.getElementById('id_nav_home').classList.remove("active")
   
   roomVS();
}

function home() {
   document.getElementById("mod_Request").style.display = "none";
   document.getElementById("mod_viewStatus").style.display = "none";
   document.getElementById("home").style.display = "block";
   document.getElementById("mod_viewdetails").style.display = "none";
   document.getElementById("roomSel").selectedIndex = 0
   document.getElementById("catSel").selectedIndex = 0
   document.getElementById("id_nav_home").classList.add("active");
   if (document.getElementById('id_nav_VS').classList.contains('active'))
      document.getElementById('id_nav_VS').classList.remove("active")
}




function listUsers() {

   const fs = require('fs');
   var peopleObject = JSON.parse(fs.readFileSync('../AVG/masterdata/People.JSON', 'utf8'));

   var requesterObj = document.getElementById("requestor"),
      assigneeObj = document.getElementById("assignee");

   let counter = 0;
   let count = 0;

   for (var admin in peopleObject) {
      var personName = peopleObject[admin].DisplayName;
      var personID = peopleObject[admin].PeopleID;
      if (peopleObject[admin].Role == "Admin") {
         requesterObj.options[count] = new Option(admin, admin);
         requesterObj.options[count].text = personName;
         requesterObj.options[count].value = personName;
         requesterObj.options[count].id = personID
         count++;
      }
   }

   for (var staff in peopleObject) {
      var staffName = peopleObject[staff].DisplayName;
      var staffID = peopleObject[staff].PeopleID;
      if (peopleObject[staff].Role == "Staff") {
         assigneeObj.options[counter] = new Option(staff, staff);
         assigneeObj.options[counter].text = staffName;
         assigneeObj.options[counter].value = staffName;
         assigneeObj.options[counter].id = staffID;
         counter++;
      }
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
      var row = roomCleanRectbl.insertRow(Number(cleanRec) + 1);
      for (var i = 0; i < cellCount; i++) {
         var cell = row.insertCell(i);
         switch (i) {

            case 0:
               cell.innerHTML = Number(cleanRec) + 1;
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
   for (var x = 0; x < chk_box.length; x++) {
      var obj = chk_box[x];
      if (obj.type == "checkbox") {
         //console.log(obj.type);
         if (obj.name == "check") {
            obj.checked = true;
            //console.log(chk.checked);
            //console.log("checked");
            document.getElementById(obj.id).setAttribute("name", "uncheck");
            //document.getElementById('chk_single').disabled = true;
            document.getElementById(obj.id).disabled = true;
         }
         else if (obj.name == "uncheck") {
            obj.checked = false;
            //console.log("unchecked");
            document.getElementById(obj.id).setAttribute("name", "check");
            //document.getElementById('chk_single').disabled = false;
            document.getElementById(obj.id).disabled = false;
         }
      }
   }

}

function getSelectedChk() {
   var chk_box = document.getElementsByTagName("input");
   var selected = new Array();
   for (var x = 0; x < chk_box.length; x++) {
      var obj = chk_box[x];
      if (obj.type == "checkbox") {
         //console.log(obj.type);
         if (obj.name == "uncheck") {
            selected[x - 1] = obj.value;
            //console.log(obj.value);
         }
      }
   }
   return (selected);
}


function getSelectedChkIds() {
   var chk_box = document.getElementsByTagName("input");
   var selected = new Array();
   for (var x = 0; x < chk_box.length; x++) {
      var obj = chk_box[x];
      console.log(`getSelectedIDs object obj => ${obj}`);
      if (obj.type == "checkbox") {
         //console.log(obj.type);
         if (obj.name == "uncheck") {
            console.log(`getSelectedIDs object obj.id => ${obj.id}`);
            selected[x - 1] = obj.id;

         }
      }
   }

   console.log(`getSelectedIDs result ${selected}`);
   return (selected);
}

function getroomstatus() {
   const fs = require('fs');
   var roomsObj = JSON.parse(fs.readFileSync('../AVG/masterdata/Rooms.JSON', 'utf8'));
   var roomsObjFiltered = roomsObj.filter(obj => obj.BlockID == document.getElementById('catSel1').value);
   var room
   for (var room in roomsObjFiltered) {
      if (roomsObjFiltered[room].SanitoryStatus == "Clean") {
         document.getElementById("lbl_" + roomsObjFiltered[room].RoomName).classList.add("clean");
         document.getElementById("lbl_" + roomsObjFiltered[room].RoomName).classList.remove("notclean");
      }
      else if (roomsObjFiltered[room].SanitoryStatus == "Not Clean") {
         document.getElementById("lbl_" + roomsObjFiltered[room].RoomName).classList.remove("clean");
         document.getElementById("lbl_" + roomsObjFiltered[room].RoomName).classList.add("notclean");
      }
      console.log("chk_" + roomsObjFiltered[room].RoomName + "-----" + roomsObjFiltered[room].SanitoryStatus);
   }
}

function initateClean() {
   document.getElementById("btn_initiate").classList.add("active");
   document.getElementById("btn_clean").classList.remove("active");
   document.getElementById("mod_Request").style.display = "block";
   var selected = getSelectedChk();

   for (var x = 0; x < selected.length; x++) { // TODO: Aswin's code to be uncommented
      document.getElementById(label).setAttribute("class", "cleaninprogress");

      document.getElementById("lbl_" + selected[x]).classList.remove("clean");
      document.getElementById("lbl_" + selected[x]).classList.add("notclean");
   }
}

function clean() {
   document.getElementById("btn_clean").classList.add("active");
   document.getElementById("btn_initiate").classList.remove("active");
   document.getElementById("mod_Request").style.display = "none";
   var selected = new Array()
   selected = getSelectedChk();
   for (var x = 0; x < selected.length; x++) {
      document.getElementById("lbl_" + selected[x]).classList.remove("notclean");
      document.getElementById("lbl_" + selected[x]).classList.add("clean");
   }
}

function checkSin(chk) {
   if (chk.name == "check") {
      document.getElementById(chk.id).setAttribute("name", "uncheck");
   }
   else if (chk.name == "uncheck") {
      document.getElementById(chk.id).setAttribute("name", "check");
   }
}

const flsAmendProm = require('fs');

function saveCleanTrans(item, path) {
   if (!flsAmendProm.existsSync(path)) {
      flsAmendProm.writeFile(path, JSON.stringify([item]));
   } else {
      var data = flsAmendProm.readFileSync(path, 'utf8');
      var list = (data.length) ? JSON.parse(data) : [];
      if (list instanceof Array) list.push(JSON.parse(item))
      else list = [JSON.parse(item)]
      flsAmendProm.writeFileSync(path, JSON.stringify(list));
   }
}

function submitCleanRequest() {

   var selectedroomIds = '', rnNameList = '';
   var selected = getSelectedChk();
   var selectedChkObjects = getSelectedChkIds();

   console.log(` Results id n val objects ${selected}, ${(selectedChkObjects)}`);
   // selectedroomIds = selectedChkObjects.substring(1, selectedChkObjects.length - 1);

   for (var x = 0; x < selectedChkObjects.length; x++) {
      console.log(`Check box object = ${selectedChkObjects[x]}`);
      var IDVal = selectedChkObjects[x];

      if (IDVal || IDVal.value != '' || IDVal.length > 0) {
         selectedChkObjects[x] = IDVal.substring(4, IDVal.length);
      }

      console.log(`In Process room IDs ${selectedChkObjects[x]} `);
   }

   const fs = require('fs');
   var roomsObjTranID = JSON.parse(fs.readFileSync('../AVG/masterdata/RoomsCleanTrans.JSON', 'utf8')).length + 1;

   for (var rmIndx = 0; rmIndx < selectedChkObjects.length; rmIndx++) {
      roomsObjTranID = roomsObjTranID + rmIndx;
      var cleanTxObj = `{"RoomID": "${selectedChkObjects[rmIndx]}",
      "RoomName": "${selected[rmIndx]}",
      "CleanTranID": "${roomsObjTranID}",
      "Date": "${document.getElementById("clnReqDate").value}",
      "CleanedBy": "${document.getElementById("assignee").value}",
      "RequestedBy": "${document.getElementById("requestor").value}"}`;

      saveCleanTrans(cleanTxObj, '../AVG/masterdata/RoomsCleanTrans.JSON');
   }
   console.log("Request has been submitted");
}

function updateJSON(data) {
   const path = require('path');
   var fs = require('fs');
   var element = JSON.stringify(data);
   var srcpath = path.resolve(__dirname, '../AVG/masterdata/RoomsCleanTransCopy.JSON');
   fs.writeFileSync(srcpath, element);
}