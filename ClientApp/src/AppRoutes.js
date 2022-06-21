import { Home } from "./components/Home";
import {WeatherToCity} from "./components/Weather-to-city";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/weather-to-city',
    element: <WeatherToCity />
  }
]


export default AppRoutes;
