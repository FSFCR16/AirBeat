import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { withFetch, provideHttpClient } from '@angular/common/http';
import { provideStore, provideState, StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { songsReducer } from './Store/playlist.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState({name: "songslist", reducer: songsReducer  })]
};


