function setForTomorrow() {
    let now = new Date();
    let millisTill00 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now; // ms
    // until 00:00
    // tomorrow

    setTimeout(function() {
        browser.storage.local.set({site_timer: 0});

        setForTomorrow();
    }, millisTill00);
};

setForTomorrow();