# Weather App

This is a React-based weather application that displays current weather conditions and a 5-day forecast for your current location or a searched city. It also includes features for managing favorite cities and search history.

## Features

  * **Current Weather Display**: Shows current temperature, "feels like" temperature, daily min/max, humidity, and wind speed for a given location.
  * **Hourly Temperature Chart**: Visualizes the temperature and "feels like" temperature for the next 8 hours using a line chart.
  * **5-Day Weather Forecast**: Provides a detailed 5-day forecast including daily min/max temperatures, humidity, and wind speed.
  * **Geolocation Support**: Automatically detects and displays weather for the user's current location.
  * **City Search Functionality**: Allows users to search for weather information by city name.
  * **Favorite Cities**: Users can add and remove cities from their favorites list for quick access. Favorite cities show a quick overview of current weather.
  * **Search History**: Keeps track of recent city searches for easy re-access.
  * **Theme Toggle**: Supports light and dark themes.
  * **Responsive Layout**: Adapts to different screen sizes.
  * **Error Handling**: Displays informative messages for location errors or API fetching issues.

## Technologies Used

  * **React**: Frontend JavaScript library.
  * **TypeScript**: Typed superset of JavaScript.
  * **Vite**: Fast development build tool.
  * **Tailwind CSS**: Utility-first CSS framework for styling.
  * **React Query (`@tanstack/react-query`)**: For data fetching, caching, and state management.
  * **React Router (`react-router-dom`)**: For navigation and routing within the application.
  * **`date-fns`**: For date formatting.
  * **`recharts`**: For building the hourly temperature chart.
  * **`sonner`**: For displaying toasts/notifications.
  * **`lucide-react`**: For icons.
  * **`axios`**: (Although `fetch` API is used directly in `src/api/weather.ts`, `axios` is listed as a dependency in `package.json`).
  * **`dotenv`**: For managing environment variables.

## Setup Instructions

To get this project up and running on your local machine, follow these steps:

### Prerequisites

  * Node.js (version 14 or higher recommended)
  * npm or yarn (npm is used in `package-lock.json`)

### 1\. Clone the Repository

```bash
git clone <repository-url>
cd weather-app
```

### 2\. Install Dependencies

Using npm:

```bash
npm install
```

### 3\. Environment Variables

Create a `.env` file in the `src` directory (e.g., `src/.env`) and add your OpenWeatherMap API key:

```
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
```

You can obtain an API key from [OpenWeatherMap](https://openweathermap.org/api) by signing up for a free account.

**Note**: The API key is also hardcoded in `src/api/weather.ts`. Ensure it matches the one in your `.env` file or update it accordingly.

### 4\. Run the Application

Using npm:

```bash
npm run dev
```

This will start the development server, and you can access the application in your browser, usually at `http://localhost:5173`.

### 5\. Build for Production

Using npm:

```bash
npm run build
```

This will compile the application into the `dist` directory, ready for deployment.
