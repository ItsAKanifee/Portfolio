var Info = "";

fetch('Texts/Info.txt')
  .then(response => response.text())
  .then(data => Info = data)
  .then(() => document.getElementById("home-p").innerHTML = Info)
  .catch(error => console.error(error));

