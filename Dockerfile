FROM postgres:13

WORKDIR /app

COPY schema.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD [ "postgres", "-D", "/var/lib/postgresql/data/pgdata" ]
