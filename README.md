# Idea BP Backend

A robust backend API built with NestJS, TypeScript, and Sequelize ORM for the Idea BP application.

## 🚀 Features

- **NestJS Framework** - Modern, scalable Node.js framework
- **TypeScript** - Full TypeScript support with strong typing
- **Sequelize ORM** - Database abstraction with support for MySQL/PostgreSQL
- **JWT Authentication** - Secure authentication and authorization
- **API Documentation** - Auto-generated Swagger/OpenAPI documentation
- **Validation** - Request validation using class-validator
- **Error Handling** - Global exception filters and proper error responses
- **Logging** - Comprehensive logging with request/response tracking
- **Rate Limiting** - Built-in throttling for API protection
- **Database Migrations** - Sequelize CLI for database schema management
- **Security** - Helmet.js for security headers and CORS support
- **Testing** - Jest testing framework setup

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL or PostgreSQL database
- Git

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd idea_bp_backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your database credentials and other configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=idea_bp_db
   DB_DIALECT=mysql
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRATION=24h
   ```

4. **Create database:**
   ```bash
   # For MySQL
   mysql -u root -p
   CREATE DATABASE idea_bp_db;
   
   # For PostgreSQL
   psql -U postgres
   CREATE DATABASE idea_bp_db;
   ```

5. **Run database migrations:**
   ```bash
   npm run migration:run
   ```

6. **Seed the database (optional):**
   ```bash
   npm run seed:run
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The application will start on `http://localhost:3000`

## 📚 API Documentation

Once the application is running, you can access the Swagger API documentation at:
- **Local Development:** `http://localhost:3000/api/docs`

## 🗄️ Database Management

### Generate Migration
```bash
npm run migration:generate -- --name create-users-table
```

### Run Migrations
```bash
npm run migration:run
```

### Revert Migration
```bash
npm run migration:revert
```

### Generate Seed
```bash
npx sequelize-cli seed:generate --name demo-users
```

### Run Seeds
```bash
npm run seed:run
```

## 🧪 Testing

### Run Unit Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

### Watch Mode
```bash
npm run test:watch
```

## 📁 Project Structure

```
src/
├── common/                 # Shared utilities and common code
│   ├── decorators/         # Custom decorators
│   ├── dto/               # Common DTOs
│   ├── filters/           # Exception filters
│   ├── interceptors/      # Request/response interceptors
│   ├── middleware/        # Custom middleware
│   └── pipes/             # Custom pipes
├── config/                # Configuration files
├── database/              # Database related files
│   ├── config.js         # Sequelize CLI configuration
│   ├── migrations/       # Database migrations
│   ├── models/           # Database models
│   └── seeders/          # Database seeders
├── modules/              # Feature modules
│   ├── auth/             # Authentication module
│   ├── users/            # Users module
│   └── ...               # Other feature modules
├── app.controller.ts     # Main app controller
├── app.module.ts         # Main app module
├── app.service.ts        # Main app service
└── main.ts              # Application entry point
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🛡️ Security Features

- **Helmet.js** - Sets various HTTP headers
- **CORS** - Cross-origin resource sharing configuration
- **Rate Limiting** - Prevents brute force attacks
- **Input Validation** - Validates all incoming data
- **Password Hashing** - Uses bcrypt for password security
- **JWT Tokens** - Secure token-based authentication

## 📊 Monitoring and Logging

- Request/response logging with duration tracking
- Error logging with stack traces
- Health check endpoints
- Memory usage monitoring

## 🔧 Configuration

The application uses environment variables for configuration. Key settings include:

- **PORT** - Application port (default: 3000)
- **NODE_ENV** - Environment (development/production/test)
- **Database settings** - Host, port, credentials, dialect
- **JWT settings** - Secret key and expiration
- **CORS settings** - Allowed origins
- **Rate limiting** - TTL and request limits

## 🚀 Deployment

### Docker Deployment
```bash
# Build Docker image
docker build -t idea-bp-backend .

# Run container
docker run -p 3000:3000 --env-file .env idea-bp-backend
```

### PM2 Deployment
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start dist/main.js --name "idea-bp-backend"

# Monitor
pm2 monit
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Guidelines

- Follow TypeScript best practices
- Write unit tests for new features
- Use proper error handling
- Follow the established folder structure
- Document your API endpoints
- Use meaningful commit messages

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check database credentials in `.env`
   - Ensure database server is running
   - Verify database exists

2. **Module Not Found Errors**
   - Run `npm install` to install dependencies
   - Clear node_modules and reinstall if needed

3. **Migration Errors**
   - Check database connection
   - Ensure migration files are properly formatted
   - Verify Sequelize CLI configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

Built with ❤️ using NestJS and TypeScript