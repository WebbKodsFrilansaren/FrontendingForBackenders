/****************************
  IMPORTING ALMOST EVERYTHING
****************************/
import { jsonData } from "./data/json.js";
import { Functions } from "./functions/functions.js";
import {
  reservedClasses,
  reservedIds,
  reservedAttributes,
  cssRulesAllArray,
  cssRulesWithVendor,
  elementsWithTextContent,
  elementsWithSrcAttribute,
  elementsWithHrefAttribute,
  mainStyleSheet,
  outputStyleSheet,
  singleAttributesHTMLTab,
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

  // Reset All Button
  const resetAllBtn = document.querySelector("#FEFBEresetAll");

  // Listen for "RESET" button, but only clicks! Deny key presses.
  resetAllBtn.addEventListener("keypress", (e) => {
    e.preventDefault();
    return;
  });
  resetAllBtn.addEventListener("click", (e) => {
    confirm("WARNING: RELOAD PAGE AND DELETE EVERYTHING?");
    if (!confirm) {
      return;
    }
    window.location.reload();
  });

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
    // Parse the innerHTML code to remove all [data-] attributes first.
    const parser = new DOMParser();
    const parsedDOM = parser.parseFromString(code, "text/html");

    // Then find all elements and remove attributes starting with "data-"
    const elements = parsedDOM.querySelectorAll("*");
    // Inside of each element...
    elements.forEach((element) => {
      // ...we create an array of all attributes ...
      Array.from(element.attributes).forEach((attr) => {
        // ... and we remove them if their name starts with "data-"
        if (attr.name.startsWith("data-")) {
          element.removeAttribute(attr.name);
        }
      });
    }); // Done!

    // Get the modified innerHTML and send it off to Clipboard
    const modifiedCode = parsedDOM.body.innerHTML;
    const msg = "HTML Copied!";
    CopyFunctions.copyCustomCode(e, modifiedCode, msg);
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

    if (chosenAddStyle == "") {
      // No "Add Method" chosen
      addStyleBox.style.color = "red";
      addStyleBox.style.borderColor = "red";
      setTimeout(() => {
        addStyleBox.style.color = "";
        addStyleBox.style.borderColor = "";
      }, 1500);
      Functions.showMsg(e, 'Choose from "Add Method:" first!', 2000);
      return;
    }

    if (chosenHTML == "") {
      // Nothing chosen
      Functions.showMsg(e, "Write an element!", 2000);
      return;
    }

    if (!HTMLList.includes(chosenHTML)) {
      // Element don't exist
      Functions.showMsg(e, "Invalid element!", 2000);
      return;
    }

    const grabGreenFieldset = document.querySelector(".FEFBEactiveFieldset");
    const elementforms = document.querySelector("[data-formid]");
    if (grabGreenFieldset == null && elementforms != null) {
      // Element don't exist
      elementInput.value = "";
      Functions.showMsg(e, 'Choose an "Element #<number>:" below first!', 3000);
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
      e.preventDefault();
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
    // Clicked on "LEGENDS"? Changing what is the current one to add next element in relationship to.
    if (e.target.matches("[data-legendid]")) {
      // Grab correct id to also change inside of #FEFBEoutput to correct one
      const targetOutputElementId = e.target.dataset.belongstoelementid;
      const correctOutputEl = document.querySelector(
        `[data-elementid="${targetOutputElementId}"]`
      );
      // Change clicked on to the active one and deactivate the previously active one.
      if (!e.target.parentNode.classList[1]) {
        // Grab current active Fieldset and current active element in OUTPUT
        const activeLegend = document.querySelector(".FEFBEactiveFieldset");
        const activeOutput = document.querySelector(
          '[data-outputcurrentactive="yes"]'
        );
        // Mark current active in HTML Tab and also in the OUTPUT by adding and setting.
        e.target.parentNode.classList.add("FEFBEactiveFieldset");
        correctOutputEl.setAttribute("data-outputcurrentactive", "yes");
        // Only remove the class if it exists
        if (activeLegend) {
          activeLegend.classList.remove("FEFBEactiveFieldset");
        }
        // Only remove data-attribute if it exists
        if (activeOutput) {
          activeOutput.removeAttribute("data-outputcurrentactive");
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
    // Only execute code after pressed Enter
    if (e.key !== "Enter" || e.keyCode !== 13) {
      return;
    }
    // output, correctid, correctinput = used by all if statements below
    const correctid = e.target.dataset.belongstoelementid;
    const correctinput = e.target.value;
    const output = document.getElementById("FEFBEoutput");
    const correctoutputel = output.querySelector(
      `[data-elementid="${correctid}"]`
    );

    // Find and change attributes:"data-idid","data-classid", "data-hrefid", "data-srcid"
    // It does NOT work with "Other", "textContent" or "innerHTML"
    if (
      e.target.matches(
        `[data-attributetype="${
          singleAttributesHTMLTab[e.target.dataset.attributetype]
        }"]`
      )
    ) {
      // Pressed ENTER inside of an `id`,`class`,`src`,`href` input field?
      if (e.key === "Enter" || e.keyCode === 13) {
        // Remove attribute when empty
        if (correctinput == "") {
          if (correctoutputel.hasAttribute(e.target.dataset.attributetype)) {
            correctoutputel.removeAttribute(e.target.dataset.attributetype);
          }
          Functions.showMsg(e, "Attribute Removed!");
          return;
        }
        // Check against keywords!
        if (
          reservedClasses.includes(correctinput) ||
          reservedIds.includes(correctinput)
        ) {
          Functions.showMsg(e, "Reserved Attribute Value. Not updated!", 3000);
          return;
        }
        // Otherwise add it
        Functions.elAttr(
          output.querySelector(`[data-elementid="${correctid}"]`),
          e.target.dataset.attributetype + "=" + correctinput
        );
        Functions.showMsg(e, "Attribute Updated!");
        return;
      }
    }

    // Pressed ENTER inside of an `textContent` input field?
    if (e.target.matches("[data-textcontentid]")) {
      if (e.key === "Enter" || e.keyCode === 13) {
        // Change textContent of `data-elementid`
        const outputid = output.querySelector(
          `[data-elementid="${correctid}"]`
        );
        outputid.textContent = correctinput;
        Functions.showMsg(e, "textContent Updated!");
      }
      return;
    }

    // Pressed ENTER inside of an `Other` input field?
    // TODO LATER: Validate to not allow input reserved (data-, #ids & .classes) OR duplicate attributes
    if (e.target.matches("[data-otherattributesid]")) {
      if (e.key === "Enter" || e.keyCode === 13) {
        // Not allowed to use "id" or "class" attributes.
        if (reservedAttributes.includes(correctinput)) {
          Functions.showMsg(e, "Reserved attribute. Not updated!", 3000);
          return;
        }
        // Not allowed to use "data-XXX" (dataset) attributes.
        if (correctinput.includes("data-")) {
          Functions.showMsg(
            e,
            "Data attributes Not Allowed. Not updated!",
            3000
          );
          return;
        }
        // Clear list of other attributes when empty
        if (correctinput == "") {
          if (correctoutputel.hasAttribute("data-storedothers")) {
            const otherattrs = correctoutputel.dataset.storedothers;
            const otherattrsArr = otherattrs.split(",");
            const l = otherattrsArr.length;
            for (let i = 0; i < l; i++) {
              correctoutputel.removeAttribute(otherattrsArr[i]);
            }
            correctoutputel.removeAttribute("data-storedothers");
            return;
          }
          Functions.showMsg(e, "Other attributes removed!", 3000);
          return;
        }

        // Insert list of other attributes when not empty
        if (correctinput != "") {
          // First check if previous ones existed and just "reset" things to insert new ones.
          if (correctoutputel.hasAttribute("data-storedothers")) {
            const otherattrs = correctoutputel.dataset.storedothers;
            const otherattrsArr = otherattrs.split(",");
            const l = otherattrsArr.length;
            for (let i = 0; i < l; i++) {
              correctoutputel.removeAttribute(otherattrsArr[i]);
            }
          }

          // Change its other attributes of `data-elementid`
          Functions.elAttrOther(
            output.querySelector(`[data-elementid="${correctid}"]`),
            correctinput
          );
          Functions.showMsg(e, "Other attributes updated!", 3000);
          return;
        }
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
    // Only execute code after pressed Enter
    if (e.key !== "Enter" || e.keyCode !== 13) {
      return;
    }
  });

  /***********************************************
  END OF MASSIVE GLOBAL EVENT DELEGATION LISTENERS
  ***********************************************/

  // TODO: Delete when done, used for testing purposes
  CSSFunctions.setCSSRuleOutputSheet("main", "border", "5px solid grey");
  CSSFunctions.setCSSRuleOutputSheet("nav", "border", "5px solid pink");
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

  // END OF "DOMCONTENTLOADED" Event Listening Function
}); // END OF "DOMCONTENTLOADED" Event Listening Function
