import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FirebaseProvider } from '../../providers/firebase';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Backend } from '../../app/ajax';

import { HomePage } from '../home/home';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  private activity = {
    id: "",
    title: "Activity #",
    price: 100,
    image: "",
    // date: "Oct.3",
    // time: "10am - 1pm",
    guide: "Rocky Climber"
  }

  private billing = {};
  private payment = {};

  private months = [1,2,3,4,5,6,7,8,9,10,11,12];
  private days = [1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,31];

  private Ajax;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public fbProvider: FirebaseProvider, 
    public http: Http, public storage: Storage) {
    
    this.Ajax = new Backend.Ajax(http);

    let activity = this.navParams.get('activity');
    let activity_ID = this.navParams.get('activity_id');
    let guide = this.navParams.get('guide');

    this.activity = activity;
    this.activity.id = activity_ID;
    this.activity.guide = guide.name;

    console.log(this.activity);
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { userId: 123456});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { userId: 123456});
    existingAccountModal.present()
  }

  onCancel() {
    this.navCtrl.setRoot(HomePage, { loggedIn: true });
  }

  onConfirm() {
    this.storage.get('user').then( user => {
      // this.fbProvider.bookActivity(this.activity.id,user.id);
      this.payment['type'] = parseInt(this.payment['type']);
      this.payment['username'] = user.username;
      this.payment['amount'] = this.activity.price;
      this.payment['activity_id'] = this.activity.id;
      this.Ajax.bookActivity(this.http,this.storage,this.navCtrl,this.payment);
    })
    // this.navCtrl.setRoot(HomePage, { loggedIn: true });
  }

}
