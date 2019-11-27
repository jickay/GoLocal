import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase';
import { Http, Headers, RequestOptions } from '@angular/http';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ActivityPage } from '../activity/activity';
import { CreateAccountPage } from '../createAccount/createAccount';
import { LoginPage } from '../login/login';
import { logInButton } from '../home/home';
import { Backend } from '../../app/ajax';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  private Ajax;

  private logInButton = "Create Account/Log In";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.Ajax = new Backend.Ajax(http);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

  goToAbout() {
    this.navCtrl.push(AboutPage);
  }

  createAccountModal() {
    let createNewModal = this.modalCtrl.create(CreateAccountPage, { username: name});
    createNewModal.present()
  }

  loginModal() {
    let existingAccountModal = this.modalCtrl.create(LoginPage, { username: name});
    existingAccountModal.present()
  }

}
