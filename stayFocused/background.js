let now;
let millisTill00;

function setForTomorrow() {
    now = new Date();
    millisTill00 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now; // ms until 00:00 tomorrow
}

setForTomorrow();

setTimeout(function() {
    browser.storage.local.set({site_timer: 0});

    setForTomorrow();
}, millisTill00);