import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import firebase from 'firebase';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public loadingCtrl:LoadingController, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
      let loading = this.loadingCtrl.create({
      content: 'Déconnexion...'
      });

      loading.present();
    console.log('ionViewDidLoad LogoutPage');
    var obj = this;

    let user = firebase.auth().currentUser;
    if (user) {

            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.log(user.uid);
                console.log('In Logout');
                loading.dismiss();
                obj.goHome();

              }, function(error) {
                // An error happened.
                console.debug(error);
                loading.dismiss();
                obj.goHome();
          });

    }
  }

  goHome() {
      this.navCtrl.setRoot(LoginPage);
  }

}
