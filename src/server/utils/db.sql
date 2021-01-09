/* table user- */
create table user_(
    idUser int not null primary key auto_increment,
    dateCreation date,
    password_ varchar(100),
    nickname varchar(50),
    description_ varchar(120)
);
alter table user_ modify nickname varchar(50) not null unique key;

/*table inforamation_user*/
create table information_user(
	nickname varchar(50) not null primary key,
    fullname varchar(100),
    birthdate date,
	idUser int,
    foreign key(nickname) references user_(nickname)
);

select * from information_user;
select * from user_;
insert into user_(nickname,password_,description_,dateCreation) values('elbromas','5402468','soy un bromista por naturaleza','1999/02/12');
update user_ set nickname = 'elcojudo' where idUser = 1 AND nickname = 'elbromas';
delete from user_ where idUser = 1;

/* procedure for create user */
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

/* procedure for delete user */
CREATE PROCEDURE `deleteUser`(
	nickname varchar(50)
)
BEGIN
	delete from information_user where information_user.nickname = nickname;
	delete from user_ where user_.nickname = nickname;
END

call deleteUser('nickname');

SET SQL_SAFE_UPDATES = 0; /*safe delete disabled*/

/* if name is used return 1 else 0 */
CREATE FUNCTION `isNicknameUsed`(nickname varchar(50)) 
RETURNS int(11)
BEGIN

	DECLARE RESPONSE varchar(50);
    SET RESPONSE = (SELECT user_.nickname from user_ where nickname = user_.nickname);
    
    IF RESPONSE = nickname THEN return 1;
    ELSE return 0;
    END IF;
    
END

/*****************************************************************************************/

/* category post */
create table categoryPost(
	idCategory int not null primary key auto_increment,
    nameCategory varchar(120) not null
);

insert into categoryPost(nameCategory) values('Math');
insert into categoryPost(nameCategory) values('Programming');
insert into categoryPost(nameCategory) values('Data Structures');
insert into categoryPost(nameCategory) values('Design Patterns');
insert into categoryPost(nameCategory) values('Clean Code');
insert into categoryPost(nameCategory) values('Tips code');
insert into categoryPost(nameCategory) values('Dynmic programing');
insert into categoryPost(nameCategory) values('javascript');

select * from categoryPost;

/* post section */
create table post(
	idPost int not null primary key auto_increment,
    idRepost int default null,
    idUser int not null ,
    text_  varchar(650) ,
    imageURL1 varchar(120),
    imageURL2 varchar(120),
    imageURL3 varchar(120),
    imageURL4 varchar(120),
    videoURL1 varchar(120),
    idGifURL varchar(120),
    datePost date,
	idCategory1 int ,
    idCategory2 int ,
    idCategory3 int ,
    foreign key (idCategory1) references categoryPost(idCategory),
    foreign key (idCategory2) references categoryPost(idCategory),
    foreign key (idCategory3) references categoryPost(idCategory),
    foreign key (idUser) references user_(idUser)
);
alter table post add foreign key(idRepost) references post(idPost);

/* comment post */
create table commentPost(
	idComment int not null primary key auto_increment,
    idRecomment int default null ,
    dateComment date,
    idCurrentComment int,/*if this is a node comment*/
    text_ varchar(650),
    idUserComment int not null,
    idPost int not null,
    gifURL varchar(120),
	ImageURL1 varchar(120),
    foreign key (idPost) references post(idPost),
    foreign key (idUserComment) references user_(idUser),
    foreign key (idCurrentComment) references commentPost(idComment),
    foreign key (idRecomment) references commentPost(idComment)
);

/* like */
create table like_(
	idLike int not null primary key auto_increment,
    idComment int default null,
    idPost int default null,
    idUserLike int not null,
    foreign key (idPost) references post(idPost),
    foreign key (idUserLike) references user_(idUser),
    foreign key (idComment) references commentPost(idComment)
);

/*category contact*/
create table categoryContact (
	idCategory int not null primary key auto_increment,
    nameCategory varchar(50) not null
);

insert into categoryContact(nameCategory) values('friend');
insert into categoryContact(nameCategory) values('work friend');
insert into categoryContact(nameCategory) values('relationship');
insert into categoryContact(nameCategory) values('family');
insert into categoryContact(nameCategory) values('other');

select * from categoryContact;

/* table contacts  */
create table contacts(
	id_ int not null primary key,
	idContact int not null,
    idCurrentUser int not null,
    dateOfAdd date ,
    categoryContact int,
    foreign key (idCurrentUser) references user_(idUser),
    foreign key (categoryContact) references categorycontact(idCategory)
);


/* target table */

create table Targets(
	idTarget int not null primary key auto_increment,
    name_ varchar(50) not null
);

insert into targets(name_) values('programmer');
insert into targets(name_) values('Variety');
insert into targets(name_) values('UXUIdesigner');
insert into targets(name_) values('productDesigner');
insert into targets(name_) values('Architect');
insert into targets(name_) values('Music');
insert into targets(name_) values('VirtualSocialActivities');

/* table ads */
create table ads(
	idAd int not null primary key auto_increment,
    idUser int not null,
    text_ varchar(550) default null,
    urlVideo1 varchar(200) default null,
    urlImage1 varchar(200) default null,
    urlImage2 varchar(200) default null,
    foreign key(idUser) references user_(idUser)
);

/* table ads target */
create table ads(
	idAd int not null primary key auto_increment,
    idUser int not null,
    text_ varchar(550) default null,
    urlVideo1 varchar(200) default null,
    urlImage1 varchar(200) default null,
    urlImage2 varchar(200) default null,
    foreign key(idUser) references user_(idUser)
);

/* table ad target*/
create table adTarget(
	idAdTarget int not null primary key auto_increment,
    idTarget int not null,
    idAd int not null,
    foreign key(idTarget) references targets(idTarget),
    foreign key(idAd) references ads(idAd)
);

/* table enterprise */
    /* change the rol of the common user*/
create table enterprise(
	idEnterprise int not null primary key auto_increment,
    idUser int not null,
    nameEnterprise varchar(50) default null,
    contactNumber varchar(50) default null,
    emailContact varchar(50) default null,
    foreign key(idUser) references user_(idUser)
);