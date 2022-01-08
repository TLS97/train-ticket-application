# Norwegian Rails Ticketing System (Prototype)

## Dependencies
* MongoDB (not included in the package.json, needs to be installed manually)
* Express
* Mongoose
* Method-override
* Moment JS
* EJS-mate

### How to install dependencies
All dependencies except for MongoDB is stored in the package.json file and can be installed by entering:

```
npm install
```

### Installing MongoDB
Here is a good resource for
[installing MongoDB on your machine](https://zarkom.net/blogs/how-to-install-mongodb-for-development-in-windows-3328).

## How to test the website

The project can be run by entering:

```
npm start
```

In order for the routes to be added to the database, you need to visit [http://localhost:3000/seed](http://localhost:3000/seed). This will seed the database with three routes in each direction every day for 30 days forward.

Now you can test the website by going to [http://localhost:3000](http://localhost:3000).

## Features
* Register a user
* Login (simple, no authentication is implemented!)
* See all your tickets
* Purchase a new ticket
* Cancel the ticket
* Show the ticket for validation (not optimal, only customer ID)