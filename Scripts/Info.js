const dialog = document.querySelector("dialog");
var Info = "";

function time() {
    var out = "";

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();

    let age = year - 2005;

    if(month < 11) {
        age -= 1;
    } else if(month == 11 && day < 18) {
        age -= 1;
    }

    out += " I am " + age + " years old,";

    let grade = 1;

    if(month > 8) {
        gade += year - 2024;
    }

    switch(grade) {
        case 1:
            out += " and I am a Freshman at Carnegie Mellon University.";
            break;
        case 2:
            out += " and I am a Sophmore at Carnegie Mellon University.";
            break;
        case 3:
            out += " and I am a Junior at Carnegie Mellon University.";
            break;
        case 4:
            out += " and I am a Senior at Carnegie Mellon University.";
            break;
        case 5:
            out += " and I have graduated from Carnegie Mellon University " + (year - 2028) + " years ago.";
            break;
        default:

        break;
    }

    return out;
}

time();

// Fetching the text file
fetch('Texts/Info.txt')
  .then(response => response.text())
  .then(data => Info = data)
  .then(() => Info += time())
  .then(() => document.getElementById("home-p").innerHTML = Info)
  
  .catch(error => console.error(error));


function Popup(i) {
    TextOnPopup(i);
    dialog.showModal();
}

function TextOnPopup(i) {
    fetch('Texts/Project' + i + '.txt')
  .then(response => response.text())
  .then(data => Info = data)
  .then(() => document.getElementById("dialog-p").innerHTML = Info)
  
  .catch(error => console.error(error));
}
