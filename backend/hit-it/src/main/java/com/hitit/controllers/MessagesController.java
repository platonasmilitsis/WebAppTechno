package com.hitit.controllers;


import com.hitit.models.MessageNode;
import com.hitit.models.Messages;
import com.hitit.services.MessagesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MessagesController {

    private final MessagesService messagesService;

    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }


    @GetMapping("/messagesList")
    public List<Messages> getAllMessages(){
        return messagesService.getAll();
    }

    @GetMapping("/messagesList/{id}")
    public List<Messages> getMessagesByUserId(@PathVariable Long id){
        return messagesService.getByUserId(id);
    }

    @GetMapping("messagesList/{id}/all")
    public List<MessageNode> getAllMessagesById(@PathVariable Long id){
        return messagesService.getById(id);
    }

//
//    @PostMapping("messagesList/{id}")
//    public List<MessageNode> sendNewMessageInChat(@PathVariable Long id){
//        return messagesService.sendNewMessageInChat(id);
//    }


    @PostMapping("/messagesList")
    public Messages newMessages(@RequestBody Messages newMessages){
        return messagesService.addMessages(newMessages);
    }

    @DeleteMapping("/messagesList/{id}")
    public ResponseEntity<?> deleteMessages(@PathVariable Long id){
        return messagesService.deleteMessages(id);
    }

}
