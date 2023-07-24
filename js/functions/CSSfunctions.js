/***********************************************************
 CSSfunctions.js - All functions used primarily on "CSS" TAB
***********************************************************/
import { outputStyleSheet, mainStyleSheet } from "../data/variables.js";
import { cssRulesWithVendor, cssRulesAllArray } from "../data/variables.js";
import { Functions } from "./functions.js";
import { HTMLFunctions } from "./HTMLfunctions.js";

const CSSFunctions = {
  // FUNCTION: "setCSSRuleMainSheet" - change CSS in non-shadowDOM
  // The function was really just proof-of-concept and is not fully developed.
  // Find and set specific CSS Rule in the main stylesheet (css/styles.css)
  setCSSRuleMainSheet: function (selector, styleName, styleValue) {
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
  },
  // FUNCTION: "setCSSRuleOutputSheet" - change CSS in shadowDOM
  // Find and set specific CSS Rule in the Output stylesheet (also stored in json/data.json(?))
  setCSSRuleOutputSheet: function (selector, styleName, styleValue) {
    // .rules is an older version
    const outputRules = outputStyleSheet.cssRules || outputStyleSheet.rules;
    selector = "#FEFBEoutput :is(" + selector + ")";

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
      output.adoptedStyleSheets = [outputStyleSheet];
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
          output.adoptedStyleSheets = [outputStyleSheet];
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
      output.adoptedStyleSheets = [outputStyleSheet];
      return;
    }
  },
  // FUNCTION: remove `id` from list of suggested selectors
  removeIdSelectorSuggestion: function (idvalue) {
    const selectorSuggestionList = document.getElementById("FEFBEselectorlist");
    selectorSuggestionList.querySelector(`[value="#${idvalue}"]`).remove();
  },
  // FUNCTION: change OR insert `id` in list of suggested selectors
  changeOrInsertIdSelectorSuggestion: function (currentid, idvalue) {
    const selectorSuggestionList = document.getElementById("FEFBEselectorlist");
    // Insert new when currentvalue is empty since it is first time
    if (currentid == "") {
      const selectorSuggestionItem = Functions.elCreate("option", [
        "class",
        "FEFBEoptions",
        "value",
        "#" + idvalue,
      ]);
      selectorSuggestionList.appendChild(selectorSuggestionItem);
    } // Otherwise change current value!
    else {
      selectorSuggestionList
        .querySelector(`[value="#${currentid}"]`)
        .setAttribute("value", "#" + idvalue);
    }
  },
  // FUNCTION: Remove `classes` values in list of suggested selectors if they occur exactly once
  removeClassesSelectorSuggestion: function (currentclasses, classvalue) {
    // Prepare all needed elements...
    const selectorSuggestionList = document.getElementById("FEFBEselectorlist");
    // ...and also grab all current classes from all `data-classid` input fields
    const allClassInputFields = document.querySelectorAll(`[data-classid]`);
    const allClassesArray = []; // Store all here to check against duplicates
    const currentOnes = currentclasses.split(" ");
    currentOnes.forEach((e) => allClassesArray.push("." + e));
    allClassInputFields.forEach((e) => {
      const classArrSplit = e.value.split(" ");
      classArrSplit.forEach((e) => {
        if (e) {
          allClassesArray.push("." + e);
        }
      });
    });

    // Count the occurrences of each class in allClassesArray
    const classCounts = {}; // Start with an empty object
    allClassesArray.forEach((className) => {
      // Only count existing class names added to the list
      if (classCounts[className]) {
        classCounts[className]++;
      } // Or create a new class name.
      else {
        classCounts[className] = 1;
      }
    });

    const oldClassesArr = currentclasses.split(" ");
    oldClassesArr.forEach((element) => {
      // Compare if it occurs more than once
      const suggestionValue = `.${element}`;
      if (classCounts[suggestionValue] == 1) {
        selectorSuggestionList.querySelector(`[value=".${element}"]`).remove();
      }
    });
  },
  // FUNCTION: Insert `class` value(s) in list of suggested selectors
  changeOrInsertClassesSelectorSuggestion: function (
    currentclasses,
    classvalue
  ) {
    // Prepare all needed elements...
    const selectorSuggestionList = document.getElementById("FEFBEselectorlist");
    const currentList = Functions.currentSelectorSuggestions();
    // ...and also grab all current classes from all `data-classid` input fields
    const allClassInputFields = document.querySelectorAll(`[data-classid]`);
    const allClassesArray = []; // Store all here to check against duplicates
    const currentOnes = currentclasses.split(" ");
    currentOnes.forEach((e) => allClassesArray.push("." + e));
    allClassInputFields.forEach((e) => {
      const classArrSplit = e.value.split(" ");
      classArrSplit.forEach((e) => {
        if (e) {
          allClassesArray.push("." + e);
        }
      });
    });

    // Count the occurrences of each class in allClassesArray
    const classCounts = {}; // Start with an empty object
    allClassesArray.forEach((className) => {
      // Only count existing class names added to the list
      if (classCounts[className]) {
        classCounts[className]++;
      } // Or create a new class name.
      else {
        classCounts[className] = 1;
      }
    });
    // We end up with an empty property called ".", so let's just remove that from the object.
    if (classCounts.hasOwnProperty(".")) {
      delete classCounts["."];
    }
    // Now we know how many times a class occurs and we can compare this when deleting.
    // Insert new when currentvalue is empty since it is first time
    if (currentclasses == "") {
      const newClassesToArr = classvalue.split(" ");
      newClassesToArr.forEach((element) => {
        const selectorSuggestionItem = Functions.elCreate("option", [
          "class",
          "FEFBEoptions",
          "value",
          "." + element,
        ]);
        // Only add if it does not already exist in the list since several elements can share classes but it should only be included in suggestion once
        if (!currentList.includes(selectorSuggestionItem.value)) {
          selectorSuggestionList.appendChild(selectorSuggestionItem);
        }
      });
    } // Delete all classes when receiving empty string
    else if (classvalue == "") {
      const oldClassesArr = currentclasses.split(" ");
      oldClassesArr.forEach((element) => {
        selectorSuggestionList.querySelector(`[value=".${element}"]`).remove();
      });
    } // Otherwise change current values by...
    else {
      const newClassToArr = classvalue.split(" ");
      const oldClassesArr = currentclasses.split(" ");
      // ...first deleting all ones and...
      oldClassesArr.forEach((element) => {
        const suggestionValue = `.${element}`;
        if (classCounts[suggestionValue] == 1) {
          selectorSuggestionList
            .querySelector(`[value=".${element}"]`)
            .remove();
        }
      });
      // ...then inserting possible new ones!
      newClassToArr.forEach((element) => {
        const selectorSuggestionItem = Functions.elCreate("option", [
          "class",
          "FEFBEoptions",
          "value",
          "." + element,
        ]);
        // Only add if it does not already exist in the list since several elements can share classes but it should only be included in suggestion once{
        if (!currentList.includes(selectorSuggestionItem.value)) {
          selectorSuggestionList.appendChild(selectorSuggestionItem);
        }
      });
    }
  },
  // FUNCTION: Add CSS Rule to CSS Tab
  addCSSRuleToCSSTab: function (selector, cssrule) {
    const CSSTab = document.getElementById("FEFBEcss");
  },
};

export { CSSFunctions };
