if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(event => {
            console.log('[serviceWorker] registered', event);
        }).catch(error => {
            console.log('[serviceWorker] not registered', error);
        })
}