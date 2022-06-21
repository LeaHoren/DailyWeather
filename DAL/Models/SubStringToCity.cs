using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class SubStringToCity
    {
        public int Id { get; set; }
        public string SubString { get; set; } = null!;
        public int? CityCode { get; set; }

        public virtual City? CityCodeNavigation { get; set; }
    }
}
