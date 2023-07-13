/*************************************************************
 HTMLfunctions.js - All functions used primarily on "HTML" TAB
*************************************************************/
import {
  counters,
  elementsWithHrefAttribute,
  elementsWithSrcAttribute,
  elementsWithTextContent,
} from "../data/variables.js";
import { increaseCounter } from "./functions.js";
import { elCreate } from "./functions.js";

// Add New HTML element to the "shadowDOM"
function addElementToShadowDOM(element, appendType, smartAddingchecked) {
  // Grab shadowDOM & create element
  const output = document.getElementById("FEFBEoutput");
  const createEl = document.createElement(element);
  counters.elementCounter = increaseCounter(counters.elementCounter);
  createEl.setAttribute("data-elementid", counters.elementCounter);

  // Now check whether any elements exists first at all
  if (output.firstChild == null) {
    if (appendType == "append") {
      output.append(createEl);
    }
    if (appendType == "appendChild") {
      output.appendChild(createEl);
    }
  } // Grab the last item no matter its level using querySelectorAll data-elementid and reduce it down to the largest id number
  else {
    // Get all elements with data-elementid attribute
    const elements = Array.from(output.querySelectorAll("[data-elementid]"));

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

// FUNCTION: "addElementToHTMLTab"
// Add added HTML element to list of added HTML elements to change its parameters
function addElementToHTMLTab(element) {
  const htmlTab = document.getElementById("FEFBEhtml");
  const numberOfAddedElements = document.querySelectorAll("[data-fieldsetid]");
  let firstTime = false;
  if (numberOfAddedElements.length == 0) {
    firstTime = true;
  }

  // Fieldset, Legend + Form <form>
  counters.fieldsetCounter = increaseCounter(counters.fieldsetCounter);
  const createFieldset = elCreate("fieldset", [
    "data-fieldsetid",
    counters.fieldsetCounter,
    "class",
    "FEFBEfieldsets",
  ]);

  // Mark Legend text green if it is first element
  if (firstTime) {
    createFieldset.classList.add("FEFBEactiveFieldset");
  }

  counters.legendCounter = increaseCounter(counters.legendCounter);
  const createLegend = elCreate(
    "legend",
    ["data-legendid", counters.legendCounter, "class", "FEFBElegends"],
    "Element #" + counters.elementCounter + ": <" + element + ">"
  );

  counters.formCounter = increaseCounter(counters.formCounter);
  const createForm = elCreate("form", ["data-formid", counters.formCounter]);

  // Id <input text>
  const label1 = elCreate("label", [], "id");
  counters.idCounter = increaseCounter(counters.idCounter);
  const createInputForId = elCreate("input", [
    "type",
    "text",
    "id",
    "",
    "class",
    "FEFBEinputs",
    "data-idid",
    counters.idCounter,
  ]);

  // class <input text>
  const label2 = elCreate("label", [], "class");
  counters.classCounter = increaseCounter(counters.classCounter);
  const createInputForClass = elCreate("input", [
    "class",
    "FEFBEinputs",
    "type",
    "text",
    "class",
    "FEFBEinputs",
    "data-classid",
    counters.classCounter,
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
    counters.textContentCounter = increaseCounter(counters.textContentCounter);
    const createInputTextContent = elCreate("input", [
      "type",
      "text",
      "id",
      "",
      "class",
      "FEFBEinputs",
      "data-textcontentid",
      counters.textContentCounter,
    ]);
    createFieldset.appendChild(label3);
    createFieldset.append(createInputTextContent);
  }
  // Check if href should be added by checking array of compatible elemnts
  if (elementsWithHrefAttribute.includes(element)) {
    const label4 = elCreate("label", [], "href");
    counters.hrefCounter = increaseCounter(counters.hrefCounter);
    const createInputHref = elCreate("input", [
      "type",
      "text",
      "title",
      "href: Enter link source or the hypertext reference here, without quotes",
      "id",
      "",
      "class",
      "FEFBEinputs",
      "data-hrefid",
      counters.hrefCounter,
    ]);
    createFieldset.appendChild(label4);
    createFieldset.append(createInputHref);
  }

  // Check if src should be added by checking array of compatible elemnts
  if (elementsWithSrcAttribute.includes(element)) {
    const label5 = elCreate("label", [], "src");
    counters.srcCounter = increaseCounter(counters.srcCounter);
    const createInputSrc = elCreate("input", [
      "type",
      "text",
      "title",
      "src: Enter source to images or other files, just enter path without quotes",
      "id",
      "",
      "class",
      "FEFBEinputs",
      "data-srcid",
      counters.hrefCounter,
    ]);
    createFieldset.appendChild(label5);
    createFieldset.append(createInputSrc);
  }

  const label6 = elCreate("label", [], "Other");
  counters.otherAttributesCounter = increaseCounter(
    counters.otherAttributesCounter
  );
  const createInputOtherAttributes = elCreate("input", [
    "type",
    "text",
    "title",
    "Other: Enter other element attributes here in the style of attr=value|attr=value",
    "id",
    "",
    "class",
    "FEFBEinputs",
    "data-otherattributesid",
    counters.otherAttributesCounter,
  ]);
  createFieldset.appendChild(label6);
  createFieldset.append(createInputOtherAttributes);

  // Add buttons to save and delete entire element
  counters.deleteHTMLBtnCounter = increaseCounter(
    counters.deleteHTMLBtnCounter
  );
  const delBtnEl = elCreate(
    "button",
    [
      "class",
      "FEFBEdelElements",
      "data-deleteHTMLid",
      counters.deleteHTMLBtnCounter,
    ],
    "🗑️DELETE"
  );

  counters.saveHTMLBtnCounter = increaseCounter(counters.saveHTMLBtnCounter);
  const saveBtnEl = elCreate(
    "button",
    [
      "class",
      "FEFBEsaveElements",
      "data-saveHTMLid",
      counters.saveHTMLBtnCounter,
    ],
    "✔️SAVE"
  );

  createFieldset.append(delBtnEl);
  createFieldset.append(saveBtnEl);

  // Finally append the entire <Form>
  if (firstTime) {
    htmlTab.append(createForm);
  } else {
    const grabGreenFieldset = document.querySelector(".FEFBEactiveFieldset");
    grabGreenFieldset.after(createForm);
  }

  // Add Event Listener to toggle hiding the <legend> element
  const legend = document.querySelector(
    `legend[data-legendid="${counters.legendCounter}"]`
  );
  legend.addEventListener("click", () => {
    legend.classList.toggle("FEFBElegend-siblings-hidden");
  });

  // Add Event Listener to delete element both from shadowDOM and HTML Tab
  delBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    // Confirm deleting chosen HTML element
    const fieldsetLegendItem = e.target.parentNode.firstChild.textContent;
    const confirmDelete = confirm("Delete: '" + fieldsetLegendItem + "' ?");
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
function deleteElShadowAndTab(e, id) {
  const correctformid = document.querySelector(`[data-formid="${id}"]`);
  correctformid.remove(); // Delete from HTML TAB
  const output = document.getElementById("FEFBEoutput");

  // Grab correct shadowDOM element
  const correctOutputElement = output.querySelector(`[data-elementid="${id}"]`);

  // Then check if it has children
  // This works but I do not understand 100% why the `else` is never ran
  // Or how it is able to delete even first added item which is always a child item.
  // How is that removed without removing its parent which would be `#FEFBEoutput`.
  const parentNodeCheck = correctOutputElement.parentNode;
  if (parentNodeCheck?.children?.length > 0) {
    correctOutputElement.replaceWith(...correctOutputElement.childNodes);
  } else {
    console.log("Normal");
    correctOutputElement.remove();
  }
}

// Smart Adding Function that changes
function smartAddingChanger(element, appendType) {
  const appendList = document.getElementById("FEFBEselectAppendStyle");
  const htmlList = document.getElementById("FEFBEchosenHTMLElement");

  // Change nav to ul since that is common
  if (htmlList.value == "nav") {
    appendList.selectedIndex = 2;
    htmlList.value = "ul";
    return;
  }
  // Change ul/ol to li since that is common
  if (htmlList.value == "ul" || htmlList.value == "ol") {
    appendList.selectedIndex = 2;
    htmlList.value = "li";
    return;
  }
  // Change back after first li to Append so it doesn't nest li
  if (htmlList.value == "li") {
    appendList.selectedIndex = 1;
    return;
  }
  // TODO: Add more "smart" changes between elements and adding type.
}

export {
  addElementToShadowDOM,
  addElementToHTMLTab,
  smartAddingChanger,
  deleteElShadowAndTab,
};
