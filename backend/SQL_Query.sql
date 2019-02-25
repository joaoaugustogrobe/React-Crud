#use <DATABASE NAME>

CREATE TABLE IF NOT EXISTS User(
    ID_User int(9) unsigned NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    Description varchar(500) DEFAULT NULL,
    CreatedAt timestamp DEFAULT CURRENT_TIMESTAMP,
    KEY ID_User (ID_User)
)DEFAULT CHARSET=utf8;



USE `DATABASE NAME`;
DROP procedure IF EXISTS `PersonAddOrEdit`;

DELIMITER $$
USE `DATABASE NAME`$$
CREATE DEFINER=`DATABASE NAME`@`%` PROCEDURE `PersonAddOrEdit`(
	IN _ID_User INT,
    IN _Name VARCHAR(100),
    IN _Description VARCHAR(499)
)
BEGIN
	IF _ID_User = 0 THEN
		INSERT INTO User(Name, Description)
        VALUES(_Name, _Description);
        
        SET _ID_User = LAST_INSERT_ID();
	ELSE
		UPDATE User
        SET
        Name = _Name,
        ID_User = _ID_User,
        Description = _Description
        WHERE ID_User = _ID_User;
	END IF;
    
    SELECT _ID_User AS 'ID_User';
END$$

DELIMITER ;






