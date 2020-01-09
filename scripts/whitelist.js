const bs = browser.storage;
const ls = bs.local;
const formWhite = document.getElementById("formWhite");
const whitelisted = document.getElementById("whitelisted");
const removeSite = document.getElementById("removeSite");
const timeSpent = document.getElementById("timeSpent");
const timeForm = document.getElementById("timeForm");
const maxTimeInput = document.getElementById("maxTime");
const addSite = document.getElementById("addSite");
let existing = [];
let maxTime = 900;

function blEncodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function updateList() {
    whitelisted.innerHTML = '';

    for (const entry of existing) {
        const option = document.createElement('option');
        option.innerHTML = blEncodeHTML(entry);

        whitelisted.appendChild(option);
    }
}

ls.get().then(function(res) {
    let siteTimer = res['site_timer'] || 0;
    maxTime = res['maxTime'] || 900;
    existing = res['whitelist'] || [];
    timeSpent.innerHTML = '';

    const spent = document.createTextNode(new Date(1000 * siteTimer).toISOString().substr(11, 8));

    timeSpent.appendChild(spent);
    maxTimeInput.placeholder = new Date(1000 * maxTime).toISOString().substr(11, 8);

    if (siteTimer >= maxTime) {
        removeSite.parentNode.removeChild(removeSite);
        timeForm.parentNode.removeChild(timeForm);
        addSite.className += " width-full";
    }

    updateList();
});

bs.onChanged.addListener(function(changes, area) {
    if (Object.keys(changes).includes('site_timer')) {
        timeSpent.innerHTML = '';

        const spent = document.createTextNode(new Date(1000 * changes['site_timer'].newValue).toISOString().substr(11, 8));

        timeSpent.appendChild(spent);
    }
});

timeForm.addEventListener("submit", function() {
    const intervals = maxTimeInput.value.match(/[0-9]{1,}/g);

    if (intervals.length === 3) {
        maxTime = parseInt(intervals[0] * 3600) + parseInt(intervals[1] * 60) + parseInt(intervals[2]);
    } else if (intervals.length === 2) {
        maxTime = parseInt(intervals[0] * 60) + parseInt(intervals[1]);
    } else {
        maxTime = parseInt(intervals[0])
    }

    maxTimeInput.placeholder = new Date(1000 * maxTime).toISOString().substr(11, 8);

    ls.set({maxTime: maxTime});
}, false);

formWhite.addEventListener("submit", function () {
    existing.push(document.getElementById("whitelist").value.toLowerCase());

    ls.set({whitelist: existing});
}, false);

removeSite.addEventListener("click", function() {
    let existing = [];

    for (const opt of whitelisted.options) {
        if (!opt.selected) {
            existing.push(opt.value || opt.text);
        }
    }

    ls.set({whitelist: existing});

    updateList();
}, false);