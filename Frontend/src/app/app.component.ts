import { Component } from '@angular/core';
import {UtilitiesService} from "./utilities.service";
import {async} from "rxjs";
import {BaseDto, ClientWantsToGetAllFarverDto, ServerSendsIOTDataToClientsDto} from "./BaseDto";

@Component({
  selector: 'app-root',
  template: `

    <ion-content scrollY="true">

    <ion-col>
      <ion-row>
        <img style=" width: 20%; height: auto;" src="../assets/smiley.png"  >

<H1 style="margin-left: 20px;">Smiley</H1>
      </ion-row>
    </ion-col>

<br>
<br>
<br>

<ion-grid>
  <ion-row>
    <ion-col size="3">
      <ion-title>Deltagere</ion-title>
      <ion-card >

        <div *ngFor="let text of textAray | paginate:{itemsPerPage: tableSize,
          currentPage: page,
          totalItems: count}; let i=index">

        <ion-card-content >

          <ion-row style="border-bottom: 1px solid black; /* Add a solid black border at the bottom of each row */
}">

            <ion-col >
          {{text}}
            </ion-col>


          </ion-row>

        </ion-card-content>


        </div>
        <pagination-controls previousLabel="Prev" nextLabel="Next" (pageChange)="onTableDataChange($event)">
        </pagination-controls>

      </ion-card>
    </ion-col>
    <ion-col size="6">




    </ion-col>
  </ion-row>
</ion-grid>
    </ion-content>
  `,

})
export class AppComponent {

  textAray: string[]=[];
  page: number=1;
  count: number=0;
  tableSize:number=10



  ws: WebSocket = new WebSocket("ws://localhost:8181")

  constructor(private utilitiesService: UtilitiesService) {
    this.ws.onmessage = message => {
      const messageFromServer = JSON.parse(message.data) as BaseDto<any>;
      // @ts-ignore
      this[messageFromServer.eventType].call(this, messageFromServer);
    }
  }


  onTableDataChange(event: any)
  {
    this.page=event;
    this.textAray;
  }





  TilføjFarve(dto: ClientWantsToGetAllFarverDto): void

{
  try
  {
    this.textAray=dto.farver!
  }
  catch (e)
  {
    console.log(e)
  }
}

  ServerSendsIOTDataToClients(dto: ServerSendsIOTDataToClientsDto) {
    if (dto.data != null) {
      this.textAray.push(dto.data)
    }
  }


}
