import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the DevisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devis',
  templateUrl: 'devis.html',
})
export class DevisPage {
    client;
    formulePrix;
    flist = [];
    qte;
    uid;


  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
      this.client = navParams.get('client');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevisPage');
    const obj = this;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          obj.uid = user.uid;

          var clientRef = obj.fdb.database.ref('/formules/'+obj.uid);
          clientRef.on('value', function(snapshot) {
              snapshot.forEach( function(childSnapshot) {


                      obj.flist.push(childSnapshot.val());



                return false;
              });
          });

        } else {
          // No user is signed in.
          console.log("No user signed");
        }
    });
  }

}
