import { LineChart, XAxis, YAxis } from 'recharts';
import { ForecastData } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {Line, ResponsiveContainer} from 'recharts'
import {format} from 'date-fns'
interface HourlyTempProps {
    data : ForecastData
}

export default function HourlyTemp({data}: HourlyTempProps){

    const chartData = data.list.slice(0, 8).map((item) => {
        time : format(new Date(item.dt*1000), "ha")
        temp : Math.round(item.main.temp)
        feels_like : Math.round(item.main.feels_like)

    })
    return(
        <Card className=" flex-1" >
            <CardHeader>
                <CardTitle>
                    Today's Temperature
                </CardTitle>
                <CardContent>
                    <div className="h-[200px] w-full" >
                        <ResponsiveContainer width={"100%"} height={"100%"} >
                            <LineChart data={chartData} >
                                <XAxis 
                                    dataKey="time" 
                                    stroke='#fffff'
                                    tickLine={false}
                                    axisLine = {false}
                                    fontSize={12}
                                />
                                <YAxis dataKey="time" 
                                fontSize={28}
                                    stroke='#888888'
                                    tickLine={false}
                                    axisLine = {false}
                                    tickFormatter={(value) => `${value}°`}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )
}