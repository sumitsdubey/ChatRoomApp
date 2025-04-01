package com.sumit.chat_app.controller;

import com.sumit.chat_app.entities.Message;
import com.sumit.chat_app.entities.Room;
import com.sumit.chat_app.payloads.MessageRequest;
import com.sumit.chat_app.repositories.RoomRepo;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@CrossOrigin("http://localhost:3000")
public class ChatController {


    private RoomRepo roomRepo;

    public ChatController(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    // for sending and recieving message

    @MessageMapping("/send-message/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId,
            @RequestBody MessageRequest request
            ) {

        Room room = roomRepo.findByRoomId(request.getRoomId());
        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());

        if(room != null) {
            room.getMessages().add(message);
            roomRepo.save(room);
        }
        else{
            throw new IllegalArgumentException("Room not found");
        }
        return message;
    }

}
