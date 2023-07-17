const CopyFunctions = {
  // Copy CSS or HTML code (using buttons "Copy HTML" & "Copy CSS")
  // "e" is event object from Event Listener
  // "code" is received CSS or HTML code
  // "msg" is success message being shown.
  copyCustomCode: function (e, code, msg) {
    // Grab the code and insert into client's Clipboard (stored in CTRL+C, ready for CTRL+V)
    navigator.clipboard
      .writeText(code)
      .then(() => {
        // Create a div with styling
        let Box = document.createElement("div");
        Box.textContent = msg;
        Box.classList.add("FEFBEcopied"); // Class list that adds animation effect to it
        Box.style.padding = "0.7rem";
        Box.style.fontWeight = "bold";
        Box.style.border = "1px solid #ccc";
        Box.style.borderRadius = "0.5rem";
        Box.style.color = "black";
        Box.style.position = "fixed";
        Box.style.backgroundColor = "#f1f1f1";
        // Grab the (e = event) client's coordinates to position box correctly (by positioning it where you clicked)
        const x = e.clientX;
        const y = e.clientY;
        // Show it below the cursor so the text is roughly in the middle of the cursor.
        Box.style.left = `${x - 35}px`;
        Box.style.top = `${y + 20}px`;
        // Finally output it to DOM
        document.body.appendChild(Box);

        // Then remove the box after 2 seconds
        setTimeout(() => {
          Box.remove();
        }, 2500);
      })
      // Or let the user know when it does not work.
      .catch((error) => {
        alert(
          "Copying code to Clipboard FAILED. Needing permission in Browser?🤔 Error: " +
            error
        );
      });
  },
};

export { CopyFunctions };
