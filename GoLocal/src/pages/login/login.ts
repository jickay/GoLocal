import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { CreateAccountPage } from '../createAccount/createAccount';
import { ProfilePage } from '../profile/profile';

import { logInButton } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Backend } from '../../app/ajax';

import { FirebaseProvider } from '../../providers/firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private Ajax;

  private user = {
    username: "",
    password: "",
    profile: ""
  }

  private username = "";
  private password = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
     params: NavParams, public fbProvider: FirebaseProvider, public storage: Storage,
     public http: Http) {
      
      this.Ajax = new Backend.Ajax(http);
  }

  login() {
    console.log("Clicked log in");
    console.log(this.username,this.password);

    let data = {
      username: this.username,
      password: this.password
    }
    this.Ajax.userAuth(this.http,this.navCtrl,this.storage,data);

    // let userObject = this.fbProvider.logIn(this.navCtrl,this.username,this.password)

    // // Convert data to normal object and store in local storage
    // userObject.snapshotChanges().subscribe(actions => {
    //   actions.forEach(action => {
    //     console.log(action);
    //     const value = action.payload.doc.data();
    //     const id = action.payload.doc.id;
    //     this.storage.set('user' ,{
    //       id: id,
    //       val: value
    //     });
    //   });
    // })

    // // Check value of queried user and route to appropriate page
    // userObject.valueChanges().subscribe( user => {
    //     if (user.length > 0) {
    //       console.log(user)
    //       let name = user[0]['name']
    //       if (user[0]['type'] == 1) {
    //         console.log("Guide logged in. Going to dashboard");
    //         this.navCtrl.setRoot(DashboardPage, {
    //           loggedIn: true,
    //           name: name
    //         });
    //       } else {
    //         alert("Logged in as " + name)
    //         this.navCtrl.setRoot(HomePage, {
    //           loggedIn: true,
    //           name: name
    //         });
    //       }
    //     } else {
    //       alert("Username/password did not match. Try again.")
    //     }
    //   }, error => {
    //     console.log("Could not log in. Try again");
    //   });
  }

  createAccountModal() {
    if (logInButton == "My Profile")
    {
      this.navCtrl.push(ProfilePage)
    }
    else {
      let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
      createNewModal.present()
    }
  }
}

