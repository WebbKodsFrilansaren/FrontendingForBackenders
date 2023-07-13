# FrontEndingForBackenders ©2023 WebbKodsLärlingen

Simple GUI for adding HTML elements and stylizing their CSS code for faster and more convenient prototyping.

## Progress (Updates)

- 2023-07-13

  - Second commit(?). Learned the "painful" way of realizing shadowDOM/shadowRoot does not really provide you any insights of whose parentNode is whom when you querySelect(All) inside of it. Even if the intialized shadowRoot object does show parents and siblings, it does not work when you start queryselecting inside of that object for some reason. So, I skipped using shadowDOM.

  - Another thing I realized was that it was very tedious of choosing an element from a list. So, I overhauled the entire thing, and now you just write elements and press ENTER/RETURN and that fires click() on the + button, so that works as before.

  - A third thing is the complete overhaul of file structure since I discovered modules two days ago and how it works. I thought it would mess up everything but using global variables inside of a const object works great. Thumbs up there JS Language!

  - This time I use `selector = "#FEFBEoutput *:is(" + selector + ")"` and I think I will need to force using classes for all elements so it won't clash with my own FEFBE- classes and ids. Anyhow, green is added to the currently active fieldset and that will be used to indicate where the next added element should be added. Not 100% implemented, but proof of concept nonetheless.

  - You can now remove ANY element without messing up the order of childNodes. This single line of codes does the magic: `correctOutputElement.replaceWith(...correctOutputElement.childNodes);` but I do not understand exactly why. Because it does not remove the main div where all the custom HTML end up. Also, it does not remove the parent when I want to delete a sibling/a child of it, then it successfully also removes that sibling/children element without messing up. Interesting. Hm.

  - Element specific attributes are added (src for img-tags and href for a-tags, and so on) depending on what element you add to the list.

  - You now write what element you want to add. I have also prepared and will implement so when you write id and classes, you will not be able to apply those already being used by the application itself. Checkout const arrays `reservedClasses` and `reservedIds`.

  - NEXT STEPS/TODOS: Complete implementation of clicking on what element (marking it green) where you want to add (add before or after on sibling level, before or after on parent level, add on children). This will also make good use of QuerySelecting green fieldset. I also think I will add automatic generated id and class names that can be chosen when adding CSS rules later under the CSS tab.

- 2023-07-11

  - Started since the first commit. Learning the real ins and outs of modular JS since I had no clue about "read-only".

  - You can add HTML elements to the shadowDOM under "HTML" and it adds some inputs.

  - You can copy both HTML and the CSS from the shadowDOM. But you also get all dataset attributes. Will be fixed.

  - You can also delete HTML elements from the shadowDOM, I am still working on being able to just remove parent element while keeping children element. It removes all children element now when removing a parent element while that is not reflected inside of the HTML TAB.
