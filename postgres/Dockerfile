FROM postgres:9.6

LABEL maintainer shagunravi.khemka2015@vit.ac.in

EXPOSE 5432


COPY seed.sql /docker-entrypoint-initdb.d/
