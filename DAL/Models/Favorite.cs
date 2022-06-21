using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class Favorite
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CityCode { get; set; }

        public virtual City CityCodeNavigation { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
