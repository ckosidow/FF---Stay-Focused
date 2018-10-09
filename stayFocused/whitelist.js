const bs = browser.storage;
const ls = bs.local;
const formWhite = document.getElementById("formWhite");
const whitelisted = document.getElementById("whitelisted");
const whiteRemove = document.getElementById("whiteRemove");
const timeSpent = document.getElementById("timeSpent");
let existing;
let siteTimer;

ls.get().then(function(res) {
    existing = res['whitelist'] || [];
    siteTimer = res['site_timer'] || 0;

    updateList();
});

bs.onChanged.addListener(function(changes, area) {
    const items = Object.keys(changes);

    if (items.includes('site_timer')) {
        timeSpent.innerHTML = new Date(1000 * changes['site_timer'].newValue).toISOString().substr(11, 8);
    }
});

formWhite.addEventListener("submit", function () {
    existing.push(document.getElementById("whitelist").value.toLowerCase());

    ls.set({whitelist: existing});
}, false);

whiteRemove.addEventListener("click", function() {
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