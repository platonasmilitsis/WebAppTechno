package com.hitit.services;


import com.hitit.models.MessageNode;
import com.hitit.models.Messages;
import com.hitit.repository.MessageNodeRepository;
import com.hitit.repository.MessagesRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
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
        List<Messages> messages = getByUserId(newMessages.getSeller_id());
        for(Messages message : messages){
            if(message.getSeller_id() == newMessages.getSeller_id()){
                if(message.getBuyer_id() == newMessages.getBuyer_id())
                    return message;
            }
            
            if(message.getBuyer_id() == newMessages.getSeller_id()){
                if(message.getSeller_id() == newMessages.getBuyer_id())
                    return message;
            }
             
        }
        return messagesRepo.save(newMessages);
    }

    public List<MessageNode> deleteMessage(Long id,Long id2) {
        Optional<Messages> messages = messagesRepo.findById(id);
        if(messages.isPresent())
            messageNodeRepository.deleteById(id2);
        else throw new RuntimeException("Message was not found");

        return this.getById(id);
    }

    public List<MessageNode> getById(Long id) {
        return messageNodeRepository.findMessageNodeByMessagesId(id);
    }

    public List<MessageNode> sendNewMessageInChat(Long id,MessageNode messageNode) {
        Optional<Messages> messages = messagesRepo.findById(id);
        if(messages.isPresent()){
            messageNode.setMessages_list_id(id);
            messageNodeRepository.save(messageNode);
            return this.getById(id);
        }
        else throw new RuntimeException("Message List was not found");
    }


    public List<Messages> allMessagesRead(Long user_id) {
        List<Messages> list = this.getByUserId(user_id);
        if(list.isEmpty()) throw new RuntimeException("Something went wrong!");
        for(Messages messages : list) {
            messageNodeRepository.allMessagesRead(user_id, messages.getId());
        }

        return list;
    }


}
