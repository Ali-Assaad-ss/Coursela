using backend.Data;
using backend.Dto.Product;
using backend.Dto.Coaching;
using backend.Model;
using Microsoft.EntityFrameworkCore;

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
        public async Task<Coaching> GetCoaching(int id,string adminId)
        {
            return await _context.Coachings.FirstOrDefaultAsync(x => x.Id == id && x.Offerings.Any(x => x.AdminId == adminId));
        }
        public async Task<Coaching> UpdateCoaching(int id,string adminId, UpdateCoachingDto coachingDto)
        {
            var coaching = await _context.Coachings.FirstOrDefaultAsync(x => x.Id == id);
            if (coaching == null)
            {
                return null;
            }
            coaching.Name = coachingDto.Name;
            coaching.Description = coachingDto.Description;
            coaching.Price = coachingDto.Price;
            coaching.Limit=coachingDto.Limit;
            _context.Coachings.Update(coaching);
            await _context.SaveChangesAsync();
            return coaching;
        }
    }
}