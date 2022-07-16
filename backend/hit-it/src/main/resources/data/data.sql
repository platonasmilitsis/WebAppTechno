*/
drop table if exists user;


CREATE TABLE `user`
(
    `id`         int NOT NULL,
    `username`   varchar(45) NOT NULL ,
    `password`   varchar(45) NOT NULL ,
    `first_name` varchar(45) NOT NULL ,
    `last_name`  varchar(45) NOT NULL ,
    `telephone`  varchar(45) NULL ,
    `email`      varchar(45) NOT NULL ,
    `address`    varchar(45) NULL ,
    `afm`        varchar(9) NOT NULL ,
    `admin`      tinyint NOT NULL ,
    `accepted`   tinyint NOT NULL ,

    PRIMARY KEY (`id`) auto_increment
);

insert into user(username,password,
                 first_name,last_name,telephone,
                 email,address,afm,admin,accepted)
    values('Adam647','01','ADAM',
           'BERIOS','6975669136','adamj@test.com',
           'Not much too say',
           'USA,Illinois',0,1,'Adam','Jonhson',1);




drop table if exists bidder;

CREATE TABLE `bidder`
(
    `user_id`       int NOT NULL ,
    `location` varchar(45) NOT NULL ,
    `country`  varchar(45) NOT NULL ,
    `rating`   int NULL ,

    PRIMARY KEY (`user_id`),
    CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
);





