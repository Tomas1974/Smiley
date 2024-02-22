import { Injectable } from '@angular/core';
import {BaseDto, ClientWantsToGetAllFarverDto, ServerSendsIOTDataToClientsDto} from "./BaseDto";
import {farveModel} from "./farveModel";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  farve_count:farveModel[] = [
    { name: "Red", value: 0 },
    { name: "Yellow", value: 0 },
    { name: "Green", value: 3 }
  ];



  ws: WebSocket = new WebSocket("ws://localhost:8181")


  constructor() {
    this.ws.onmessage = message => {
      const messageFromServer = JSON.parse(message.data) as BaseDto<any>;
      // @ts-ignore
      this[messageFromServer.eventType].call(this, messageFromServer);
    }
  }




  ServerSendsIOTDataToClients(dto: ServerSendsIOTDataToClientsDto) {
    if (dto.data != null) {

      switch(dto.data) {
        case "RED":
          this.farve_count[0].value=this.farve_count[0].value+1;
          console.log("tilføjet rød");
          break;
        case "YELLOW":
          this.farve_count[1].value=this.farve_count[1].value+1;
          console.log("tilføjet gul");
          break;
        case "GREEN":
          console.log("tilføjet grøn");
          this.farve_count[2].value=this.farve_count[2].value+1;
          break;
      }

      this.farve_count=[...this.farve_count];
    }

  }

  TilføjFarve(dto: ClientWantsToGetAllFarverDto): void

  {
    try
    {

      console.log(dto.farver?.length);
      // @ts-ignore
      for (let i = 0; i < dto.farver?.length; i++) {
        {
          // @ts-ignore
          switch(dto.farver[i]) {
            case "RED":
              this.farve_count[0].value=this.farve_count[0].value+1;
              break;
            case "YELLOW":
              this.farve_count[1].value=this.farve_count[1].value+1;
              break;
            case "GREEN":
              this.farve_count[2].value=this.farve_count[2].value+1;
              break;
          }
        }
      }


      this.farve_count=[...this.farve_count];

    }
    catch (e)
    {
      console.log(e)
    }
  }

}
