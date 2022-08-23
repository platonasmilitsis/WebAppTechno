package com.hitit.repository;

import com.hitit.models.MessageNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageNodeRepository extends JpaRepository<MessageNode, Long> {

    @Query("select m from MessageNode m where m.messages_list_id = :messages_id order by m.time asc")
    List<MessageNode> findMessageNodeByMessagesId(Long messages_id);
}
