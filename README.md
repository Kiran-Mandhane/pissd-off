# CS-348-Course-Project

To create a sample database, please ensure that **MySQL** is installed before continuining with the following steps. Installing can be found at the [installation page](https://dev.mysql.com/doc/refman/8.0/en/installing.html).

1. Make a new 'Toy' database by following the instructions provided below:

```mysql
$ mysql -u root -p (or sudo mysql -u root)
mysql> CREATE DATABASE testDB;
mysql> USE testDB;
mysql> CREATE TABLE student(uid DECIMAL(3, 0) NOT NULL PRIMARY KEY, name
VARCHAR(30), score DECIMAL(3, 2));
mysql> INSERT INTO student VALUES(1, ’alice’, 0.1);
mysql> INSERT INTO student VALUES(2, ’bob’, 0.4);
mysql> SELECT * FROM student;
```

You should now have created a database called 'testDB' with a single table 'user', consisting of 2 rows and 3 attributes. 


2. Be aware that this is using the root account and thus we may consider creating new users. Here is some sample command line arguments:

```mysql
mysql> create user ’sujaya’@’localhost’ identified by ’Password0!’;
mysql> grant all on testDB.* to ’sujaya’@’localhost’;
mysql> alter user ’sujaya’@’localhost’ identified with mysql_native_password
by ’Password0!’;
```

This creates a new user with a username 'sujaya' and password 'Password0!'!
