import React, { useState } from "react";
import "./styles.css";
import loader1Image from "./assets/loader1.gif";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";

import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import mapIcon1 from "./assets/mapicon1.png";

import { Country, State, City } from "country-state-city";

const MapLocation2 = () => {
  /////////////////// states............................
  console.log(Country.getAllCountries());
  // console.log(Country.getAllCountries());
  // console.log(State.getAllStates());

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

  const [ctyNew, setCtyNew] = useState();
  const [stateNew, setStateNew] = useState();
  const [cityNew, setCityNew] = useState();
  ////////////////////////////////////////////////////////////////////////
  const countryTest = Country.getAllCountries();
  const stateTest = State.getAllStates();
  const cityTest = City.getAllCities();

  const setNewCountry = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setCtyNew(e.target.value);
  };

  const getNewCountry = (e) => {
    e.preventDefault();
    console.log(ctyNew);
  };

  console.log(stateTest);
  console.log(cityTest);

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
        setLat(response[0].latitude);
        setLng(response[0].longitude);

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const customIcon = new Icon({
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

  return (
    <div>
      <div className="bg-dark bg-gradient p-5 row justify-content-center ">
        <form className="mb-4 bg-success text-white p-4 border border-primary col-md-6">
          <div className="form-group">
            <label htmlFor="country">Select Country</label>

            <select
              name="country"
              className="form-control w-50 "
              onClick={(e) => setNewCountry(e)}
            >
              {/* <option hidden value="">
                Country list
              </option> */}
              {countryTest.map((cty) => {
                return <option value={cty.name}>{cty.name}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="state">Select State</label>

            <select
              name="country"
              className="form-control w-50 "
              // onClick={(e) => setNewState(e)}
            >
              {/* <option hidden value="">
                Country list
              </option> */}
              {/* {stateTest.map((cty) => {
                return <option value={state.name}>{state.name}</option>;
              })} */}
            </select>
          </div>
          <button onClick={getNewCountry}>--+</button>
        </form>
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
          <MapContainer className="vh-100" center={center} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

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
              })}
            </MarkerClusterGroup>
            <MyComponent lat={lat} lng={lng} />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

function MyComponent({ lat, lng }) {
  const map = useMapEvent("mouseover", () => {
    map.setView([lat, lng], 13, {
      animate: true,
    });
  });

  return null;
}
export default MapLocation2;
