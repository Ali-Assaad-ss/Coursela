using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
  public class Booking
  {
    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
    public int CoachingId { get; set; }
    public Coaching Coaching { get; set; }
    
  }
}