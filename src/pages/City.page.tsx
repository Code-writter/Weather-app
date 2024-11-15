import { useParams, useSearchParams } from "react-router-dom"
import { useForecastQuery, useWeatherQuery } from "../hooks/useWeather";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import WeatherSkeleton from "../components/loading-skeleton";
import { Button } from "../components/ui/button";
import CurrentWeather from "../components/current-weather";
import HourlyTemp from "../components/hourly-temp";
import WeatherDetails from "../components/weather-details";
import WeatherForecast from "../components/weather-forecast";
import FavoriteButton from "../components/favorite-button";


export default function CityPage(){

    const [searchParams] = useSearchParams()
    const params = useParams();

    const lat = parseFloat(searchParams.get("lat") || "0")
    const lon = parseFloat(searchParams.get("lon") || "0")

    const coordinates = {lat, lon}

    const forecastQuery = useForecastQuery(coordinates);
    const weatherQuery = useWeatherQuery(coordinates);

    if(weatherQuery.error ||forecastQuery.error ){
        return(
          <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-4" >
                Failed to load weather data, try again
          </AlertDescription>
        </Alert>
      )
    }

    if(!weatherQuery.data || !forecastQuery.data || !params.cityName ){
        return(
          <WeatherSkeleton />
        )
    }

    return(
        <div className="space-y-4" >
            {/* fav cities */}
            <div className="flex items-center justify-between" >
                <h1 className="text-2xl font-bold tracking-tight" >{params.cityName}, {weatherQuery.data.sys.country}</h1>

                <div>
                    
                    {/* fav button */}
                    <FavoriteButton data={{...weatherQuery.data , name : params.cityName}} />
                </div>
            </div>
              <div className="grid gap-6" >
                  <div className=" flex flex-col lg:flex-row gap-4" >
                    <CurrentWeather data={weatherQuery.data} />
                     <HourlyTemp data={forecastQuery.data} />
                  </div>

                  <div className=" grid gap-6 md:grid-cols-2 items-start" >
                      {/* details about  */}
                      <WeatherDetails data={weatherQuery.data} />
                      {/* forecast */}
                      <WeatherForecast data={forecastQuery.data} />
                  </div>
              </div>
            {/* current and hourly weather */}
        </div>
    )
}