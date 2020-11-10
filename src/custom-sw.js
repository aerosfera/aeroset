import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';

self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => self.clients.claim());

precacheAndRoute(self.__WB_MANIFEST);

// app-shell
registerRoute("/", new NetworkFirst());