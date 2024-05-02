const heatVisualize = () => {
    heatControls.forEach((control) => {
        control.classList.remove(["warm-0", "warm-1", "warm-2", "warm-3", "warm-4"]);
        control.classList.add("warm");

        let max = 0;
        for (let [key, value] of Object.entries(heatData)) {
            if (max < value) {
                max = value;
            }
        }
        // console.log(max)
        if (heatData[control.id]) {
            console.log(heatData[control.id]);
            if (heatData[control.id] === max) {
                control.classList.add("warm-4");
            } else if (heatData[control.id] >= max * 0.75) {
                control.classList.add("warm-3");
            } else if (heatData[control.id] >= max * 0.5) {
                control.classList.add("warm-2");
            } else {
                control.classList.add("warm-1");
            }
        } else {
            control.classList.add("warm-0");
        }
    });
};
document.querySelector("#visualize-btn").addEventListener("click", () => {
    heatVisualize();
});
