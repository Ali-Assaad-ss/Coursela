using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Identity;
using backend.Model;
using backend.Extensions;
using backend.Repository;
using System.Diagnostics;
using SignalRSwaggerGen.Attributes;
using Microsoft.AspNetCore.Http.HttpResults;
using Serilog;
using Microsoft.AspNetCore.Authorization;
using backend.Interface;


namespace Controllers
{
    [SignalRHub]
    public class Chathub(MessageRepository messageRepository, ChatRoomRepository chatRoomRepository, IProductRepository productRepository) : Hub
    {
        private readonly MessageRepository _messageRepository = messageRepository;
        private readonly ChatRoomRepository _chatRoomRepository = chatRoomRepository;
        private readonly IProductRepository _productRepositry = productRepository;

        public async Task ConnectToChatRoom(int chatroomId, bool admin = false)
        {
            var userId = Context.UserIdentifier;
            if (userId == null)
            {
                Log.Information("User is not authenticated");
                return;
            }
            var chatRoom = await _chatRoomRepository.GetChatroomById(chatroomId);

            if (chatRoom == null)
            {
                Log.Information("Chatroom {chatroomId} does not exist", chatroomId);
                return;
            }
            if (admin)
            {
                var product = await _productRepositry.GetAdminProduct(chatRoom.ProductId, userId);
                if (product == null)
                {
                    Log.Information("Admin {userId} is not authorized to join chatroom {chatroomId}", userId, chatroomId);
                    return;
                }
                else
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, chatroomId.ToString());
                    return;
                }
            }
            else
            {
                if (chatRoom.UserId != userId)
                {
                    Log.Information("User {userId} is not authorized to join chatroom {chatroomId}", userId, chatroomId);
                    return;
                }
                else
                    await Groups.AddToGroupAsync(Context.ConnectionId, chatroomId.ToString());
                return;
            }
        }

        //send message to chatroom
        public async Task SendMessage(int chatroomId, string content, string type)
        {
            var userId = Context.UserIdentifier;
            if (userId == null)
            {
                Log.Information("User is not authenticated");
                return;
            }
            var chatRoom = await _chatRoomRepository.GetChatroomById(chatroomId);
            if (chatRoom == null)
            {
                Log.Information("Chatroom {chatroomId} does not exist", chatroomId);
                return;
            }
            if (chatRoom.UserId != userId)
            {
                Log.Information("User {userId} is not authorized to send message to chatroom {chatroomId}", userId, chatroomId);
                return;
            }
            var message = await _messageRepository.SendMessage(content, type, userId, chatroomId);
            await Clients.Group(chatroomId.ToString()).SendAsync("ReceiveMessage", message);
        }


    }

}