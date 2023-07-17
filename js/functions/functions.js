// "Functions" object includes globally used Functions, called using "Functions.FUNCTIONNAME"
const Functions = {
  // Increase any of the xxxCounter values by 1 or more
  // Call function by equalizing the `let xxxCounter` variable with the function call.
  // E.g. elementCounter = increaseCounter(elementCounter)
  increaseCounter: function (counterName, int = 1) {
    return counterName + int;
  },

  // Element creator that creates element, optionally sets an array of attributes and textContent
  elCreate: function (
    elementNameString,
    attributesArray = [],
    textContentString = ""
  ) {
    const el = document.createElement(elementNameString);

    // Set attributes for element if array not empty
    if (attributesArray != []) {
      const l = attributesArray.length;
      for (let i = 0; i < l; i += 2) {
        el.setAttribute(attributesArray[i], attributesArray[i + 1]);
      }
    }
    // Set textContent if not empty
    if (textContentString != "") {
      el.textContent = textContentString;
    }
    return el;
  },

  elAttr: function (el, attributesString = "") {
    // Not an element as
    if (!(el instanceof Element)) {
      throw new TypeError(
        "The first argument must be a valid DOM element using document.createElement('element')."
      );
    }
    // No attributes?
    if (attributesString == "") {
      throw new SyntaxError(
        "Argument should be: attribute1=Value1|attribute2=Value2 and so on."
      );
    }
    // Split the attributesArray string by "=" or "|"
    const attributes = attributesString.split(/=|\|/);

    // Set attributes for element `el`
    const l = attributes.length;
    for (let i = 0; i < l; i += 2) {
      el.setAttribute(attributes[i], attributes[i + 1] || "");
    }
  },
};

export { Functions };
