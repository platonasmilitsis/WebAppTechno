-- MySQL Script generated by MySQL Workbench
-- Κυρ 17 Ιουλ 2022 06:00:38 μμ EEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT NOT NULL auto_increment,
  `username` VARCHAR(45) NOT NULL,
  `password` TINYTEXT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `telephone` VARCHAR(45) NULL,
  `email` TINYTEXT NOT NULL,
  `address` VARCHAR(100) NULL,
  `tin` VARCHAR(10) NOT NULL,
  `admin` TINYINT NOT NULL,
  `accepted` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


INSERT INTO users
values
    (1,'admin','$2a$10$vxTQrYwJmne7y8uonQgrKOQQayK67OEQkn/M9xzc6cALR7votIXQO','Themistoklis','Rambossa','2106991232','themakos@gmail.com','Τοσίτσας 18,Αθήνα','010101',1,1),
    (2,'Lst','$2a$10$vxTQrYwJmne7y8uonQgrKOQQayK67OEQkn/M9xzc6cALR7votIXQO','Lefteris','Stetsikas','2106007393','lst3@gmail.com','Θεοδοσίου 18, Χαλάνδρι','0010101',0,1),
    (3,'dberos','$2a$10$vxTQrYwJmne7y8uonQgrKOQQayK67OEQkn/M9xzc6cALR7votIXQO','Dimitris','Beros','2106262613','dberos@hit-it.com','Ανδρέα Μεταξά 12, Αθήνα','000045',0,1),
    (4,'Ourt','$2a$10$vxTQrYwJmne7y8uonQgrKOQQayK67OEQkn/M9xzc6cALR7votIXQO','Platonas','Militsis','2441068681','platonasOMilitsios@gmail.com','Βάλβη 27, Καρδίτσα','431000',0,1),
    (5,'PlasPlas','$2a$10$vxTQrYwJmne7y8uonQgrKOQQayK67OEQkn/M9xzc6cALR7votIXQO','Konstantinos','Plas','2105555555','kost++@gmail.com','Αλέξη Παυλή 44, Αθήνα','431120',0,1),
    (6,'Felarxos','$2a$10$vxTQrYwJmne7y8uonQgrKOQQayK67OEQkn/M9xzc6cALR7votIXQO','Haris','Korovesis','231000000','fel@gmail.com','Αγίου Ιωάννου 23, Αγία Παρασκευή','44442',0,1),
    (7,'User 7','$2a$10$vxTQrYwJmne7y8uonQgrKOQQayK67OEQkn/M9xzc6cALR7votIXQO','Userios','User','231200000','feld@gmail.com','Ελβετίας 21, Αγία Παρασκευή','443',0,0),
    (8,'User 8','$2a$10$vxTQrYwJmne7y8uonQgrKOQQayK67OEQkn/M9xzc6cALR7votIXQO','Useria','Useriou','231300000','feldc@gmail.com','Λεωφόρος Εθνικής Αντιστάσεως 172, Καισαριανή','442',0,0);




-- -----------------------------------------------------
-- Table `mydb`.`item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`item` ;

CREATE TABLE IF NOT EXISTS `mydb`.`item` (
  `id` INT NOT NULL auto_increment,
  `name` TINYTEXT NOT NULL,
  `first_bid` DOUBLE NULL,
  `buy_price` DOUBLE NOT NULL,
  `location` TINYTEXT NOT NULL,
  `country` TINYTEXT NOT NULL,
  `latitude` VARCHAR(45),
  `longitude` VARCHAR(45),
  `users_id` INT NOT NULL,
  `img_path` TEXT,
  `description` TEXT,
  `item_start_biding_sold` TINYINT,
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NOT NULL, 
  PRIMARY KEY (`id`),
  INDEX `fk_item_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_item_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO item
values
    (1,'Xiaomi Redmi 10C NFC Dual SIM (4GB/64GB) Ocean Blue',400,4000,'Σοφοκλή Βενιζέλου 58, Περιστέρι','Ελλάδα','38.00452848307119', '23.694068664418385','2','https://b.scdn.gr/images/sku_main_images/035519/35519747/xlarge_20220419111329_xiaomi_redmi_10c_4gb_64gb_ocean_blue.jpeg','
    <p><strong> Βασικά χαρακτηριστικά: </strong> </p>
    <ul>
        <li> Μεγάλη Οθόνη 6.71" </li>
        <li>Snapdragon 680</li>
        <li>Διπλή πίσω κάμερα 50MP</li>
        <li>Μπαταρία 5000mAh</li>
        <li>Γρήγορη φόρτιση 18W</li> 
        <li>Θύρα 3.5mm για ακουστικά</li>
        <li>FM ραδιόφωνο</li>
        <li>Προστασία οθόνης με Corning Gorilla Glass</li>
    </ul>
',0,'2022-9-22  13:20', '2022-9-23 19:00'),

    (2,'Casio Ψηφιακό Ρολόι Χρονογράφος με Καουτσούκ Λουράκι σε Μαύρο χρώμα',400,4000,'Ομονοίας 19, Αθήνα','Ελλάδα','37.983764319462495', '23.727843673016075','2','https://b.scdn.gr/images/sku_main_images/004548/4548700/fixedratio_20220802184810_casio_psifiako_roloi_chronografos_mpatarias_me_kaoutsouk_louraki_se_mayro_chroma_ae_1300wh_1avef_ae_1300wh_1av.jpeg','
    

    <p>Μηχανισμός: Μπαταρίας, Μέγεθος: 42 mm, Αδιάβροχο: 20 Atm</p> <br/>

    <p>Ρολόι της G-SHOCK με αντοχή και στιλ, από ορυκτό γυαλί, ανθεκτικό στις γρατζουνιές, και κάσα από καουτσούκ.</p>

    <br/>
    <p>Οι χρήστες που το έχουν αγοράσει το ξεχωρίζουν κυρίως γιατί δείχνει την ώρα με ακρίβεια και είναι ανθεκτικό στις πτώσεις και στις γρατσουνιές.</p>
',0, '2022-8-22  13:20', '2022-9-9 19:00'),


    (3,'The Eye of the World, The Wheel of Time',400,4000,'Χορμοβίτου 242, Πειραιάς','Ελλάδα','37.958290164807146', '23.630909942697556','2','https://images-na.ssl-images-amazon.com/images/I/51tLvp90p4L._SY291_BO1,204,203,200_QL40_FMwebp_.jpg','Prepare to turn the Wheel of Time - discover the first novel in one of the most influential and popular fantasy epics ever published.',0, '2022-9-22  13:20', '2022-9-23 19:00'),
    (4,'ΚΑΠΝΟΣ 30γρ KARELIAS ΠΟΡΤΟΚΑΛΙ',400,4000,'Μεταμορφώσεως 51, Χαλάνδρι','Ελλάδα','38.025647767028914', '23.82374272735476','2','https://www.tobacconistas.gr/wp-content/uploads/2014/10/753-Kapnos-Karelias-Kaphe-30gr-10-temachia.jpg','Βλάπτει σοβαρά την υγεία. Το δίνω γιατί θέλω να ανγκάσω την μάνα μου να το κόψει!',0, '2022-8-22  13:20', '2022-9-9 19:00'),
    (5,'Πατσάς Καπέκα',400,4000,'Βάλβη 27, Καρδίτσα','Ελλάδα',null,null,'3',null,'Ο καλύτερος πατσάς της χώρας. Ο Πλάτωνας είχε δίκιο! Για αυτό μάζεψα λίγο ταψάκι να το μοιράσω στο λαό. Μην τον χάσετε!!',0, '2022-8-22  13:20', '2022-9-9 19:00'),
    (6,'Item 6',400,4000,'Athens','Greece',null,null,'4',null,'Description 6',0, '2022-8-22  13:20', '2022-9-9 19:00');


-- -----------------------------------------------------
-- Table `mydb`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`category` ;

CREATE TABLE IF NOT EXISTS `mydb`.`category` (
  `id` INT NOT NULL auto_increment,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

Insert Into category
values
    (1,'Τεχνολογία'),
    (2,'Σπίτι - Κήπος'),
    (3,'Μόδα'),
    (4,'Hobby - Αθλητισμός'),
    (5,'Υγεία - Ομορφιά'),
    (6,'Παιδικά - Βρεφικά'),
    (7,'Auto - Moto'),
    (8,'Επαγγελματικά - B2B');


-- -----------------------------------------------------
-- Table `mydb`.`item_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`item_category` ;

CREATE TABLE IF NOT EXISTS `mydb`.`item_category` (
  `category_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  PRIMARY KEY (`category_id`, `item_id`),
  INDEX `fk_item_category_item1_idx` (`item_id` ASC) VISIBLE,
  CONSTRAINT `fk_item_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `mydb`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_category_item1`
    FOREIGN KEY (`item_id`)
    REFERENCES `mydb`.`item` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO item_category
values
    (1,1),(1,2),(1,3),(1,4),
    (2,1),(2,4),(2,5),(2,6),
    (3,1),
    (5,1),(5,6),
    (6,1),(6,2),
    (7,6);


-- -----------------------------------------------------
-- Table `mydb`.`bids`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`bids` ;

CREATE TABLE IF NOT EXISTS `mydb`.`bids` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bids_item1`
    FOREIGN KEY (`id`)
    REFERENCES `mydb`.`item` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



INSERT INTO bids
values (1),(2),(3),(4),(5),(6);

-- -----------------------------------------------------
-- Table `mydb`.`bidder`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`bidder` ;

CREATE TABLE IF NOT EXISTS `mydb`.`bidder` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `location` TINYTEXT NOT NULL,
  `country` TINYTEXT NOT NULL,
  `rating` int NULL,
  INDEX `fk_bidder_users_idx` (`id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bidder_users`
    FOREIGN KEY (`id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO bidder
values
    (2,'Lst','Chalandri','Greece',220),
    (3,'dberos','Nea Smirni','Greece',180),
    (4,'Ourt','Karditsa','Greece',100),
    (5,'PlasPlas','Loutsa','Greece',1000),
    (6,'Felarxos','Agia Paraskevi','Greece',250);


-- -----------------------------------------------------
-- Table `mydb`.`bid`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`bid` ;

CREATE TABLE IF NOT EXISTS `mydb`.`bid` (
  `id` INT NOT NULL auto_increment,
  `time` timestamp NOT NULL,
  `amount` DOUBLE NOT NULL,
  `bids_id` INT NOT NULL,
  `bidder_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bid_bids1_idx` (`bids_id` ASC) VISIBLE,
  CONSTRAINT `fk_bid_bids1`
    FOREIGN KEY (`bids_id`)
    REFERENCES `mydb`.`bids` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  INDEX `fk_bid_bidder1_idx` (`bidder_id` ASC) VISIBLE,
  CONSTRAINT `fk_bid_bidder1`
    FOREIGN KEY (`bidder_id`)
    REFERENCES `mydb`.`bidder` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


INSERT INTO bid
values
    (1,'2022-8-23 19:35',401,1,2),
    (2,'2022-8-23 19:40',420,1,3),
    (3,'2022-8-23 19:45',425,1,4),
    (4,'2022-8-23 19:50',450,1,5),
    (5,'2022-8-23 19:55',500,1,6),
    (6,'2022-8-23 20:00',700,1,3),
    (7,'2022-8-23 20:20',900,1,2),
    (8,'2022-8-23 19:40',401,2,2),
    (9,'2022-8-23 19:45',420,2,3),
    (10,'2022-8-23 19:50',425,2,4),
    (11,'2022-8-23 19:40',425,3,4),
    (12,'2022-8-23 19:40',425,4,4),
    (13,'2022-8-23 19:40',425,5,4);


-- -----------------------------------------------------
-- Table `mydb`.`messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`messages` ;

CREATE TABLE IF NOT EXISTS `mydb`.`messages` (
    `id` INT NOT NULL auto_increment,
    `seller_id` INT NOT NULL,
    `buyer_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_messages_seller_idx` (`seller_id` ASC) VISIBLE,
    CONSTRAINT `fk_messages_seller1`
        FOREIGN KEY (`seller_id`)
            REFERENCES `mydb`.`users` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    INDEX `fk_messages_buyer_idx` (`buyer_id` ASC) VISIBLE,
    CONSTRAINT `fk_messages_buyer`
        FOREIGN KEY (`buyer_id`)
            REFERENCES `mydb`.`users` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION)
    ENGINE = InnoDB;


INSERT INTO messages
values 
    (1,2,3),
    (2,1,3),
    (3,4,3),
    (4,5,3),
    (5,6,3),
    (6,7,3),
    (7,8,3);


DROP TABLE IF EXISTS `mydb`.`message_node` ;

CREATE TABLE IF NOT EXISTS `mydb`.`message_node` (
    `id` INT NOT NULL auto_increment,
    `time` timestamp NOT NULL,
    `message` MEDIUMTEXT NOT NULL,
    `is_read` TINYINT not null,
    `sender_id` INT NOT NULL,
    `messages_list_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_messages_sendeer_idx` (`sender_id` ASC) VISIBLE,
    CONSTRAINT `fk_messages_sender1`
        FOREIGN KEY (`sender_id`)
            REFERENCES `mydb`.`users` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    INDEX `fk_messages_messageslist_idx` (`messages_list_id` ASC) VISIBLE,
    CONSTRAINT `fk_messages_messageslist`
        FOREIGN KEY (`messages_list_id`)
            REFERENCES `mydb`.`messages` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION)
    ENGINE = InnoDB;

INSERT INTO message_node
values
    (1,'2022-8-24 19:35','Hello',1,2,1),
    (2,'2022-8-24 19:40','Hello',1,3,1),
    (3,'2022-8-24 19:50','How are you?',0,2,1),
    (4,'2022-8-24 19:55','Fine thanks!',1,3,1),
    (5,'2022-8-24 19:56','How are you?',1,3,1),
    (6,'2022-8-24 19:57','I am OK',0,2,1),
    (7,'2022-8-24 19:58','Will you send me my stuff?',0,3,1),
    (8,'2022-8-24 19:59','They are on their way!!',0,2,1),

    (9,'2022-8-24 19:35','Hello',1,1,2),
    (10,'2022-8-24 19:40','Hello',1,3,2),

    (11,'2022-8-24 19:35','Hello',1,4,3),
    (12,'2022-8-24 19:40','Hello',1,3,3),

    (13,'2022-8-24 19:35','Hello',1,5,4),
    (14,'2022-8-24 19:40','Hello',1,3,4),

    (15,'2022-8-24 19:35','Hello',1,6,5),
    (16,'2022-8-24 19:40','Hello',1,3,5),

    (17,'2022-8-24 19:35','Hello',1,7,6),
    (18,'2022-8-24 19:40','Hello',1,3,6),

    (19,'2022-8-24 19:35','Hello',1,8,7),
    (20,'2022-8-24 19:40','Hello',1,3,7);


    SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
