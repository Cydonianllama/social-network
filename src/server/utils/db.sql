create table user_(
    idUser int not null primary key auto_increment,
    dateCreation date,
    password_ varchar(100),
    nickname varchar(50),
    description_ varchar(120)
);

create table information_user(
	nickname varchar(50) not null primary key,
    fullname varchar(100),
    birthdate date,
	idUser int,
    foreign key(nickname) references user_(nickname)
);

alter table user_ modify nickname varchar(50) not null unique key;

select * from information_user;

select * from user_;

insert into user_(nickname,password_,description_,dateCreation) values('elbromas','5402468','soy un bromista por naturaleza','1999/02/12');

update user_ set nickname = 'elcojudo' where idUser = 1 AND nickname = 'elbromas';

delete from user_ where idUser = 1;

CREATE PROCEDURE `createUser`(
    dateCreation date,
    password_ varchar(100),
    nickname varchar(50),
    description_ varchar(120),
    fullname varchar(100),
    birthdate date
)
BEGIN

	DECLARE a INT;
    SET a = isNicknameUsed(nickname);
    
	IF a = 0 THEN 
		insert into user_(dateCreation,password_,nickname,description_) values(dateCreation,password_,nickname,description_);
		insert into information_user(nickname,fullname,birthdate) values(nickname,fullname,birthdate);
    END IF;
    
END

call createuser('2020,02,12','8484','careculo','esta es una descripcion para la mierda','alberto fujimori','1999,02,12');

CREATE PROCEDURE `deleteUser`(
	nickname varchar(50)
)
BEGIN
	delete from information_user where information_user.nickname = nickname;
	delete from user_ where user_.nickname = nickname;
END

call deleteUser('nickname');

SET SQL_SAFE_UPDATES = 0; /*safe delete disabled*/

CREATE FUNCTION `isNicknameUsed`(nickname varchar(50)) 
RETURNS int(11)
BEGIN

	DECLARE RESPONSE varchar(50);
    SET RESPONSE = (SELECT user_.nickname from user_ where nickname = user_.nickname);
    
    IF RESPONSE = nickname THEN return 1;
    ELSE return 0;
    END IF;
    
END
