SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `data` DEFAULT CHARACTER SET utf8 ;
USE `data` ;

-- -------------------------------------


-- -----------------------------------------------------
-- Table `data`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `data`.`Users` ;

CREATE TABLE IF NOT EXISTS `data`.`Users` (
                                              `id` INT NOT NULL,
                                              `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `telephone` VARCHAR(45) NULL,
    `email` VARCHAR(45) NOT NULL,
    `address` VARCHAR(45) NULL,
    `TIN` VARCHAR(10) NOT NULL,
    `admin` TINYINT NOT NULL,
    `accepted` TINYINT NOT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;