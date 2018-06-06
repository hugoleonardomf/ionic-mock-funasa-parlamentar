import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Chart } from 'chart.js';

import { UserProvider } from '../../../providers/user/user';
import { UtilsProvider } from '../../../providers/utils/utils';

import { MinhasEmendasPage } from '../minhasEmendas/minhasEmendas';

@Component({
  selector: 'page-minhasEmendasG',
  templateUrl: 'minhasEmendasG.html'
})

export class MinhasEmendasGPage {

  @ViewChild('barChart') barChart;

  public barChartEl: any;
  public chartLabels: any = [];
  public chartValues: any = [];
  public chartColours: any = [];
  public chartHoverColours: any = [];
  public chartLoadingEl: any;

  public items: Array<any>;
  public qtdEmendasTotal: any;
  public valorTotal: any;
  private url: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/format/json?parlamentar=";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: Http, private userProvider: UserProvider, private utilsProvider: UtilsProvider) {
    this.fetchContent();
  }

  fetchContent(): void {
    let urlParam = this.url + this.userProvider.getUserInfo().nome;
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        this.items = data.itens;
        this.qtdEmendasTotal = data.quantidadeEmendas;
        this.valorTotal = data.valorInvestidoFormatado;
        this.defineChartData();
        this.createBarChart();
        loading.dismiss();
      });
  }

  detalharMinhasEmendas(): void {
    this.navCtrl.push(MinhasEmendasPage, {
      tipoConsultaParam: 'minhas'
    });
  }

  defineChartData() {
    let i: any;
    for (i in this.items) {
      var it = this.items[i];
      this.chartLabels.push(it.numeroEmenda);
      this.chartValues.push(it.valorTotal);
      this.chartColours.push(this.utilsProvider.dynamicColorsGraph());
      //this.chartHoverColours.push('rgba(122, 160, 202, 0.5)');
    }
  }

  createBarChart() {
    this.barChartEl = new Chart(this.barChart.nativeElement,
      {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Minhas Emendas',
            data: this.chartValues,
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.chartColours,
            hoverBackgroundColor: this.chartHoverColours
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
            boxWidth: 80,
            fontSize: 15,
            padding: 0
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 200000
              }
            }],
            xAxes: [{
              ticks: {
                autoSkip: false
              }
            }]
          }
        }
      });
  }

}
