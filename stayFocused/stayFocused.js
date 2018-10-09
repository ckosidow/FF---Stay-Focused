const localStorage = browser.storage.local;
let time;
let whitelist;

localStorage.get().then((res) => {
    time = res['site_timer'] || 0;
    whitelist = res['whitelist'] || [];

    if (whitelist.includes(window.location.hostname)) {
        setInterval(() => {
            time++;

            localStorage.set({site_timer: time});
        }, 1000);
    }
}, () => {
    alert('Couldn\'t find local storage');
});

setInterval(() => {
    if (time > 5) {
        window.location.href = 'about:blank';
    }
}, 5000);