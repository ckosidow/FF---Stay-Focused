let ls = browser.storage.local;

ls.get().then(function(res) {
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    if (res['presentBlockingDay'] !== now.valueOf()) {
        ls.set({presentBlockingDay: now.valueOf()});
        ls.set({site_timer: 0});
    }
});

function setForTomorrow() {
    let now = new Date();
    let millisTill00 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now; // ms until 00:00 tomorrow

    setTimeout(function() {
        let now = new Date();
        now.setHours(0, 0, 0, 0);

        ls.set({presentBlockingDay: now.valueOf()});
        ls.set({site_timer: 0});

        setForTomorrow();
    }, millisTill00);
}

setForTomorrow();