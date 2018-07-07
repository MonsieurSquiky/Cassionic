import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
/*
  Generated class for the Oauth2Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Oauth2Provider {

  token;
  refresh;
  isOAuthUsed: boolean = false;
  oauthServerUrl: string = "https://cassioauth.alwaysdata.net/token.php";
  clientId: string = 'testclient';
  clientPass: string = 'testpass';

  constructor(public http: Http) {
    //console.log('Hello Oauth2Provider Provider');
  }

  async login(username, password, context) {
      let headers = new Headers({
          'Authorization': 'Basic ' + btoa(this.clientId+':'+this.clientPass)
      });
      let options = new RequestOptions({ headers: headers });

      let data = {grant_type:'password', username, password};
     this.http.post(this.oauthServerUrl, data, options).map(res => res.json()).subscribe(data => {

              this.token = data.access_token;
              this.refresh = data.refresh_token;
              this.isOAuthUsed = true;
                context.goDashboard();
                console.log(this.token);

      }, error => {
                let logs = JSON.parse(error._body);
              let alertVerification = context.alertCtrl.create({
                title: logs.error ? logs.error : "Erreur",
                subTitle: (logs.error_description) ? logs.error_description  :"Une erreur est survenue, veuillez vérifier vos logins et réessayer ultérieurement.",
                buttons: ['OK']
              });
              alertVerification.present();

      });


  }

  logout() {
      this.token = null;
      this.isOAuthUsed = false;
  }
  setToken(token, provider='firebase') {
      this.token = token;
      if (provider != 'bshafferOAuth')
        this.isOAuthUsed = false;
  }

  prepareHeader() {
      let headers = new Headers({
          'Authorization': 'Bearer '+ this.token
      });
      let options = new RequestOptions({ headers: headers });

      return(options);
  }

  callPDFservice(idClient, idFormule) {
      let options = this.prepareHeader();
      this.http.get('http://khaledmoalla.alwaysdata.net/pdf/?idc='+idClient+'&idf='+idFormule, options).subscribe(data => {
          // ici on recupere le pdf, mais je n'ai pas pu tester car le service de Khaled ne permet pas le cross origin
         console.log(data);

       }, error => {
             console.log(error);

       });
  }

  callMicroserviceGet(urlService) {
      // On met le token en header
      let options = this.prepareHeader();

      // On fait une requete pour recuperer un resultat aupre du service que l'on map en json
      this.http.get(urlService, options).map(res => res.json()).subscribe(data => {
          // ici on recupere les donnees en json
         console.log(data);

       }, error => {
             console.log(error);

       });
  }

  callMicroservicePost(urlService, datas) {
      // On met le token en header
      let options = this.prepareHeader();

      // On fait une requete pour recuperer un resultat aupre du service que l'on map en json
      this.http.post(urlService, datas, options).map(res => res.json()).subscribe(data => {
          // ici on recupere les donnees en json
         console.log(data);

       }, error => {
             console.log(error);

       });
  }
}
