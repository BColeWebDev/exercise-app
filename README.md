# Exercise App

Exercise App is a Full Stack Application that allows users view specific exercises and create workout plans. Final Project for FullSail University

# Features:

- User Authentication
- CRUD functionality (Workouts)
- RESTful API Design
- 3RD party API integration(Getting all workouts)
- Client Routing
- Product Landing Page

## Tech Stack

**Frontend Technologies**

<div style="display; flex; margin-bottom:40px;">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">

<img title="Javascript" height="50" src="https://res.cloudinary.com/dkevcmz3i/image/upload/v1620506336/Personal/Github%20front%20readme/javascript-original_ks2qvl.svg">

<img title="React" height="50" src="https://res.cloudinary.com/dkevcmz3i/image/upload/v1620506338/Personal/Github%20front%20readme/react-original_vzqgdf.svg">

<img title="SASS" height="50" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg">

<img title="NextJS" height="50" src="https://miro.medium.com/max/1400/1*W-ZrkK0_DziOftGvtpBaMQ.jpeg">
</div>
<img title="NextJS" height="20" src="https://upload.wikimedia.org/wikipedia/commons/3/30/Redux_Logo.png">
</div>

**Backend Technologies**

<div style="display; flex margin-bottom:40px;">

<img title="ExpressJS" height="30" src="https://res.cloudinary.com/dkevcmz3i/image/upload/b_rgb:ffffff/v1620506334/Personal/Github%20front%20readme/expressjs_dblcrv.png">

<img title="NodeJS" height="30" src="https://res.cloudinary.com/dkevcmz3i/image/upload/v1620506337/Personal/Github%20front%20readme/node_wgb8i4.png">

<img title="MySQL" height="50" src="https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/MySQL_logo.svg/2560px-MySQL_logo.svg.png">
</div>

**Other Technologies / Tools**

<div style="display; flex margin-bottom:40px;">

<img title="ExpressJS" height="30" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Heroku_logo.svg/2880px-Heroku_logo.svg.png">

<img title="Postman" height="30" src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Postman_%28software%29.png">


<img title="DB Diagram" height="30" src="https://blog.dbdiagram.io/content/images/size/w1000/2020/04/dbdiagram_logo_text_720.png">
</div>

## Endpoint Table

### Client 💻

| Verb | Endpoint              | Result                                 |
| ---- | --------------------- | -------------------------------------- |
| GET  | /                     | Landing Page |
| GET  | /dashboard            | Dashboard Page                 |
| GET  | /dashboard/exercises  | Exercises Page                         |
| GET  | /dashboard/regiments  | Regiments Page                         |
| GET  | /login                | Login Page                             |
| GET  | /signup               | Signup Page                            |

### Server <img height="20" src="https://pic.onlinewebfonts.com/svg/img_569193.png"></img>

| Verb   | Endpoint                    | Result                |
| ------ | --------------------------- | --------------------- |
| POST   | /api/v1/users/login         | Login User            |
| POST   | /api/v1/users/register      | Create User           |
| POST   | /api/v1/users/authO         | Google Login          |
| GET    | /api/v1/regiments           | Get all regiments     |
| POST   | /api/v1/regiments           | Create regiment       |
| PUT    | /api/v1/regiments/:id       | Update regiment       |
| DELETE | /api/v1/regiments/:id       | Delete regiment       |
| GET    | /api/v1/day                 | Get all training days |
| POST   | /api/v1/day                 | Create a training day |
| PUT    | /api/v1/day/:id             | Update a training day |
| DELETE | /api/v1/day/:id             | Delete a training day |
| GET    | /api/v1/exercises/plans     | Get all exercises     |
| POST   | /api/v1/exercises/plans     | Create a exercises    |
| PUT    | /api/v1/exercises/plans/:id | Update a exercises    |
| DELETE | /api/v1/exercises/plans/:id | Delete a exercises    |

## 1- Download

```sh
git clone https://github.com/ePortfolios/wdd-2203-ColeBrian-FS.git

cd wdd-2203-ColeBrian-FS

place .env file with all environments variables required at root folder
```

## 2- Usage with CLI
```sh
npm run client // runs nextjs application only
npm run server // runs nodejs server only
npm run tests // runs cypress for client and server only
npm run dev // runs both client and server application
```

## Author

👤 **Brian Cole**
