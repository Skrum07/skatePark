CREATE DATABASE skatepark;

CREATE table skaters(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) not null,
    email VARCHAR(50) not null unique,
    password VARCHAR(60) not null,
    experience INT not null,
    specialty VARCHAR(50) not null,
    image VARCHAR(255) not null,
    status BOOLEAN not null default FALSE,
    createat TIMESTAMP with time zone defoult NOW()  
);

