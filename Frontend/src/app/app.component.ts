import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from "./Data.service";
import {LegendPosition} from "@swimlane/ngx-charts";
import {farveModel} from "./farveModel";

@Component({
  selector: 'app-root',
  template: `

    <ion-content scrollY="true">

      <ion-col>
        <ion-row>
          <img style=" width: 20%; height: auto;" src="../assets/smiley.png">

          <H1 style="margin-left: 20px;">Smiley</H1>
        </ion-row>
      </ion-col>

      <br>
      <br>
      <br>

      <ion-grid>
        <ion-row>
          <ion-col size="7">

            <ion-card >

              <ngx-charts-bar-vertical
                [view]=[1000,400]
                [scheme]="colorScheme"
                [results]="this.dataService.farve_count"
                [gradient]="gradient"
                [xAxis]="showXAxis"
                [yAxis]="showYAxis"
                [legend]="showLegend"
                [legendPosition]="legendPosition"
                [showXAxisLabel]="showXAxisLabel"
                [showYAxisLabel]="showYAxisLabel"
                [xAxisLabel]="xAxisLabel"
                [yAxisLabel]="yAxisLabel"
                (select)="onSelect($event)">
              </ngx-charts-bar-vertical>


            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-row>
              <p>Antal Rød {{ dataService.farve_count[0].value }}</p>
            </ion-row>
            <ion-row>
              <p>Antal Gul {{ dataService.farve_count[1].value }}</p>
            </ion-row>
            <ion-row>
              <p>Antal Grøn {{ dataService.farve_count[2].value }}</p>
            </ion-row>


          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,

})
export class AppComponent {


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Farve';
  showYAxisLabel = true;
  yAxisLabel = 'Antal';

  colorScheme: any  = {
    domain: ['#A10A28', '#C7B42C', '#5AA454','#AAAAAA']
  };

  legendPosition=LegendPosition.Below; //placerer landene under grafen

  constructor(public dataService: DataService, private cdr: ChangeDetectorRef) {

    }


  onSelect(event:any) {
    console.log(event);
  }



}
