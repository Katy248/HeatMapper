const _host = "http://localhost:5161";
// const _cors = "https://cors-anywhere.herokuapp.com/";
const heatGetIdUrl = _host + "/host/id";
const heatSendClicksUrl = _host + "/clicks";

const sendData = (data) => {
    console.debug(data);
    const body = JSON.stringify(data);
    console.debug(body);
    fetch(heatSendClicksUrl, {
        body: body,
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
};

const getHostId = async () => {
    const result = await fetch(heatGetIdUrl);
    const data = await result.json();
    return data.id;
};
let heatHostId;
getHostId()
    .then((id) => {
        heatHostId = id;
        console.debug(heatHostId);
    })
    .catch((err) => {
        console.error(err);
    });

let heatClicks = [];
const addClick = (elementId) => {
    console.debug(elementId);
    heatClicks.push({
        id: elementId,
        date: new Date(),
    });
};

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
        addClick(event.target.id);
        heatNotifyClicks();
        console.log(`Clicked #${control.id} control`);
    });
});
