using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using backend.Data;
using backend.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{

    public class ChatRoomRepository(ApplicationDBContext context, UserManager<ApplicationUser> userManager)
    {
        private readonly ApplicationDBContext _context = context;
        private readonly UserManager<ApplicationUser> _userManager = userManager;

        public async Task<ChatRoom?> GetChatroom(string userId, int productId)
        {
            var chatroom = await _context.ChatRooms.FirstOrDefaultAsync(x => x.UserId == userId && x.ProductId == productId);
            return chatroom;
        }
        //get chatRoom by id
        public async Task<ChatRoom?> GetChatroomById(int chatroomId)
        {
            var chatroom = await _context.ChatRooms.FirstOrDefaultAsync(x => x.Id == chatroomId);
            return chatroom;
        }

        public async Task<ChatRoom> CreateChatRoom(string userId, int productId)
        {
            //search for chatroom with both sender and reciver
            var chatroom = new ChatRoom
            {
                UserId = userId,
                ProductId = productId,
                Messages = []
            };
            await _context.ChatRooms.AddAsync(chatroom);
            await _context.SaveChangesAsync();
            return chatroom;
        }
        //load messages
        public async Task<List<Message>> GetMessagesAsync(int chatroomId)
        {
            var messages = await _context.Messages.Where(x => x.ChatRoomId == chatroomId).ToListAsync();
            return messages;
        }
    }
}