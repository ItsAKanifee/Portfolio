const dialog = document.querySelector("dialog");
var Info = "";


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

function AboutMe() {
    fetch('Texts/AboutMe.txt')
  .then(response => response.text())
  .then(data => Info = data)
  .then(() => document.getElementById("dialog-p").innerHTML = Info)
  
  .catch(error => console.error(error));
  dialog.showModal();
}

function Info() {
    fetch('Texts/Info.txt')
  .then(response => response.text())
  .then(data => Info = data)
  .then(() => document.getElementById("dialog-p").innerHTML = Info)
  
  .catch(error => console.error(error));
  dialog.showModal();
}