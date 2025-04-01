package com.sumit.chat_app.controller;

import com.sumit.chat_app.entities.Message;
import com.sumit.chat_app.entities.Room;
import com.sumit.chat_app.repositories.RoomRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/rooms")
public class RoomController {

    private RoomRepo roomRepo;

    public RoomController(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    //CREATE ROOM
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId){
        if(roomRepo.findByRoomId(roomId)!=null){
            return ResponseEntity.badRequest().body("Room Already Exist");
        }
        //create new room

        Room room = new Room();
        room.setRoomId(roomId);
        Room saved = roomRepo.save(room);
        return ResponseEntity.ok(saved);
    }
    //GET ROOM
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId){

        Room byRoomId = roomRepo.findByRoomId(roomId);
        if(byRoomId==null){
            return ResponseEntity.badRequest().body("Room Not Found");
        }
        return ResponseEntity.ok(byRoomId);

    }

    //GET MESSAGES OF ROOM

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<?> getMessagesByRoomId(
            @PathVariable String roomId,
            @RequestParam(value ="page", defaultValue = "0", required = false)int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size
    ){
        Room room = roomRepo.findByRoomId(roomId);
        if(room==null){
            return ResponseEntity.badRequest().build();
        }

        //get Massage
        List<Message> messages = room.getMessages();

        //pagination
        int start = Math.max(0, messages.size()-(page +1)*size);
        int end = Math.min(messages.size(), start + size);

        List<Message> paginatedMessages = messages.subList(start, end);

        return ResponseEntity.ok(paginatedMessages);

    }


}
