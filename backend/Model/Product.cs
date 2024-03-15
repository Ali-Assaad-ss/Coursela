using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace backend.Model
{
    public abstract class Product
    {
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string ProductPrice { get; set; }
        public string ProductImage { get; set; }
        public int Limit { get; set; }
        public bool Visibility {get;set;}
        public Community? Community { get; set; }
        public List<Purchase>? Purchases { get; set; }
        public List<Offer> Offerings { get; set; }
        public List<ChatRoom>? ChatRooms { get; set; }
        public List<Feedback>? Feedbacks { get; set; }
    }
}