undefined//append code to cra service worker

self.addEventListener('message', function handleSkipWaiting(event) {
  if (event.data === 'skipWaiting') { self.skipWaiting(); }
});
