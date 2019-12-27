import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClipboardModule } from 'ngx-clipboard';
import { GameComponent } from './game/game.component';

import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from './firebase.config';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RouterModule, Routes } from '@angular/router';
import { DkComponent } from './dk/dk.component';

const appRoutes: Routes = [
  { path: 'pong', component: GameComponent }
]
@NgModule({
  imports:[ BrowserModule, FormsModule ,ClipboardModule, 
  AngularFireModule.initializeApp(FirebaseConfig),
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent, GeneratorComponent, SidebarComponent, GameComponent, DkComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
