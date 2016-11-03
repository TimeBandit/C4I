import React from 'react'
import { adressObjToURI, parseAdressObject } from '../helpers/helpers'

const GoogleMap = ({ adressObj }) => {

  const style = {
    border: "0",
    width: "100%",
    height: "100%"
  };

  return (
    <iframe src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyCeYDxojDuSv5WoqvAubgzIElDuknExNpI&q=" + parseAdressObject(adressObj)} frameBorder="0" style = {style}></iframe>
  );
}

export default GoogleMap;