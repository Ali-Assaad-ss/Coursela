using backend.Dto.User;
using backend.Model;

namespace Backend.Mappers
{
    public static class AdminPageUserMapper
    {
        public static AdminPageUsersDto ToAdminPageUsersDto(this User user)
        {
            return new AdminPageUsersDto
            {
                Id = user.Id,
                Username = user.UserName,
                Paid = 100,
            };
        }
    }
}