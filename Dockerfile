FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
apt-get install -y mysql-server

ENV MYSQL_DATABASE=soccer_db
ENV MYSQL_USER=andre
ENV MYSQL_PASSWORD=root
ENV MYSQL_ROOT_PASSWORD=root_password

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql
EXPOSE 3306

CMD ["mysqld"]
