# FrontEndingForBackenders ©2023 WebbKodsLärlingen

Simple GUI for adding HTML elements and stylizing their CSS code for faster and more convenient prototyping.

## Progress (Updates)

- 2023-07-18

  - Fifth commit(!). Well, I did some small stuff yesterday before. But this is considered a big commit to call it commitment. Today I have gotten the elements to consistently follow one another if we look at how data-elementid and fieldsetid follow one another in terms of selection. For example, you add an element and it has a `data-elementid` and it will also have a hidden `data-outputcurrentactive=yes` attached to it which will shift as you click on different `fieldset` elements in the HTML tab. If you remove one fieldset with the red trash-can button, it will demand you to select (click) on a new fieldset before being able to insert a new element so that is mostly I would say "foolproof".

  - What is not "foolproof" is how `fieldset` elements are added to the HTML tab depending on chosen "Add Method:". Adding just last to the OUTPUT works without issues since that is very logical: just add at the end of the `OUTPUT div` and thus, at the end of the `FEFBEhtml div` since that is the only logical order of output elements and fieldset elements. However, adding "First Child" or "Last Child" after Selection (meaning what fieldset is green in its borders) can cause the it appear wrong in the list of fieldset elements in the HTML Tab. It will appear correct in the OUTPUT though.

  - I also added a big trash-can reset button to just update the page whenever needed to further speeding up testing. The code base is getting bigger and it is somewhat challenging to keep track of all kind of data-attribute types that I use to keep track of two things: what happens in the OUTPUT and what happens in the HTML/CSS tabs. However, I think the HTML tab is the hardest one because it is more flexible than the CSS. The CSS Tab will have Selectors and each selector can only appear once and each selector can have its list of CSS rules applied to only that single selector. There are fewer levels of nesting and complicated orders of things. But yes, the CSS Tab will have to deal with the order of the CSS selectors appear as if you would cut & paste around the CSS code inside of an actual stylesheet file. Hm. Well, one line of code at a time I guess.

  - _NEXT STEPS/TODOS:_ Try improve the way HTML elements can be inserted. For example, check if selected HTML element in the `OUTPUT` (selected by the greenmarked fieldset element under HTML tab) has a previousSibling. If not, then it is the parentNode which could then use different insertion methods despite what was chosen inside of "Add Method:". What you really do is: add on the same level (siblings), a new level (a new child and thus becoming the a parent). After that, I will have to get to the CSS Tab (finally!) and start testing the different ways to handle when there are more than one input and unit to be dynamically changed. For example, `margin-left:10px;` is just one input (10) and one list of units (px,%, etc.) to handle. But what happens when you have like: `border: 1px solid black;`? Sheesh...

- 2023-07-17

  - Fourth commit(!). All module JS files now have objects with either variables and/or functions. This way, I will not have to add import and export for every new single function. Instead, I just call that added function within that object as the entire object is exported from each module JS file. Very convenient.

  - You can now click on where you want to insert the next element. It also checks that you have chosen one. If you remove the chosen one, you will not be able to add a new element until you have clicked/picked a new element to insert based from (unless it is the first one in the list). This is not updated in the `OUTPUT` element as of yet, so it is inconsistent in the final behavior as such. This will be fixed next. I have also implemented a new `data-belongstoelementid=X` attribute which will help to identify correct element in both HTML Tab and in the `OUTPUT` element.

  - Event Delegation has been implemented for the HTML Tab and the CSS Tab where it listens for two things that you would use/do: click and pressing Enter. Fewer event listeners seem to be better for performance. I just need to be aware and careful with the event propagation. I had the issue where pressing enter within a text input caused a button to be clicked and `e.preventDefault();` had no effect on it. You need to create the `button` element as a `type="button"` for that behavior to stop. Now when I press enter it will not cause a click because that only happens to buttons assigned `type="submit"` which is standard type when creating a `button` element, apparently.

  - _NEXT STEPS/TODOS:_ Create consistency between elements added in the HTML Tab and the OUTPUT. Also add more options in the "Add Method:" dropdown menu. What are needed are: Insert Before/After Chosen Element on the same level (Sibling), Insert Before/After Chosen Element's one level under (Last/First Child), Insert Before/After Chosen Element's Parent. Last one does not work with just `append()`. It should add like a sibling even if the chosen element has childNodes.

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
