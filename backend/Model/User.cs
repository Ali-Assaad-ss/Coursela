using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class User:ApplicationUser
    {
        public List<Response>? Responses { get; set; }
        public List<Purchase>? Purchases { get; set; }
        public List<Feedback>? Feedbacks { get; set; }
        public List<Booking>? Bookings { get; set; }
        
    }
}