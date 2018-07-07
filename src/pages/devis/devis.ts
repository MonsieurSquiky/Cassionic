import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Oauth2Provider } from '../../providers/oauth2/oauth2';
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
    formuleId;
    flist = [];
    qte;
    uid;


  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, public http: Http,
  public oauth2: Oauth2Provider) {
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
            if (obj.oauth2.isOAuthUsed) {
                // on est connecté via oauth2
                // on appelle le bon microservice crud via oauth2.callMicroserviceGet(urlCrud)
            }
        }
    });
  }

  async callPDFservice() {
      let pdf = await this.oauth2.callPDFservice(this.client.id, this.formuleId);
  }

}
