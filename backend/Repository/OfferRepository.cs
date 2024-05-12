using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interface;
using backend.Model;

namespace backend.Repository
{
    public class OfferRepository: IOfferRepository
    {
        private readonly ApplicationDBContext _context;
        public OfferRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Offer?> GetOffer(int id)
        {
            var Offer = await _context.Offers.FindAsync(id);
            return Offer;
        }
        public async Task<Offer> AddOffer(Offer offer)
        {
            await _context.Offers.AddAsync(offer);
            await _context.SaveChangesAsync();
            return offer;
        }
    }
}