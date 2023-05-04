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
   home();
   listCleaningRecords();
   listUsers();
   workorder();

   document.getElementById("mod_Request").style.display = "none";
   document.getElementById("mod_viewdetails").style.display = "none";
}

function listRooms() {
   const fs = require('fs');
   var blockSelected = document.getElementById("catSel").value;
   document.getElementById('lbl_err').style.display = "none";
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
function getroomstatus() {
   const fs = require('fs');
   document.getElementById('lbl_err').style.display = "none";
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
      //console.log("chk_" + roomsObjFiltered[room].RoomName + "-----" + roomsObjFiltered[room].SanitoryStatus);
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

function getSelectedChk_clean() {
   var chk_box = document.getElementsByTagName("input");
   document.getElementById('lbl_err').style.display = "none";
   var selected_clean = new Array();
   let counter_clean = 0;
   for(var x=0;x<chk_box.length;x++) {
      var obj = chk_box[x];
      //console.log("obj --- " + obj);
      if(obj.type=="checkbox"){
         //console.log("obj.type --- " + obj.type + " ---- obj.value --- " + obj.value + " --- obj.name ---" + obj.name);
         if(obj.name=="uncheck"){
            if(document.getElementById('lbl_' + obj.value).className == "clean") {
               console.log("clean -- " + obj.value);
               selected_clean[counter_clean] = obj.value;
               counter_clean++;
            }
         }
      }
   }
   return(selected_clean);
}

function getSelectedChk_notclean() {
   var chk_box = document.getElementsByTagName("input");
   document.getElementById('lbl_err').style.display = "none";
   var selected_notclean = new Array();
   let counter_notclean = 0;
   for(var x=0;x<chk_box.length;x++) {
      var obj = chk_box[x];
      //console.log("obj --- " + obj);
      if(obj.type=="checkbox"){
         //console.log("obj.type --- " + obj.type + " ---- obj.value --- " + obj.value + " --- obj.name ---" + obj.name);
         if(obj.name=="uncheck"){
            if(document.getElementById('lbl_' + obj.value).className == "notclean") {
               console.log("notclean -- " + obj.value);
               selected_notclean[counter_notclean] = obj.value;
               counter_notclean++;
            } 
         }
      } 
   }
   return(selected_notclean);
}

function initateClean() {
   document.getElementById("btn_initiate").classList.add("active");
   document.getElementById("btn_clean").classList.remove("active");
   document.getElementById("mod_Request").style.display = "block";
   var selected_clean = new Array();
   var selected_notclean = new Array();
   selected_clean = getSelectedChk_clean();
   selected_notclean = getSelectedChk_notclean();
   document.getElementById('lbl_selected_clean').value = selected_clean;
   document.getElementById('lbl_selected_notclean').value = selected_notclean;
   console.log(selected_clean);
   console.log(selected_notclean);
   if(selected_clean.length > 0) {
      document.getElementById('lbl_err').style.display = "none";
      for(var x=0;x<selected_clean.length;x++){
            document.getElementById('lbl_err').style.display = "none";
            //document.getElementById("lbl_" + selected_clean[x]).classList.remove("clean");
            //document.getElementById("lbl_" + selected_clean[x]).classList.add("notclean");
      }
   }
   else  if(selected_notclean.length == 0) {
      document.getElementById("mod_Request").style.display = "none";
      document.getElementById("lbl_err").innerHTML = 'No rooms are selected to initiate clean';
      document.getElementById('lbl_err').style.display = "block";
   }

   if(selected_notclean.length == 1) {
      document.getElementById("mod_Request").style.display = "none";
      console.log("Cleaning request is already initiated for Room number " + selected_notclean + ". Please unselect " + selected_notclean + " and click on Initiate Clean.");
      document.getElementById("lbl_err").innerHTML = 'Cleaning request is already initiated for Room number ' + selected_notclean + '. Please unselect ' + selected_notclean + ' and click on Initiate Clean.';
      document.getElementById('lbl_err').style.display = "block";
   }
   else if(selected_notclean.length > 0) {
      document.getElementById("mod_Request").style.display = "block";
      console.log("Cleaning request is already initiated for Room number " + selected_notclean + ". Please unselect " + selected_notclean + " and click on Initiate Clean.");
      document.getElementById("lbl_err").innerHTML = 'Cleaning request is already initiated for Room number ' + selected_notclean + '. Please unselect ' + selected_notclean + ' and click on Initiate Clean.';
      document.getElementById('lbl_err').style.display = "block";
   }
}

function clean() {
   document.getElementById("btn_clean").classList.add("active");
   document.getElementById("btn_initiate").classList.remove("active");
   document.getElementById("mod_Request").style.display = "none";
   var selected_clean = new Array();
   var selected_notclean = new Array();
   selected_clean = getSelectedChk_clean();
   selected_notclean = getSelectedChk_notclean();
   if(selected_notclean.length > 0) {
      document.getElementById('lbl_err').style.display = "none";
      for(var x=0;x<selected_notclean.length;x++){
         document.getElementById("lbl_" + selected_notclean[x]).classList.remove("notclean");
         document.getElementById("lbl_" + selected_notclean[x]).classList.add("clean");
         document.getElementById('lbl_err').style.display = "none";
      }
   }
   else if(selected_clean.length == 0){
      document.getElementById("lbl_err").innerHTML = "No rooms are selected to proceed.";
      document.getElementById('lbl_err').style.display = "block";
   }
   if(selected_clean.length > 0){
         console.log("Room number : " + selected_clean + " are already cleaned. Please choose Initiate clean option incase if you wish to clean.");
         document.getElementById("lbl_err").innerHTML = "Room number : " + selected_clean + " are already cleaned. Please choose Initiate clean option incase if you wish to clean.";
         document.getElementById('lbl_err').style.display = "block";
   }
}

function roomVS() {
   //document.getElementById("chk_multi").setAttribute("name", "uncheck");
   document.getElementById("chk_multi").checked = false;
   document.getElementById("chk_container").style.display = "block";
   document.getElementById('lbl_err').style.display = "none";
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
      //node.innerHTML = '<input type="checkbox" class="chk_hide" onclick="checkSin(this)" name="check" id="chk_' + roomsObjFiltered[room].RoomID + '" value="' + roomsObjFiltered[room].RoomName + '"><label id="lbl_' + roomsObjFiltered[room].RoomName + '"class="clean" onclick="updatestat(this)")">' + roomsObjFiltered[room].RoomName + '</label>';
      node.innerHTML = '<input type="checkbox" class="chk_hide" onclick="checkSin(this)" name="check" id="chk_' +
          roomsObjFiltered[room].RoomName + '" value="'+ roomsObjFiltered[room].RoomName +'"><label id="lbl_' + 
          roomsObjFiltered[room].RoomName + '"class="clean">' + roomsObjFiltered[room].RoomName + '</label>' +
          '<textarea id="txtAra_' + roomsObjFiltered[room].RoomName + '"></textarea>';
      //node.innerHTML = '<label id="lbl' + i + '"class="clean")">'+ rooms[i] +'</label>'; 
      document.getElementById('cont_VS').appendChild(node);
      //console.log(node);
   }

   getroomstatus();
}

function roomSelected() {
   var x = document.getElementById("roomSel").value;
   document.getElementById('lbl_err').style.display = "none";
   if (x != null || x != [] || x != '')
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
   document.getElementById('lbl_err').style.display = "none";
   document.getElementById("home").style.display = "none";
   document.getElementById("mod_viewdetails").style.display = "none";
   document.getElementById("mod_printwork").style.display = "block";
   if (document.getElementById('id_nav_home').classList.contains('active'))
      document.getElementById('id_nav_home').classList.remove("active")
   if (document.getElementById('id_nav_VS').classList.contains('active'))
      document.getElementById('id_nav_VS').classList.remove("active")
}

//Cleaning history navigation link
function viewstat() {
   document.getElementById("mod_Request").style.display = "none";
   document.getElementById("mod_viewStatus").style.display = "none";
   document.getElementById('lbl_err').style.display = "none";
   document.getElementById("home").style.display = "block";
   document.getElementById("mod_printwork").style.display = "none";
   document.getElementById("mod_viewdetails").style.display = "block";
   document.getElementById("roomSel").selectedIndex = 0
   document.getElementById("catSel").selectedIndex = 0
   document.getElementById("id_nav_VS").classList.add("active");
   if (document.getElementById('id_nav_home').classList.contains('active'))
      document.getElementById('id_nav_home').classList.remove("active")
}

// Home navigation link
function home() {
   document.getElementById("mod_Request").style.display = "none";
   document.getElementById("mod_viewStatus").style.display = "block";
   document.getElementById('lbl_err').style.display = "none";
   document.getElementById("home").style.display = "none";
   document.getElementById("mod_viewdetails").style.display = "none";
   document.getElementById("mod_printwork").style.display = "none";
   document.getElementById("id_nav_home").classList.add("active");
   if (document.getElementById('id_nav_VS').classList.contains('active'))
      document.getElementById('id_nav_VS').classList.remove("active")

   roomVS();
}

function listUsers() {
   const fs = require('fs');
   var peopleObject = JSON.parse(fs.readFileSync('../AVG/masterdata/People.JSON', 'utf8'));
   document.getElementById('lbl_err').style.display = "none";

   var requesterObj = document.getElementById("requestor"),
      assigneeObj = document.getElementById("assignee"),
      pw_assigneeObj = document.getElementById("pw_assignee");
   
   let counter = 0;
   let pw_counter = 0;
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


   for (var staff in peopleObject) {
      var staffName = peopleObject[staff].DisplayName;
      var staffID = peopleObject[staff].PeopleID;
      if(peopleObject[staff].Role == "Staff") {
         pw_assigneeObj.options[pw_counter] = new Option(staff, staff);
         pw_assigneeObj.options[pw_counter].text = staffName;
         pw_assigneeObj.options[pw_counter].value = staffName;
         pw_counter++;
      }
   }
}

function workorder(){
   const fs = require('fs');
   var assingee =  document.getElementById('pw_assignee').value;
   var printWorkOrdertbl = document.getElementById('tbl_printworkorder');
   var workOrderRecordsObj = JSON.parse(fs.readFileSync('../AVG/masterdata/RoomsCleanTrans.JSON','utf8'));
   var workOrderTranFiltered = workOrderRecordsObj.filter(obj => obj.CleanedBy == assingee );

   if(workOrderTranFiltered == [] || workOrderTranFiltered == null) {
      console.log("No rooms are assigned to ");
      return;
   }
   var cellCount = 4;
   
   printWorkOrdertbl.innerHTML = "";
   var header = printWorkOrdertbl.createTHead();
   var headrow = header.insertRow(0); 
   var headcell1 = headrow.insertCell(0);
   headcell1.innerHTML = '<th id="pw_th">Nos. </th >';
   var headcell2 = headrow.insertCell(1);
   headcell2.innerHTML = '<th id="pw_th">Room Number</th>';
   var headcell3 = headrow.insertCell(2);
   headcell3.innerHTML = '<th id="pw_th">Requested Date </th>';
   var headcell4 = headrow.insertCell(3);
   headcell4.innerHTML = '<th id="pw_th">Assigned To </th></tr >';

   //console.log(workOrderTranFiltered);

   for (var workorder in workOrderTranFiltered) {
      var row = printWorkOrdertbl.insertRow(Number(workorder)+1);
      for (var i = 0; i < cellCount; i++) {
         var cell = row.insertCell(i);
         //console.log(workorder);
         switch (i) {

            case 0:
               cell.innerHTML = Number(workorder) + 1 ;
               break;

            case 1:
               cell.innerHTML = workOrderTranFiltered[workorder].RoomName;
               break;

            case 2:
               cell.innerHTML = workOrderTranFiltered[workorder].Date;
               break;

            case 3:
               cell.innerHTML = workOrderTranFiltered[workorder].CleanedBy;
               break;
         }

      }
   }
}


function listCleaningRecords() {
   document.getElementById("mod_printworkorder").style.display = "block";
   //document.getElementById("mod_viewdetails").style.display = "none";
   document.getElementById('lbl_err').style.display = "none";
   var roomCleanRectbl = document.getElementById("tbl_viewdetails");

   var roomName = document.getElementById('roomSel').options[document.getElementById('roomSel').selectedIndex].text;
   const fs = require('fs');
   var roomCleanRecordsObj = JSON.parse(fs.readFileSync('../AVG/masterdata/RoomsCleanTrans.JSON', 'utf8'));
   var roomsCleanTranFiltered = roomCleanRecordsObj.filter(obj => obj.RoomName == roomName);



   if (roomsCleanTranFiltered == [] || roomsCleanTranFiltered == null)
      return;

   roomsCleanTranFiltered = roomsCleanTranFiltered.sort((a, b) => {
      if (a.CleanTranID > b.CleanTranID) {
         return -1;
      }
   });

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
   document.getElementById('lbl_err').style.display = "none";
   for(var x=0;x<chk_box.length;x++) {
      var obj = chk_box[x];
      if(obj.id != "chk_multi") {
         if(obj.type=="checkbox"){
            //console.log(obj.checked);
            if(selection == "check"){
               obj.checked =true;
               //console.log(chk.checked);
               //console.log("checked");
               document.getElementById(obj.id).setAttribute("name", "uncheck");
               //document.getElementById('chk_single').disabled = true;
               //document.getElementById(obj.id).disabled = true;
            }
            else if(selection == "uncheck"){
               obj.checked =false;
               //console.log("unchecked");
               document.getElementById(obj.id).setAttribute("name", "check");
               //document.getElementById('chk_single').disabled = false;
               //document.getElementById(obj.id).disabled = false;
            }
         }
      }
      else if(obj.id == "chk_multi") {
         if(obj.checked == false)
            selection = "uncheck";
         else
            selection = "check";
            
      }
   }
   /*if(chk.name == "check"){
      document.getElementById(chk.id).setAttribute("name","uncheck");
      var status = document.getElementById('lbl_' + chk.value).className;
      console.log('chk.name Value ' + chk.name + ' || ' + status);
   }
   else if(chk.name == "uncheck"){
      document.getElementById(chk.id).setAttribute("name","check");
      console.log('chk.name Value ' + chk.name);
   }*/
}


/*function clean(lblid) {
   if (lblid != 'cont_VS') {
      var labelid = lblid.id;
      var label = labelid.slice(0, lblid.id.length)
      document.getElementById(label).setAttribute("class", "cleaninprogress");
      return;
   }

}*/


function saveCleanTrans(item, path) {
   const flsAmendProm = require('fs');
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

function saveJSONFile(jsonObj, path) {
   const flsSave = require('fs');
   if (!flsSave.existsSync(path)) {
      flsSave.writeFile(path, [jsonObj]);
   } else {
      flsSave.writeFileSync(path, JSON.stringify(jsonObj));
   }
}

function udpateRooms(objRooms, targetRoomName, setValue) {
   if (objRooms) {
      var jsonRooms = JSON.parse(objRooms);
      jsonRooms.forEach(room => {
         if (room.RoomName == targetRoomName) {
            room.SanitoryStatus = setValue;
         }
      });
   }
   return jsonRooms;
}

function submitCleanRequest() {

   var selectedroomIds = '', rnNameList = '';
   console.log(document.getElementById('lbl_selected_clean').value);
   var selectedRoomsNames = document.getElementById('lbl_selected_clean').value;
   //var selectedChkObjects = getSelectedChkIds();

   console.log(` Results object ${selectedRoomsNames}`);
   // selectedroomIds = selectedChkObjects.substring(1, selectedChkObjects.length - 1);

     const fs = require('fs');
   var roomsObjTranID = JSON.parse(fs.readFileSync('../AVG/masterdata/RoomsCleanTrans.JSON', 'utf8')).length + 1;

   if(!selectedRoomsNames) 
      return;


   for (var rmIndx = 0; rmIndx < selectedRoomsNames.length; rmIndx++) {
      var roomsObj = fs.readFileSync('../AVG/masterdata/Rooms.JSON', 'utf8');
      roomsObjTranID = roomsObjTranID + rmIndx;
      var txtAreaID = 'txtAra_' + `${selectedRoomsNames[rmIndx]}`;
      var txtNotes = document.getElementById(txtAreaID).value;

      var cleanTxObj = `{"RoomID": "${selectedRoomsNames[rmIndx]}",
      "RoomName": "${selectedRoomsNames[rmIndx]}",
      "CleanTranID": "${roomsObjTranID}",
      "Date": "${document.getElementById("datepicker").value}",
      "CleanedBy": "${document.getElementById("assignee").value}",
      "RequestedBy": "${document.getElementById("requestor").value}",
      "Notes":"${txtNotes}"}`;

      var updatedRoomObj = udpateRooms(roomsObj, selectedRoomsNames[rmIndx], "Not Clean");
      saveJSONFile(updatedRoomObj, '../AVG/masterdata/Rooms.JSON');

      saveCleanTrans(cleanTxObj, '../AVG/masterdata/RoomsCleanTrans.JSON');
   }
   console.log("Request has been submitted");
  
}

//Print Work Order
function reset_pw() {
}

function printworkorder(){
   var printContents = document.getElementById("mod_printworkorder").innerHTML;
   var originalContents = document.body.innerHTML;
   document.body.innerHTML = printContents;
   window.print();
   document.body.innerHTML = originalContents;
}
