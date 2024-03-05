import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import loader1Image from "./assets/loader1.gif";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
// import { Map } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
// import RecenterAutomatically from "react-leaflet-cluster";
import mapIcon1 from "./assets/mapicon1.png";
import $, { event } from "jquery";
import axios from "axios";

const MapLocation = () => {
  /////////////////// states............................

  let markers1 = [
    {
      geocode: [23.0225, 72.5714],
      popUp: "ahm",
    },
    {
      geocode: [21.1702, 72.8311],
      popUp: "surat",
    },
    {
      geocode: [22.3072, 73.1812],
      popUp: "vadodara",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState(markers1);
  const [city, setCity] = useState("anand");
  const [country, setCountry] = useState("india");

  const [lat, setLat] = useState(22.1);
  const [lng, setLng] = useState(22.1);

  let center = [lat, lng];
  const animateRef = useRef(true);
  // let map1 = useMapEvent();

  // useEffect(() => {
  //   getLocationCoordinatesFunc();
  // }, [city]);
  // map1 = useMapEvent("load", () => {
  //   map1.setView([50.5, 30.5], map1.getZoom());
  // });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const getLocationCoordinatesFunc = async (e) => {
    let newMarker;
    e.preventDefault();
    setIsLoading(true);

    const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`;

    fetch(url, {
      method: "GET",
      headers: { "X-Api-Key": "RPtntsxoXx1z8JIu6MhvOw==49AbF02qyzuFB1nZ" },
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setLat(response[0].latitude);
        setLng(response[0].longitude);
        // setName(response[0].name);
        // console.log(lat, lng, name);

        newMarker = {
          geocode: [response[0].latitude, response[0].longitude],
          popUp: response[0].name,
        };
        setMarkers([...markers, newMarker]);
        setIsLoading(false);
      })
      .then(() => {
        // console.log(newMarker, markers);
      })
      .catch((err) => console.error(err));
  };

  // const getLocationCoordinates = useEffect(() => {
  //   getLocationCoordinatesFunc();
  // }, []);

  // const getLocationCoordinates = () => {
  //   axios({
  //     url: `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`,
  //     method: "get",
  //     headers: { "X-Api-Key": "RPtntsxoXx1z8JIu6MhvOw==49AbF02qyzuFB1nZ" },
  //     contentType: "application/json",
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const getLocationCoordinates = () => {
  //   $.ajax({
  //     method: "GET",
  //     url: `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`,
  //     headers: { "X-Api-Key": "RPtntsxoXx1z8JIu6MhvOw==49AbF02qyzuFB1nZ" },
  //     contentType: "application/json",
  //     success: function (result) {
  //       console.log(result);
  //     },
  //     error: function ajaxError(jqXHR) {
  //       console.error("Error: ", jqXHR.responseText);
  //     },
  //   });
  // };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: mapIcon1,
    iconSize: [38, 38], // size of icon
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div >${cluster.getChildCount()}</div>`,
      className: "cluster-icon",
      iconSize: [33, 33, true],
    });
  };

  // const handleSubmit2 = (e) => {
  //   e.preventDefault();
  //   setIsSubmit(!isSubmit);
  // };

  return (
    <div>
      <div className="bg-dark bg-gradient p-5 row justify-content-center ">
        <form
          onSubmit={getLocationCoordinatesFunc}
          className="mb-4 bg-success text-white p-4 border border-primary col-md-6"
        >
          <div className="form-group">
            <label htmlFor="city">City Name</label>
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="Enter City Name"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Country">Country</label>
            <input
              type="text"
              className="form-control"
              name="Country"
              placeholder="Enter Country Name"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Agree to T&C
            </label>
          </div>
          <button type="submit" className="btn btn-secondary mt-2">
            Submit
          </button>
        </form>
      </div>

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ height: "50vh" }}
        >
          <div className="fs-3 ">Loading...</div>
          <div>
            <img
              src={loader1Image}
              alt="loader.................."
              style={{ height: "150px", width: "150px" }}
            />
          </div>
        </div>
      ) : (
        <div>
          {/* {console.log(lat, lng)} */}
          <MapContainer
            // setView={[22.1, 22.1]}
            className="vh-100"
            // center={[lat, lng]}
            center={center}
            zoom={13}
            // ref={mapRef}
            // current={[lat, lng]}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <TileLayer
          attribution="Stamen WaterColor"
          url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
        /> */}
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >
              {markers.map((marker, index) => {
                return (
                  <Marker
                    // onload={}
                    key={index}
                    position={marker.geocode}
                    icon={customIcon}
                  >
                    <Popup>
                      <p>{marker.popUp}</p>
                    </Popup>
                  </Marker>
                );
                // <RecenterAutomatically lat={lat} lng={lng} />;
              })}
            </MarkerClusterGroup>
            {/* <SetViewOnClick animateRef={animateRef} /> */}
            <MyComponent lat={lat} lng={lng} />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

// function SetViewOnClick({ animateRef }) {
//   const map = useMapEvent("mouseover", (e) => {
//     map.setView(e.latlng, map.getZoom(), {
//       animate: animateRef.current || false,
//     });
//     console.log(e.latlng);
//   });

//   return null;
// }

function MyComponent({ lat, lng }) {
  // console.log(lat, lng);
  const map = useMapEvent("mouseover", () => {
    // map.setView([lat, lng], 10);
    map.setView([lat, lng], 13, {
      animate: true,
      // duration: 2,
    });
  });

  return null;
}
export default MapLocation;
