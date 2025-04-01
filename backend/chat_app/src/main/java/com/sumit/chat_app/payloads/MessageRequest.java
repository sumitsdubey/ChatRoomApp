package com.sumit.chat_app.payloads;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageRequest {
    private String content;
    private String sender;
    private String roomId;
}
