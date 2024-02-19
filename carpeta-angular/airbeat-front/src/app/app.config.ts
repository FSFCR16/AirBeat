import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { withFetch, provideHttpClient } from '@angular/common/http';
import { provideStore, provideState, StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { getPlaylistReducer } from './Store/playlist.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState({ name: "playlists", reducer: getPlaylistReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};


