if ('serviceWorker' in navigator) {
  window.addEventListener('load' , () => {
    navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('[serviceWorker] registered', registration);
    })
    .catch((error) => {
      console.log('[serviceWorker] not registered', error);
    })
  })
}
