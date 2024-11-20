import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { LocationService } from '../services/location.service';
import { CameraService } from '../services/camera.service';
import { DeviceInfoService } from '../services/device-info.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton],
})
export class HomePage {
  constructor(private ls: LocationService, private cs: CameraService, private ds: DeviceInfoService) {}

  location = ""
  async getLocation() {
    const coords = (await this.ls.getCurrentPosition())
    this.location = coords.latitude.toString() + "," + coords.longitude.toString();
  }

  //I don't have a webcam, so I'm not able to effectively test this.
  picture: (string | undefined)[] = [];
  async getPicture() {
    this.picture.push(await this.cs.takePicture())
  }

  deviceinfo = ""
  async getDevice() {
    const info = await this.ds.getDeviceInfo();
    this.deviceinfo = JSON.stringify(info);
  }
}
