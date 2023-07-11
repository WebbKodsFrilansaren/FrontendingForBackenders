import { jsonData } from "./globals/jsondata.js";
import { increaseCounter } from "./globals/functions.js";
import {
  cssRulesWithVendor,
  elementsWithTextContent,
} from "./globals/variables.js";
import { elCreate } from "./globals/functions.js";

/***************************
 CONTINUING GLOBAL VARIABLES
***************************/
// Counters
let elementCounter = 0;
let saveHTMLBtnCounter = 0;
let deleteHTMLBtnCounter = 0;
let cssRuleCounter = 0;
let saveCSSBtnCounter = 0;
let deleteCSSBtnCounter = 0;
let idCounter = 0;
let classCounter = 0;
let formCounter = 0;
let fieldsetCounter = 0;
let legendCounter = 0;

let labelCounter = 0;
let inputCounter = 0;
let datalistCounter = 0;

// StyleSheets
const mainStyleSheet = document.styleSheets[0];
const outputStyleSheet = new CSSStyleSheet();

let nextMega = `-moz-animation
-moz-animation-delay
-moz-animation-direction
-moz-animation-duration
-moz-animation-fill-mode
-moz-animation-iteration-count
-moz-animation-name
-moz-animation-play-state
-moz-animation-timing-function
-moz-appearance
-moz-backface-visibility
-moz-border-end
-moz-border-end-color
-moz-border-end-style
-moz-border-end-width
-moz-border-image
-moz-border-start
-moz-border-start-color
-moz-border-start-style
-moz-border-start-width
-moz-box-align
-moz-box-direction
-moz-box-flex
-moz-box-ordinal-group
-moz-box-orient
-moz-box-pack
-moz-box-sizing
-moz-float-edge
-moz-font-feature-settings
-moz-font-language-override
-moz-force-broken-image-icon
-moz-hyphens
-moz-margin-end
-moz-margin-start
-moz-orient
-moz-padding-end
-moz-padding-start
-moz-perspective
-moz-perspective-origin
-moz-tab-size
-moz-text-size-adjust
-moz-transform
-moz-transform-origin
-moz-transform-style
-moz-transition
-moz-transition-delay
-moz-transition-duration
-moz-transition-property
-moz-transition-timing-function
-moz-user-focus
-moz-user-input
-moz-user-modify
-moz-user-select
-moz-window-dragging
-webkit-align-content
-webkit-align-items
-webkit-align-self
-webkit-animation
-webkit-animation-delay
-webkit-animation-direction
-webkit-animation-duration
-webkit-animation-fill-mode
-webkit-animation-iteration-count
-webkit-animation-name
-webkit-animation-play-state
-webkit-animation-timing-function
-webkit-appearance
-webkit-backface-visibility
-webkit-background-clip
-webkit-background-origin
-webkit-background-size
-webkit-border-bottom-left-radius
-webkit-border-bottom-right-radius
-webkit-border-image
-webkit-border-radius
-webkit-border-top-left-radius
-webkit-border-top-right-radius
-webkit-box-align
-webkit-box-direction
-webkit-box-flex
-webkit-box-ordinal-group
-webkit-box-orient
-webkit-box-pack
-webkit-box-shadow
-webkit-box-sizing
-webkit-clip-path
-webkit-filter
-webkit-flex
-webkit-flex-basis
-webkit-flex-direction
-webkit-flex-flow
-webkit-flex-grow
-webkit-flex-shrink
-webkit-flex-wrap
-webkit-justify-content
-webkit-line-clamp
-webkit-mask
-webkit-mask-clip
-webkit-mask-composite
-webkit-mask-image
-webkit-mask-origin
-webkit-mask-position
-webkit-mask-position-x
-webkit-mask-position-y
-webkit-mask-repeat
-webkit-mask-size
-webkit-order
-webkit-perspective
-webkit-perspective-origin
-webkit-text-fill-color
-webkit-text-security
-webkit-text-size-adjust
-webkit-text-stroke
-webkit-text-stroke-color
-webkit-text-stroke-width
-webkit-transform
-webkit-transform-origin
-webkit-transform-style
-webkit-transition
-webkit-transition-delay
-webkit-transition-duration
-webkit-transition-property
-webkit-transition-timing-function
-webkit-user-select
accent-color
align-content
align-items
align-self
all
animation
animation-composition
animation-delay
animation-direction
animation-duration
animation-fill-mode
animation-iteration-count
animation-name
animation-play-state
animation-timing-function
appearance
aspect-ratio
backdrop-filter
backface-visibility
background
background-attachment
background-blend-mode
background-clip
background-color rgb(255, 170, 0)
background-image
background-origin
background-position
background-position-x
background-position-y
background-repeat
background-size
baseline-source
block-size
border
border-block
border-block-color
border-block-end
border-block-end-color
border-block-end-style
border-block-end-width
border-block-start
border-block-start-color
border-block-start-style
border-block-start-width
border-block-style
border-block-width
border-bottom
border-bottom-color
border-bottom-left-radius
border-bottom-right-radius
border-bottom-style
border-bottom-width
border-collapse
border-color
border-end-end-radius
border-end-start-radius
border-image
border-image-outset
border-image-repeat
border-image-slice
border-image-source
border-image-width
border-inline
border-inline-color
border-inline-end
border-inline-end-color
border-inline-end-style
border-inline-end-width
border-inline-start
border-inline-start-color
border-inline-start-style
border-inline-start-width
border-inline-style
border-inline-width
border-left
border-left-color
border-left-style
border-left-width
border-radius
border-right
border-right-color
border-right-style
border-right-width
border-spacing
border-start-end-radius
border-start-start-radius
border-style
border-top
border-top-color
border-top-left-radius
border-top-right-radius
border-top-style
border-top-width
border-width
bottom
box-decoration-break
box-shadow
box-sizing
break-after
break-before
break-inside
caption-side
caret-color
clear
clip
clip-path
clip-rule
color
color-adjust
color-interpolation
color-interpolation-filters
color-scheme
column-count
column-fill
column-gap
column-rule
column-rule-color
column-rule-style
column-rule-width
column-span
column-width
columns
contain
contain-intrinsic-block-size
contain-intrinsic-height
contain-intrinsic-inline-size
contain-intrinsic-size
contain-intrinsic-width
container
container-name
container-type
content
counter-increment
counter-reset
counter-set
cursor
cx
cy
d
direction
display
dominant-baseline
empty-cells
fill
fill-opacity
fill-rule
filter
flex
flex-basis
flex-direction
flex-flow
flex-grow
flex-shrink
flex-wrap
float
flood-color
flood-opacity
font
font-family
font-feature-settings
font-kerning
font-language-override
font-optical-sizing
font-palette
font-size
font-size-adjust
font-stretch
font-style
font-synthesis
font-synthesis-small-caps
font-synthesis-style
font-synthesis-weight
font-variant
font-variant-alternates
font-variant-caps
font-variant-east-asian
font-variant-ligatures
font-variant-numeric
font-variant-position
font-variation-settings
font-weight
forced-color-adjust
gap
grid
grid-area
grid-auto-columns
grid-auto-flow
grid-auto-rows
grid-column
grid-column-end
grid-column-gap
grid-column-start
grid-gap
grid-row
grid-row-end
grid-row-gap
grid-row-start
grid-template
grid-template-areas
grid-template-columns
grid-template-rows
height
hyphenate-character
hyphens
image-orientation
image-rendering
ime-mode
inline-size
inset
inset-block
inset-block-end
inset-block-start
inset-inline
inset-inline-end
inset-inline-start
isolation
justify-content
justify-items
justify-self
left
letter-spacing
lighting-color
line-break
line-height
list-style
list-style-image
list-style-position
list-style-type
margin
margin-block
margin-block-end
margin-block-start
margin-bottom
margin-inline
margin-inline-end
margin-inline-start
margin-left
margin-right
margin-top
marker
marker-end
marker-mid
marker-start
mask
mask-clip
mask-composite
mask-image
mask-mode
mask-origin
mask-position
mask-position-x
mask-position-y
mask-repeat
mask-size
mask-type
max-block-size
max-height
max-inline-size
max-width
min-block-size
min-height
min-inline-size
min-width
mix-blend-mode
object-fit
object-position
offset
offset-anchor
offset-distance
offset-path
offset-rotate
opacity
order
outline
outline-color
outline-offset
outline-style
outline-width
overflow
overflow-anchor
overflow-block
overflow-clip-margin
overflow-inline
overflow-wrap
overflow-x
overflow-y
overscroll-behavior
overscroll-behavior-block
overscroll-behavior-inline
overscroll-behavior-x
overscroll-behavior-y
padding
padding-block
padding-block-end
padding-block-start
padding-bottom
padding-inline
padding-inline-end
padding-inline-start
padding-left
padding-right
padding-top
page
page-break-after
page-break-before
page-break-inside
paint-order
perspective
perspective-origin
place-content
place-items
place-self
pointer-events
position
print-color-adjust
quotes
r
resize
right
rotate
row-gap
ruby-align
ruby-position
rx
ry
scale
scroll-behavior
scroll-margin
scroll-margin-block
scroll-margin-block-end
scroll-margin-block-start
scroll-margin-bottom
scroll-margin-inline
scroll-margin-inline-end
scroll-margin-inline-start
scroll-margin-left
scroll-margin-right
scroll-margin-top
scroll-padding
scroll-padding-block
scroll-padding-block-end
scroll-padding-block-start
scroll-padding-bottom
scroll-padding-inline
scroll-padding-inline-end
scroll-padding-inline-start
scroll-padding-left
scroll-padding-right
scroll-padding-top
scroll-snap-align
scroll-snap-stop
scroll-snap-type
scrollbar-color
scrollbar-gutter
scrollbar-width
shape-image-threshold
shape-margin
shape-outside
shape-rendering
stop-color
stop-opacity
stroke
stroke-dasharray
stroke-dashoffset
stroke-linecap
stroke-linejoin
stroke-miterlimit
stroke-opacity
stroke-width
tab-size
table-layout
text-align
text-align-last
text-anchor
text-combine-upright
text-decoration
text-decoration-color
text-decoration-line
text-decoration-skip-ink
text-decoration-style
text-decoration-thickness
text-emphasis
text-emphasis-color
text-emphasis-position
text-emphasis-style
text-indent
text-justify
text-orientation
text-overflow
text-rendering
text-shadow
text-transform
text-underline-offset
text-underline-position
top
touch-action
transform
transform-box
transform-origin
transform-style
transition
transition-delay
transition-duration
transition-property
transition-timing-function
translate
unicode-bidi
user-select
vector-effect
vertical-align
visibility
white-space
width
will-change
word-break
word-spacing
word-wrap
writing-mode
x
y
z-index`;

/******************
  GLOBAL FUNCTIONS
******************/
// Add New HTML element to the shadowDOM
function addElementToShadowDOM(element, appendType, smartAddingchecked) {
  // Grab shadowDOM & create element
  const output = document.getElementById("FEFBEoutput");
  const shadowDOM = output.shadowRoot;
  const createEl = document.createElement(element);
  elementCounter = increaseCounter(elementCounter);
  createEl.setAttribute("data-elementid", elementCounter);

  // Now check whether any elements exists first at all
  if (shadowDOM.firstChild == null) {
    if (appendType == "append") {
      shadowDOM.append(createEl);
    }
    if (appendType == "appendChild") {
      shadowDOM.appendChild(createEl);
    }
    console.log(shadowDOM);
  } // Grab the last item no matter its level using querySelectorAll data-elementid and reduce it down to the largest id number
  else {
    // Get all elements with data-elementid attribute
    const elements = Array.from(shadowDOM.querySelectorAll("[data-elementid]"));
    console.log(elements);

    if (elements.length > 0) {
      // Find the element with the highest data-elementid value by using reduce
      const maxIdElement = elements.reduce((prev, current) => {
        const prevId = parseInt(prev.getAttribute("data-elementid"));
        const currId = parseInt(current.getAttribute("data-elementid"));
        // Just always return the biggest number since two numbers never can be of equal value
        return prevId > currId ? prev : current;
      });

      // Then append after sibling element
      if (appendType === "append") {
        maxIdElement.after(createEl);
      } // Or append as a first child element
      else if (appendType === "appendChild") {
        maxIdElement.appendChild(createEl);
      }
    }
  }
  // After adding element, then check if smart adding was checked
  // If checked, change selected based on what previously added to speed up common addings
  if (smartAddingchecked == true) {
    smartAddingChanger(element, appendType);
  }

  // Finally, add element to the HTML Tab
  addElementToHTMLTab(element);
}

// Add added HTML element to list of added HTML elements to change its parameters
function addElementToHTMLTab(element) {
  const htmlTab = document.getElementById("FEFBEhtml");

  // Fieldset, Legend + Form <form>
  fieldsetCounter = increaseCounter(fieldsetCounter);
  const createFieldset = elCreate("fieldset", [
    "data-fieldsetid",
    fieldsetCounter,
  ]);

  legendCounter = increaseCounter(legendCounter);
  const createLegend = elCreate(
    "legend",
    ["data-legendid", legendCounter],
    "Element #" + elementCounter + ": " + element
  );

  formCounter = increaseCounter(formCounter);
  const createForm = elCreate("form", ["data-formid", formCounter]);

  // Id <input text>
  const label1 = elCreate("label", [], "id");
  idCounter = increaseCounter(idCounter);
  const createInputForId = elCreate("input", [
    "type",
    "text",
    "id",
    "",
    "data-idid",
    idCounter,
  ]);

  // class <input text>
  const label2 = elCreate("label", [], "class");
  classCounter = increaseCounter(classCounter);
  const createInputForClass = elCreate("input", [
    "class",
    "",
    "type",
    "text",
    "data-classid",
    classCounter,
  ]);

  // Appending all
  createForm.appendChild(createFieldset);
  createFieldset.appendChild(createLegend);
  createFieldset.appendChild(label1);
  createFieldset.append(createInputForId);
  createFieldset.append(label2);
  createFieldset.append(createInputForClass);

  // Check if textContent should be added by checking array of compatible elements
  if (elementsWithTextContent.includes(element)) {
    const label3 = elCreate("label", [], "textContent");
    idCounter = increaseCounter(idCounter);
    const createInputTextContent = elCreate("input", [
      "type",
      "text",
      "id",
      "",
      "data-idid",
      idCounter,
    ]);
    createFieldset.appendChild(label3);
    createFieldset.append(createInputTextContent);
  }

  // Add buttons to save and delete entire element
  deleteHTMLBtnCounter = increaseCounter(deleteHTMLBtnCounter);
  const delBtnEl = elCreate(
    "button",
    ["class", "delElements", "data-deleteHTMLid", deleteHTMLBtnCounter],
    "🗑️DELETE"
  );

  saveHTMLBtnCounter = increaseCounter(saveHTMLBtnCounter);
  const saveBtnEl = elCreate(
    "button",
    ["class", "saveElements", "data-saveHTMLid", saveHTMLBtnCounter],
    "✔️SAVE"
  );

  createFieldset.append(delBtnEl);
  createFieldset.append(saveBtnEl);

  // Finally append the entire <Form>
  htmlTab.append(createForm);

  // Add Event Listener to toggle hiding the <legend> element
  const legend = document.querySelector(
    `legend[data-legendid="${legendCounter}"]`
  );
  legend.addEventListener("click", () => {
    legend.classList.toggle("legend-siblings-hidden");
  });

  // Add Event Listener to delete element both from shadowDOM and HTML Tab
  delBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    // Confirm deleting chosen HTML element
    const confirmDelete = confirm("DELETE HTML?");
    if (!confirmDelete) {
      return;
    }
    const correctid = e.target.dataset.deletehtmlid;
    // Function that deletes both in shadowDOM and in HTML Tab
    deleteElShadowAndTab(e, correctid);
  });

  // Add Event Listener to save element attributes in shadowDOM and in HTML Tab
  saveBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);
  });
}

// Delete HTML Element both from shadowDOM and from HTML TAB
// TODO: Just replace if deleting selected shadowDOM element has children
function deleteElShadowAndTab(e, id) {
  const correctformid = document.querySelector(`[data-formid="${id}"]`);
  correctformid.remove(); // Delete from HTML TAB
  const output = document.getElementById("FEFBEoutput");
  const shadowDOM = output.shadowRoot;

  // Grab correct shadowDOM element
  const correctshadowelementid = shadowDOM.querySelector(
    `[data-elementid="${id}"]`
  );
  correctshadowelementid.remove();
}

// Smart Adding Function that changes
function smartAddingChanger(element, appendType) {
  const appendList = document.getElementById("FEFBEselectAppendStyle");
  const htmlList = document.getElementById("FEFBEselectHTML");

  // Change nav to ul since that is common
  if (htmlList.value == "nav") {
    console.log(htmlList);
    console.log(appendList);
    appendList.selectedIndex = 2;
    htmlList.selectedIndex = 66;
    return;
  }
  // Change ul/ol to li since that is common
  if (htmlList.value == "ul" || htmlList.value == "ol") {
    appendList.selectedIndex = 2;
    htmlList.selectedIndex = 68;
    return;
  }
  // Change back after first li to Append so it doesn't nest li
  if (htmlList.value == "li") {
    appendList.selectedIndex = 1;
    return;
  }
  // TODO: Add more "smart" changes between elements and adding type.
}

// Copy CSS or HTML code (using buttons "Copy HTML" & "Copy CSS")
// "e" is event object from Event Listener
// "code" is received CSS or HTML code
// "msg" is success message being shown.
function copyCustomCode(e, code, msg) {
  // Grab the code and insert into client's Clipboard (stored in CTRL+C, ready for CTRL+V)
  navigator.clipboard
    .writeText(code)
    .then(() => {
      // Create a div with styling
      let Box = document.createElement("div");
      Box.textContent = msg;
      Box.classList.add("copied"); // Class list that adds animation effect to it
      Box.style.padding = "0.7rem";
      Box.style.fontWeight = "bold";
      Box.style.border = "1px solid #ccc";
      Box.style.borderRadius = "0.5rem";
      Box.style.color = "black";
      Box.style.position = "fixed";
      Box.style.backgroundColor = "#f1f1f1";
      // Grab the (e = event) client's coordinates to position box correctly (by positioning it where you clicked)
      const x = e.clientX;
      const y = e.clientY;
      // Show it below the cursor so the text is roughly in the middle of the cursor.
      Box.style.left = `${x - 35}px`;
      Box.style.top = `${y + 20}px`;
      // Finally output it to DOM
      document.body.appendChild(Box);

      // Then remove the box after 2 seconds
      setTimeout(() => {
        Box.remove();
      }, 2500);
    })
    // Or let the user know when it does not work.
    .catch((error) => {
      alert(
        "Copying code to Clipboard FAILED. Needing permission in Browser?🤔 Error: " +
          error
      );
    });
}

// Find and set specific CSS Rule in the main stylesheet (css/styles.css)
// TODO MAYBE - LET ME KNOW HOW?: It conflicts with shadowDOM because <div id="FEFBEoutput"></div> is inside of non-ShadowDOM-elements?
// The function was really just proof-of-concept and is not fully developed.
function setCSSRuleMainSheet(selector, styleName, styleValue) {
  // .rules is an older version
  const mainRules = mainStyleSheet.cssRules || mainStyleSheet.rules;
  // Only get length once, mini-optimization
  let l = mainRules.length;
  // Loop through and set the value of specific CSS rule for existing selector.
  for (let i = 0; i < l; i++) {
    if (mainRules[i].selectorText == selector) {
      mainRules[i].style[styleName] = styleValue;
      break; // Mission complete, exit loop.
    }
  }
}

// Find and set specific CSS Rule in the Output stylesheet (also stored in json/data.json)
function setCSSRuleOutputSheet(selector, styleName, styleValue) {
  // .rules is an older version
  const outputRules = outputStyleSheet.cssRules || outputStyleSheet.rules;
  // Prepare for Looping through
  let l = outputRules.length;
  // First time when there are no rules at all.
  if (l == 0) {
    console.log("List empty. Inserting NEW rule for chosen selector!");
    outputStyleSheet.insertRule(
      `${selector} { ${styleName}: ${styleValue};}`,
      l
    );

    // Check if CSS rule also should have -moz & -webkit rule versions inserted.
    if (cssRulesWithVendor.includes(styleName)) {
      const mozVersion = "-moz-" + styleName;
      const webkitVersion = "-webkit-" + styleName;
      outputStyleSheet.insertRule(
        `${selector} { ${mozVersion}: ${styleValue};}`,
        l
      );
      outputStyleSheet.insertRule(
        `${selector} { ${webkitVersion}: ${styleValue};}`,
        l
      );
    }

    // Apply the styling to the shadowDOM
    const output = document.getElementById("FEFBEoutput");
    const shadowDOM = output.shadowRoot;
    shadowDOM.adoptedStyleSheets = [outputStyleSheet];
    return;
  }
  // If there exists rules, then loop through and change the one
  if (l > 0) {
    for (let i = 0; i < l; i++) {
      if (outputRules[i].selectorText == selector) {
        console.log("Selector exists. Changing/adding its styles!");
        outputRules[i].style[styleName] = styleValue;
        // Reapply the styling to the shadowDOM
        const output = document.getElementById("FEFBEoutput");
        const shadowDOM = output.shadowRoot;
        shadowDOM.adoptedStyleSheets = [outputStyleSheet];
        return; // Mission complete, exit loop.
      }
    }
    // We end up here when the list is not empty but the selector
    // does not exist and thus, we insert that new one.
    console.log(
      "Chosen selector does not exist and list is not empty so creating it now!"
    );
    outputStyleSheet.insertRule(
      `${selector} { ${styleName}: ${styleValue};}`,
      l
    );
    // Check if CSS rule also should have -moz & -webkit rule versions inserted.
    if (cssRulesWithVendor.includes(styleName)) {
      const mozVersion = "-moz-" + styleName;
      const webkitVersion = "-webkit-" + styleName;
      outputStyleSheet.insertRule(
        `${selector} { ${mozVersion}: ${styleValue};}`,
        l
      );
      outputStyleSheet.insertRule(
        `${selector} { ${webkitVersion}: ${styleValue};}`,
        l
      );
    }

    // Apply the styling to the shadowDOM
    const output = document.getElementById("FEFBEoutput");
    const shadowDOM = output.shadowRoot;
    shadowDOM.adoptedStyleSheets = [outputStyleSheet];
    return;
  }
}

/******************
  MAIN EXECUTION
******************/
// After "DOMCONTENTLOADED"
window.addEventListener("DOMContentLoaded", () => {
  /*********************************************
  GLOBAL VARIABLES AFTER DOMContentLoaded
  *********************************************/
  const output = document.getElementById("FEFBEoutput"); // Add & append all new elements here
  const shadowDOM = output.attachShadow({ mode: "open" }); // Use ShadowDOM to not conflict CSS
  shadowDOM.adoptedStyleSheets = [outputStyleSheet]; // Attach its own stylesheet
  // "Copy HTML" & "Copy CSS"
  const copyHTML = document.getElementById("FEFBEcopyHTML");
  const copyCSS = document.getElementById("FEFBEcopyCSS");

  // Add Buttons
  const addHTML = document.getElementById("FEFBEplus"); // + for HTML adding
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
    const code = document.getElementById("FEFBEoutput").shadowRoot.innerHTML;
    const msg = "HTML Copied!";
    copyCustomCode(e, code, msg);
  });

  /*************************************
  EVENT LISTENER TO ADD NEW HTML ELEMENT
  *************************************/
  addHTML.addEventListener("click", (e) => {
    // Grab chosen HTML Element, chosen Append Style and whether Smart Adding was checked
    let chosenHTML = e.target.previousElementSibling.value;
    let chosenAddStyle =
      e.target.previousElementSibling.previousElementSibling.value;
    let smartAddingchecked =
      e.target.previousElementSibling.previousElementSibling
        .previousElementSibling.checked;
    if (chosenHTML == "") {
      alert("Choose an element!");
      return;
    }
    if (chosenAddStyle == "") {
      alert("Choose how you want to add the element!");
      return;
    }
    addElementToShadowDOM(chosenHTML, chosenAddStyle, smartAddingchecked);
  });

  // JUST TESTING
  console.log(shadowDOM);
  setCSSRuleOutputSheet("li", "border", "3px solid black");

  // END OF "DOMCONTENTLOADED" Event Listening Function
}); // END OF "DOMCONTENTLOADED" Event Listening Function
