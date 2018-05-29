# HappyFood

HappyFood is a website which allows you browse food recipes.
It is also an API you can use to build your project with our ressources.

Website: https://happyfoodvincentelmar.herokuapp.com/
APi link: https://happyfoodvincentelmar.herokuapp.com/api/


# Table of Contents
1. [Use the API](#use-the-api)
2. [Local Use](#local-use)  
A. [Install project](#install-project)  
B. [Launch project](#launch-project)
3. [Built With](#built-with)
4. [Authors](#authors)

# Use the API

## The routes

You are allowed to make 150 requests every 15 minutes. We set this limit to ensure server stability for all the users of our API.

All routes are accessible by **GET**

+ */searchRecipes/recipeName={**$recipe**}&diets={**$filter**}&health={**$filter**}* 
+ */searchWithIngredients/ingredients={**$ingredients**}*
+ */getRandomRecipe*


# Local Use

## Install project

Install all packages with

```
$ yarn install
```

Or

```
$ npm install
```

Now, we have to create the database in MongoDb (install Mongo on your machine).

Open Mongo's shell with

```
$ mongo
```

Then create new database happyfood
```
> use happyfood
```

After that you can quit it with ```exit```

## Launch project


First, start your mongo database. Find your where is installed MongoDB on your device and run mongod.exe.


Example on Windows:
```
cd C:\Program Files\MongoDB\Server\3.6\bin
$ mongod
```


Launch the project with 
```
$ yarn start
```

then go to http://localhost:3001


# Built With

* [ParcelJs](https://parceljs.org/) - Task manager
* [NodeJs](https://nodejs.org/en/) - Server
* [ExpressJs](http://expressjs.com/) - Used to manage request server
* [ReactJs](https://reactjs.org/) - Render front page
* [Redux](https://redux.js.org/) - Used to manage react global state
* [React-router](https://github.com/ReactTraining/react-router) - Manage route front
* [MongoDB](https://www.mongodb.com/) - Database

# Authors


* **Vincent Deplais** - [RoxBow](https://github.com/RoxBow)
* **Elmar Furtado Tavares** - [Elmarino](https://github.com/Elmarino)

