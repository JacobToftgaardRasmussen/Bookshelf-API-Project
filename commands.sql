-- docker exec -it <containerID> bash
-- psql -h localhost -U myuser
CREATE DATABASE mydb;
-- \c mydb
CREATE TABLE Book(ID SERIAL PRIMARY KEY, TITLE TEXT NOT NULL, AUTHOR TEXT NOT NULL, PUBLISHED BOOLEAN NOT NULL);
-- exit 
-- exit
