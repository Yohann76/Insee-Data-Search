# how to use this template ?

Clone this project:

    git clone https://github.com/Yohann76/Insee-Data-Search

Run a npm server for vue

    npm run serve

go python api

    cd api

run flask api server

    flask run


flask is used for API branching, while vue.js is useful for separate front-end.

# How to use postgres SQL database ?

Change database variable in config.py ( SQLALCHEMY_DATABASE_URI )

initialize database :

    python api/manage.py db init

make migration :

    python api/manage.py db migrate

update modifications:

    python api/manage.py db upgrade

Use docker compose :

    $ docker-compose up -d --build
    $ docker-compose up -d
