/*************************************************************
 HTMLfunctions.js - All functions used primarily on "HTML" TAB
*************************************************************/
import {
  counters,
  elementsWithHrefAttribute,
  elementsWithSrcAttribute,
  elementsWithTextContent,
  reservedAttributes,
  reservedClasses,
  reservedIds,
} from "../data/variables.js";
import { Functions } from "./functions.js";
//import { increaseCounter } from "./functions.js";

const HTMLFunctions = {
  // "calculateDepth" counts the number of parentNodes starting from received `element`. Stops
  // at parentNode "FEFBEoutput" which is the # of that div where all HTML is contained within.
  // THANKS TO CHATGPT3.5, slightly fixed the while-loop.
  outputDOMDepth: function (element) {
    // Commenting so I show that I understand what I am using:
    // Start at depth 0 and let currentNode be the received element
    let depth = 0;
    let currentNode = element;
    // While the currentNodes parentNode is not the FEFBEoutput div
    while (
      currentNode.parentNode &&
      currentNode.parentNode.id !== "FEFBEoutput"
    ) {
      // Then add depth counter and change the currentNode to its
      // parentNode making the next currentNode.parentNode going one step up the DOM
      depth++;
      currentNode = currentNode.parentNode;
    }
    // Return the final depth based on how many levels we have traversed up inside of the FEFBEoutput div for each element added there.
    // This is HIGHLY inefficient, but works though...
    return depth;
  },

  // "formDepth:" adds Marginleft styling to each <form> element by
  //  counting the depth of the DOM inside of the FEFBEoutput div.
  // THANKS TO CHATGPT3.5, adapted it to my JS module structure.
  // Commenting so I show that I understand what I am using:
  formDepth: function () {
    const forms = document.querySelectorAll("#FEFBEhtml > form");
    // For each <form> element inside of the HTML Tab...
    forms.forEach((form) => {
      // ...First grab its id to select that same element inside of the #FEFBEoutput...
      const formId = form.dataset.formid;
      const element = document.querySelector(`[data-elementid="${formId}"]`);
      // ...Then use the caluclateDepth() function to retrieve depth value...
      const depth = HTMLFunctions.outputDOMDepth(element);
      // ...which is then multiplied with 8 so the marginLeft is actually somewhat visible.
      const marginLeft = depth * 8 + "px";
      form.style.marginLeft = marginLeft;
    });
  },

  // Add New HTML element to the "shadowDOM"
  addElementToShadowDOM: function (element, appendType, smartAddingchecked) {
    // Grab shadowDOM & create element
    const addMethodList = document.getElementById("FEFBEselectAppendStyle");
    const output = document.getElementById("FEFBEoutput");
    const createEl = document.createElement(element);
    counters.elementCounter = Functions.increaseCounter(
      counters.elementCounter
    );
    createEl.setAttribute("data-elementid", counters.elementCounter);

    // Now check whether any elements exists first at all
    if (output.firstChild == null) {
      output.append(createEl);
      // Set what is current active output element so it is consistent with the greenlighted one in the HTML Tab.
      createEl.setAttribute("data-outputcurrentactive", "yes");
    } // Grab the last item no matter its level using querySelectorAll data-elementid and reduce it down to the largest id number
    else {
      const currentActiveOutputElement = document.querySelector(
        "[data-outputcurrentactive='yes']"
      );

      // First child in FEFBEoutput div
      if (appendType == "rootfirst") {
        output.prepend(createEl);
      }

      // Last child in FEFBEoutput div
      if (appendType == "rootlast") {
        output.append(createEl);
      }

      if (appendType == "siblingafter") {
        currentActiveOutputElement.after(createEl);
      }

      if (appendType == "siblingbefore") {
        currentActiveOutputElement.before(createEl);
      }

      if (appendType == "appendFirst") {
        currentActiveOutputElement.insertAdjacentElement(
          "afterbegin",
          createEl
        );
      }

      if (appendType == "appendLast") {
        currentActiveOutputElement.append(createEl);
      }

      // Then switch which is Current Active OUTPUT Element!
      createEl.setAttribute("data-outputcurrentactive", "yes");
      currentActiveOutputElement.removeAttribute("data-outputcurrentactive");
    }

    // Also change green-lighted fieldset to correct one!
    const correctGreenFieldSetId = createEl.dataset.elementid;

    // Then add element to the HTML Tab (the form with fieldset element)
    HTMLFunctions.addElementToHTMLTab(element, correctGreenFieldSetId);

    // Finally, after adding element, then check if smart adding was checked
    // If checked, change selected based on what previously added to speed up common addings
    if (smartAddingchecked == true) {
      HTMLFunctions.smartAddingChanger(element, appendType);
    }

    // Update styles for form elements
    HTMLFunctions.formDepth();
    return;
  },

  // FUNCTION: "addElementToHTMLTab"
  // Add added HTML element to list of added HTML elements to change its parameters
  addElementToHTMLTab: function (element, correctGreenId) {
    const htmlTab = document.getElementById("FEFBEhtml");
    const numberOfAddedElements =
      document.querySelectorAll("[data-fieldsetid]");
    let firstTime = false;
    if (numberOfAddedElements.length == 0) {
      firstTime = true;
    }

    // Fieldset, Legend + Form <form>
    counters.fieldsetCounter = Functions.increaseCounter(
      counters.fieldsetCounter
    );
    const createFieldset = Functions.elCreate("fieldset", [
      "data-fieldsetid",
      counters.fieldsetCounter,
      "class",
      "FEFBEfieldsets",
      "data-belongstoelementid",
      counters.elementCounter,
    ]);

    // Mark Legend text green if it is first element
    if (firstTime) {
      createFieldset.classList.add("FEFBEactiveFieldset");
    }

    counters.legendCounter = Functions.increaseCounter(counters.legendCounter);
    const createLegend = Functions.elCreate(
      "legend",
      [
        "data-legendid",
        counters.legendCounter,
        "class",
        "FEFBElegends",
        "data-belongstoelementid",
        counters.elementCounter,
      ],
      "Element #" + counters.elementCounter + ": <" + element + ">"
    );

    counters.formCounter = Functions.increaseCounter(counters.formCounter);
    const createForm = Functions.elCreate("form", [
      "data-formid",
      counters.formCounter,
      "data-belongstoelementid",
      counters.elementCounter,
    ]);

    // Id <input text>
    const label1 = Functions.elCreate("label", ["class", "FEFBElabels"], "id");
    counters.idCounter = Functions.increaseCounter(counters.idCounter);
    const createInputForId = Functions.elCreate("input", [
      "type",
      "text",
      "class",
      "FEFBEinputs",
      "data-idid",
      counters.idCounter,
      "data-belongstoelementid",
      counters.elementCounter,
      "placeholder",
      "Without #",
      "data-attributetype",
      "id",
      "data-currentvalue",
      "",
    ]);

    // class <input text>
    const label2 = Functions.elCreate(
      "label",
      ["class", "FEFBElabels"],
      "classes"
    );
    counters.classCounter = Functions.increaseCounter(counters.classCounter);
    const createInputForClass = Functions.elCreate("input", [
      "class",
      "FEFBEinputs",
      "type",
      "text",
      "class",
      "FEFBEinputs",
      "data-classid",
      counters.classCounter,
      "data-belongstoelementid",
      counters.elementCounter,
      "placeholder",
      "Without .",
      "data-attributetype",
      "class",
      "data-currentvalue",
      "",
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
      const label3 = Functions.elCreate(
        "label",
        ["class", "FEFBElabels"],
        "textContent"
      );
      counters.textContentCounter = Functions.increaseCounter(
        counters.textContentCounter
      );
      const createInputTextContent = Functions.elCreate("input", [
        "type",
        "text",
        "class",
        "FEFBEinputs",
        "data-textcontentid",
        counters.textContentCounter,
        "data-belongstoelementid",
        counters.elementCounter,
        "data-attributetype",
        "textContent",
        "data-currentvalue",
        "",
      ]);
      createFieldset.appendChild(label3);
      createFieldset.append(createInputTextContent);
    }
    // Check if href should be added by checking array of compatible elemnts
    if (elementsWithHrefAttribute.includes(element)) {
      const label4 = Functions.elCreate(
        "label",
        ["class", "FEFBElabels"],
        "href"
      );
      counters.hrefCounter = Functions.increaseCounter(counters.hrefCounter);
      const createInputHref = Functions.elCreate("input", [
        "type",
        "text",
        "title",
        "href: Enter link source or the hypertext reference here, without quotes",
        "class",
        "FEFBEinputs",
        "data-hrefid",
        counters.hrefCounter,
        "data-belongstoelementid",
        counters.elementCounter,
        "placeholder",
        'Without ""',
        "data-attributetype",
        "href",
        "data-currentvalue",
        "",
      ]);
      createFieldset.appendChild(label4);
      createFieldset.append(createInputHref);
    }

    // If element is <img> then add `alt` input field
    if (element == "img") {
      const altLabel = Functions.elCreate(
        "label",
        ["class", "FEFBElabels"],
        "alt"
      );
      counters.altCounter = Functions.increaseCounter(counters.altCounter);
      const createInputAlt = Functions.elCreate("input", [
        "type",
        "text",
        "title",
        "alt: Write alternative image description here",
        "class",
        "FEFBEinputs",
        "data-altid",
        counters.altCounter,
        "data-belongstoelementid",
        counters.elementCounter,
        "placeholder",
        'Without ""',
        "data-attributetype",
        "alt",
        "data-currentvalue",
        "",
      ]);
      createFieldset.appendChild(altLabel);
      createFieldset.append(createInputAlt);
    }

    // Check if src should be added by checking array of compatible elemnts
    if (elementsWithSrcAttribute.includes(element)) {
      const label5 = Functions.elCreate(
        "label",
        ["class", "FEFBElabels"],
        "src"
      );
      counters.srcCounter = Functions.increaseCounter(counters.srcCounter);
      const createInputSrc = Functions.elCreate("input", [
        "type",
        "text",
        "title",
        "src: Enter source to images or other files, just enter path without quotes",
        "class",
        "FEFBEinputs",
        "data-srcid",
        counters.srcCounter,
        "data-belongstoelementid",
        counters.elementCounter,
        "placeholder",
        'Without ""',
        "data-attributetype",
        "src",
        "data-currentvalue",
        "",
      ]);
      createFieldset.appendChild(label5);
      createFieldset.append(createInputSrc);
    }

    const label6 = Functions.elCreate(
      "label",
      ["class", "FEFBElabels"],
      "Other"
    );
    counters.otherAttributesCounter = Functions.increaseCounter(
      counters.otherAttributesCounter
    );
    const createInputOtherAttributes = Functions.elCreate("input", [
      "type",
      "text",
      "title",
      "Other: Enter other element attributes here in the style of attr=value|attr=value",
      "class",
      "FEFBEinputs",
      "data-otherattributesid",
      counters.otherAttributesCounter,
      "data-belongstoelementid",
      counters.elementCounter,
      "placeholder",
      "attr1=val1|attr2=val2",
      "data-attributetype",
      "other",
    ]);
    createFieldset.appendChild(label6);
    createFieldset.append(createInputOtherAttributes);

    // Add buttons to save and delete entire element
    counters.deleteHTMLBtnCounter = Functions.increaseCounter(
      counters.deleteHTMLBtnCounter
    );
    const delBtnEl = Functions.elCreate(
      "button",
      [
        "class",
        "FEFBEdelElements",
        "type",
        "button",
        "data-deleteHTMLid",
        counters.deleteHTMLBtnCounter,
        "data-belongstoelementid",
        counters.elementCounter,
        "title",
        "Remove element!",
      ],
      " 🗑️ "
    );

    counters.saveHTMLBtnCounter = Functions.increaseCounter(
      counters.saveHTMLBtnCounter
    );
    const saveBtnEl = Functions.elCreate(
      "button",
      [
        "class",
        "FEFBEsaveElements",
        "type",
        "button",
        "data-saveHTMLid",
        counters.saveHTMLBtnCounter,
        "data-belongstoelementid",
        counters.elementCounter,
        "title",
        "Apply all fields!",
      ],
      " ✔️ "
    );

    createFieldset.append(delBtnEl);
    createFieldset.append(saveBtnEl);

    // Finally append the entire <Form> in HTML Tab
    // First element in OUTPUT meaning it has 0 children?
    if (firstTime) {
      htmlTab.append(createForm);
    }
    // Otherwise check which "Add Method:" that was chosen.
    else {
      // Grab "active" (green fieldiset)
      const grabGreenFieldset = document.querySelector(".FEFBEactiveFieldset");
      const grabHTMLTab = document.getElementById("FEFBEhtml");
      const grabHR = document.querySelector("#FEFBEhtml > hr");
      // Check "Add Method:" (appendType) and insert in correct accordingly.
      const appendType = document.getElementById(
        "FEFBEselectAppendStyle"
      ).value;

      // Add after the <hr> element since that is always the first element before any <form> elements
      if (appendType == "rootfirst") {
        // And insert after its parentNode (the Form it is inside of)
        grabHR.after(createForm);
      }

      // Just append meaning it becomes the last child in FEFBEhtml "HTML" Tab which is correct placement then.
      if (appendType == "rootlast") {
        // And insert after its parentNode (the Form it is inside of)
        grabHTMLTab.append(createForm);
      }

      if (appendType == "siblingbefore") {
        // And insert after its parentNode (the Form it is inside of)
        grabGreenFieldset.parentNode.before(createForm);
        console.log("Sibling BEFORE?");
      }

      if (appendType == "siblingafter") {
        // And insert after its parentNode (the Form it is inside of)
        grabGreenFieldset.parentNode.after(createForm);
        console.log("Sibling AFTER?");
      }

      if (appendType == "appendFirst") {
        // And insert after its parentNode (the Form it is inside of)
        grabGreenFieldset.parentNode.after(createForm);
      }

      // We insert this way and then fix it later for a specific case
      if (appendType == "appendLast") {
        // And insert after its parentNode (the Form it is inside of)
        grabGreenFieldset.parentNode.after(createForm);
      }

      // Set correct Active Fieldset after!
      grabGreenFieldset.classList.remove("FEFBEactiveFieldset");
      const grabCorrectNewGreenField = document.querySelector(
        `[data-fieldsetid="${correctGreenId}"]`
      );
      grabCorrectNewGreenField.classList.add("FEFBEactiveFieldset");

      // Special when appendLast for the Forms since it does not put itself as lastChild in the forms while it does so in the OUTPUT
      // So check that appendLast is the choice which is the special occassion when this is needed.
      if (
        appendType == "appendLast" &&
        document.querySelectorAll("form").length > 2
      ) {
        const lastOutputedId = document.querySelector(
          `[data-elementid="${correctGreenId}"]`
        );

        console.log(lastOutputedId);

        // Check if previous sibling exists because then we know we must move the
        // form id because only when there is a previous sibling does this issue occur.
        const prevId = lastOutputedId?.previousSibling?.dataset?.elementid;
        console.log(prevId);
        if (prevId != null && prevId != undefined) {
          const toBeMoved = document.querySelector(
            `[data-formid="${correctGreenId}"]`
          );
          // Place form id after the previously inserted elementid.
          document.querySelector(`[data-formid="${prevId}"]`).after(toBeMoved);
        }
      }

      // Special case for Sibling After Selection when they have children in DOM but they only inserted .after() previous Form element in HTML Tab
      // So find the last child in the DOM that are used as .after() for the Sibling After Selection.
      if (
        appendType == "siblingafter" &&
        document.querySelectorAll("form").length > 2
      ) {
        // Grab last output
        const lastOutputedId = document.querySelector(
          `[data-elementid="${correctGreenId}"]`
        );
        // Then null check and store the id of the last child of the previous sibling assuming they exist
        const previousSibling = lastOutputedId.previousSibling;
        const innerLastChild = Functions.findInnerLastChild(previousSibling);
        const prevSiblingsLastChild = innerLastChild?.dataset?.elementid;
        if (
          prevSiblingsLastChild != null &&
          prevSiblingsLastChild != undefined
        ) {
          // Grab last output of <form>
          const toBeMoved = document.querySelector(
            `[data-formid="${correctGreenId}"]`
          );
          // Place form id after the previously inserted elementid.
          document
            .querySelector(`[data-formid="${prevSiblingsLastChild}"]`)
            .after(toBeMoved);
        }
      }
    }

    // Show message after adding element
    Functions.showMsg(document.getElementById("FEFBEplus"), "Element Added!");
  },

  // Smart Adding Function that changes
  smartAddingChanger: function (element, appendType) {
    const appendList = document.getElementById("FEFBEselectAppendStyle");
    const htmlList = document.getElementById("FEFBEchosenHTMLElement");

    // Change nav to ul since that is common
    if (htmlList.value == "nav") {
      appendList.selectedIndex = 4;
      htmlList.value = "ul";
      return;
    }
    // Change ul/ol to li since that is common
    if (htmlList.value == "ul" || htmlList.value == "ol") {
      appendList.selectedIndex = 4;
      htmlList.value = "li";
      return;
    }
    // Change back after first li to Append so it doesn't nest li
    if (htmlList.value == "li") {
      appendList.selectedIndex = 3;
      return;
    }
    // TODO: Add more "smart" changes between elements and adding type.
  },

  // Delete HTML Element both from shadowDOM and from HTML TAB
  deleteElShadowAndTab: function (e, id) {
    const correctformid = document.querySelector(`[data-formid="${id}"]`);
    const output = document.getElementById("FEFBEoutput");

    // Grab correct shadowDOM element
    const correctOutputElement = output.querySelector(
      `[data-elementid="${id}"]`
    );
    correctformid.remove(); // Delete from HTML TAB
    // Then check if it has children
    // This works but I do not understand 100% why the `else` is never ran
    // Or how it is able to delete even first added item which is always a child item.
    // How is that removed without removing its parent which would be `#FEFBEoutput`.
    const parentNodeCheck = correctOutputElement.parentNode;

    if (parentNodeCheck?.children?.length > 0) {
      correctOutputElement.replaceWith(...correctOutputElement.childNodes);
      console.log("Accidental remove?");
    } // This seem to never run?
    else {
      console.log("Removed Normally and NOT with replaceWith???");
      correctOutputElement.remove();
    }
    // Update marginLeft for all <form> elements in HTML Tab.
    HTMLFunctions.formDepth();
    // Show message after deleting
    Functions.showMsg(
      document.getElementById("FEFBEresetAll"),
      "Element removed!"
    );
    return;
  },

  // Save all HTML input fields in "HTML" Tab:
  saveElShadowAndTab: function (e, id) {
    // Grab all their input fields
    const allInputFieldsForCorrectId = document.querySelectorAll(
      `input[data-belongstoelementid="${id}"]`
    );
    // Also grab correct output element
    const correctOutputElement = document.querySelector(
      `[data-elementid='${id}']`
    );

    // Loop through and apply differently
    allInputFieldsForCorrectId.forEach((input) => {
      // Ignore these two for now because they need separate code¨
      if (
        input.dataset.attributetype != "other" &&
        input.dataset.attributetype != "textContent"
      ) {
        // Then apply values for the `src`,`id`,`class`,`alt` & `href` attributes...
        if (input.value != "") {
          // But first check that they are not reserved
          if (
            !reservedClasses.includes(input.value) &&
            !reservedIds.includes(input.value)
          ) {
            correctOutputElement.setAttribute(
              input.dataset.attributetype,
              input.value
            );
            Functions.showMsg(input, "Updated!");
          } else {
            Functions.showMsg(input, "Reserved attribute. Not updated!", 3000);
          }
        } else {
          // ...or just remove them if they exist if input is empty!
          if (correctOutputElement.hasAttribute(input.dataset.attributetype)) {
            correctOutputElement.removeAttribute(input.dataset.attributetype);
            Functions.showMsg(input, "Attribute removed!");
          }
        }
      }
      // Set new textContent or else empty it for correct Output Element
      if (input.dataset.attributetype == "textContent") {
        if (input.value != "") {
          correctOutputElement.textContent = input.value;
          Functions.showMsg(input, "Text updated!");
        } else {
          correctOutputElement.textContent = "";
          Functions.showMsg(input, "Text removed if it existed!");
        }
      }
      // LAST Thing to do so we can use return; to jump out of
      // the forEach loop while still executing the rest of the function.
      // Update or set new "Other" attributes
      if (input.dataset.attributetype == "other") {
        if (reservedAttributes.includes(input.value)) {
          Functions.showMsg(input, "Reserved attribute. Not updated!", 3000);
          return;
        }
        if (input.value.includes("data-")) {
          Functions.showMsg(
            input,
            "Data attributes Not Allowed. Not updated!",
            3000
          );
          return;
        }

        // Clear list of other attributes when empty
        if (input.value == "") {
          if (correctOutputElement.hasAttribute("data-storedothers")) {
            const otherattrs = correctOutputElement.dataset.storedothers;
            const otherattrsArr = otherattrs.split(",");
            const l = otherattrsArr.length;
            for (let i = 0; i < l; i++) {
              correctOutputElement.removeAttribute(otherattrsArr[i]);
            }
            correctOutputElement.removeAttribute("data-storedothers");
            return;
          }
          Functions.showMsg(input, "Other attributes removed!", 3000);
          return;
        }

        // Insert list of other attributes when not empty
        if (input.value != "") {
          // First check if previous ones existed and just "reset" things to insert new ones.
          if (correctOutputElement.hasAttribute("data-storedothers")) {
            const otherattrs = correctOutputElement.dataset.storedothers;
            const otherattrsArr = otherattrs.split(",");
            const l = otherattrsArr.length;
            for (let i = 0; i < l; i++) {
              correctOutputElement.removeAttribute(otherattrsArr[i]);
            }
          }
          // Change its other attributes of `data-elementid`
          const output = document.getElementById("FEFBEoutput");
          Functions.elAttrOther(
            output.querySelector(`[data-elementid="${id}"]`),
            input.value
          );
          Functions.showMsg(input, "Other attributes updated!", 3000);
          return;
        }
      }
    });
    // Show message after done
    setTimeout(() => {
      Functions.showMsg(e, "All fields processed!");
    }, 1500);
  },
};

export { HTMLFunctions };
