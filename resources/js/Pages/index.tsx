import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, LayersControlProps } from 'react-leaflet'
const center = [0, 0]



export default function Index({laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {



    return (
        <section>
            <MapContainer center={[0, 0.0]} zoom={5} scrollWheelZoom={false}>


<LayersControl position="topright">
      <LayersControl.BaseLayer name="Atlas">
      <TileLayer
    url="mapStyles/styleAtlas/{z}/{x}/{y}.jpg"
  />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Grid">
      <TileLayer
    url="mapStyles/styleGrid/{z}/{x}/{y}.png"
  />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer checked name="Satelite">
      <TileLayer
    url="mapStyles/styleSatelite/{z}/{x}/{y}.jpg"
  />
      </LayersControl.BaseLayer>
    </LayersControl>
</MapContainer>
        </section>
    );
}
