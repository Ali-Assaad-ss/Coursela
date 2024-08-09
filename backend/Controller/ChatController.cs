using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Product;
using backend.Extensions;
using backend.Interface;
using backend.Model;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller
{
    [ApiController]
    [Route("api/ChatRoom")]
    public class ChatController(ChatRoomRepository chatRoomRepository, ProductRepositry productRepositry) : ControllerBase
    {
        private readonly ChatRoomRepository _chatRoomRepository = chatRoomRepository;
        private readonly ProductRepositry _productRepository = productRepositry;


        [HttpPost("/ChatRoomExists")]
        [Authorize]
        public async Task<IActionResult> ChatRoomExists(int productId, string? customerId)
        {
            var userId = User.GetId();
            ChatRoom? chatRoom;
            if (customerId == null)
            {
                //check if user owns the product
                var product = await _productRepository.GetUserProduct(productId, userId);
                if (product == null)
                    return Unauthorized("You do not own this product");

                chatRoom = await _chatRoomRepository.GetChatroom(userId, productId);

            }
            else
            {
                //check if admin owns the product
                var product = await _productRepository.GetAdminProduct(productId, userId);
                if (product == null)
                    return Unauthorized("You do not own this product");

                chatRoom = await _chatRoomRepository.GetChatroom(customerId, productId);
            }
            return chatRoom == null ? NotFound("Chatroom does not exist") : Ok(chatRoom?.Id);
        }

        [HttpPost("/CreateChatRoom")]
        [Authorize]
        public async Task<IActionResult> CreateChatRoom(int productId, string? customerId)
        {
            //check if already exists
            var result = await ChatRoomExists(productId, customerId);
            if (result is NotFoundObjectResult)
            {
                var userId = User.GetId();
                //if the customer id is null then the user is a customer

                if (customerId == null)
                {
                    var chatRoom = await _chatRoomRepository.CreateChatRoom(userId, productId);
                    return Ok(chatRoom);
                }
                else
                {
                    var chatRoom = await _chatRoomRepository.CreateChatRoom(customerId, productId);
                    return Ok(chatRoom);
                }

            }
            return result;
        }
        [HttpGet("/Messages")]
        [Authorize]
        public async Task<IActionResult> GetMessages(int chatroomId)
        {
            var userId = User.GetId();
            var chatRoom = await _chatRoomRepository.GetChatroomById(chatroomId);
            if (chatRoom == null)
                return NotFound("Chatroom does not exist");

            var product = await _productRepository.GetUserProduct(chatRoom.ProductId, userId);
            product ??= await _productRepository.GetAdminProduct(chatRoom.ProductId, userId);
            if (product == null)
                return Unauthorized("You do not own this product");

            var messages = await _chatRoomRepository.GetMessagesAsync(chatroomId);
            return Ok(messages);
        }
    }
}