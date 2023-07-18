/*************************************************************
 HTMLfunctions.js - All functions used primarily on "HTML" TAB
*************************************************************/
import {
  counters,
  elementsWithHrefAttribute,
  elementsWithSrcAttribute,
  elementsWithTextContent,
} from "../data/variables.js";
import { Functions } from "./functions.js";
//import { increaseCounter } from "./functions.js";

const HTMLFunctions = {
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
      addMethodList.selectedIndex = 0;
      output.append(createEl);
      // Set what is current active output element so it is consistent with the greenlighted one in the HTML Tab.
      createEl.setAttribute("data-outputcurrentactive", "yes");
    } // Grab the last item no matter its level using querySelectorAll data-elementid and reduce it down to the largest id number
    else {
      const currentActiveOutputElement = document.querySelector(
        "[data-outputcurrentactive='yes']"
      );
      if (appendType == "root") {
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
    ]);

    // class <input text>
    const label2 = Functions.elCreate(
      "label",
      ["class", "FEFBElabels"],
      "class"
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
      // Check "Add Method:" (appendType) and insert in correct accordingly.
      const appendType = document.getElementById(
        "FEFBEselectAppendStyle"
      ).value;

      if (appendType == "root") {
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

      if (appendType == "appendLast") {
        // And insert after its parentNode (the Form it is inside of)
        grabGreenFieldset.parentNode.after(createForm);
      }

      grabGreenFieldset.classList.remove("FEFBEactiveFieldset");
      const grabCorrectNewGreenField = document.querySelector(
        `[data-fieldsetid="${correctGreenId}"]`
      );
      grabCorrectNewGreenField.classList.add("FEFBEactiveFieldset");
    }
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
      appendList.selectedIndex = 1;
      return;
    }
    // TODO: Add more "smart" changes between elements and adding type.
  },

  // Delete HTML Element both from shadowDOM and from HTML TAB
  deleteElShadowAndTab: function (e, id) {
    const correctformid = document.querySelector(`[data-formid="${id}"]`);
    correctformid.remove(); // Delete from HTML TAB
    const output = document.getElementById("FEFBEoutput");

    // Grab correct shadowDOM element
    const correctOutputElement = output.querySelector(
      `[data-elementid="${id}"]`
    );

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
  },
};

export { HTMLFunctions };
