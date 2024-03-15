using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Community
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Image { get; set; }
        public List<User>? Users { get; set; }
        public List<Admin> Admins { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public List<Post> Posts { get; set; }
        public bool AdminOnly { get; set; }
        public bool IsVisible { get; set; }
    }
}