import React, { Component } from 'react';
import _ from "lodash";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import ReactWeather from 'react-open-weather';

const apikey = '51pQVKV2iAuYAMBUk0UGwY0kQ596UJKv';

export class WeatherToCity extends Component {
    static displayName = WeatherToCity.name;

    constructor(props) {
        super(props);
        this.AddSelectedCityToFavorites = this.AddSelectedCityToFavorites.bind(this);

        this.state = { citiesList: this.getCities(), selectedCity: undefined, dailyWeather: undefined };
    }

    async getAutoCompleteCities(newInputValue) {
        if (newInputValue !== '') {
            const requestString = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${newInputValue}`;
            const response = await fetch(requestString);
            console.log(response.status);
            console.log(response.statusText);
            //todo
            if (response.status === 200) {
                const data = await response.json();
                return data;
            }

        } else {
            return [];
        }
        //  return [{ "Version": 1, "Key": "101924", "Type": "City", "Rank": 10, "LocalizedName": "Beijing", "Country": { "ID": "CN", "LocalizedName": "China" }, "AdministrativeArea": { "ID": "BJ", "LocalizedName": "Beijing" } }, { "Version": 1, "Key": "107487", "Type": "City", "Rank": 10, "LocalizedName": "Bogota", "Country": { "ID": "CO", "LocalizedName": "Colombia" }, "AdministrativeArea": { "ID": "DC", "LocalizedName": "Distrito Capital de Bogotá" } }, { "Version": 1, "Key": "178087", "Type": "City", "Rank": 10, "LocalizedName": "Berlin", "Country": { "ID": "DE", "LocalizedName": "Germany" }, "AdministrativeArea": { "ID": "BE", "LocalizedName": "Berlin" } }, { "Version": 1, "Key": "207375", "Type": "City", "Rank": 10, "LocalizedName": "Baghdad", "Country": { "ID": "IQ", "LocalizedName": "Iraq" }, "AdministrativeArea": { "ID": "BG", "LocalizedName": "Baghdad" } }, { "Version": 1, "Key": "318849", "Type": "City", "Rank": 10, "LocalizedName": "Bangkok", "Country": { "ID": "TH", "LocalizedName": "Thailand" }, "AdministrativeArea": { "ID": "10", "LocalizedName": "Bangkok" } }, { "Version": 1, "Key": "204108", "Type": "City", "Rank": 11, "LocalizedName": "Bengaluru", "Country": { "ID": "IN", "LocalizedName": "India" }, "AdministrativeArea": { "ID": "KA", "LocalizedName": "Karnataka" } }, { "Version": 1, "Key": "222888", "Type": "City", "Rank": 11, "LocalizedName": "Busan", "Country": { "ID": "KR", "LocalizedName": "South Korea" }, "AdministrativeArea": { "ID": "26", "LocalizedName": "Busan" } }, { "Version": 1, "Key": "56913", "Type": "City", "Rank": 13, "LocalizedName": "Bengbu", "Country": { "ID": "CN", "LocalizedName": "China" }, "AdministrativeArea": { "ID": "AH", "LocalizedName": "Anhui" } }, { "Version": 1, "Key": "58493", "Type": "City", "Rank": 13, "LocalizedName": "Bijie", "Country": { "ID": "CN", "LocalizedName": "China" }, "AdministrativeArea": { "ID": "GZ", "LocalizedName": "Guizhou" } }, { "Version": 1, "Key": "61041", "Type": "City", "Rank": 13, "LocalizedName": "Bazhong", "Country": { "ID": "CN", "LocalizedName": "China" }, "AdministrativeArea": { "ID": "SC", "LocalizedName": "Sichuan" } }];

    }

    async getCities(newInputValue) {
        //get favrite cities
        const favorites = [...this.getFaforiteCities().values()];
        //get autocomplete cities
        const autoComplete = await this.getAutoCompleteCities(newInputValue)
        this.setState({ citiesList: favorites.concat(autoComplete) });

    }

    async GetDailyWeather(cityCode) {
        if (cityCode !== '') {
            // const requestString = ` https://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityCode}?apikey=${apikey}&details=true&metric=true`;
            // const response = await fetch(requestString);
            // console.log(response.status);
            // console.log(response.statusText);
            // if (response.status === 200) {
            // const data = await response.json();
            const data = { "Headline": { "EffectiveDate": "2022-06-19T13:00:00+08:00", "EffectiveEpochDate": 1655614800, "Severity": 3, "Text": "Air quality will be very unhealthy Sunday afternoon through Monday afternoon", "Category": "air quality", "EndDate": "2022-06-20T19:00:00+08:00", "EndEpochDate": 1655722800, "MobileLink": "http://www.accuweather.com/en/cn/beijing/101924/daily-weather-forecast/101924?unit=c&lang=en-us", "Link": "http://www.accuweather.com/en/cn/beijing/101924/daily-weather-forecast/101924?unit=c&lang=en-us" }, "DailyForecasts": [{ "Date": "2022-06-19T07:00:00+08:00", "EpochDate": 1655593200, "Sun": { "Rise": "2022-06-19T04:45:00+08:00", "EpochRise": 1655585100, "Set": "2022-06-19T19:46:00+08:00", "EpochSet": 1655639160 }, "Moon": { "Rise": "2022-06-19T23:59:00+08:00", "EpochRise": 1655654340, "Set": "2022-06-20T11:04:00+08:00", "EpochSet": 1655694240, "Phase": "WaningGibbous", "Age": 20 }, "Temperature": { "Minimum": { "Value": 22.0, "Unit": "C", "UnitType": 17 }, "Maximum": { "Value": 33.0, "Unit": "C", "UnitType": 17 } }, "RealFeelTemperature": { "Minimum": { "Value": 23.4, "Unit": "C", "UnitType": 17, "Phrase": "Pleasant" }, "Maximum": { "Value": 37.7, "Unit": "C", "UnitType": 17, "Phrase": "Quite Hot" } }, "RealFeelTemperatureShade": { "Minimum": { "Value": 23.4, "Unit": "C", "UnitType": 17, "Phrase": "Pleasant" }, "Maximum": { "Value": 33.8, "Unit": "C", "UnitType": 17, "Phrase": "Hot" } }, "HoursOfSun": 11.0, "DegreeDaySummary": { "Heating": { "Value": 0.0, "Unit": "C", "UnitType": 17 }, "Cooling": { "Value": 10.0, "Unit": "C", "UnitType": 17 } }, "AirAndPollen": [{ "Name": "AirQuality", "Value": 177, "Category": "Unhealthy", "CategoryValue": 4, "Type": "Ozone" }, { "Name": "Grass", "Value": 0, "Category": "Low", "CategoryValue": 1 }, { "Name": "Mold", "Value": 0, "Category": "Low", "CategoryValue": 1 }, { "Name": "Ragweed", "Value": 0, "Category": "Low", "CategoryValue": 1 }, { "Name": "Tree", "Value": 0, "Category": "Low", "CategoryValue": 1 }, { "Name": "UVIndex", "Value": 11, "Category": "Extreme", "CategoryValue": 5 }], "Day": { "Icon": 3, "IconPhrase": "Partly sunny", "HasPrecipitation": false, "LocalSource": { "Id": 7, "Name": "Huafeng", "WeatherCode": "00" }, "ShortPhrase": "Partly sunny and hot", "LongPhrase": "Partly sunny and hot; air quality will be unhealthy for sensitive groups", "PrecipitationProbability": 25, "ThunderstormProbability": 5, "RainProbability": 25, "SnowProbability": 0, "IceProbability": 0, "Wind": { "Speed": { "Value": 5.6, "Unit": "km/h", "UnitType": 7 }, "Direction": { "Degrees": 147, "Localized": "SSE", "English": "SSE" } }, "WindGust": { "Speed": { "Value": 22.2, "Unit": "km/h", "UnitType": 7 }, "Direction": { "Degrees": 144, "Localized": "SE", "English": "SE" } }, "TotalLiquid": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Rain": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Snow": { "Value": 0.0, "Unit": "cm", "UnitType": 4 }, "Ice": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "HoursOfPrecipitation": 0.0, "HoursOfRain": 0.0, "HoursOfSnow": 0.0, "HoursOfIce": 0.0, "CloudCover": 16, "Evapotranspiration": { "Value": 5.8, "Unit": "mm", "UnitType": 3 }, "SolarIrradiance": { "Value": 828.7, "Unit": "W/m²", "UnitType": 33 } }, "Night": { "Icon": 35, "IconPhrase": "Partly cloudy", "HasPrecipitation": false, "LocalSource": { "Id": 7, "Name": "Huafeng", "WeatherCode": "00" }, "ShortPhrase": "Partly cloudy, warm and humid", "LongPhrase": "Partly cloudy, warm and humid; air quality will be unhealthy for sensitive groups", "PrecipitationProbability": 25, "ThunderstormProbability": 6, "RainProbability": 25, "SnowProbability": 0, "IceProbability": 0, "Wind": { "Speed": { "Value": 7.4, "Unit": "km/h", "UnitType": 7 }, "Direction": { "Degrees": 157, "Localized": "SSE", "English": "SSE" } }, "WindGust": { "Speed": { "Value": 25.9, "Unit": "km/h", "UnitType": 7 }, "Direction": { "Degrees": 176, "Localized": "S", "English": "S" } }, "TotalLiquid": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Rain": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "Snow": { "Value": 0.0, "Unit": "cm", "UnitType": 4 }, "Ice": { "Value": 0.0, "Unit": "mm", "UnitType": 3 }, "HoursOfPrecipitation": 0.0, "HoursOfRain": 0.0, "HoursOfSnow": 0.0, "HoursOfIce": 0.0, "CloudCover": 98, "Evapotranspiration": { "Value": 0.5, "Unit": "mm", "UnitType": 3 }, "SolarIrradiance": { "Value": 26.1, "Unit": "W/m²", "UnitType": 33 } }, "Sources": ["AccuWeather", "Huafeng"], "MobileLink": "http://www.accuweather.com/en/cn/beijing/101924/daily-weather-forecast/101924?day=1&unit=c&lang=en-us", "Link": "http://www.accuweather.com/en/cn/beijing/101924/daily-weather-forecast/101924?day=1&unit=c&lang=en-us" }] }
            this.setState({ dailyWeather: this.convertWeather(data.DailyForecasts[0]) });
            // }
        } else {
            this.setState({ dailyWeather: {} });
        }
    }

    setNumOfFaviritesInTitle(favoritesCount) {
        document.title = `favorite cities count: ${favoritesCount}`;
    }

    getFaforiteCities() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        return new Map(favorites);
    }

    addCityToFavorites(selectedCity) {
        const localStorageMap = this.getFaforiteCities();
        if (!localStorageMap.get(selectedCity.Key)) {
            localStorageMap.set(selectedCity.Key, selectedCity);
            localStorage.setItem('favorites', JSON.stringify([...localStorageMap]))
        }
        return localStorageMap.size;
    }

    AddSelectedCityToFavorites() {
        if (this.state.selectedCity !== undefined) {
            const favoritesCount = this.addCityToFavorites(this.state.selectedCity);
            this.setNumOfFaviritesInTitle(favoritesCount);
            this.getCities();
        }
    }

    isFavorite(cityKey) {
        return this.getFaforiteCities().get(cityKey);
    }

    convertWeather(data) {
        const convertedData = {
            forecast: [
                {
                    date: _.get(data, 'Date'),
                    description: _.get(data, 'Day.LongPhrase'),
                    temperature: { min: _.get(data, 'Temperature.Minimum.Value'), max: _.get(data, 'Temperature.Maximum.Value') },
                    wind: _.get(data, 'Day.Wind.Speed.Value'),

                }
            ],
            current: {
                date: _.get(data, 'Date'),
                description: _.get(data, 'Day.LongPhrase'),
                temperature: { min: _.get(data, 'Temperature.Minimum.Value'), max: _.get(data, 'Temperature.Maximum.Value') },
                wind: _.get(data, 'Day.Wind.Speed.Value'),

            },
        };

        return convertedData;
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div className="col"> <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={this.state.citiesList}
                        sx={{ width: 300 }}
                        onInputChange={(event, newInputValue) => {
                            if (event && event.type === 'change') {
                                this.getCities(newInputValue);
                            }
                        }}
                        filterOptions={(x) => x}
                        renderInput={(params) => (
                            <TextField {...params} label="Select city" />
                        )}
                        getOptionLabel={(option) => `${this.isFavorite(option.Key) ? 'favorite: ' : ''} ${option.LocalizedName} ${option.Country.LocalizedName}`}
                        onChange={(event, newValue) => {
                            this.state.selectedCity = newValue && newValue;
                            this.GetDailyWeather(this.state.selectedCity.Key);
                        }}
                    />
                    </div>

                    <button className="btn btn-primary col" onClick={this.AddSelectedCityToFavorites}>Add Selected City To Favorites</button>
                </div>

                <div className="m-3">
                    <ReactWeather
                        isLoading={this.state.dailyWeather === undefined}
                        errorMessage={undefined}
                        data={this.state.dailyWeather}
                        lang="en"
                        locationLabel="Munich"
                        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                        showForecast={false}
                    />
                </div>

            </div>
        );
    }
}
