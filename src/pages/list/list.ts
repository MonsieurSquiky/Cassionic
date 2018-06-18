import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

import { DevisPage } from '../devis/devis';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  nom;
  prenom;
  siret;
  adresse;
  results = [];
  uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, public loadCtrl: LoadingController, public alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.uid = navParams.get('uid') ? navParams.get('uid') : "";
    this.nom = navParams.get('nom') ? navParams.get('nom') : "";
    this.prenom = navParams.get('prenom') ? navParams.get('prenom') : "";;
    this.siret = navParams.get('siret') ? navParams.get('siret') : "";;
    this.adresse = navParams.get('adresse') ? navParams.get('adresse') : "";;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertFormulePage');
    const obj = this;
    var clientRef = obj.fdb.database.ref('/clients/'+this.uid);
    clientRef.on('value', function(snapshot) {
        snapshot.forEach( function(childSnapshot) {

            if ((obj.nom!= "" && childSnapshot.val().nom.indexOf(obj.nom) != -1) ||
                (obj.prenom != "" && childSnapshot.val().prenom.indexOf(obj.prenom) != -1) ||
                (obj.siret != "" && childSnapshot.val().siret.indexOf(obj.siret) != -1) ||
                (obj.adresse != "" && childSnapshot.val().adresse.indexOf(obj.adresse) != -1) ||
                (obj.nom == "" && obj.prenom == "" && obj.siret == "" && obj.adresse == "" )) {
                obj.results.push(childSnapshot.val());
            }


          return false;
        });
    });
  }

  check(client) {
      this.navCtrl.push(DevisPage, {client})
  }

}
