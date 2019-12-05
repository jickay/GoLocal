import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FileUploader } from 'ng2-file-upload';

import { FirebaseProvider } from '../../providers/firebase';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Backend } from '../../app/ajax';

import { HomePage } from '../home/home';
import { ActivityPage } from '../activity/activity';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public uploader:FileUploader = new FileUploader({
    url: "",
    autoUpload: true
  });
  private profileImage;

  private editProfile = false;

  private editingName = false;
  private editingBio = false;

  private profile = {
    name: "My Full Name",
    bio: "User bio"
  }

  private activities_user = [];

  private Ajax;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public http: Http, public fbProvider: FirebaseProvider) {
    this.editProfile = this.navParams.get('myProfile');
    // Check if user has stored profile details to display

    this.Ajax = new Backend.Ajax(http);

  }

  ionViewWillEnter() {
        
    this.storage.get('user').then( user => {
      console.log(user);
      let data = { username: user.username };
      this.Ajax.getProfile(this.http,this.storage,data).subscribe( pdata => {
        let profile = pdata.json()
        console.log(profile);
        this.profile = profile;
        this.profileImage = profile.image;
      });
      this.Ajax.getBookedActivities(this.http,this.storage,data).subscribe( adata => {
        let activities = adata.json();
        console.log(activities);
        this.activities_user = activities;
      })
    });

    // this.storage.get('profile').then( profile => {
    //   this.profile = profile;
    //   this.profileImage = profile.image;
    // })

    // this.storage.get('bookedActivities').then( activities => {
    //   console.log("local booked activities: ");
    //   console.log(activities);
    //   this.activities_user = activities;
    // })
  }

  backToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  goToActivity(activity) {
    console.log("Activity clicked");
    console.log(activity);
    this.navCtrl.push(ActivityPage, {
      loggedIn: true,
      userType: 0, 
      activity: activity,
    });
  }

  // Edit functions

  editName() {
    this.editingName = true;
  }

  editBio() {
    this.editingBio = true;
  }

  // When saving profile
  updateProfile() {
    this.storage.get('user').then( user => {
      let data = {
        username: user.username,
        image: this.profileImage,
        bio: this.profile.bio,
        fname: this.profile.name
      }
      console.log("new profile data: ", data);
      this.Ajax.upsertProfile(this.http,this.storage,this.navCtrl,data);
      // this.fbProvider.updateProfile(ID,this.profile.name,this.profile.bio,image);
    })
  }

  // Upload images
  onUpload() {
    console.log("Upload images clicked");

    let queue = this.uploader.queue;
    console.log(queue);


    if (queue.length <= 1) {
      queue.forEach( file => {
        const fileData = file._file;
        console.log(file);

        this.profileImage = file;

        // this.Ajax.saveImage(this.http, file);

        var fileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(event);
          let imageURL = event['target']['result'];
          this.profileImage = imageURL.toString();
          console.log(imageURL);
        };

        fileReader.readAsDataURL(fileData);
  
      });  
    } else {
      alert("Too many images. Can only upload 1 profile picture");
      this.uploader.clearQueue();
    }
  
  }
}
