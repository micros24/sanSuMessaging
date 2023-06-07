# sanSuMessaging

A simple messaging app using Apollo Server, GraphQL, React, Vite, and mariadb.
This project was created on a linux desktop running Arch Linux 6.3.6
This application was developed using MariaDB cli
Install MariaDB depending on your operating system

Initializing MariaDB

```
mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

# How to Use

Please replace all _italicized_ to your liking and make sure it is consistent with your previous entries.

Start MariaDB service

> sudo systemctl start service mariadb.service

Enter mariaMariaDB as admin

> mariadb

Create a user at 'localhost'

> MariaDB> CREATE USER '_USER_'@'localhost' IDENTIFIED BY '_PASSWORD_';

Grant all privileges to all databases to USER

> MariaDB> GRANT ALL PRIVILEGES ON mydb.\* TO '_USER_'@'localhost';

Initialize database

> sequelize db:migrate

Start node server

> npm start

Open your browser and navigate to localhost:5173
