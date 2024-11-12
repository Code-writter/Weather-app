import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import useGeolocation from "../hooks/use-geolocation";
import WeatherSkeleton from "../components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {useWeatherQuery, useForecastQuery, useReverseGeocodeQuery} from '../hooks/useWeather'
import CurrentWeather from "../components/current-weather";
import HourlyTemp from "../components/hourly-temp";

export default function weatherDashboard(){

    const {coordinates, error : locationError , isLoading : locationLoading, getLocation} = useGeolocation()
    
    const locationQuery = useReverseGeocodeQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const weatherQuery = useWeatherQuery(coordinates);

    const handleRefresh = () => {
        getLocation();
        if(coordinates){
            // reload weather data
          weatherQuery.refetch()
          forecastQuery.refetch()
          locationQuery.refetch()
        }
    }


    if(locationLoading){
        // sceleton
        return <WeatherSkeleton />
    }

    if(locationError){
        return(
            <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4" >
              <p>{locationError}</p>
              <Button onClick={getLocation} variant={'outline'} className=" w-fit" >
                <MapPin className=" mr-2 h-4 w-4" />
                Enable Location 
              </Button>
            </AlertDescription>
          </Alert>
        )
    }

    if(!coordinates){
        return(
            <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Location Required</AlertTitle>
            <AlertDescription className="flex flex-col gap-4" >
              <p>Enable Location access to see your local weather</p>
              <Button onClick={getLocation} variant={'outline'} className=" w-fit" >
                <MapPin className=" mr-2 h-4 w-4" />
                Enable Location 
              </Button>
            </AlertDescription>
          </Alert>
        )
    }


    const locationName = locationQuery.data?.[0];

    if(weatherQuery.error ||forecastQuery.error ){
        return(
          <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-4" >
            <p>Fail to fetch weather data, try again </p>
            <Button onClick={getLocation} variant={'outline'} className=" w-fit" >
              <MapPin className=" mr-2 h-4 w-4" />
                Retry 
            </Button>
          </AlertDescription>
        </Alert>
      )
    }

    if(!weatherQuery.data || !forecastQuery.data){
      return(
        <WeatherSkeleton />
      )
    }

    return (
        <div className="space-y-4" >
            {/* fav cities */}
            <div className="flex items-center justify-between" >
                <h1 className="text-xl font-bold tracking-tight" >My Location</h1>
                {/* refresh icon */}
                <Button variant={'outline'}
                    size={'icon'}
                    onClick={handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}

                >
                    <RefreshCcw className={` h-4 w-4 ${weatherQuery.isRefetching ? "animate-spin" : "" } `} />
                </Button>
            </div>
              <div className="grid gap-6" >
                  <div className=" flex flex-col lg:flex-row gap-4" >
                    <CurrentWeather data={weatherQuery.data} locationName={locationName}  />

                     {/* Hourly temp */}
                     <HourlyTemp data={forecastQuery.data} />
                  </div>

                  <div>
                      {/* details about  */}
                      {/* forecast */}
                  </div>
              </div>
            {/* current and hourly weather */}
        </div>
    )
}