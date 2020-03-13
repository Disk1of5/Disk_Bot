# **How to Use**

create a root file called credentials.env

#Twitch Username

TWITCH_NAME=

#Twitch OAUTH password

TWITCH_PASSWORD=

#Comma separated for multiple channels

TWITCH_CHANNELS=   

#keep all owners lowercase, Comma seprated for Multiple owners

TWITCH_OWNERS

DB_HOST=localhost

DB_USERNAME=root

#mariadb db password, this value is also auto picked-up by nodeJS

MYSQL_ROOT_PASSWORD=

#database schema defined in disk_bot.sql

DB_DATABASE=disk_bot
#
## **Starting up the services**

from the project root startup the docker compose:

docker-compose up -d

**stopping the docker container**
docker-compose down
