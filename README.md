# tutor-link

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies
3. Create a `.env` file in the root directory and add the following variables:

```
NODE_ENV=development
PORT=3000
DB_URL=mongodb://localhost:27017/tutor-link
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_SECRET=your-access-secret
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=1h
JWT_OTP_SECRET=your-otp-secret
JWT_PASS_RESET_SECRET=your-pass-reset-secret
JWT_PASS_RESET_EXPIRES_IN=1h
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
SENDER_EMAIL=your-sender-email
SENDER_APP_PASS=your-sender-app-password
```

4. Run the following command to start the server:

```bash
npm run dev
```
