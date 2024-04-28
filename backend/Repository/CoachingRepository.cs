using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Product;
using backend.Model;

namespace backend.Repository
{
    public class CoachingRepository
    {
        private readonly ApplicationDBContext _context;
        public CoachingRepository(ApplicationDBContext context)
        {
            _context = context;

        }
        public async Task<Coaching> AddCoaching(CreateNewProductDto coachingDto)
        {
            var coaching = new Coaching
            {
                Name = coachingDto.Name,
            };
            await _context.Coachings.AddAsync(coaching);
            await _context.SaveChangesAsync();
            return coaching;
        }
    }
}