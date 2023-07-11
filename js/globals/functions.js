// Increase any of the xxxCounter values by 1 or more
// Call function by equalizing the `let xxxCounter` variable with the function call.
// E.g. elementCounter = increaseCounter(elementCounter)
function increaseCounter(counterName, int = 1) {
  return counterName + int;
}

// Element creator that creates element, optionally sets an array of attributes and textContent
function elCreate(
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
}

export { increaseCounter, elCreate };
