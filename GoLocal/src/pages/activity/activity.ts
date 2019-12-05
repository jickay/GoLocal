import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FileUploader } from 'ng2-file-upload';

import { FirebaseProvider } from '../../providers/firebase';
import { FirebaseApp } from 'angularfire2';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Backend } from '../../app/ajax';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';
import { PaymentPage } from '../payment/payment';
import { isString } from 'ionic-angular/util/util';
import { AngularFirestore } from 'angularfire2/firestore';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {

  public uploader:FileUploader = new FileUploader({
    url: "",
    autoUpload: true
  });
  private imageQueue = [];

  private loggedIn = false;
  
  // To set edit mode if guide user
  private isGuide = false;

  // To check if new activity or editing existing one
  private newActivity = true;

  // To check if an element is being edited
  private editingTitle = false;
  private editingPrice = false;
  private editingDescription = false;

  // Store and list of categories
  private categories = ["Food","Scenic","Music","Active","Casual","Night"];

  private activity_ID = null;
  private activity = {
    title: "Activity Title",
    price: 100,
    description: "Bunch of stuff goes here",
    guide: "",
    category: -1,
    location: "Calgary",
  }

  private guideData = {
    name: "Rocky Climber",
    // subtitle: "The bestest boulderer around",
    contact: "rocky@climbeverything.com"
  }

  // Values for month and day dropdown menus
  private months = [1,2,3,4,5,6,7,8,9,10,11,12];
  private days = [];

  private reviews = [];
  private newReview = {
    rating: 0,
    comment: ""
  }
  private rating = 0;
  private comment = "";

  private Ajax;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public modalCtrl: ModalController, public storage: Storage, public alertCtrl: AlertController,
    public fbProvider: FirebaseProvider, private fbApp: FirebaseApp, private afs: AngularFirestore) {

      console.log("Constructing activity");
      // Get data about activity from previous page
      let activity = navParams.get('activity');
      let userType = navParams.get('userType');
      this.loggedIn = true;
      // console.log(activity);
      // console.log(userType, this.loggedIn);

      // Check if guide or not to turn on editing
      if (userType == 1) {
        this.isGuide = true;
        console.log(this.activity);
      } else {
        this.isGuide = false;
          
        // Set local variables to activity info
        this.activity_ID = activity.id;
        this.activity = activity;
      }
      console.log("is guide: " + this.isGuide);

      if (activity.images) {
        this.imageQueue = activity.images;
      }

      this.Ajax = new Backend.Ajax(http);

      // this.fbProvider.getGuideInfo(this.activity.guide)
      // .subscribe( guide => {
      //     console.log("After getting guide info:");
      //     const value = guide.payload.data();
      //     let data = {
      //       name: value['name'],
      //       contact: value['contact'],
      //       image: value['image']
      //     }
      //     this.guideData = data;
      //   });

      for (var i=0; i<31; i++) { this.days.push(i); }
  }

  ionViewWillEnter() {
    console.log("Getting review for activity ", this.activity_ID);
    this.reviews = [];
    this.Ajax.getActivityReview(this.http,this.storage,{ activity_id: this.activity_ID })
      .subscribe( rdata => {
        let reviews = rdata.json();
        console.log(reviews);
        for (let r of reviews) {
          let stars = [];
          for (let i=0; i<r.rating; i++) {
            stars.push(1);
          }
          while (stars.length < 5) {
            stars.push(0);
          }
          r['stars'] = stars;
        }
        console.log(reviews);
  
        this.reviews = reviews;
      });

    // this.storage.get('reviews').then( reviews => {
    //   for (let r of reviews) {
    //     let stars = [];
    //     for (let i=0; i<r.rating; i++) {
    //       stars.push(1);
    //     }
    //     while (stars.length < 5) {
    //       stars.push(0);
    //     }
    //     r['stars'] = stars;
    //   }
    //   console.log(reviews);

    //   this.reviews = reviews;
    // })
  }
 
  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { });
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { });
    existingAccountModal.present()
  }

  goToProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }

  // Edit functions

  editTitle() {
    this.editingTitle = true;
  }

  editPrice() {
    this.editingPrice = true;
  }

  editDescription() {
    this.editingDescription = true;
  }

  // When booking an activity (FOR TRAVELLERS)
  onBook() {
    console.log("Book clicked");
    if (this.loggedIn) {
      console.log(this.activity);
      this.navCtrl.push(PaymentPage, {
        activity_id: this.activity_ID,
        activity: this.activity,
        guide: this.guideData
      });
    }
    // let ID = this.navParams.get('activity').id;
    // this.fbProvider.bookActivity(ID,this.traveller);
  }

  // Save changes to activity or add new one (FOR GUIDES)
  saveActivity() {
    console.log("logo clicked");
    // Convert price to integer since it is string from ion-input
    if (isString(this.activity.price)) {
      this.activity.price = parseInt(this.activity.price);
    }
    // If existing activity was clicked it will pass it forward
    // If adding new activity there will be no ID
    this.storage.get('user').then( user => {
      let ID = this.activity_ID;
      this.activity.guide = user.username;
      if (ID != null) {
        console.log("Updating activity");
        // this.fbProvider.updateActivity(ID,this.activity.title,this.activity.category,this.activity.description,this.activity.price,guide,this.imageQueue);
        this.navCtrl.pop();
      } else {
        console.log("Adding new activity");
        console.log(this.activity);
        // this.activity_ID = this.fbProvider.addActivity(this.activity.title,this.activity.category,this.activity.description,this.activity.price,guide,this.imageQueue);
        // this.activity.images = this.imageQueue;
        this.Ajax.createActivity(this.http,this.navCtrl,this.activity)
        // this.navCtrl.pop();
      }
    })
  }

  deleteActivity() {
    console.log("Delete clicked");
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Delete Activity',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            // this.fbProvider.removeActivity(this.activity_ID);
            this.navCtrl.setRoot(DashboardPage);
          }
        }
      ]
    });
    alert.present();
  }

  // Upload images
  onUpload() {
    console.log("Upload images clicked");

    let queue = this.uploader.queue;
    console.log(queue);

    if (queue.length <= 1) {
      queue.forEach( file => {
        const fileData = file._file;
        console.log(fileData.name);

        var fileReader = new FileReader();

        fileReader.onload = (event) => {
          console.log(event);
          let imageURL = event['target']['result'];
          // var image = {
          //   file: imageURL,
          // };
          this.activity['image'] = imageURL;
        };

        fileReader.readAsDataURL(fileData);
  
      });  
    } else {
      alert("Too many images. Can only upload 1 per activity");
      this.uploader.clearQueue();
      this.imageQueue = [];
    }
  
  }

  dropImage(event) {
    console.log("Image dropped");
    console.log(event);
    console.log(this.uploader.queue)

    this.onUpload();
  }

  addReview() {
    this.storage.get('user').then( user => {
      let data = {
        username: user.username,
        activity_id: this.activity_ID,
        rating: this.rating,
        comment: this.comment
      }
      this.Ajax.addReview(this.http,this.storage,data);
    })

  }

}
