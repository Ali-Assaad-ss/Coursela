using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Coaching:Product
    {
        public List<Booking> Bookings { get; set; }
        public List<DateTime> AvailableDates { get; set; }
        public List<DateTime> ReservedDates { get; set; }
        
    }
}