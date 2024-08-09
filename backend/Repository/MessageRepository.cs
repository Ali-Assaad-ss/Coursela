using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using backend.Data;
using backend.Model;

namespace backend.Repository
{
    
    public class MessageRepository(ApplicationDBContext context)
    {
        private readonly ApplicationDBContext _context=context;


        public async Task<Message> SendMessage(string content,string type, string senderId,int chatroomId)
        {
            var message = new Message
            {
                Content = content,
                Type = type,
                SenderId = senderId,
                ChatRoomId = chatroomId,
                MessageDate = DateTime.Now
            };
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return message;
        }

    }
}