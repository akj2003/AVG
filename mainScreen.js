var catObject = {
    "Ganga": ["210", "211"],
    "Vyasa": ["301", "302", "303", "304", "305", "306", "307", "308", "309"],
    "Gautami": ["401", "402", "403"],
 }
 
 window.onload = function() {
    var catSel = document.getElementById("catSel"),
       roomSel = document.getElementById("roomSel");
    for (var cat in catObject) {
       catSel.options[catSel.options.length] = new Option(cat, cat);
    }
 }
 
 function room() {
    roomSel.length = 1;
    if (this.selectedIndex < 1) return;
    var rooms = catObject[catSel.value];
    for (var i = 0; i < rooms.length; i++) {
       roomSel.options[roomSel.options.length] = new Option(rooms[i], rooms[i])
    }
 }
 