import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Oauth2Provider } from '../../providers/oauth2/oauth2';

/**
 * Generated class for the InsertFormulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insert-formule',
  templateUrl: 'insert-formule.html',
})
export class InsertFormulePage {

    idFormule;
    description;
    prix;
    uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb : AngularFireDatabase, public alertCtrl: AlertController,
  public oauth2: Oauth2Provider) {
  }

  ionViewDidLoad() {
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
    console.log('ionViewDidLoad InsertFormulePage');
  }

  saveFormule() {
      if (this.idFormule == null || this.idFormule == "") {
          let alert = this.alertCtrl.create({
                title: "Champs incomplets",
                subTitle: "Entrez votre contact.",
                buttons: ['OK']
              });
          alert.present();
      } else if (this.description == null || this.description == "") {
          let alert = this.alertCtrl.create({
                title: "Champs incomplets",
                subTitle: "Entrez votre contact.",
                buttons: ['OK']
            });
          alert.present();
      } else if (this.prix == null || this.prix == "") {
          let alert = this.alertCtrl.create({
                title: "Champs incomplets",
                subTitle: "Entrez votre contact.",
                buttons: ['OK']
              });
        alert.present();
      }
      else {
        var ref = this.fdb.database.ref('formules/'+this.uid);
        let formule = {
          id: this.idFormule,
          description: this.description,
          prix: this.prix
        };

        ref.push(formule);

      }
  }
}
