# how to use this template ?

Clone this project:

    git clone https://github.com/Yohann76/Insee-Data-Search

Run node server use yarn for vue.js parts

    $ cd webapp
    $ yarn install 
    $ yarn serve

available in : http://localhost:8081/

In /api for flask api server

    $ cd api
    $ flask run
 
available in : http://127.0.0.1:5000/greeting ( example )


flask is used for API request, while vue.js is useful for separate front-end.

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
