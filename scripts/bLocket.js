const bs = browser.storage;
const ls = bs.local;
let maxTime = 900;
let intervalId = 0;
let time;
let whitelist;

updateTimer();

bs.onChanged.addListener(function(changes, area) {
    for (const change of Object.keys(changes)) {
        switch (change) {
            case 'whitelist':
                updateTimer();

                break;
            case 'maxTime':
                maxTime = changes[change].newValue;

                break;
            case 'site_timer':
                time = changes[change].newValue;

                break;
            default:
                break;
        }
    }
});

document.addEventListener("visibilitychange", function () {
    updateTimer();
});

function updateTimer() {
    // We need to make sure all our values are up-to-date
    ls.get().then((res) => {
        time = res['site_timer'] || 0;
        whitelist = res['whitelist'] || new Set();
        maxTime = res['maxTime'] || 900;

        clearInterval(intervalId);

        if (document.visibilityState === 'visible' && whitelist.has(window.location.hostname)) {
            intervalId = setInterval(countTime, 1000);
        }
    }, () => {
        alert('Couldn\'t find local storage');
    });
}

function countTime() {
    if (time >= maxTime) {
        window.location.href = 'about:blank';
    } else {
        time++;

        ls.set({site_timer: time});
    }
}