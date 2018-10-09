const bs = browser.storage;
const ls = bs.local;
let intervalId = 0;
let time;
let whitelist;

ls.get().then((res) => {
    time = res['site_timer'] || 0;
    whitelist = res['whitelist'] || [];

    if (whitelist.includes(window.location.hostname)) {
        clearInterval(intervalId);
        intervalId = setInterval(countTime, 1000);
    }
}, () => {
    alert('Couldn\'t find local storage');
});

bs.onChanged.addListener(function(changes, area) {
    if (Object.keys(changes).includes('whitelist')) {
        whitelist = changes['whitelist'].newValue;

        if (whitelist.includes(window.location.hostname)) {
            clearInterval(intervalId);
            intervalId = setInterval(countTime, 1000);
        }
    }
});

function countTime() {
    time++;

    ls.set({site_timer: time});

    if (time > 3600) {
        window.location.href = 'about:blank';
    }
}

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'hidden') {
        clearInterval(intervalId);
        intervalId = 0;
    } else if (!intervalId && whitelist.includes(window.location.hostname)) {
        intervalId = setInterval(countTime, 1000);
    }
});