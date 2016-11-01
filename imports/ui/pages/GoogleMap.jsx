import React from 'react'
import { adressObjToURI } from '../helpers/helpers'

const GoogleMap = ({ adressObj }) => {

  const style = {
    border: "0"
  };

  let makeURL = (val) => {
  	console.log(val);
  	console.log("https://www.google.com/maps/embed/v1/place?key=" +
      "AIzaSyCeYDxojDuSv5WoqvAubgzIElDuknExNpI" + "&q=" +
      adressObjToURI(val))

    return "https://www.google.com/maps/embed/v1/place?key=" +
      "AIzaSyCeYDxojDuSv5WoqvAubgzIElDuknExNpI&q" + "&q=" +
      adressObjToURI(val);
  };

  return (
    <iframe src={makeURL(adressObj)} frameBorder="0" style = {style}></iframe>
  );
}

export default GoogleMap;


// "https://www.google.com/maps/embed/v1/place?key=AIzaSyCeYDxojDuSv5WoqvAubgzIElDuknExNpI&q=11%20ROSS%20STREET%2C%20OLDHAM%2C%20LANCASHIRE%2C%20OL8%201UA"