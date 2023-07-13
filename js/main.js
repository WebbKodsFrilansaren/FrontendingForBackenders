/****************************
  IMPORTING ALMOST EVERYTHING
****************************/
import { jsonData } from "./data/json.js";
import { increaseCounter } from "./functions/functions.js";
import {
  cssRulesAllArray,
  cssRulesWithVendor,
  elementsWithTextContent,
  elementsWithSrcAttribute,
  elementsWithHrefAttribute,
  mainStyleSheet,
  outputStyleSheet,
} from "./data/variables.js";
import { elCreate } from "./functions/functions.js";
import { addElementToShadowDOM } from "./functions/HTMLfunctions.js";
import { copyCustomCode } from "./functions/Copyfunctions.js";
import {
  setCSSRuleMainSheet,
  setCSSRuleOutputSheet,
} from "./functions/CSSfunctions.js";

/******************
  MAIN EXECUTION
******************/
// After "DOMCONTENTLOADED"
window.addEventListener("DOMContentLoaded", () => {
  /*********************************************
  GLOBAL VARIABLES AFTER DOMContentLoaded
  *********************************************/
  const output = document.getElementById("FEFBEoutput"); // Add & append all new elements here
  // "Copy HTML" & "Copy CSS"
  const copyHTML = document.getElementById("FEFBEcopyHTML");
  const copyCSS = document.getElementById("FEFBEcopyCSS");

  // All available HTML elements to choose from, will be controlled against.
  const HTMLList = Array.from(
    document.getElementById("FEFBEselectHTML").options
  ).map((option) => option.value);

  // Add Buttons
  const addHTML = document.getElementById("FEFBEplus"); // + for HTML adding
  const addHTMLField = document.getElementById("FEFBEchosenHTMLElement"); // Input field after "Element:"
  const addCSS = document.getElementById("");

  // Grab Navigation elements (HTML + CSS) to listen for switching between them
  const navHTMLbtn = document.getElementById("FEFBEhtmlBtn");
  const navCSSbtn = document.getElementById("FEFBEcssBtn");
  const htmlTab = document.getElementById("FEFBEhtml");
  const cssTab = document.getElementById("FEFBEcss");

  /*********************************************
  EVENT LISTENER FOR TAB NAVIGATION (HTML + CSS)
  *********************************************/
  // Display and hide the other one when clicked
  navHTMLbtn.addEventListener("click", () => {
    const cssTabStyle = window.getComputedStyle(cssTab);
    if (cssTabStyle.display === "block") {
      cssTab.style.display = "none";
      htmlTab.style.display = "block";
      navHTMLbtn.classList.toggle("active");
      navCSSbtn.classList.toggle("active");
    }
  });
  navCSSbtn.addEventListener("click", () => {
    const htmlTabStyle = window.getComputedStyle(htmlTab);
    if (htmlTabStyle.display === "block") {
      htmlTab.style.display = "none";
      cssTab.style.display = "block";
      navHTMLbtn.classList.toggle("active");
      navCSSbtn.classList.toggle("active");
    }
  });

  /*******************************************
  EVENT LISTENER COPY CUSTOM CODE (HTML + CSS)
  *******************************************/
  // Copy to Clipboard all custom CSS rules
  copyCSS.addEventListener("click", (e) => {
    // Separate all `cssText` for each selector{} with two new rows
    const code = Array.from(outputStyleSheet.cssRules)
      .map((rule) => rule.cssText)
      .join("\n\n");
    const msg = "CSS Copied!";
    copyCustomCode(e, code, msg);
  });
  // Copy to Clipboard all HTML from "OUTPUTs" ShadowDOM
  copyHTML.addEventListener("click", (e) => {
    const code = document.getElementById("FEFBEoutput").innerHTML;
    const msg = "HTML Copied!";
    copyCustomCode(e, code, msg);
  });

  /*************************************
  EVENT LISTENER TO ADD NEW HTML ELEMENT
  *************************************/
  addHTML.addEventListener("click", (e) => {
    // Grab chosen HTML Element, chosen Append Style and whether Smart Adding was checked
    const elementInput = document.querySelector("#FEFBEchosenHTMLElement");
    const chosenHTML = elementInput.value;
    const addStyleBox = document.querySelector("#FEFBEselectAppendStyle");
    const chosenAddStyle = addStyleBox.value;
    const smartCheckBox = document.querySelector("#FEFBEcheckbox");
    const smartAddingchecked = smartCheckBox.checked;

    // Checks before adding
    if (chosenHTML == "") {
      // Nothing chosen
      elementInput.setAttribute("placeholder", "Choose an element!");
      setTimeout(() => {
        elementInput.setAttribute("placeholder", "Write an element");
      }, 1500);
      return;
    }

    if (!HTMLList.includes(chosenHTML)) {
      // Element don't exist
      elementInput.value = "";
      elementInput.setAttribute("placeholder", "Invalid element!");
      setTimeout(() => {
        elementInput.setAttribute("placeholder", "Write an element");
      }, 1500);
      return;
    }

    if (chosenAddStyle == "") {
      // No "Add Method" chosen
      addStyleBox.style.color = "red";
      addStyleBox.style.borderColor = "red";
      setTimeout(() => {
        addStyleBox.style.color = "";
        addStyleBox.style.borderColor = "";
      }, 1500);
      return;
    }
    // Adding allowed
    addElementToShadowDOM(chosenHTML, chosenAddStyle, smartAddingchecked);
  });

  // Listen for "ENTER"
  addHTMLField.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      addHTML.click();
    }
  });

  // TODO: Delete when done, used for testing purposes
  setCSSRuleOutputSheet("nav", "border", "5px solid pink");
  setCSSRuleOutputSheet("ul", "border", "4px solid black");
  setCSSRuleOutputSheet("li", "border", "3px solid yellow");
  setCSSRuleOutputSheet("a", "border", "3px solid red");
  setCSSRuleOutputSheet("p", "border", "10px solid purple");

  // END OF "DOMCONTENTLOADED" Event Listening Function
}); // END OF "DOMCONTENTLOADED" Event Listening Function
