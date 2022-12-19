# Post application

A little, yet incomplete, application to create, list and delete posts.

## Main stack:

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [nodejs](https://nodejs.org/en/)
- [next.js](https://nextjs.org/)
- [typescript](https://www.typescriptlang.org/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [prisma](https://www.prisma.io/)
- [postgresql](https://www.postgresql.org/)

## How to run

### Prerequisites

- A relational database (by default can be [postgresql](https://www.postgresql.org/), but it can work with mysql or sqlite too changing the default provider on the schema.prisma file)
- [nodejs](https://nodejs.org/en/)

### Steps

- Clone the repository and install the dependencies

```bash
git clone https://github.com/FranciscoJBL/post-application.git
cd post-application
npm install
```

- Create a `.env` file in the root of the project, you can find a nonworking example in `.env.example`

```bash
cp .env.example .env
```
- Edit the `.env` file with your database credentials and, if you wish, replace the jwt secret
with your own.

- push the main database schema

```bash
npx prisma bd push
```

<b>Note</b>: at this point, you can run the default prisma maintainer to see the database schema and add/modify the data in it with the following command:
```bash
npx prisma studio
```

- Run the application, as this is a non production package I recommend only using the development mode

```bash
npm run dev
```

## How to use

- The aplication has a login page, where you can login with an existing account or create a new one. For testing purposes, if you try to log in with a non existing account, it will create a new one with the credentials you provided.

- Once logged in, you can see the list of posts, apply filters and create new ones.
- If you check the post details clicking in one of the posts, you can see the details of the post and delete it.


