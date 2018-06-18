import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from "angularfire2";

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DevisPage } from '../pages/devis/devis';
import { InsertClientPage } from '../pages/insert-client/insert-client';
import { InsertFormulePage } from '../pages/insert-formule/insert-formule';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

var config = {
  apiKey: "AIzaSyBNSbGf01wK7m6nhkVCW3lup-ralKSMCow",
  authDomain: "cassionic-tsp.firebaseapp.com",
  databaseURL: "https://cassionic-tsp.firebaseio.com",
  projectId: "cassionic-tsp",
  storageBucket: "cassionic-tsp.appspot.com",
  messagingSenderId: "624772452087"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    InsertClientPage,
    InsertFormulePage,
    DevisPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(config),

    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    InsertClientPage,
    InsertFormulePage,
    DevisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
