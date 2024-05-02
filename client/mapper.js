const _host = "http://localhost:5161";
const heatGetIdUrl = _host + "/host/id";
const heatSendClicksUrl = _host + "/clicks";

const sendData = (data) => {
    const body = JSON.stringify(data);
    fetch(heatSendClicksUrl, { body: body, method: "POST" })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
};

const getHostId = () => {
    let id;
    fetch(heatGetIdUrl)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            id = data.id;
        })
        .catch((err) => {
            console.error(err);
        });
    return id;
};

let heatClicks = [];
const addClick = (elementId) => {
    heatClicks.push({
        id: elementId,
        date: new Date(),
    });
};

const heatHostId = getHostId();

let heatControls = document.querySelectorAll("button, a, input, select");
let heatControlsIdCounter = 0;

let heatNotifyCounter = 0;
const heatNotifyClicks = () => {
    if (heatClicks.length == 5) {
        if (!heatHostId) {
            console.error("No host id");
            return;
        }

        sendData({
            clicks: heatClicks,
            hostId: heatHostId,
        });
        heatClicks = [];
    }
};

const ensureControlHasId = (control) => {
    if (!control.id) {
        control.id = "heatControlId-" + heatControlsIdCounter;
        heatControlsIdCounter++;
    }
    console.debug(`Ensured control has id. Id: ${control.id}`);
};

heatControls.forEach((control) => {
    ensureControlHasId(control);

    control.addEventListener("click", (event) => {
        addClick(event.elementId);
        heatNotifyClicks();
        console.log(`Clicked #${control.id} control`);
    });
});
