//Cosmetic types:
var mouth = ["none", "default", "lipstick", "small", "morty"];
var hat = ["none", "cap", "beanie", "beach_hat", "top_hat", "banana", "bucket_hat", "beret", "crown", "back_cap", "hard_hat", "propeller_hat", "chef_hat"];
var accessory = ["none", "goatee", "moustache", "bow_tie", "beard"];
var fin = ["none", "default", "jewel"];
var eyewear = ["none", "monocle", "glasses", "goggles", "eyelashes"];

var mouthActive = "none";
var hatActive = "none";
var accessoryActive = "none";
var finActive = "none";
var eyewearActive = "none";

var bodyColour = "#FFFFFF";
var hatColour = "#FFFFFF";
var accessoryColour = "#FFFFFF";
var finColour = "#FFFFFF";
var eyewearColour = "#FFFFFF";

function selectColour(cosmeticType){
  newColour = document.getElementById(cosmeticType + "-colour-selector").value;
  window[cosmeticType + "Colour"] = newColour;
  document.querySelector(":root").style.setProperty("--" + cosmeticType + "Colour", newColour);
}

var growthCounter = 0;
var expanded = false;

function showCosmeticTypes(cosmeticType){
  if (expanded == false) {
    expanded = true;
    var cosmeticTypeArray = window[cosmeticType];
    var columns = Math.ceil(cosmeticTypeArray.length / 4);
    var rows = Math.ceil(cosmeticTypeArray.length / columns);
    document.querySelector(":root").style.setProperty("--dropdownWidth", (columns * 10).toString() + "vw");
    document.querySelector(":root").style.setProperty("--dropdownHeight", (rows * 10).toString() + "vw");
    var newInnerHTML = '<button class="cosmetic-selector" onClick="selectCosmeticType(\'' + cosmeticType + '\', \'' + window[cosmeticType + 'Active'] + '\')" style="background-image: url(\'media/cosmetic-previews/' + cosmeticType + '/' + cosmeticType + '-' + window[cosmeticType + 'Active'] + '.png\')"></button>'
    for (var cosmeticTypeOption of cosmeticTypeArray){
      if (cosmeticTypeOption != window[cosmeticType + "Active"]){
        newInnerHTML = newInnerHTML + '<button class="cosmetic-selector" onClick="selectCosmeticType(\'' + cosmeticType + '\', \'' + cosmeticTypeOption + '\')" style="background-image: url(\'media/cosmetic-previews/' + cosmeticType + '/' + cosmeticType + '-' + cosmeticTypeOption + '.png\')"></button>'
      }
    }
    document.getElementById(cosmeticType + "-type-container").innerHTML = newInnerHTML;
    document.getElementById(cosmeticType + "-type-container").classList.add("expanded-cosmetic-type-container");
  }
  else {
    expanded = false;
    document.getElementById(cosmeticType + "-type-container").classList.remove("expanded-cosmetic-type-container");
    document.getElementById(cosmeticType + "-type-container").innerHTML = '<button class="cosmetic-selector" id="' + cosmeticType + '-type-selector" onClick="showCosmeticTypes(\'' + cosmeticType + '\')"></button>'
  }
}

function selectCosmeticType(cosmeticType, newOption){
  window[cosmeticType + "Active"] = newOption;
  document.querySelector(":root").style.setProperty("--" + cosmeticType + "Type", 'url("../media/cosmetic-previews/' + cosmeticType + '/' + cosmeticType + '-' + newOption + '.png")');
  console.log(getComputedStyle(document.querySelector(":root")).getPropertyValue("--" + cosmeticType + "Type"));
  showCosmeticTypes(cosmeticType);
}

function generateString(){
  var generatedString = "!fish ";
  generatedString += "body:" + bodyColour + ",";
  generatedString += "mouth:" + mouthActive + ",";
  generatedString += "hat:" + hatActive + hatColour + ",";
  generatedString += "accessory:" + accessoryActive + accessoryColour + ",";
  generatedString += "fin:" + finActive + finColour + ",";
  generatedString += "eyewear:" + eyewearActive + eyewearColour;
  document.getElementById("generated-string").innerHTML = generatedString;
}
