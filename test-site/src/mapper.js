const _host = "http://localhost:5161";
const heatGetIdUrl = _host + "/host/id";
const heatSendClicksUrl = _host + "/clicks";
const heatGetClicksUrl = _host + "/clicks";

let heatHostId = "";

fetch(heatGetIdUrl)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        heatHostId = data.id;
        console.debug(heatHostId);
    })
    .catch((err) => {
        console.error(err);
    });

let heatData = {};
let heatControls = document.querySelectorAll("button, a, input");
let heatControlsIdCounter = 0;

let heatNotifyCounter = 0;
let heatNotifyClicks = () => {
    heatNotifyCounter++;

    if (heatNotifyCounter == 5) {
        heatNotifyCounter = 0;
        console.log("Start sending clicks data");
        if (!heatHostId) {
            console.error("No host id");
            return;
        }

        for (let [key, value] of Object.entries(heatData)) {
            if (!value) break;

            const body = JSON.stringify({
                hostId: heatHostId,
                elementId: key,
                clicks: value,
                date: new Date(),
            });
            console.debug(body);

            fetch(heatSendClicksUrl, { body: body, method: "POST" })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
};

heatControls.forEach((control) => {
    if (!control.id) {
        control.id = "heatControlId-" + heatControlsIdCounter;
        heatControlsIdCounter++;
    }

    console.log(control.id);

    control.addEventListener("click", (event) => {
        console.log(event.srcElement.id);
        if (heatData[event.srcElement.id]) {
            heatData[event.srcElement.id]++;
        } else {
            heatData[event.srcElement.id] = 1;
        }
        heatNotifyClicks();
        console.log(heatData);
    });
});

let heatVisualize = () => {
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
