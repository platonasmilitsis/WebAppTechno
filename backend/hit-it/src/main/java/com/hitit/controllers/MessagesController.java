package com.hitit.controllers;


import com.hitit.models.MessageNode;
import com.hitit.models.Messages;
import com.hitit.services.MessagesService;
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


    @PutMapping("messagesList/user_id={user_id}/read")
    public List<Messages> allMessagesRead(@PathVariable Long user_id){
        return messagesService.allMessagesRead(user_id);
    }

    @PostMapping("messagesList/{id}")
    public List<MessageNode> sendNewMessageInChat(@PathVariable Long id, @RequestBody MessageNode messageNode){
        return messagesService.sendNewMessageInChat(id,messageNode);
    }


    @PostMapping("/messagesList")
    public Messages newMessages(@RequestBody Messages newMessages){
        return messagesService.addMessages(newMessages);
    }

    @DeleteMapping("/messagesList/{id}/message/{id2}")
    public List<MessageNode> deleteMessage(@PathVariable Long id,@PathVariable Long id2){
        return messagesService.deleteMessage(id,id2);
    }

}

