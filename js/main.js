/****************************
  IMPORTING ALMOST EVERYTHING
****************************/
import { jsonData } from "./data/json.js";
import { Functions } from "./functions/functions.js";
import {
  cssRulesAllArray,
  cssRulesWithVendor,
  elementsWithTextContent,
  elementsWithSrcAttribute,
  elementsWithHrefAttribute,
  mainStyleSheet,
  outputStyleSheet,
} from "./data/variables.js";
import { HTMLFunctions } from "./functions/HTMLfunctions.js";
import { CopyFunctions } from "./functions/Copyfunctions.js";
import { CSSFunctions } from "./functions/CSSfunctions.js";

/******************
  MAIN EXECUTION
******************/
// After "DOMCONTENTLOADED"
window.addEventListener("DOMContentLoaded", () => {
  /*********************************************
  GLOBAL VARIABLES AFTER DOMContentLoaded
  *********************************************/
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

    // Extract the true CSS code | #FEFBEoutput :is(<selector>) { CSS }
    // Thus becomes: <selector> { All CSS for that selector }
    const regex = /#FEFBEoutput :is\(([^)]+)\)\s*({[^}]+})/g;
    let match;
    let extractedCSS = "";
    while ((match = regex.exec(code)) !== null) {
      extractedCSS += match[1];
      extractedCSS += " ";
      extractedCSS += match[2];
      extractedCSS += "\n\n";
    }
    CopyFunctions.copyCustomCode(e, extractedCSS, msg);
  });
  // Copy to Clipboard all HTML from "OUTPUTs" ShadowDOM
  copyHTML.addEventListener("click", (e) => {
    const code = document.getElementById("FEFBEoutput").innerHTML;
    const msg = "HTML Copied!";
    CopyFunctions.copyCustomCode(e, code, msg);
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

    const grabGreenFieldset = document.querySelector(".FEFBEactiveFieldset");
    const elementforms = document.querySelector("[data-formid]");
    if (grabGreenFieldset == null && elementforms != null) {
      // Element don't exist
      elementInput.value = "";
      elementInput.setAttribute("placeholder", "Pick Element #<Number>:");
      setTimeout(() => {
        elementInput.setAttribute("placeholder", "Write an element");
      }, 2500);
      return;
    }

    // Adding allowed
    HTMLFunctions.addElementToShadowDOM(
      chosenHTML,
      chosenAddStyle,
      smartAddingchecked
    );
  });

  // Listen for "ENTER"
  addHTMLField.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      // Clicks on the + button initiating its Event Listener
      addHTML.click();
    }
  });

  /*******************************************************************************************
  GLOBAL EVENT DELEGATION LISTENER: Do different things depending on what was clicked or enter
  *******************************************************************************************/
  /*
  GLOBAL EVENT DELEGATION LISTENERS FOR "HTML" Tab
  */
  // Listen for "CLICKS" inside of "HTML" Tab
  htmlTab.addEventListener("click", (e) => {
    e.preventDefault();
    // Clicked on "LEGENDS"? Changing what is the current one to add next element in relationship to.
    if (e.target.matches("[data-legendid]")) {
      // Change clicked on to the active one and deactivate the previously active one.
      if (!e.target.parentNode.classList[1]) {
        const activeLegend = document.querySelector(".FEFBEactiveFieldset");
        e.target.parentNode.classList.add("FEFBEactiveFieldset");
        // Only remove the class if it exists
        if (activeLegend) {
          activeLegend.classList.remove("FEFBEactiveFieldset");
        }
      }
    }

    // Clicked on "DELETE" button?
    if (e.target.matches("[data-deletehtmlid]")) {
      const fieldsetLegendItem = e.target.parentNode.firstChild.textContent;
      const confirmDelete = confirm("Delete: '" + fieldsetLegendItem + "' ?");
      if (!confirmDelete) {
        return;
      }
      const targetdeleteid = e.target.dataset.deletehtmlid;
      HTMLFunctions.deleteElShadowAndTab(e, targetdeleteid);
    }

    // Clicked on "SAVE" button?
    if (e.target.matches("[data-savehtmlid]")) {
      console.log("SAVE");
    }
  });

  // Listen for "ENTER" presses inside of "HTML" Tab
  htmlTab.addEventListener("keyup", (e) => {
    e.preventDefault();

    // Pressed ENTER inside of an `id` input field?
    if (e.target.matches("[data-idid]")) {
      if (e.key === "Enter" || e.keyCode === 13) {
        const correctid = e.target.dataset.belongstoelementid;
        const output = document.getElementById("FEFBEoutput");
        Functions.elAttr(
          output.querySelector(`[data-elementid="${correctid}"]`),
          "id=" + e.target.value
        );
      }
    }

    // Pressed ENTER inside of an `class` input field?
    if (e.target.matches("[data-classid]")) {
      if (e.key === "Enter" || e.keyCode === 13) {
        const correctid = e.target.dataset.belongstoelementid;
        const output = document.getElementById("FEFBEoutput");
        Functions.elAttr(
          output.querySelector(`[data-elementid="${correctid}"]`),
          "class=" + e.target.value
        );
      }
    }

    // Pressed ENTER inside of an `textContent` input field?
    if (e.target.matches("[data-textcontentid]")) {
      if (e.key === "Enter" || e.keyCode === 13) {
        // Change textContent of `data-elementid`
        const correctid = e.target.dataset.belongstoelementid;
        const output = document.getElementById("FEFBEoutput");
        const outputid = output.querySelector(
          `[data-elementid="${correctid}"]`
        );
        outputid.textContent = e.target.value;
      }
    }

    // Pressed ENTER inside of an `src` input field?
    if (e.target.matches("[data-srcid]")) {
      if (e.key === "Enter" || e.keyCode === 13) {
        // Change `src` attribute of `data-elementid`
        const correctid = e.target.dataset.belongstoelementid;
        const output = document.getElementById("FEFBEoutput");
        Functions.elAttr(
          output.querySelector(`[data-elementid="${correctid}"]`),
          "src=" + e.target.value
        );
      }
    }

    // Pressed ENTER inside of an `href` input field?
    if (e.target.matches("[data-hrefid]")) {
      if (e.key === "Enter" || e.keyCode === 13) {
        // Change `href` attribute of `data-elementid`
        const correctid = e.target.dataset.belongstoelementid;
        const output = document.getElementById("FEFBEoutput");
        Functions.elAttr(
          output.querySelector(`[data-elementid="${correctid}"]`),
          "href=" + e.target.value
        );
      }
    }

    // Pressed ENTER inside of an `Other` input field?
    if (e.target.matches("[data-otherattributesid]")) {
      if (e.key === "Enter" || e.keyCode === 13) {
        // Change its attributes of `data-elementid`
        const correctid = e.target.dataset.belongstoelementid;
        const output = document.getElementById("FEFBEoutput");
        Functions.elAttr(
          output.querySelector(`[data-elementid="${correctid}"]`),
          e.target.value
        );
      }
    }
  });

  /*
  GLOBAL EVENT DELEGATION LISTENERS FOR "CSS" Tab
  */
  // Listen for "clicks" inside of "CSS" Tab
  cssTab.addEventListener("click", (e) => {
    e.preventDefault();
  });

  cssTab.addEventListener("keyup", (e) => {
    e.preventDefault();
  });

  /***********************************************
  END OF MASSIVE GLOBAL EVENT DELEGATION LISTENERS
  ***********************************************/

  // TODO: Delete when done, used for testing purposes
  CSSFunctions.setCSSRuleOutputSheet("main", "border", "5px solid grey");
  CSSFunctions.setCSSRuleOutputSheet("nav", "border", "5px solid pink");
  CSSFunctions.setCSSRuleOutputSheet("nav:hover", "height", "25px");
  CSSFunctions.setCSSRuleOutputSheet(
    "main > nav",
    "border",
    "5px solid purple"
  );
  CSSFunctions.setCSSRuleOutputSheet(".test", "height", "100px");
  CSSFunctions.setCSSRuleOutputSheet("#test", "height", "200px");
  CSSFunctions.setCSSRuleOutputSheet("ul", "border", "4px solid black");
  CSSFunctions.setCSSRuleOutputSheet("li", "border", "3px solid yellow");
  CSSFunctions.setCSSRuleOutputSheet("ul > li", "margin", "1rem");
  CSSFunctions.setCSSRuleOutputSheet("a", "border", "3px solid red");
  CSSFunctions.setCSSRuleOutputSheet("p", "border", "10px solid purple");
  console.log(outputStyleSheet);

  Functions.elAttr(document.createElement("p"), "class=test|id=test2");

  // END OF "DOMCONTENTLOADED" Event Listening Function
}); // END OF "DOMCONTENTLOADED" Event Listening Function
