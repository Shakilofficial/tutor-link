![TutorLink](https://res.cloudinary.com/dcyupktj6/image/upload/v1741952675/da9xp1p6ocspensgzfb8.png)

# Tutor-Link

Tutor-Link is a comprehensive platform that connects students with qualified tutors, providing a seamless experience for finding, booking, and managing tutoring sessions with ease. and Users can explore available tutors, book personalized sessions, and manage their learning journey. Tutors can create professional profiles, list subjects, schedule availability, and manage bookings. As well as they can read and write blogs. Also created a Profeesional Anylyticals Dashboard Features for All User Roles. 📚✨

## 🚀 Features

- **User Authentication** (Login/Signup, JWT Authentication)
- **Role-Based Access** (Admin, Tutor, Student)
- **Tutor Profile Management**
- **Student-Tutor Matching Algorithm**
- **Booking System** (Schedule and manage sessions)
- **Real-time Email Notifications**
- **Secure Payment Integration (SSL Commerz)**
- **Review & Rating System**
- **Blog System**
- **Admin Dashboard for Managing Users & Reports**

## 🏗️ Tech Stack

### Frontend:

- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/UI**
- **Framer Motion**
- **React Hook Form**
- **Zod Validation**
- **React Query (TanStack Query)**

### Backend:

- **Node.js + Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Cloudinary for Image Uploads**
- **SSLCommerz for Payment Processing**
- **Nodemailer for Email Notifications**

## 📂 Project Structure

### Frontend Structure

```
src/
│── app/
│── assets/
│── components/
│── hooks/
│── layouts/
│── pages/
│── services/
│── providers/
│── contexts/
│── utils/
│── types/
│── constants
│── middlewares
│── hooks
│── lib
```

### Backend Structure

```
├── backend/
│   ├── .vercel/
│   ├── dist/
│   ├── src/
│   │   ├── app/
│   |   ├── builder/
│   │   ├── config/
│   │   ├── db/
│   │   ├── helpers/
│   │   ├── middlewares/
│   │   ├── errors/
│   │   ├── interface/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   ├── scripts/
│   ├── templates/
│   ├── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json
```

## 🛠️ Installation & Setup

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Shakilofficial/tutor-link.git
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the required environment variables:

   ```env
   NODE_ENV=development
   PORT=5000

   # Database Configuration
   DB_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority"

   # Authentication Secrets
   JWT_ACCESS_SECRET="<your_access_secret>"
   JWT_REFRESH_SECRET="<your_refresh_secret>"
   JWT_EXPIRES_IN="7d"
   JWT_REFRESH_EXPIRES_IN="30d"

   # Bcrypt Salt Rounds
   BCRYPT_SALT_ROUNDS=12

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME="<your_cloud_name>"
   CLOUDINARY_API_KEY="<your_api_key>"
   CLOUDINARY_API_SECRET="<your_api_secret>"

   # Payment Gateway Configuration
   STRIPE_SECRET_KEY="<your_stripe_secret_key>"

   # Email Configuration
   SMTP_HOST="smtp.example.com"
   SMTP_PORT=587
   SMTP_USER="your-email@example.com"
   SMTP_PASS="your-email-password"
   SMTP_FROM_EMAIL="noreply@tutorlink.com"
   ```

4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env.local` file and add the required environment variables:
   ```env
   NEXT_PUBLIC_BASE_API=backend_url
   NEXT_PUBLIC_RECAPTCHA_SERVER_KEY=your_recaptcha_server_key
   NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY=your_recaptcha_site_key
   ```
4. Start the frontend application:
   ```sh
   npm run dev
   ```

## 👥 Contributing

🔹 **Fork** the repository.
🔹 **Create a new branch:** `git checkout -b feature-branch`.
🔹 Make your changes and **commit** them: `git commit -m "Add new feature"`.
🔹 **Push** to the branch: `git push origin feature-branch`.
🔹 Open a **Pull Request**.

## 📞 Contact

📧 **Email**: [mrshakilhossain@outlook.com](mailto:mrshakilhossain@outlook.com)

🌐 **Portfolio**: [Visit My Portfolio](https://shakilhossain-sigma.vercel.app)

💼 **LinkedIn**: [Connect on LinkedIn](https://www.linkedin.com/in/md-shakilhossain)

📘 **Facebook**: [Facebook Profile](https://www.facebook.com/iamshakilhossain)

💖 _Don't forget to ⭐ this repo if you found it helpful!_

## 📝 License

Released under the **MIT License** © 2025 [Md Shakil Hossain](https://github.com/shakilofficial).
