import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { AngularFireDatabase } from 'angularfire2/database';
import { Oauth2Provider } from '../../providers/oauth2/oauth2';
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
  constructor(  public navCtrl: NavController,
                private fdb: AngularFireDatabase,
                public alertCtrl: AlertController,
                public menuCtrl: MenuController,
                public oauth2: Oauth2Provider) {
      this.menuCtrl.enable(true);
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
  }

  searchClient() {
      console.log('In da stuff');


        this.navCtrl.push(ListPage, { nom: this.nom, prenom: this.prenom, siret: this.siret, adresse: this.adresse, uid: this.uid });

  }
}
