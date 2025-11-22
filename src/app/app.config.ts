import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'cash-control-1a326',
        appId: '1:1020567539950:web:ca2f9cc9f83f6fc53ca3ff',
        storageBucket: 'cash-control-1a326.firebasestorage.app',
        apiKey: 'AIzaSyAvkWvn1eJbL7upFNQbA1FwxdgT8SINgGA',
        authDomain: 'cash-control-1a326.firebaseapp.com',
        messagingSenderId: '1020567539950',
        measurementId: 'G-YBX6FKR2WZ',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
