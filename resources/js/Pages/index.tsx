import axios from "axios";
import { PageProps } from "@/types";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    LayersControl,
    MarkerProps,
} from "react-leaflet";

import {
    CRS,
    extend,
    LatLng,
    LatLngExpression,
    Projection,
    Transformation,
} from "leaflet";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useState, useEffect, useCallback } from "react";

const center_x = 117.6;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

const customCrs = extend({}, CRS.Simple, {
    projection: Projection.LonLat,
    scale: function (zoom: number) {
        return Math.pow(2, zoom);
    },
    zoom: function (sc: number) {
        return Math.log(sc) / 0.6931471805599453;
    },
    distance: function (pos1: LatLng, pos2: LatLng) {
        const x_difference = pos2.lng - pos1.lng;
        const y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(
            x_difference * x_difference + y_difference * y_difference
        );
    },
    transformation: new Transformation(scale_x, center_x, -scale_y, center_y),
    infinite: true,
});

export default function Index({
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        window.Pusher = Pusher;
        window.Echo = new Echo({
            broadcaster: "reverb",
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
            wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
            forceTLS:
                (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
            enabledTransports: ["ws", "wss"],
        });

        window.Echo.channel("positions").listen("PositionSent", (event) => {
            const newMarker = JSON.parse(event.data);
            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        });
    }, []);

    function sendCreate() {
        axios.post(`/create`).then((res) => {
            console.log(res);
        });
    }

    return (
        <section>
            <div className="absolute top-4 right-24 left-24 z-10 flex justify-center ">
                <button
                    className=" bg-white px-3 py-2 rounded-md shadow-md"
                    onClick={() => sendCreate()}
                >
                    Set random position
                </button>
            </div>
            <MapContainer
                className="z-0"
                center={[0, 0.0]}
                zoom={3}
                maxZoom={5}
                scrollWheelZoom={true}
                crs={customCrs}
            >
                {markers.map((position, idx) => (
                    <Marker key={`marker-${idx}`} position={position}>
                        <Popup>
                            <span>
                                {position[0]} | {position[1]}
                            </span>
                        </Popup>
                    </Marker>
                ))}
                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="Atlas">
                        <TileLayer url="mapStyles/styleAtlas/{z}/{x}/{y}.jpg" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Grid">
                        <TileLayer url="mapStyles/styleGrid/{z}/{x}/{y}.png" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked name="Satelite">
                        <TileLayer url="mapStyles/styleSatelite/{z}/{x}/{y}.jpg" />
                    </LayersControl.BaseLayer>
                </LayersControl>
            </MapContainer>
        </section>
    );
}
