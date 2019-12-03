import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Modal } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http, Headers, RequestOptions } from '@angular/http';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { logInButton } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { DashboardPage } from '../dashboard/dashboard';
import { Backend } from '../../app/ajax';

import { FirebaseProvider } from '../../providers/firebase';
import { AgreementPage } from '../agreement/agreement';

@Component({
  selector: 'page-createAccount',
  templateUrl: 'createAccount.html'
})
export class CreateAccountPage {

  private Ajax;

  private user = {
    username: "",
    password: "",
    profile: ""
  }

  private loggedIn: Boolean = false;
  private username = "";
  private password = "";
  private userType = 0;
 

  private firstname = "";
  private lastname = "";
  private contact = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, params: NavParams, public storage: Storage, public fbProvider: FirebaseProvider, public http: Http) {
    this.Ajax = new Backend.Ajax(http);
    console.log('username', params.get('username'));
  }

  createAccount() {
    console.log("Clicked create account");
    console.log(this.username,this.password,this.userType);
    // let user = this.fbProvider.addUser(this.navCtrl,this.username,this.password,this.userType,this.fullname, this.contact);
    // Convert data to normal object and store in local storage
    // user.snapshotChanges().subscribe( user => {
    //     console.log(action);
    //     const value = action.payload.doc.data();
    //     const id = action.payload.doc.id;
    //     this.storage.set('user' ,{
    //       id: id,
    //       val: value
    //     });
    //   });
    // })

    let data = {
      username: this.username,
      password: this.password,
      usertype: this.userType,
      fname: this.firstname,
      lname: this.lastname
    }

    let profileData = {
      username: this.username,
      fname: this.firstname,
      lname: this.lastname
    }

    this.Ajax.createProfile(this.http,this.storage,profileData);
    this.Ajax.createUser(this.http,this.storage,this.navCtrl,data);

    // user.snapshotChanges().subscribe( user => {
    //   console.log("User added");
    //   let id = user.payload.id;
    //   let value = user.payload.data();
    //   // Store user info locally
    //   this.storage.set('user', {
    //     id: id,
    //     val: value
    //   })
    //   // Route to appropriate page for user type
    //   if (value['userType'] == 1) {
    //     this.navCtrl.setRoot(DashboardPage, {
    //       loggedIn: true,
    //       name: this.fullname,
    //       id: id
    //     });
    //     alert("New guide account created!")
    //   } else {
    //     this.navCtrl.setRoot(HomePage, {
    //       loggedIn: true,
    //       name: this.fullname,
    //     });
    //     alert("New traveller account created!")
    //   }
    // }, error => {
    //   console.log(error);
    //   alert("Could not create new acccount. Try again.");
    // });
    // if (this.loggedIn) {
    //   let logInButton = "My Profile";
    //   this.navCtrl.setRoot(HomePage, {data: logInButton});
    // } else {
    //   alert("Could not log in. Try again.");
    // }
  }
  
  
  loginModal() {
    if (logInButton == "My Profile")
    {
      this.navCtrl.push(ProfilePage)
    }
    else {
      let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
      existingAccountModal.present()
    }
  }

  viewAgreement() { 
    this.navCtrl.setRoot(AgreementPage);
  }
}
