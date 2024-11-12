import { BrowserRouter, Route, Routes } from "react-router-dom"
import WeatherDashboard from "./pages/Weather_dashboard"
import Layout from "./components/Layout"
import { ThemeProvider } from "./context/theme-provider"
import CityPage from "./pages/City.page"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient({
    defaultOptions : {
        queries : {
            staleTime : 5* 60 * 1000, // 5min
            gcTime : 10 * 60 * 1000, // 10min
            retry : false,
            refetchOnWindowFocus : false 
        }
    }
})

export default function App(){

    return(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark" >
                    <Layout>
                        <Routes>
                            <Route path="/" element={<WeatherDashboard />} />
                            <Route path="/city/:cityName" element={<CityPage />} />
                        </Routes>
                    </Layout>
                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}