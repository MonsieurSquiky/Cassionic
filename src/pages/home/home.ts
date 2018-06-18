import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    nom;
    prenom;
    adresse;
    siret;
    uid;
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase, public alertCtrl: AlertController, public menuCtrl: MenuController) {
      this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
      const obj = this;
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            obj.uid = user.uid;

          } else {
            // No user is signed in.
            console.log("No user signed");
          }
      });
  }

  searchClient() {
      console.log('In da stuff');


        this.navCtrl.push(ListPage, { nom: this.nom, prenom: this.prenom, siret: this.siret, adresse: this.adresse, uid: this.uid });

  }
}
