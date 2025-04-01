package com.sumit.chat_app.repositories;

import com.sumit.chat_app.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepo extends MongoRepository<Room, String> {

    //GET ROOM USING  ROOM ID
    public Room findByRoomId(String roomId);
}
