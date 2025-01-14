import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { DirectivesModule } from '../directives/directives.module';
import { ElasticHeaderDirective } from '../directives/elastic-header/elastic-header';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AboutPage } from '../pages/about/about';
import { ActivityPage } from '../pages/activity/activity';
import { ProfilePage } from '../pages/profile/profile';
import { CreateAccountPage } from '../pages/createAccount/createAccount';
import { LoginPage } from '../pages/login/login';
import { PaymentPage } from '../pages/payment/payment';
import { AgreementPage } from '../pages/agreement/agreement';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseProvider } from '../providers/firebase';

import { FileUploadModule } from 'ng2-file-upload';
 
const firebaseConfig = {
    apiKey: "AIzaSyDb7Ifl2bypRHfuIHFEkgKXh4XaO9qnMYI",
    authDomain: "golocal-5d48e.firebaseapp.com",
    databaseURL: "https://golocal-5d48e.firebaseio.com",
    projectId: "golocal-5d48e",
    storageBucket: "golocal-5d48e.appspot.com",
    messagingSenderId: "423914306295"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    AboutPage,
    ProfilePage,
    ActivityPage,
    CreateAccountPage,
    LoginPage,
    PaymentPage,
    AgreementPage,
    ElasticHeaderDirective 
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    FileUploadModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    AboutPage,
    ProfilePage,
    ActivityPage,
    CreateAccountPage,
    LoginPage,
    AgreementPage,
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
