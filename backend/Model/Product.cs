using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace backend.Model
{
    public abstract class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public double? Price { get; set; }
        public bool Image { get; set; }=false;
        public int Limit { get; set; }
        public bool Visibility {get;set;}
        public Community? Community { get; set; }
        public List<Purchase>? Purchases { get; set; }
        public List<Offer>? Offerings { get; set; }
        public List<ChatRoom>? ChatRooms { get; set; }
        public List<Feedback>? Feedbacks { get; set; }
    }
}