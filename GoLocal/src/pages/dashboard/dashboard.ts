import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FirebaseProvider } from '../../providers/firebase';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Backend } from '../../app/ajax';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { ActivityPage } from '../activity/activity';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class DashboardPage {

  private loggedIn = true;
  private logInButton = "Profile";

  private username;

  private activitiesDBAll;
  private activitiesDBBooked;

  private activitiesAll = [];
  private activitiesBooked = [];

  private Ajax;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public http: Http, 
    public fbProvider: FirebaseProvider, public storage: Storage, public navParams: NavParams) {
    
    this.Ajax = new Backend.Ajax(http);
    
    this.username = this.navParams.get('name')
    this.logInButton = this.username + "'s Profile";
    
    this.storage.get('user').then( user => {
      let guideID = user.username;
      console.log(guideID);

      this.Ajax.getDashboardActivities(http,storage,{username:guideID},this.activitiesAll,this.activitiesBooked);

      // // Get all guide's activities from Firestore
      // this.activitiesDBAll = this.fbProvider.getGuideActivities(guideID);
      // // Convert Firestore object to normal object
      // this.activitiesDBAll.subscribe(activities => {
      //   this.activitiesData = [];
      //   this.activitiesBooked = [];
      //   activities.forEach(activity => {
      //     console.log(activity.payload.doc.data());
      //     const value = activity.payload.doc.data();
      //     const id = activity.payload.doc.id;
      //     let traveller = value['traveller'];
      //     if (traveller) {
      //       this.activitiesBooked.push({
      //         id: id,
      //         val: value
      //       });
      //     } else {
      //       this.activitiesData.push({
      //         id: id,
      //         val: value
      //       });
      //     }
          
      //   });
      // })
      // console.log(this.activitiesData);
      
    })
    
  }

  ionViewWillEnter() {
    this.storage.get('dashboardActivities').then( activities => {
      console.log(activities);
      this.activitiesAll = [];
      this.activitiesBooked = [];
      for (let i=0; i<activities.length; i++) {
        let a = activities[i];
        console.log(a.avail);
        
        a.avail ? this.activitiesAll.push(a) : this.activitiesBooked.push(a);
        // this.activitiesAll = list;
        
      }
      console.log(this.activitiesAll);
        console.log(this.activitiesBooked);
    })
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
    existingAccountModal.present()
  }

  addActivity() {
    this.storage.get('user').then( user => {
      let id = user.id;
      const activity = {
        id: null,
        title: "Click edit button to change title",
        price: 0,
        description: "Click edit button to change description",
        guide: id
      }
      this.navCtrl.push(ActivityPage, {
        loggedIn: this.loggedIn,
        userType: 1, 
        activity: activity,
      });
    })
    
  }

  goToActivity(activity) {
    this.navCtrl.push(ActivityPage, { userType: 1, activity: activity });
  }

  goToProfile() {
    console.log("Profile clicked");
    this.navCtrl.push(ProfilePage, {
      myProfile: true
    });
  }

}

export var logInButton;