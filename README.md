# sanSuMessaging

A simple messaging app using Apollo Server, GraphQL, React, Vite, and mariadb.

This project was created on a linux desktop running Arch Linux.

This application was developed using MariaDB cli.

# How to Use

Please replace all _italicized_ to your preference and make sure it is consistent throughout the project.

Install MariaDB depending on your operating system

### Setup config files in config folder

- Samples are inside the config folder. Cater it to what you will configure in the next section.
- For the dialect field inside the sample-config.json, you can configure it to 'mariadb' or 'mysql'. mariadb is used in the development of this project.
- The value of JWT_TOKEN inside sample-env.json is a type of string that you can set to whatever.
- Rename the files 'sample-config.json' to 'config.json'. and 'sample-env.json' to 'env.json'.

### Initializing the database

Initialize MariaDB

> sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql

Start MariaDB service

> sudo systemctl start service mariadb.service

Enter mariaMariaDB as admin

> sudo mariadb

Create a database named sanSuDB

> MariaDB [(none)]> CREATE DATABASE sanSuDB;

Create a user at 'localhost'

> MariaDB [(none)]> CREATE USER '_USER_'@'localhost' IDENTIFIED BY '_PASSWORD_';

Grant all privileges to sanSuDB database to _USER_

> MariaDB [(none)]> GRANT ALL PRIVILEGES ON sanSuDB.\* TO '_USER_'@'localhost';

Initialize database

> npx sequelize-cli db:migrate

Start node server

> npm start

Open your browser and navigate to localhost:5173
