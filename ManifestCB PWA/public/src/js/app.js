var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then(() => {
        console.log('SW is Registered!');
    }).catch(err => {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', event => {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});
