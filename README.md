# sanSuMessaging

A simple messaging app using Apollo Server, GraphQL, React, Vite, and mariadb.

This project was created on a linux desktop running Arch Linux.

This application was developed using MariaDB cli.

# How to Use

Please replace all _italicized_ to your preference and make sure it is consistent throughout the project.

Install MariaDB depending on your operating system

## Setup your config.json

A sample is inside the config folder. Cater it to what you will configure in the next section.

For the dialect field inside the sample json, you can configure it to 'mariadb' or 'mysql'. mariadb is used in the development of this project.

## Initializing the database

Initialize MariaDB

```
mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

Start MariaDB service

```
sudo systemctl start service mariadb.service
```

Enter mariaMariaDB as admin

```
sudo mariadb
```

Create a database named sanSuDB

```
MariaDB [(none)]> CREATE DATABASE sanSuDB;
```

Create a user at 'localhost'

```
MariaDB [(none)]> CREATE USER '_USER_'@'localhost' IDENTIFIED BY '_PASSWORD_';
```

Grant all privileges to all databases to _USER_

```
MariaDB [(none)]> GRANT ALL PRIVILEGES ON mydb.\* TO '_USER_'@'localhost';
```

Initialize database

```
sequelize db:migrate
```

Start node server

```
npm start
```

Open your browser and navigate to localhost:5173
