let buttons = document.querySelectorAll("button");

for (btn in buttons) {
    btn.oninput += () => {
        console.log("here");
    };
}
