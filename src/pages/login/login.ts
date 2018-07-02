import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook'
import { Oauth2Provider } from '../../providers/oauth2/oauth2';



import { HomePage } from '../home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    uid;
    username;
    password;

  constructor(  public navCtrl: NavController,
                public alertCtrl: AlertController,
                private afAuth: AngularFireAuth,
                private fdb: AngularFireDatabase,
                public facebook: Facebook,
                private googlePlus: GooglePlus,
                public menu: MenuController,
                public oauth2: Oauth2Provider) {

      this.menu.enable(false);
  }

  ionViewDidLoad() {
      var obj =this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              obj.uid = user.uid;

                  obj.goDashboard();

            } else {
              // No user is signed in.
              console.log("No user signed");
            }
        });
  }

  customLogin() {
      let logging = this.oauth2.login(this.username, this.password);
      if (logging)
        this.goDashboard();
      else {
          let alertVerification = this.alertCtrl.create({
            title: "Erreur",
            subTitle: "Une erreur est survenue, veuillez vérifier vos logins et réessayer ultérieurement.",
            buttons: ['OK']
          });
          alertVerification.present();
      }
  }

  facebookLogin(): Promise<any> {
    const obj = this;
    return this.facebook.login(['email'])
      .then( response => {
          console.log(JSON.stringify(response));
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => {
            console.log("Firebase success: " + JSON.stringify(success));
            obj.goDashboard();
          }).catch((err) => {
              console.log(JSON.stringify(err));
          });

      }).catch((err) => {

          console.log(JSON.stringify(err));

      });
  }

  googleLogin(): void {
      const obj = this;
      this.googlePlus.login({
        'webClientId': '624772452087-k1r34harvlt9uv7kt2ggg57a3g1faro9.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
              const googleCredential = firebase.auth.GoogleAuthProvider
                  .credential(res.idToken);

              firebase.auth().signInWithCredential(googleCredential)
            .then( response => {
                console.log("Firebase success: " + JSON.stringify(response));
                obj.goDashboard();
            });
      }, err => {
          console.log(JSON.stringify(err));
          console.debug("Error: ", err);
          console.log(err.toString());
      });
    }

  confirmPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Confirmation de votre mot de passe',
      message: "Veuillez entrer à nouveau votre mot de passe afin de confirmer l'inscription",
      inputs: [
        {
          name: 'password_confirm',
          placeholder: 'Entrez à nouveau votre mot de passe :',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log("Inscription annulée");
          }
        },
        {
          text: 'Confirmer',
          handler: data => {
            if (data.password_confirm == this.password) {
                this.register();
            }
            else {
                this.password = "";
                let alert = this.alertCtrl.create({
                  title: 'Erreur de mot de passe',
                  subTitle: 'Vous avez entrez 2 mots de passes différents, veuillez recommencer et entrer les mêmes.',
                  buttons: ['OK']
                });
                alert.present();
            }
          }
        }
      ]
    });
    prompt.present();
  }



  async login() {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.username, this.password);
      if (result) {

            this.goDashboard();


      }
    }
    catch (e) {
        console.error(e);
        this.errorLogs(e.code);

    }
  }

  goDashboard () {
      this.navCtrl.setRoot(HomePage);
  }

  async register() {

    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        this.username,
        this.password
      );
      if (result) {
          const obj = this;
          //firebase.auth().currentUser.sendEmailVerification().then(function() {
              /*
            // Verification email sent.
            firebase.auth().signOut();

            let alertVerification = obj.alertCtrl.create({
              title: "Mail de vérification envoyé",
              subTitle: "Un email vient de vous être envoyé. Cliquer sur le lien qui y figure pour activer votre compte puis connectez vous.",
              buttons: ['OK']
            });
            alertVerification.present();
          })
          .catch(function(error) {
            // Error occurred. Inspect error.code.
            let alertVerification = obj.alertCtrl.create({
              title: "Echec",
              subTitle: "Une erreur est survenue, veuillez vérifier votre connexion internet et réessayer ultérieurement.",
              buttons: ['OK']
            });
            alertVerification.present();
            */
            obj.goDashboard();
          //});



      }
    } catch (e) {

      console.error(e);
      this.errorLogs(e.code);
    }
  }

  errorLogs(code) {
      switch (code) {
          case "auth/invalid-email":
              let alertMail = this.alertCtrl.create({
                title: "Erreur dans l'adresse mail ",
                subTitle: "Le format de l'adresse mail fournie n'est pas valide. Veuillez entrer une adresse valide.",
                buttons: ['OK']
              });
              alertMail.present();
          break;
          case "auth/argument-error":
              let alert = this.alertCtrl.create({
                title: "Donnees invalides",
                subTitle: "Veuillez remplir les champs de caracteres valides.",
                buttons: ['OK']
              });
              alert.present();
          break;
          case "auth/user-not-found":
              let alertUser = this.alertCtrl.create({
                title: "Compte inexistant",
                subTitle: "Cette adresse mail n'est associee a aucun compte. Creez en un en appuyant sur le bouton s'inscrire.",
                buttons: ['OK']
              });
              alertUser.present();
          break;
          case "auth/wrong-password":
              let alertPassword = this.alertCtrl.create({
                title: "Mot de passe incorrect",
                subTitle: "Le mot de passe ne correspond pas a l'adresse mail. Rentrez le bon mot de passe.",
                buttons: ['OK']
              });
              alertPassword.present();
              this.password = "";
          break;
          case "auth/email-already-in-use":
              let alertExist = this.alertCtrl.create({
                title: "Compte deja cree",
                subTitle: "L'adresse mail fournie est deja utilisee. Connectez vous dessus.",
                buttons: ['OK']
              });
              alertExist.present();
          break;
          case "auth/weak-password":
              let alertWeakPassword = this.alertCtrl.create({
                title: "Mot de passe pas assez securise",
                subTitle: "Le mot de passe doit contenir au moins 6 caracteres.",
                buttons: ['OK']
              });
              alertWeakPassword.present();
              this.password = "";
          break;
    }
  }
}
