import React, { useState } from "react";
import "./styles.css";
import loader1Image from "./assets/loader1.gif";
import axios from "axios";

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
  const [selectedState, setSelectedState] = useState();
  const [cityNew, setCityNew] = useState();

  ////////////////////////////////////////////////////////////////////////
  const countryTest = Country.getAllCountries();
  const stateTest = State.getAllStates();
  const cityTest = City.getAllCities();

  // console.log(countryTest);
  // console.log(stateTest);
  // console.log(cityTest);

  const setNewCountry = (e) => {
    e.preventDefault();
    if (e.target.value === "") return;
    // let value = e.target.value;
    // console.log(value.split("").slice(0, 2).join("").toUpperCase());
    // console.log(finalValueCty);
    // setCtyNew(value.split("").slice(0, 2).join("").toUpperCase());
    setCtyNew(e.target.value);
  };
  // console.log(ctyNew);

  const SelectNewStates = (e) => {
    e.preventDefault();
    // console.log(ctyNew);
    let newState = [];
    let newStateArray = stateTest.filter((state) => {
      if (state.countryCode === ctyNew) return [...newState, state];
      else return null;
    });
    // console.log(newStateArray);
    setStateNew(newStateArray);
  };
  // console.log(stateNew);

  const settingSelectedStateFunction = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    if (e.target.value === "") return;
    setSelectedState(e.target.value);
  };

  const selectedStateFunction = (e) => {
    console.log(selectedState);
    e.preventDefault();
    let newCitys = [];
    let newCityArray = cityTest.filter((city) => {
      if (city.countryCode === selectedState) return [...newCitys, city];
      else return null;
    });
    console.log(newCityArray);
  };

  const config = {
    method: "get",
    url: "https://api.countrystatecity.in/v1/countries",
    headers: {
      "X-CSCAPI-KEY":
        "a1B3TDBBYk1YOG9NMGF1aHpkbldjVmtndXgzMmw3TG80VWxEOEs3VQ==",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
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
          <div className="form-group mb-2">
            {/* <label htmlFor="country">Select Country</label> */}

            <select
              name="country"
              className="form-control w-50 "
              onClick={(e) => setNewCountry(e)}
            >
              <option hidden value="">
                Country list
              </option>
              {countryTest.map((cty, index) => {
                return (
                  <option key={index} value={`${cty.isoCode}`}>
                    {cty.name}
                  </option>
                );
              })}
            </select>
            <span className="">
              <button onClick={SelectNewStates}>Select Country</button>
            </span>
          </div>
          <div className="form-group mb-2">
            {/* <label htmlFor="state">Select State</label> */}

            <select
              name="country"
              className="form-control w-50 "
              onClick={settingSelectedStateFunction}
            >
              {/* <option hidden value="">
                State List
              </option> */}
              {stateNew === undefined ? (
                <option>test</option>
              ) : (
                stateNew?.map((state, index) => {
                  return (
                    <option key={index} value={state.isoCode}>
                      {state.name}
                    </option>
                  );
                })
              )}
            </select>
            <span className="">
              <button onClick={selectedStateFunction}>Select State</button>
            </span>
          </div>
        </form>
        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
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
