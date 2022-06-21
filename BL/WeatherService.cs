

using DAL.Models;

namespace BL

{
    public interface IWeather
    {
        bool AddNewCity(City city);
    }
    public class WeatherService : IWeather
    {
        public bool AddNewCity(City city)
        {
            using (WeatherContext db = new WeatherContext())
            {

                db.Cities.Add(city);
                return db.SaveChanges() > 0;
            }
        }

        public bool AddNewUser(User user)
        {
            using (WeatherContext db = new WeatherContext())
            {

                db.Users.Add(user);
                return db.SaveChanges() > 0;
            }
        }

        public bool EditUser(User user)
        {
            using (WeatherContext db = new WeatherContext())
            {

                db.Users.Update(user);
                return db.SaveChanges() > 0;
            }
        }

        public bool DeleteUser(User user)
        {
            using (WeatherContext db = new WeatherContext())
            {

                db.Users.Remove(user);
                return db.SaveChanges() > 0;
            }
        }

        public bool AddSubStringToCity(List<SubStringToCity> subStringToCity)
        {
            using (WeatherContext db = new WeatherContext())
            {

                db.SubStringToCities.AddRange(subStringToCity);
                return db.SaveChanges() > 0;
            }
        }

    }
}