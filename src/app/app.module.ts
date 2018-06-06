import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { DeputadoPage } from '../pages/deputado/deputado';
import { CidadaoPage } from '../pages/cidadao/cidadao';
import { QuemPage } from '../pages/quem/quem';
import { MinhasEmendasPage } from '../pages/deputado/minhasEmendas/minhasEmendas';
import { MinhasEmendasGPage } from '../pages/deputado/minhasEmendasG/minhasEmendasG';
import { PartidoEmendasPage } from '../pages/deputado/partidoEmendas/partidoEmendas';
import { PartidoEmendasGPage } from '../pages/deputado/partidoEmendasG/partidoEmendasG';
import { UfEmendasPage } from '../pages/deputado/ufEmendas/ufEmendas';
import { UfEmendasGPage } from '../pages/deputado/ufEmendasG/ufEmendasG';
import { PesquisaAvancadaPage } from '../pages/deputado/pesquisaAvancada/pesquisaAvancada';
import { DetalhesEmendaPage } from '../pages/deputado/detalhesEmenda/detalhesEmenda';
import { DetalhesProjetoPage } from '../pages/deputado/detalhesProjeto/detalhesProjeto';
import { AcompMinhasEmendasPage } from '../pages/deputado/acompMinhasEmendas/acompMinhasEmendas';
import { AcompInstrumentosPage } from '../pages/deputado/acompInstrumentos/acompInstrumentos';

import { UtilsProvider } from '../providers/utils/utils';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DeputadoPage,
    CidadaoPage,
    QuemPage,
    MinhasEmendasPage,
    MinhasEmendasGPage,
    PartidoEmendasPage,
    PartidoEmendasGPage,
    UfEmendasPage,
    UfEmendasGPage,
    PesquisaAvancadaPage,
    DetalhesEmendaPage,
    DetalhesProjetoPage,
    AcompMinhasEmendasPage,
    AcompInstrumentosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: 'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DeputadoPage,
    CidadaoPage,
    QuemPage,
    MinhasEmendasPage,
    MinhasEmendasGPage,
    PartidoEmendasPage,
    PartidoEmendasGPage,
    UfEmendasPage,
    UfEmendasGPage,
    PesquisaAvancadaPage,
    DetalhesEmendaPage,
    DetalhesProjetoPage,
    AcompMinhasEmendasPage,
    AcompInstrumentosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    File,
    FileTransfer,
    DocumentViewer,
    HttpClientModule,
    UtilsProvider,
    UserProvider
  ]
})
export class AppModule { }
