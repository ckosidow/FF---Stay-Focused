const bs = browser.storage;
const ls = bs.local;
let maxTime = 900;
let intervalId = 0;
let time;
let whitelist;

ls.get().then((res) => {
    time = res['site_timer'] || 0;
    whitelist = res['whitelist'] || [];
    maxTime = res['maxTime'] || 900;

    tryToStartTimer();
}, () => {
    alert('Couldn\'t find local storage');
});

bs.onChanged.addListener(function(changes, area) {
    for (const change of Object.keys(changes)) {
        switch (change) {
            case 'whitelist':
                whitelist = changes[change].newValue;

                tryToStartTimer();

                break;
            case 'maxTime':
                maxTime = changes[change].newValue;

                break;
            case 'site_timer':
                time = change[change].newValue;

                break;
            default:
                break;
        }
    }
});

document.addEventListener("visibilitychange", function () {
    tryToStartTimer();
});

function tryToStartTimer() {
    clearInterval(intervalId);

    if (document.visibilityState === 'visible' && whitelist.includes(window.location.hostname)) {
        intervalId = setInterval(countTime, 1000);
    }
}

function countTime() {
    if (time > maxTime) {
        window.location.href = 'about:blank';
    } else {
        time++;

        ls.set({site_timer: time});
    }
}