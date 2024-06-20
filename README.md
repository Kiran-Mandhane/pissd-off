# CS-348-Course-Project

To create a sample database, please ensure that **MySQL** is installed before continuining with the following steps. Installing can be found at the [installation page](https://dev.mysql.com/doc/refman/8.0/en/installing.html).

## Create and Load sample database

1. Make a new database by following the instructions provided below:

```mysql
$ mysql -u root -p (or sudo mysql -u root)
mysql> CREATE DATABASE pissd;
mysql> USE pissd;
```

2. Create Tables and populate with sample Washroom data

```mysql
mysql> source /sql-files/CreateTables.sql
mysql> source /sql-files/PopulateWashroomData.sql
```

## Running application

1. Run `yarn install`
2. Run `yarn add expo` if no .expo folder is added
    - additional dependencies may need to be added
3. Run `yarn start` 
    - note it will not work when connected to the school wifi
4. scan the QR code with the `Expo Go` app on your phone

## Currently supported features 

1. User submits a rating for the bathroom
2. Get bathroom locations and data for users to view