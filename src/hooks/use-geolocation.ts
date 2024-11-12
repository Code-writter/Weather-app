import { useEffect, useState } from "react";
import { Coordinates } from "../api/types";

interface GeoLocationState{
    coordinates: Coordinates | null
    error : string | null 
    isLoading : boolean
}

export default function useGeolocation(){
    const [locationData , setLocationData] = useState <GeoLocationState> ({
        coordinates:null,
        error : null,
        isLoading : true
    })

    const getLocation = () =>{
        setLocationData((prev) => ({...prev , isLoading : true , error : null}))

        if(!navigator.geolocation){
            setLocationData({
                coordinates : null,
                error : "Geolocation is not supported by your browser",
                isLoading : false
            })
            return
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLocationData({
                coordinates:{
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                },
                error : null,
                isLoading : false
            })
        }, (error) => {
            let errorMessage: string

            switch(error.code){
                case error.PERMISSION_DENIED:
                    errorMessage = "Location permission denied. Please enable location access."
                break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable."
                break;
                case error.TIMEOUT:
                    errorMessage = "Location request timeout."
                break;
                default :
                    errorMessage = "An unknown error occurred."

            }

            setLocationData({
                coordinates : null,
                error : errorMessage,
                isLoading : false
            })

        },{
            enableHighAccuracy: true,
            timeout: 50000,
            maximumAge: 0
        })
    }
    // This function is called whenever the app is called
    useEffect(() => {
        getLocation();
    }, [])

    return{
        ...locationData,
        getLocation
    }
}



/*

const fetchWeatherData = async (coordinates: Coordinates) => {

    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

    const response = await fetch(`https://api.weather.com/v3/wx/conditions/current?geocode=${coordinates.lat},${coordinates.lon}&format=json&apiKey=${apiKey}`);

    if (!response.ok) {

        throw new Error('Weather Api Error ' + response.statusText);

    }
*/