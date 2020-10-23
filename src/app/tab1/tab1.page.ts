import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { 
  GoogleMap, 
  GoogleMaps,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition, 
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapPaddingOptions
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  map: GoogleMap;

  private vLat: number;
  private vLon: number;

  constructor(private geolocation: Geolocation) {}

  ionViewDidLoad() {
    this.loadMap();
  }

  private getPosition() {
    this.geolocation.getCurrentPosition()
    .then((res: any)=>{
      console.log(res.coords.latitude, res.coords.longtitude);
      this.vLat = res.coords.latitude;
      this.vLon = res.coords.longitude;
    })
    .catch((err: any)=>{
      console.log("Error getting location", err);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((res)=>{
      console.log(res.coords.latitude, res.coords.longitude);
      this.vLat = res.coords.latitude;
      this.vLon = res.coords.longitude;
    });
  }

  private loadMap() {
    Environment.setEnv({
      'API-KEY_FOR_BROWSER_RELEASE': '[api key]',
      'API-KEY_FOR_BROWSER_DEBUG': '[api key]'
    });
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.vLat, lng: this.vLon
        },
        zoom: 4
      },
      mapTypeId: 'terrain'
    }

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'MyTitle',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.vLat,
        lng: this.vLon
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
      alert('Marker Clicked');
    });
  }
}
