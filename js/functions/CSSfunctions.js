/***********************************************************
 CSSfunctions.js - All functions used primarily on "CSS" TAB
***********************************************************/
import { outputStyleSheet, mainStyleSheet } from "../data/variables.js";
import { cssRulesWithVendor, cssRulesAllArray } from "../data/variables.js";

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
};

export { CSSFunctions };
