# FrontEndingForBackenders ©2023 WebbKodsLärlingen

Simple GUI for adding HTML elements and stylizing their CSS code for faster and more convenient prototyping.

## Progress (Updates)

- 2023-07-14

  - Third commit(!). Turns out I tried using #document and creating a new HTMLDocument object to insert into an `<iframe>` element. Turns out that already has a #document created without needing to create it with JavaScript. Then I tried to attach the `new CSSStylesheet()` to it. Turns out I could not do that because it is only allowed with shadowDom / #shadow-root which does not work for me. At least I am not smart enough to make it work.

  - Today I tried using `<iframe>` but it did not work. So, I "Discarded all changes" for the first time as code n0_0b that I am. However, what I did manage to fix was the "Copy CSS" work now where it will filter out the `#FEFBEoutput :is()` part of each selector using regex: `const regex = /#FEFBEoutput :is\(([^)]+)\)\s*({[^}]+})/g;`. I will 100% admit: chatGPT3.5 helped me there since I hate having to think about how to use the regex. I know what I wanna do so I ask for help. By the way, I have no real clue why specifically `#FEFBEout :is(<insert real selector here>)` works. Actually, I used `#FEFBEoutput *:is(<real selector here)` but for some reason, the \* was removed by the CSS processing or whatever it was. This made duplicates of selectors when in fact just new styles should've been changed or added to that same selector. Fixed now though.

  - I should be able to filter out the `<data-XXX=Y>` elements from the innerHTML that is used when extracting the HTML and the button "Copy HTML" is used by the user. Here I am thinking of DOMParser to parse it as regular HTML again from the extracted string and just querySelectAll `[data-]` elements and remove those attributes and then parse the HTML back to a string again before finishing the copying to Clipboard.

  - _NEXT STEPS/TODOS:_ Because I spent a few hours today trying to get #document inside of an iframe element to work but did not manage to attach the second stylesheet to it, I did not have time to work on clicking on fieldset classes to define where from to insert next added element based on active fieldset class element. Will work on that next time! Take Care & have An Awesome Weekend! ^\_^

- 2023-07-13

  - Second commit(?). Learned the "painful" way of realizing shadowDOM/shadowRoot does not really provide you any insights of whose parentNode is whom when you querySelect(All) inside of it. Even if the intialized shadowRoot object does show parents and siblings, it does not work when you start queryselecting inside of that object for some reason. So, I skipped using shadowDOM.

  - Another thing I realized was that it was very tedious of choosing an element from a list. So, I overhauled the entire thing, and now you just write elements and press ENTER/RETURN and that fires click() on the + button, so that works as before.

  - A third thing is the complete overhaul of file structure since I discovered modules two days ago and how it works. I thought it would mess up everything but using global variables inside of a const object works great. Thumbs up there JS Language!

  - This time I use `selector = "#FEFBEoutput *:is(" + selector + ")"` and I think I will need to force using classes for all elements so it won't clash with my own FEFBE- classes and ids. Anyhow, green is added to the currently active fieldset and that will be used to indicate where the next added element should be added. Not 100% implemented, but proof of concept nonetheless.

  - You can now remove ANY element without messing up the order of childNodes. This single line of codes does the magic: `correctOutputElement.replaceWith(...correctOutputElement.childNodes);` but I do not understand exactly why. Because it does not remove the main div where all the custom HTML end up. Also, it does not remove the parent when I want to delete a sibling/a child of it, then it successfully also removes that sibling/children element without messing up. Interesting. Hm.

  - Element specific attributes are added (src for img-tags and href for a-tags, and so on) depending on what element you add to the list.

  - You now write what element you want to add. I have also prepared and will implement so when you write id and classes, you will not be able to apply those already being used by the application itself. Checkout const arrays `reservedClasses` and `reservedIds`.

  - _NEXT STEPS/TODOS:_ Complete implementation of clicking on what element (marking it green) where you want to add (add before or after on sibling level, before or after on parent level, add on children). This will also make good use of QuerySelecting green fieldset. I also think I will add automatic generated id and class names that can be chosen when adding CSS rules later under the CSS tab.

- 2023-07-11

  - Started since the first commit. Learning the real ins and outs of modular JS since I had no clue about "read-only".

  - You can add HTML elements to the shadowDOM under "HTML" and it adds some inputs.

  - You can copy both HTML and the CSS from the shadowDOM. But you also get all dataset attributes. Will be fixed.

  - You can also delete HTML elements from the shadowDOM, I am still working on being able to just remove parent element while keeping children element. It removes all children element now when removing a parent element while that is not reflected inside of the HTML TAB.
