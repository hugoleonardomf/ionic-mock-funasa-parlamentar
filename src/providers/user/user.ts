import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//Objeto Usuário
export class User {
  nome: string;
  email: string;
  partido: string;
  cargo: string;
  constructor(nome: string, email: string, partido: string, cargo: string) {
    this.nome = nome;
    this.email = email;
    this.partido = partido;
    this.cargo = cargo;
  }
}

@Injectable()
export class UserProvider {

  currentUser: User;

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Informe os dados de acesso");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "12345" && credentials.email === "flavianomelo@camara.leg.br");
        if (access) this.currentUser = new User('FLAVIANO MELO', 'flavianomelo@camara.leg.br', 'PMDB', 'Deputado Federal');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public getUserInfo(): User {
    let userInfo;
    if (this.currentUser == null) {
      //userInfo = { nome: 'MockName', email: 'MockMail', partido: 'PMDB', cargo: 'MockCargo' };
    }
    else {
      userInfo = this.currentUser;
    }
    return userInfo;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
