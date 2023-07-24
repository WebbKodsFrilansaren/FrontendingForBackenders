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

  // Same as "elAttr" but also adds "data-otherattributelist" with all other attributes so it can be deleted when emptying the "Other" input field.
  elAttrOther: function (el, attributesString = "") {
    // Not an element as first argument
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
    const otherattrArr = [];
    const l = attributes.length;
    for (let i = 0; i < l; i += 2) {
      otherattrArr.push(attributes[i]);
      el.setAttribute(attributes[i], attributes[i + 1] || "");
    }
    // Join array of name of other attributes into a string so they specifically can be removed when needed while keeping others!
    const otherattrStr = otherattrArr.join(",");
    el.setAttribute("data-storedothers", otherattrStr);
  },

  // Show messages below elements
  showMsg: function (e, msg, t = 2000) {
    // Create a div with styling
    let Box = document.createElement("div");
    Box.textContent = msg;
    Box.classList.add("FEFBEupdates");
    Box.style.padding = "0.7rem";
    Box.style.fontWeight = "bold";
    Box.style.border = "1px solid #ccc";
    Box.style.borderRadius = "0.5rem";
    Box.style.color = "black";
    Box.style.position = "fixed";
    Box.style.backgroundColor = "#f1f1f1";
    // Grab the (e = event) client's coordinates to position box correctly (by positioning it where you clicked)
    // However, it checks if you sent it just an element which is still in `e` but it has no target since it is not an event but an element.
    // Is `e` an instance of Event? Then grab that targets coordinates or just grab the elements coordinates.
    const targetElement =
      e instanceof Event
        ? e.target.getBoundingClientRect() // When received as a Target from an Event.
        : e.getBoundingClientRect(); // When received as just a DOM Element.
    // Show it below the cursor so the text is roughly in the middle of the cursor.
    Box.style.left = `${targetElement.x}px`;
    Box.style.top = `${targetElement.y + 45}px`;
    // Finally output it to DOM
    document.body.append(Box);

    // Then remove the box after 2 seconds
    setTimeout(() => {
      Box.remove();
    }, t);
  },

  // Set "FEFBEactiveOutputElement" (should be same as FEFBEactiveFieldset as they
  // are connected) or "FEFBEactiveFieldset" (greenlighted element in HTMLTab).
  setActiveEl: function (el, whichActive) {
    // Not an element as first argument
    if (!(el instanceof Element)) {
      throw new TypeError(
        "The first argument must be a valid DOM element. Incorrect QuerySelector(All)?"
      );
    }
    if (
      whichActive != "FEFBEactiveFieldset" &&
      whichActive != "FEFBEactiveOutputElement"
    ) {
      throw new TypeError(
        "Second argument should be class: 'FEFBEactiveFieldset' or class: 'FEFBEactiveOutputElement'!"
      );
    }
    el.classList.add(whichActive);
  },

  // Find innermost childElement from a startingNode
  findInnerLastChild: function (startingNode) {
    // First declare lastChild to be the last child of a starting node
    let lastChild = startingNode.lastChild;

    // Then we say that while `lastChild` has a lastChild (lastChild.lastChild)
    while (lastChild && lastChild.lastChild) {
      // Then we update to say that is the current lastChild and check again in while()
      lastChild = lastChild.lastChild;
    }
    // It breaks out because the next lastChild in the while() loop
    // might NOT have its own lastChild meaning they are the lastChild that is returned.
    return lastChild;
  },

  // Grab <datalist> as array from suggested CSS Selectors so it is always current one
  currentSelectorSuggestions: function () {
    return Array.from(document.getElementById("FEFBEselectorlist").options).map(
      (option) => option.value
    ) != []
      ? Array.from(document.getElementById("FEFBEselectorlist").options).map(
          (option) => option.value
        )
      : []; // Return empty when it is before first suggested selector is inserted
  },
};

export { Functions };
