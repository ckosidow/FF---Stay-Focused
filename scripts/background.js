function setForTomorrow() {
    let now = new Date();
    let millisTill00 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + 10, 0) - now; // ms
    // until 00:00
    // tomorrow

    setTimeout(function() {
        browser.storage.local.set({site_timer: 0});

        setForTomorrow();
    }, millisTill00);
};

setForTomorrow();