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
   alert("Request has been submitted");
   home();
   document.getElementById("id_nav_home").classList.add("active");
   if (document.getElementById('id_nav_IR').classList.contains('active'))
      document.getElementById('id_nav_IR').classList.remove("active")
   if (document.getElementById('id_nav_VS').classList.contains('active'))
      document.getElementById('id_nav_VS').classList.remove("active")
}
