// pathfinder.js
// 2024-08-12

const PREFIX = "https://intr-eeg.github.io/";
const SUFFIX = "/ECDA";
const FORM_FIELDS = [
    // fieldId, label, jsId
    ["participantId"   , "Participant ID"   , "participant"],
    ["school"          , "School"           , "School"     ],
    ["participantLevel", "Participant Level", "level"      ],
];



function readForm() {
    const o = {};
    for (const [ fieldId, label, jsId ] of FORM_FIELDS.values()) {
        const el = document.getElementById(fieldId);
        if (!el.value) {
            alert(`Please enter/select a value for ${label}.`);
            el.focus();
            return;
        }
        o[jsId] = el.value;
    }
    return o;
}

function iterForm(toLock) {
    for (const [ fieldId, , ] of FORM_FIELDS.values()) {
        document.getElementById(fieldId).disabled = toLock;
    }
    document.getElementById("unlockFormBtn").disabled = !toLock;
}

function lockForm() {
    iterForm(true);
}

function unlockForm() {
    iterForm(false);
}

function readAndLockForm() {
    const obj = readForm();
    if (obj === undefined) return;
    lockForm();
    return obj;
}

function makeQuery(obj) {
    const f = encodeURIComponent;
    const g = ([k, v]) => `${f(k)}=${f(v)}`;
    return Object.entries(obj).map(g).join("&");
}

function makeUrl(obj, prefix=PREFIX, suffix=SUFFIX) {
    const taskName = obj["taskName"];
    delete obj["taskName"];
    delete obj["level"];
    const obj2 = {"Debug": "No", ...obj};
    const q = makeQuery(obj2);
    return `${prefix}${taskName}${suffix}/index.html?${q}`;
}



function launchSoundCheck() {
    const obj = readAndLockForm();
    if (obj === undefined) return;
    obj["taskName"] = "sound-check";
    window.open(makeUrl(obj), "_blank");
    return false;
}

function launchBEPSPAMS() {
    const obj = readAndLockForm();
    if (obj === undefined) return;
    obj["taskName"] = "BEPS-PAMS";
    obj["Show boxes"] = "No";
    window.open(makeUrl(obj), "_blank");
    return false;
}

function launchTheoryOfMind() {
    const obj = readAndLockForm();
    if (obj === undefined) return;
    obj["taskName"] = "theory-of-mind";
    obj["Show boxes"] = "No";
    window.open(makeUrl(obj), "_blank");
    return false;
}

function launchEightBoxes() {
    const obj = readAndLockForm();
    if (obj === undefined) return;
    obj["taskName"] = "eightBoxes_v3";
    obj["Number of trials"] = {
        "N2": "N2 - 5 trials",         // These values are hard coded.
        "K1": "K1 and K2 - 8 trials",  // These values are hard coded.
        "K2": "K1 and K2 - 8 trials",  // These values are hard coded.
    }[obj["level"]];
    window.open(makeUrl(obj), "_blank");
    return false;
}

function launchCrayons() {
    const obj = readAndLockForm();
    if (obj === undefined) return;
    obj["taskName"] = "crayons";
    obj["Number of Rules"] = {
        "N2": "N2 - 2 rules",         // These values are hard coded. There is an error in crayons.js (and crayons-legacy-browsers.js), fix it.
        "K1": "K1 and K2 - 3 rules",  // These values are hard coded.
        "K2": "K1 and K2 - 3 rules",  // These values are hard coded.
    }[obj["level"]];
    window.open(makeUrl(obj), "_blank");
    return false;
}

function launchSCLAS() {
    const obj = readAndLockForm();
    if (obj === undefined) return;
    obj["taskName"] = "S-CLAS";
    obj["Age"] = {
        "N2": "N2",         // It _must_ be this because the file name is 'conditions_N2.csv'
        "K1": "K1 and K2",  // It _must_ be this because the file name is 'conditions_K1 and K2.csv'
        "K2": "K1 and K2",  // It _must_ be this because the file name is 'conditions_K1 and K2.csv'
    }[obj["level"]];
    window.open(makeUrl(obj), "_blank");
    return false;
}


