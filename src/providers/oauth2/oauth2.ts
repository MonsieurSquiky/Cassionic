import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

/*
  Generated class for the Oauth2Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Oauth2Provider {

  token;
  oauthServerUrl: string = "http://localhost/oauth2-server/oauth2-server-php/token.php";
  clientId: string = 'testclient';
  clientPass: string = 'testpass';

  constructor(public http: Http) {
    //console.log('Hello Oauth2Provider Provider');
  }

  async login(username, password) {
      let headers = new Headers({
          'Authorization': btoa(this.clientId+':'+this.clientPass)
      });
      let options = new RequestOptions({ headers: headers });

      let data = {grant_type:'password', username, password};
      let result;
    await this.http.post(this.oauthServerUrl, data, options).map(res => res.json()).subscribe(data => {
          if (data.error)
            result=false;
          else {
              this.token = data.acces_token;
              result = true;
          }
      });
      return result;

  }
}
