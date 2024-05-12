using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;

namespace backend.Interface
{
    public interface IOfferRepository
    {
        public Task<Offer?> GetOffer(int id);
        public Task<Offer> AddOffer(Offer offer);
        
    }
}