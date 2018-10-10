const bs = browser.storage;
const ls = bs.local;
const formWhite = document.getElementById("formWhite");
const whitelisted = document.getElementById("whitelisted");
const removeSite = document.getElementById("removeSite");
const timeSpent = document.getElementById("timeSpent");
const timeForm = document.getElementById("timeForm");
let existing;
let maxTime;

ls.get().then(function(res) {
    let siteTimer = res['site_timer'] || 0;
    maxTime = res['maxTime'] || 900;
    existing = res['whitelist'] || [];
    timeSpent.innerHTML = new Date(1000 * siteTimer).toISOString().substr(11, 8);

    if (siteTimer >= maxTime) {
        removeSite.parentNode.removeChild(removeSite);
        timeForm.parentNode.removeChild(timeForm);
    }

    updateList();
});

bs.onChanged.addListener(function(changes, area) {
    if (Object.keys(changes).includes('site_timer')) {
        timeSpent.innerHTML = new Date(1000 * changes['site_timer'].newValue).toISOString().substr(11, 8);
    }
});

timeForm.addEventListener("submit", function() {
    maxTime = parseInt(document.getElementById("maxTime").value);

    ls.set({maxTime: maxTime});
}, false);

formWhite.addEventListener("submit", function () {
    existing.push(document.getElementById("whitelist").value.toLowerCase());

    ls.set({whitelist: existing});
}, false);

removeSite.addEventListener("click", function() {
    let result = [];

    for (const opt of whitelisted.options) {
        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }

    existing = existing.filter(x => !result.includes(x));

    ls.set({whitelist: existing});

    updateList();
}, false);

function updateList() {
    whitelisted.innerHTML = '';

    for (const entry of existing) {
        whitelisted.innerHTML += '<option>' + entry + '</option>'
    }
}