package com.hitit.services;


import com.hitit.models.MessageNode;
import com.hitit.models.Messages;
import com.hitit.repository.MessageNodeRepository;
import com.hitit.repository.MessagesRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class MessagesService {

    private final MessagesRepository messagesRepo;
    private final MessageNodeRepository messageNodeRepository;

    public MessagesService(MessagesRepository messagesRepo, MessageNodeRepository messageNodeRepository) {
        this.messagesRepo = messagesRepo;
        this.messageNodeRepository = messageNodeRepository;
    }

    public List<Messages> getAll() {

        return messagesRepo.findAll();
    }

    public List<Messages> getByUserId(Long user_id) {
        return messagesRepo.findAllByUserId(user_id);
    }

    public Messages addMessages(Messages newMessages) {
        return messagesRepo.save(newMessages);
    }

    public ResponseEntity<?> deleteMessages(Long id) {
        messagesRepo.deleteById(id);
        return ResponseEntity.ok("OK");
    }

    public List<MessageNode> getById(Long id) {
        return messageNodeRepository.findMessageNodeByMessagesId(id);
    }
//
//    public List<MessageNode> sendNewMessageInChat(Long id) {
//    }
}
