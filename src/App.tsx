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

export default function App(){
    const queryClient = new QueryClient()
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