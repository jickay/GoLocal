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
    this.storage.get('user').then( user => {
      this.logInButton = user.username + "'s Profile";
    })
    
    // this.storage.get('user').then( user => {
    //   let guideID = user.username;
    //   console.log(guideID);

    //   // this.Ajax.getDashboardActivities(http,storage,{username:guideID},this.activitiesAll,this.activitiesBooked);
      
    // })
    
  }

  ionViewWillEnter() {
    // this.storage.get('dashboardActivities').then( activities => {
    //   console.log(activities);
    //   this.activitiesAll = [];
    //   this.activitiesBooked = [];
    //   for (let i=0; i<activities.length; i++) {
    //     let a = activities[i];
    //     console.log(a.avail);
        
    //     a.avail ? this.activitiesAll.push(a) : this.activitiesBooked.push(a);
    //     // this.activitiesAll = list;
        
    //   }
    //   console.log(this.activitiesAll);
    //     console.log(this.activitiesBooked);

    // })

    this.storage.get('user').then( user => {

      this.Ajax.getDashboardActivities(this.http,this.storage,{username:user.username})
        .subscribe(adata => {
          let activities = adata.json();
          this.activitiesAll = activities;
        });
    });

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