const formWhite = document.getElementById("formWhite");
const whitelisted = document.getElementById("whitelisted");
const whiteRemove = document.getElementById("whiteRemove");
let existing;

browser.storage.local.get().then(function(res) {
    existing = res['whitelist'] || [];

    updateList();
});

formWhite.addEventListener("submit", function () {
    existing.push(document.getElementById("whitelist").value.toLowerCase());

    browser.storage.local.set({whitelist: existing});
}, false);

whiteRemove.addEventListener("click", function() {
    let result = [];

    for (const opt of whitelisted.options) {
        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }

    existing = existing.filter(x => !result.includes(x));

    browser.storage.local.set({whitelist: existing});

    updateList();
}, false);

function updateList() {
    whitelisted.innerHTML = '';

    for (const entry of existing) {
        whitelisted.innerHTML += '<option>' + entry + '</option>'
    }
}