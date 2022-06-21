using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class City
    {
        public City()
        {
            Favorites = new HashSet<Favorite>();
            SubStringToCities = new HashSet<SubStringToCity>();
        }

        public int CityCode { get; set; }
        public string CityName { get; set; } = null!;
        public string? Country { get; set; }

        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<SubStringToCity> SubStringToCities { get; set; }
    }
}
