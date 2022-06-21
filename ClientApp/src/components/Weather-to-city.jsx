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
            let data = [];
            await fetch(requestString)
                .then(response => response.json())
                .then(result => {
                    data = result;
                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            return data;

        } else {
            return [];
        }

    }

    async GetDailyWeather(cityCode) {
        if (cityCode !== '') {
            const requestString = ` https://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityCode}?apikey=${apikey}&details=true&metric=true`;
            let data;
            await fetch(requestString)
                .then(response => response.json())
                .then(result => {
                    data = result;
                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            this.setState({ dailyWeather: this.convertWeather(data.DailyForecasts[0]) });
        } else {
            this.setState({ dailyWeather: {} });
        }
    }

    
    async getCities(newInputValue) {
        //get favrite cities
        const favorites = [...this.getFaforiteCities().values()];
        //get autocomplete cities
        const autoComplete = await this.getAutoCompleteCities(newInputValue)
        this.setState({ citiesList: favorites.concat(autoComplete) });

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
                        getOptionLabel={(option) => option && `${this.isFavorite(option.Key) ? 'favorite: ' : ''} ${option.LocalizedName} ${option.Country.LocalizedName}`}
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
