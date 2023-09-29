
// import { lineMaterial } from "main.js";

function mode(id) {
    if (id=="darkmode") {
        document.body.style.color = "white";
        document.body.style.background = "rgb(15, 15, 15)";
        document.getElementById("contenu").style.background = "#ffffff20";
        document.getElementById("contenu").style.borderColor = "white";
        document.getElementById("mobile_image").src = "public/badge_black.png";
        for (const article of document.getElementsByClassName("projet")) {
            article.style.color = "white"
        }
        // lineMaterial.color = 0x333;
    }
    else if (id=="lightmode") {
        document.body.style.color = "black";
        document.body.style.background = "rgb(240, 240, 240)";
        document.getElementById("contenu").style.background = "#00000020";
        document.getElementById("contenu").style.borderColor = "black";
        document.getElementById("mobile_image").src = "public/badge_white.png";
        for (const article of document.getElementsByClassName("projet")) {
            article.style.color = "black"
        }
        // lineMaterial.color = 0xccc;
    }
}
