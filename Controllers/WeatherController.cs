using Microsoft.AspNetCore.Mvc;
using BL;
using DAL.Models;
using System.Net;

namespace Project2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private static readonly string ApiKey = "51pQVKV2iAuYAMBUk0UGwY0kQ596UJKv";

        private readonly ILogger<WeatherController> _logger;
        private readonly IWeather _weather;

        public WeatherController(ILogger<WeatherController> logger)
        {
            _logger = logger;
            //_weather = weather;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

      //  [HttpGet]
      //  public IActionResult AddNewCity(City city)
        //{
          //  return Ok(_weather.AddNewCity(city));
        //}

        //[HttpGet]
        //public bool getAutoCompleteCities(string citySubString)
        //{
          //  string html = string.Empty;
            //string url = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + ApiKey + "&q=" + citySubString;

            //HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            //request.AutomaticDecompression = DecompressionMethods.GZip;

            //using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            //using (Stream stream = response.GetResponseStream())
            //using (StreamReader reader = new StreamReader(stream))
            //{
                //html = reader.ReadToEnd();
            //}

            //Console.WriteLine(html);
            //return true;

        //}

    }
}