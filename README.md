<h1 align="center">SEA Salon Management System</h1>

![GitHub last commit](https://img.shields.io/github/last-commit/Filbert88/SEA-Salon)

# Description

Introducing SEA Salon, a rising star in the salon industry known for their outstanding services
and excellent reviews. With a rapidly growing clientele and a stellar reputation, SEA Salon is your
premier destination for all your beauty needs. Because of this, SEA Salon has gained a lot of
customers. To handle the new customers, the SEA Salon management team has decided to
develop a new SEA Salon Application.

# Purpose
The purpose of making this project is to create a salon website for submission to the Compfest 2024 Academy and utilizing modern technologies like NextJS to improve my knowledge.

# Features
This salon app enables users to book, add, edit, and delete services, facilitating easy management for the admin across multiple branches. Additionally, admins can manage branch details, add,edit dan delete stylist, and also delete reviews and reservations. When making a booking, users can choose their preferred stylist and select one or more services at the desired branch. After selecting a stylist and time, the app will notify users if the reservation is possible or if there is a scheduling conflict with another client who has booked the same stylist at the same time. User can also view their past reservations in my reservation page.

# Frameworks/Tools Used
- NextJS App Router (Fullstack Framework)
- React (JS Library)
- TailwindCSS (CSS Framework)
- Typescript (Typesafe for JavaScript)
- NextAuth (Authentication)
- Cloudinary (Cloud storage for image)
- Aiven (Database Provider)
- Postgresql (Database)
- Prisma (Object Relational Mapper)
- bcrypt (Hashing Passwords)

# How to Run
To access the app, you can just simply go to:
- [sea-salon-six.vercel.app](https://sea-salon-six.vercel.app/)

To run it locally, you will need to add the following environment variables to your .env file:
```shell
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-nextauth-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-cloudinary-api-key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
```

.env for development of this project: 
```shell
DATABASE_URL="postgres://avnadmin:AVNS_0DBr8NDQWJIIE_Y7dzm@pg-2ef7d7f5-sea-salon-db.c.aivencloud.com:21548/defaultdb?sslmode=require"
NEXTAUTH_SECRET="seasaloncompfest2024"
CLOUDINARY_CLOUD_NAME=dkrara5uf
CLOUDINARY_API_KEY=734323139493683
CLOUDINARY_API_SECRET=-WhtOSdBvz0rTJLu-aTvlLNJNaI
NEXT_PUBLIC_CLOUDINARY_API_KEY=734323139493683
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dkrara5uf
```

# Installation 
Follow these steps:
1. Clone this repository :

```shell
git clone https://github.com/Filbert88/SEA-Salon.git
```

2. Navigate to the src directory of the program by running the following command in the terminal:

```shell
cd SEA-Salon
```

3. Install the required packages:
```shell
npm install
```

4. Set up your Prisma database:
```shell
npx prisma migrate dev
```
5. Start the development server:
```shell
npm run dev
```
The application should now be running at http://localhost:3000.

# Additonal features
- not-found page
- loading animation