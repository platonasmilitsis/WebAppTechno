package com.hitit.models;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "message_node")
 public class MessageNode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd' 'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;

    private String message;

    @JoinColumn(name = "sender_id",nullable = false)
    private Long sender_id;

    @JoinColumn(name = "messages_list_id",nullable = false)
    private Long messages_list_id;

}
