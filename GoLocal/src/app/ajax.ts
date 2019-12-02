/*
 * File: ajax.ts
 * 
 * Description: 
 *      TypeScript file for backend 
 */

// import $ from 'jquery';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { Http, Headers, RequestOptions } from '@angular/http';
import { httpFactory } from '@angular/http/src/http_module';
import { NavController } from 'ionic-angular';

import 'rxjs/Rx';
import { P } from '@angular/core/src/render3';
import { _ParseAST } from '@angular/compiler';
import { storage } from 'firebase';

declare let cordova: any;


export module Backend {

    export class Ajax {
        // public _ROOT = "http://localhost/";
        public _ROOT = "http://8e2b1222.ngrok.io/";

        public GEN_CODES = this._ROOT + "createParticipantCodes.php";

        public AUTH_URL = this._ROOT + "userAuth.php";
        //public AUTH_URL = this._ROOT + "LLTEST/createuserLL.php";
        public CREATE_USER_URL = this._ROOT + "createUser.php";
        public GET_USER_ID = this._ROOT + "getUserID.php";
        public GET_USER_PW = this._ROOT + "getUserPassword.php";
        public CHANGE_USER_PW = this._ROOT + "changeUserPassword.php";

        public GET_HOME_ACTIVITY_URL = this._ROOT + "homeActivities.php";
        public CREATE_ACTIVITY_URL = this._ROOT + "createActivity.php";
        public BOOK_ACTIVITY_URL = this._ROOT + "bookActivity.php";

        private headers: Headers = new Headers({});
        private options: RequestOptions;

        // Constructor
        constructor(http: Http) {
            this.headers.append('Access-Control-Allow-Origin' , '*');
            this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            this.headers.append('Accept','application/json');
            this.headers.append('content-type','application/json');

            this.options = new RequestOptions({
                headers: this.headers
            })
        }

        // Create participant codes
        public generateParticipantCodes(http,options,codes) {
            http.post(this.GEN_CODES,codes,options)
                .subscribe( data => {
                    console.log(data);
                }, error => {
                    console.log("Problem generating participant codes");
                })
        }
 
        /**************************************************************/
        /************************* Login page *************************/
        /**************************************************************/
        
        public getUserID(http,options,navCtrl,username,localStorage) {
            http.post(this.GET_USER_ID,{ username:username },options)
                .subscribe( data => {
                    console.log("User ID is: ");
                    console.log(data.json());
                    var response = data.json();
                    // this.getUserSecurityQuestions(http,options,navCtrl,response.user_ID);
                    // localStorage.set('user_ID',response.user_ID);
                }, error => {
                    console.log("Could not get user ID");
                })
        }

        public changeUserPassword(http,options,uID,currentPassword,newPassword) {
            http.post(this.GET_USER_PW,{ user_ID:uID },options)
                .subscribe( data => {
                    console.log("User password is: ");
                    console.log(data.json());
                    var password_response = data.json().password;
                    
                    if (password_response == currentPassword) {
                        http.post(this.CHANGE_USER_PW,{ user_ID:uID, password:newPassword },options)
                        .subscribe( data => {
                            console.log("Password changed to: ");
                            console.log(data.json().password);
                            console.log("New password saved");
                        })
                    } else {
                        console.log("Current password did not match")
                    }
                }, error => {
                    console.log("Could not get user ID");
                })
        }

        // Creates new user 
        public createUser(http,localStorage,navCtrl,newData) {
            console.log("Creating user in ajax")
            http.post( this.CREATE_USER_URL, newData, this.options)
            // Callback public if post succeeds
            .subscribe( data => {
                var json;
                try {
                    console.log("Parsing user json");
                    json = data.json();
                    console.log("New user:");
                    console.log(json);

                    if (json.usertype == 1) {
                        navCtrl.setRoot(DashboardPage);
                    } else {
                        navCtrl.setRoot(HomePage);
                    }
                } catch (error) {

                }

            //         // Retreive all app content on successful creation of new user
            //         // this.getAllQuestions(http,options,localStorage);
            //         // this.getAllGoalParts(http,localStorage,options);

            //         if (json.ID) {
            //             // Store ID info locally
            //             console.log("This is the users data:");
            //             console.log(json);
            //             // Store ID info locally
            //             localStorage.set('user_ID', json.ID);
            //             localStorage.set('username', json.username);
            //             localStorage.set('pin', { loggedIn:true, number:json.pin });
            //             // // Set notification values
            //             // localStorage.set('notification', { hour:21, minute:0 });
            //             // Set default data values
            //             localStorage.set('answers',[]);
            //             localStorage.set('userInventories',[]);
            //             localStorage.set('feedbackData',{});
            //             // Set default notifications (DISABLE FOR TESTING!!!)
            //             this.setDailyNotification(21,0);

            //             // navCtrl.push(CreateSecurityQuestions, { user_ID:json.ID });
            //             navCtrl.setRoot(TabsPage, { isNewUser: false });
            //         }
            //     } catch (error) {
            //         console.log("Error parsing user json")
            //         console.log(data['_body']);
            //         console.log("Could not read data after creating user.")
            //     }                
            // }, error => {
            //     console.log("Error creating user")
            //     console.log(error);
            //     if (error.status == 421) {
            //         console.log("Could not create new user, no ID");
            //     } else if (error.status == 422) {
            //         console.log("Could not create new user:\n\n" + error['_body']);
            //         console.log("Username is taken!");
            //     } else {
            //         console.log("Was a problem creating new user")
            //     }
            //     button.disabled = false;
            });
        }

        public userAuth(http,navCtrl,localStorage,newData) {
            console.log("Authorizing user");
            // console.log(this.AUTH_URL);
            http.post( this.AUTH_URL, newData)
            // Callback public if post succeeds
            .subscribe( data => {
                var json;
                try {
                    json = data.json();
                    console.log("After login:");
                    console.log(json);

                    localStorage.set('user', {
                        username: json.username,
                        usertype: json.usertype
                    });

                    if (json.usertype == 1) {
                        navCtrl.setRoot(DashboardPage);
                    } else {
                        navCtrl.setRoot(HomePage, { loggedIn: true });
                    }
                } catch (error) {
                    console.log(data['_body']);
                    alert("Something went wrong. Couldn't login.")
                    // button.disabled = false;
                }

                // if (json.user_ID) {
                //     console.log("Set local user ID: " + json.user_ID);
                //     console.log("Set local pin to: " + json.pin);
                //     console.log("Set local username to: " + json.username);
                //     // Store ID info locally
                //     localStorage.set('user_ID', json.user_ID);
                //     localStorage.set('username', json.username);
                //     localStorage.set('pin', { loggedIn:true, number:json.pin });
                    
                //     // Retreive all app content on successful login
                //     this.getUserInventories(http, localStorage, json.user_ID);
                //     //this.getUserAnswers(http, options, json.user_ID);

                //     // Change root page to tabs page
                //     navCtrl.setRoot(TabsPage);
                
                // }
                // console.log("RECEIVED ALL DATA!!!");
            }, error => {
                console.log(error);
                // alert("Username/password is not working. Try again.");
                // button.disabled = false;
                // window.plugins.toast.showLongBottom('Error getting users!')
            });
        }

         /**************************************************************/
        /************************* Activities *************************/
        /**************************************************************/
        
        public getHomeActivities(http,storage,list) {
            http.get(this.GET_HOME_ACTIVITY_URL,{},this.options)
                .subscribe( data => {
                    console.log("Home activities: ");
                    console.log(data.json());

                    storage.set('homeActivities',data.json());
                    // var response = data.json();
                    // this.getUserSecurityQuestions(http,options,navCtrl,response.user_ID);
                    // localStorage.set('user_ID',response.user_ID);
                }, error => {
                    console.log("Could not get home activities");
                })
        }

        public getDashboardActivities(http,storage,data,listAll,listBooked) {
            http.get(this.GET_HOME_ACTIVITY_URL,data,this.options)
                .subscribe( data => {
                    let obj = data.json()
                    console.log("Dashboard activities: ");
                    console.log(obj);

                    storage.set('dashboardActivities',obj);

                    // for (let activity of obj) {
                    //     console.log(activity['avail']);
                    //     activity['avail'] == 1 ? listAll.push(activity) : listBooked.push(activity);
                    // }

                    // var response = data.json();
                    // this.getUserSecurityQuestions(http,options,navCtrl,response.user_ID);
                    // localStorage.set('user_ID',response.user_ID);
                }, error => {
                    console.log("Could not get Dashboard activities");
                })
        }

        public createActivity(http,storage,newData) {
            http.post(this.CREATE_ACTIVITY_URL,newData,this.options)
                .subscribe( data => {
                    console.log("New activity ID: ");
                    console.log(data.json());

                    // storage.set('homeActivities',data.json());
                    // var response = data.json();
                    // this.getUserSecurityQuestions(http,options,navCtrl,response.user_ID);
                    // localStorage.set('user_ID',response.user_ID);
                }, error => {
                    console.log("Could not create activity");
                })
        }

          /**************************************************************/
        /************************* Booking and Payment *************************/
        /**************************************************************/

        public bookActivity(http,storage,navCtrl,newData) {
            console.log(newData);
            http.post(this.BOOK_ACTIVITY_URL,newData,this.options)
                .subscribe( data => {
                    console.log("Activity booked: ");
                    console.log(data.json());

                    // navCtrl.setRoot(HomePage, { loggedIn: true });

                    // storage.set('homeActivities',data.json());
                    // var response = data.json();
                    // this.getUserSecurityQuestions(http,options,navCtrl,response.user_ID);
                    // localStorage.set('user_ID',response.user_ID);
                }, error => {
                    console.log("Could not book activity");
                })
        }

    }
    
}
