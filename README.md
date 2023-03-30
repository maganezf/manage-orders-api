<div align="center">

## Manage Orders (Server)

<sub>Built with ❤︎ by <a href="https://github.com/maganezf">Maganez
Filho</a></sub>

</div>

## :pushpin: Table of Contents

- [Technologies](#computer-technologies)
- [Purpose and Features](#dart-purpose-and-features)
- [Project description](#shipit-project-description)
- [Requirements description](#shipit-requirements-description)
- [Project Diagram](#shipit-project-diagram)
- [Api Routes](#shipit-api-routes)
- [Setup before run](#construction_worker-setup-before-run)
- [How to Run](#construction_worker-how-to-run)
- [Found a bug? Missing a specific feature?](#bug-issues)
- [Contributing](#tada-contributing)
- [License](#closed_book-license)

## :computer: Technologies

This project was made using the follow technologies:

- [Nest.js](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Yarn](https://yarnpkg.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Editorconfig](https://editorconfig.org/)

### :dart: Purpose and Features

- An API project made with Nest.js (Node.js), Typescript, and PostgreSQL for
  studies purpose;
- It has the objective of helping the order management of a restaurant;
- Authentication;
- Validation;
- Database integration;

### :shipit: Project description

An order management api for restaurants.

In the api, the orders will be registered and within an order there will be
products, and each product is related to a category.

The objective is to facilitate the work and organization of the entire flow of a
restaurant with its customers.

### :shipit: Requirements description

- user will be able to login to the platform;

---

- user can create a waiter;
- user can list the waiters;
- user can list 1 waiter;
- user can edit 1 waiter;
- user can remove 1 waiter;

---

- user can create an order;
- user can list the orders;
- user can list 1 order;
- user can edit 1 order;
- user can remove 1 order;

---

- the user can create a product;
- the user can list the products;
- user can list 1 product;
- user can edit 1 product;
- user can remove 1 product;

---

- user can create a category;
- user can list the categories;
- user can list 1 category;
- user can edit 1 category;
- user can remove 1 category;

### :shipit: Project Diagram

![Manage Orders Diagram](./.github/Manage%20Orders%20API.drawio.png)

### :shipit: Api Routes

| Method | Route                                                  | Has params or body?          | Description                                                  |
| :----- | :----------------------------------------------------- | :--------------------------- | :----------------------------------------------------------- |
| POST   | /api/(orders, waiters, products, or categories)/create | HAS BODY                     | create a new (order, waiter, product or category)            |
| GET    | /api/(orders, waiters, products, or categories)        | NO                           | get all (orders, waiters, products , or categories)          |
| GET    | /api/(orders, waiters, products, or categories)/:id    | HAS PARAM (id: string)       | get a specific (order, waiter, product or category) by id    |
| PATCH  | /api/(orders, waiters, products, or categories)?id=:id | HAS QUERY PARAM (id: string) | update a specific (order, waiter, product or category) by id |
| DELETE | /api/(orders, waiters, products, or categories)/:id    | HAS PARAM (id: string )      | remove a specific (user, waiter, product or category) by id  |

## :construction_worker: Setup before run

```bash
1. Make sure you have docker installed;
2. Install docker postgres image;
    (command: docker pull postgres)
3. Set up your environment variables ('.env' file) based on the '.env.example' file
4. Run your database (passing the password database)
    (command: docker run --name postgres -e POSTGRES_PASSWORD=yoursecretpassword -p 5432:5432 -d postgres);
5. Now you can run your server application
```

## :construction_worker: How to Run

```bash
# Clone Repository and change directory to project
$ git clone https://github.com/maganezf/manage-orders-api.git && cd manage-orders-api
```

```bash
# Install Dependencies
$ npm install or yarn install

# Run in development mode
$ npm run start or yarn start

# Run in development watch mode
$ npm run start:dev or yarn start:dev

# Run in production mode
$ npm run start:prod or yarn start:prod
```

Go to <http://localhost:3333/api> to see the result.

## :bug: Issues

Feel free to **file a new issue** with a respective title and description on
this repository. If you already found a solution to your problem, **I would love
to review your pull request**!

## :tada: Contributing

First of all, thank you for being interested in helping out, your time is always
appreciated in every way. 💯

Here's some tips:

- Check the [issues page](https://github.com/maganezf/manage-orders-api/issues)
  for already opened issues (or maybe even closed ones) that might already
  address your question/bug/feature request.
- Feature requests are welcomed! Provide some details on why it would be helpful
  for you and others, explain how you're using bull-board and if possible even
  some screenshots if you are willing to mock something!

## :closed_book: License

Released in 2022.

Made with ❤︎ by [Maganez Filho](https://github.com/maganezf) 🚀.

Give a ⭐ if this project helped you!
