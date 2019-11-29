/*
 * File: ajax.ts
 * 
 * Description: 
 *      TypeScript file for backend 
 */

// import $ from 'jquery';

import { HomePage } from '../pages/home/home';

import { Http, Headers, RequestOptions } from '@angular/http';
import { httpFactory } from '@angular/http/src/http_module';
import { NavController } from 'ionic-angular';

import 'rxjs/Rx';
import { P } from '@angular/core/src/render3';
import { _ParseAST } from '@angular/compiler';

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
                    this.getUserSecurityQuestions(http,options,navCtrl,response.user_ID);
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
        /******************* Security questions page ******************/
        /**************************************************************/
        
        // Load all security questions
        public getHomeActivities(http, storage, list) {
            http.get(this.GET_HOME_ACTIVITY_URL,this.options)
                .subscribe( data => {
                    var dbData = data.json();
                    console.log("Got activities:");
                    console.log(dbData);

                    // storage.set('allHomeActivities', dbData);

                    for (let i=0; i<dbData.length; i++) {
                        let activity = dbData[i];
                        list.push(activity);
                    }
                    console.log(list);
                    // for (let d in dbData) {
                    //     console.log(dbData[d]);
                    //     let activity = dbData[d];
                    //     list.push(activity);
                    // }
                    // for (let x in list) {
                    //     console.log(x);
                    // }
                }, error => {
                    console.log("Could not get home activities");
                })
        }

        /**************************************************************/
        /******************* Security questions page ******************/
        /**************************************************************/
        
        // Load all security questions
        public getSecurityQuestions(http,options,localStorage) {
            http.get(this.GET_SECURITY_QUESTIONS,options)
                .subscribe( data => {
                    var response = data.json();
                    console.log("Sec questions in ajax:");
                    console.log(response);
                    localStorage.set('securityQuestions',response);
                }, error => {
                    console.log("Could not get security questions");
                })
        }

        // Load user's 3 security questions they answered
        public getUserSecurityQuestions(http,options,navCtrl,uID) {
            http.post(this.GET_USER_SECURITY_QUESTIONS,{ user_ID:uID },options)
                .subscribe( data => {
                    console.log("User " + uID + "s security questions")
                    console.log(data.json());
                    var userSecurityQuestions = data.json();
                    navCtrl.push(SubmitSecurityQuestions,{ userSecurityQuestions:userSecurityQuestions });
                    // localStorage.set('userSecurityQuestions',response);
                }, error => {
                    console.log("Could not get user's security questions");
                })
        }

        // Check security answer question
        public checkSecurityQuestion(http,options,navCtrl,data,localStorage) {
            http.post(this.CHECK_SECURITY_QUESTION_ANSWER,data,options)
                .subscribe( data => {
                    console.log(data);
                    console.log("Password updated");
                    // Store user ID
                    localStorage.set('user_ID',data.user_ID);
                    // Go to home page
                    navCtrl.setRoot(TabsPage);
                }, error => {
                    console.log("Answer didn't match. Check your answer again.")
                })
        }

        // public createSecurityQuestions(http,options,navCtrl,answers) {
        //     http.post(this.UPDATE_SECURITY_QUESTIONS, answers, options)
        //     .subscribe( data => {
        //         navCtrl.setRoot(TutorialPage, { isNewUser: true });
        //     }, error => {
        //         console.log("Error creating security questions");
        //     })
        // }

        // public updateSecurityQuestions(http,options,navCtrl,answers) {
        //     http.post(this.UPDATE_SECURITY_QUESTIONS, answers, options)
        //     .subscribe( data => {
        //         navCtrl.setRoot(TabsPage, { isNewUser: false });
        //     }, error => {
        //         console.log("Error updating security questions");
        //     })
        // }


        /**************************************************************/
        /*********************** Inventory page ***********************/
        /**************************************************************/

        // Get all inventories
        getUserInventories(http, options, localStorage, userID) {
            console.log("Getting user inventories from: user " + userID);
            http.post(this.GET_USER_INVENTORIES_URL, {user_ID:userID}, options)
                .subscribe( data => {
                    var json;
                    try {
                        json = data.json();
                        localStorage.set('userInventories', json);
                        console.log("Retrieving inventories successful");

                    } catch (error) {
                        console.log("Error parsing the inventory object");
                        console.log(error);
                    }
                }, error => {
                    console.log(error);
                });
        }

        // Add inventory
        addInventory(http, options, newData, navCtrl, localStorage) {
            console.log("Adding new inventory");

            http.post(this.ADD_INVENTORY_URL, newData, options)
                .subscribe( data => {
                    console.log("Sending inventory data successful");
                    newData['sent'] = true;

                    // Set local storage
                    localStorage.get('userInventories').then( allInventories => {
                        allInventories.unshift(newData);
                        localStorage.set('userInventories', allInventories);
                        navCtrl.setRoot(TabsPage, { selectedTab: 1 });
                    });          
                // Store the inventory even if there is no connection
                }, error => {
                    console.log(error);
                    newData['sent'] = false;

                    // Set local storage
                    localStorage.get('userInventories').then( allInventories => {
                        allInventories.unshift(newData);
                        localStorage.set('userInventories', allInventories);
                        navCtrl.setRoot(TabsPage, { selectedTab: 1 });
                    });
                });
        }

        // Update inventory
        updateInventory(http, options, newData, navCtrl) {
            console.log("Updating existing inventory");

            http.post(this.UPDATE_INVENTORY_URL, newData, options)
            .subscribe( data => {
                console.log("Updating inventory data successful");

                // Modify data in the local storage
                localStorage.get('userInventories').then( allInventories => {                                                                                                                                                                         
                    for (let inventory of allInventories) {
                        if (inventory.inventory_id == newData.inventory_id) {
                            // Update the inventory id
                            // If it was -1, it will assign new inventory id
                            // If it already had an inventory id, it will remain same
                            newData.inventory_id = data;
                            inventory = newData;
                            break;
                        }
                    }              
                    navCtrl.setRoot(TabsPage, { selectedTab: 1 });
                });
            }, error => {
                console.log(error);
                navCtrl.setRoot(TabsPage, { selectedTab: 1 });
                
            });
        }

        /**************************************************************/
        /*********************** Questions page ***********************/
        /**************************************************************/

        // Get all questions
        public getAllQuestions(http, headers, localStorage) {
            http.get(this.GET_QUESTIONS_URL,{headers:headers})
                .subscribe( data => {
                    console.log("Questions aquired");
                    //this.allQuestions = data.json();
                    localStorage.set('questions', data.json());
                }, error => {
                    console.log(error);
                });
        }

        // Add new answers
        public createAnswer(http,options,newAnswers,navCtrl,localStorage) {
            console.log("Adding new answers");
            http.post(this.CREATE_ANSWERS_URL, newAnswers, options) 
                .subscribe( data => {
                    console.log("Submitting answers successful");
                    console.log(newAnswers);

                    newAnswers['sent'] = true;

                    // Set local storage
                    localStorage.get('answers').then( allAnswers => {
                        allAnswers.unshift(newAnswers);
                        localStorage.set('answers', allAnswers);
                        navCtrl.setRoot(TabsPage, { selectedTab: 3 });
                    })
                }, error => {
                    console.log(error);

                    newAnswers['sent'] = false;
                    
                    // Set local storage
                    localStorage.get('answers').then( allAnswers => {
                        allAnswers.unshift(newAnswers);
                        localStorage.set('answers', allAnswers);
                        navCtrl.setRoot(TabsPage, { selectedTab: 3 });
                    })
                });    
        }

        // Get user answers
        public getUserAnswers(http,options,userID) {
            console.log("Getting answers from: user " + userID);
            http.post(this.GET_USER_ANSWERS_URL,{user_ID:userID},options) 
                .subscribe( data => {
                    var answerSet;
                    try {
                        answerSet = data.json();
                        // If there is no answers, set empty set to local storage
                        if (answerSet == undefined || answerSet == null || answerSet.length < 1) {
                            localStorage.set('answers', []);
                        } else {
                            localStorage.set('answers', answerSet);
                        }                     
                    } catch (error) {
                        console.log("Could not parse json object for answers");
                    }

                }, error => {
                    console.log(error);

                });
        }

        // public createAnswer(http,options,navCtrl,newAnswers,localAnswers,button,localStorage) {
        //     http.post( this.CREATE_ANSWERS_URL, newAnswers, options)
        //     // Callback public if post succeeds
        //     .subscribe( data => {
        //         var json;
        //         let uID = newAnswers.user_ID;
        //         try {
        //             json = data.json();
        //             console.log("After submitting answers:");
        //             console.log(json);

        //             // Retreive all answers after successfully 
        //             this.getUserAnswers(http,options,navCtrl,localStorage,uID,null);

        //             // Route to feedback page if answer sent back
        //             navCtrl.setRoot(TabsPage,{ selectedTab: 3 });

                    

        //         } catch (error) {
        //             console.log("Error after POST:");
        //             console.log(error);
        //             console.log(data['_body']);
        //             // console.log("Something went wrong. Couldn't send answers.")
        //             // button.disabled = false;

        //             this.getUserAnswers(http,options,navCtrl,localStorage,uID,null);

        //             let tabs = { selectedTab: 3 }
        //             navCtrl.setRoot(TabsPage,tabs);
        //         }

        //     }, error => {
        //         button.disabled = false;
        //         console.log("Could not POST answer to server: ");
        //         console.log(error);
        //         // Store entry locally if unable to post
        //         localStorage.get('answers').then( allAnswers => {
        //             allAnswers.push(localAnswers);
        //             localStorage.set('answers',allAnswers);
        //         })
        //         // Then route back to feedback page
        //         let tabs = { selectedTab: 3 }
        //         navCtrl.setRoot(TabsPage,tabs);
        //             // window.plugins.toast.showLongBottom('Error creating user!')
        //         });
        // }

        /**************************************************************/
        /*********************** Feedback page ************************/
        /**************************************************************/

        // Get user stats and feedback data
        public getUserFeedbackData(http, options, localStorage, userID) {
            console.log("Getting feedback data of user " + userID);
            http.post(this.GET_USER_FEEDBACK_DATA_URL, {user_ID:userID}, options)
                .subscribe( data => {
                    var json;
                    var feedbackData;
                    try {
                        json = data.json();
                        localStorage.set('stats', json.stats);
                        feedbackData = json.allAnswers.reverse();
                        localStorage.set('feedbackData', feedbackData);
                        console.log("Retrieving feedback data successful");
                        console.log(json);
                    } catch (error) {
                        console.log("Error parsing the feedback data object");
                        console.log(json);
                        console.log(error);
                    }
                }, error => {
                    console.log(error);
                });
        }

        // private sortEntries(allEntries) {
        //     var sortedEntries = allEntries.sort( function(a,b) {
        //       return b.time.year - a.time.year ||
        //              b.time.month - a.time.month ||
        //              b.time.date - a.time.date ||
        //              b.time.hour - a.time.hour ||
        //              b.time.minute - a.time.minute;
        //     });
        //     console.log("Sorted entries:");
        //     console.log(sortedEntries);
  
        //     return sortedEntries;
        // }

        // Get user answers
        // public getUserAnswers(http,options,navCtrl,localStorage,userID,button) {
        //     console.log("Getting answers from: user " + userID);
        //     http.post(this.GET_USER_ANSWERS,{user_ID:userID},options)
        //         .subscribe( data => {
        //             var answerSet;
        //             try {
        //                 answerSet = data.json();
        //                 console.log("Answers from DB: ");
        //                 console.log(answerSet);
        //                 // Initiate empty array or fill in array with new entry
        //                 if (answerSet == undefined || answerSet == null || answerSet.length < 1) {
        //                     localStorage.set('answers',[]);

        //                     // Create new feedbackData object to refresh data in app
        //                     // new FeedbackData(localStorage,sortedEntries);

        //                     // Prevent rerouting after creating answers, only after logging in
        //                     if (button != null) {
        //                         navCtrl.setRoot(TabsPage);
        //                     }
        //                 } else {
        //                     var sortedEntries = this.sortEntries(answerSet);
        //                     localStorage.set('answers',sortedEntries);

        //                     // Create new feedbackData object to refresh data in app
        //                     // new FeedbackData(localStorage,sortedEntries);
                            
        //                     // Prevent rerouting after creating answers, only after logging in
        //                     if (button != null) {
        //                         navCtrl.setRoot(TabsPage);
        //                     }
        //                 }
                        
        //             } catch (error) {
        //                 console.log("Problem after getUserAnswers:");
        //                 console.log(error);
        //                 if (button != null) {
        //                     button.disabled = false;
        //                 }
        //             }
        //         }, error => {
        //             console.log("Something went wrong. Couldn't get user answers.");
        //             button.disabled = false;
        //         });
        // }

        /**************************************************************/
        /************************** Pin page **************************/
        /**************************************************************/

        public updatePin(http,options,localStorage,uID,newPin) {
            http.post(this.UPDATE_PIN, { user_ID:uID, pin:newPin }, options)
            // Callback public if post succeeds
            .subscribe( data => {
                console.log("After updating pin: ");
                console.log("PIN changed to " + newPin);

                // Change local pin value
                localStorage.get('pin').then( pin => {
                    pin['number'] = newPin;
                    localStorage.set('pin', pin);
                });
            }, error => {
                console.log("Error updating PIN");
            });
        }

        /**************************************************************/
        /********************** Bug report page ***********************/
        /**************************************************************/

        public createBugReport(http,options,navCtrl,newData,button) {
            http.post( this.BUG_REPORT_URL, newData, options)
            // Callback public if post succeeds
            .subscribe( data => {
                var json;
                try {
                    json = data.json();
                    console.log("Bug report #" + json.ID + "successfully created");
                    console.log("Bug report sent! Thanks for letting us know. We will take a look and fix things up.");
                    // Go to home screen if previously logged in, otherwise go to login page
                    navCtrl.pop();
                } catch (error) {
                    console.log(data['_body']);
                    console.log("Something went wrong. Couldn't submit bug report. Try again later.")
                    button.disabled = false;
                    navCtrl.pop();
                }
            }, error => {
                    console.log(error['_body']);
                    if (error.status == 422) {
                        console.log("Problem storing bug report!");
                    }
                    button.disabled = false;
                    // window.plugins.toast.showLongBottom('Error creating user!')
                });
        }

        /**************************************************************/
        /********************** Set Notification ***********************/
        /**************************************************************/
        setDailyNotification(repeatHour, repeatMinute) {
            let NUMBER_OF_DAYS = 60;
            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "How was your cannabis experience today?",
                text: "Tell us about it in LooseLeaf",
                trigger: { 
                    every: { hour:repeatHour, minute:repeatMinute }, 
                    count: NUMBER_OF_DAYS,
                } 
            });
            var displayHour = repeatHour.toString();
            var displayMin = repeatMinute.toString();
            if (repeatHour > 12) {
              displayHour -= 12;
            }
            if (repeatMinute < 10) {
              displayMin = "0" + repeatMinute.toString();
            }
            alert("Reminder time set! Every " + displayHour + ":" + displayMin + " " + "pm");
          }
    }
}
