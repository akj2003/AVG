import readFile from './util/readfile';
const catObject = {
    "Ganga": ["210", "211"],
    "Vyasa": ["301", "302", "303", "304", "305", "306", "307", "308", "309"],
    "Gautami": ["401", "402", "403"],
 }
 //*/

window.onload = function () {

   console.log('I am in loading...');
  // const catObject = readFile.readMyFile('./masterdata/Block.JSON');
   console.log(catObject);

   var catSel = document.getElementById("catSel"),
      roomSel = document.getElementById("roomSel"),
      catSel1 = document.getElementById("catSel1");

   for (var cat in catObject) {
      catSel1.options[catSel1.options.length] = new Option(cat, cat);
   }
   for (var cat in catObject) {
      catSel.options[catSel.options.length] = new Option(cat, cat);
   }
   document.getElementById("mod_viewdetails").style.display = "none";
   document.getElementById("mod_Request").style.display = "none";
   document.getElementById("mod_viewStatus").style.display = "none";
}

function room() {
   roomSel.length = 1;
   if (this.selectedIndex < 1) return;
   var rooms = catObject[catSel.value];
   for (var i = 0; i < rooms.length; i++) {
      roomSel.options[roomSel.options.length] = new Option(rooms[i], rooms[i])
   }
}

function mod_viewdetails_enable(value) {
   document.getElementById("mod_viewdetails").style.display = "block";
   alert("test");
}
