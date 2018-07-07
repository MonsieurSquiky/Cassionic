import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';

import { AngularFireDatabase } from 'angularfire2/database';
import { Oauth2Provider } from '../../providers/oauth2/oauth2';
/**
 * Generated class for the InsertClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insert-client',
  templateUrl: 'insert-client.html',
})
export class InsertClientPage {
    uid;
    nom;
    prenom;
    siret;
    adresse;
    contact;
    nbEmploye;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb : AngularFireDatabase, public alertCtrl: AlertController,
  public oauth2: Oauth2Provider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertClientPage');
    const obj = this;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          obj.uid = user.uid;

        } else {
            if (obj.oauth2.isOAuthUsed) {
                // on est connecté via oauth2
                // on appelle le bon microservice crud via oauth2.callMicroserviceGet(urlCrud)
            }
        }
    });
  }

  saveClient() {
      if (this.nom == null || this.nom == "") {
          let alert = this.alertCtrl.create({
                title: "Champs incomplets",
                subTitle: "Entrez votre nom.",
                buttons: ['OK']
              });
        alert.present();
      } else if (this.prenom == null || this.prenom == "") {
          let alert = this.alertCtrl.create({
                title: "Champs incomplets",
                subTitle: "Entrez votre prénom.",
                buttons: ['OK']
              });
        alert.present();
      } else if (this.siret == null || this.siret == "") {
          let alert = this.alertCtrl.create({
                title: "Champs incomplets",
                subTitle: "Entrez votre siret.",
                buttons: ['OK']
              });
        alert.present();
      }
      else if (this.adresse == null || this.adresse == "") {
          let alert = this.alertCtrl.create({
                title: "Champs incomplets",
                subTitle: "Entrez votre adresse.",
                buttons: ['OK']
              });
        alert.present();
      }
      else if (this.contact == null || this.contact == "") {
          let alert = this.alertCtrl.create({
                title: "Champs incomplets",
                subTitle: "Entrez votre contact.",
                buttons: ['OK']
              });
        alert.present();
      }
      else if (this.nbEmploye == null || this.nbEmploye == "") {
          let alert = this.alertCtrl.create({
                title: "Champs incomplets",
                subTitle: "Entrez votre nombre d'employé.",
                buttons: ['OK']
              });
        alert.present();
      }
      else {
        var ref = this.fdb.database.ref('clients/'+this.uid);
        let client = {
          nom: this.nom,
          prenom: this.prenom,
          siret: this.siret,
          adresse: this.adresse,
          contact: this.contact,
          nbEmploye: this.nbEmploye,
          nom_siret_adresse: this.nom+this.siret+this.adresse
        };

        ref.push(client);

        this.nom = null;
        this.prenom = null;
        this.siret = null;
        this.adresse = null;
        this.contact = null;
        this.nbEmploye = null;

      }
  }

}
