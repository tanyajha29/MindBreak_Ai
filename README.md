# MindBreak_Ai

An intelligent productivity and task management application powered by AI. MindBreak_Ai combines modern web technologies with AI-driven insights to help users manage their tasks, track productivity, and optimize their workflow.

## Features

- 🤖 **AI-Powered Analysis** - Leverages Ollama for intelligent task analysis and insights
- 📊 **Productivity Dashboard** - Real-time analytics and productivity tracking
- ✅ **Task Management** - Create, manage, and organize tasks with AI-assisted prioritization
- 📈 **Insights & Analytics** - Detailed productivity reports and behavioral insights
- 🔐 **Secure Authentication** - JWT-based user authentication
- 🎯 **Focus Mode** - AI-recommended daily focus areas
- 📱 **Responsive UI** - Modern, mobile-friendly interface with TailwindCSS

## Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS with PostCSS
- **HTTP Client:** Axios
- **Routing:** React Router

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Database configuration included
- **AI Engine:** Ollama integration for local AI processing
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker & Docker Compose

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker & Docker Compose
- Ollama (for AI features)

## Installation

### Clone the repository
```bash
git clone <repository-url>
cd MindBreak_Ai
```

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Running the Application

### Option 1: Docker Compose (Recommended)
```bash
cd Docker
docker compose up
```

This will start:
- Backend server
- Frontend development server
- All required services

### Option 2: Manual Setup

#### Start Backend
```bash
cd backend
npm start
```
Server runs on `http://localhost:5000` (or configured port)

#### Start Frontend
```bash
cd frontend
npm start
```
Frontend runs on `http://localhost:5173` (Vite default)

## Project Structure

```
MindBreak_Ai/
├── backend/                    # Express.js backend server
│   ├── src/
│   │   ├── app.js             # Express app configuration
│   │   ├── server.js          # Server entry point
│   │   ├── ai/                # AI engine and Ollama integration
│   │   │   ├── aiEngine.js
│   │   │   ├── modeDetector.js
│   │   │   ├── ollamaClient.js
│   │   │   └── prompts.js
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route controllers
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic services
│   │   ├── middleware/        # Custom middleware
│   │   ├── utils/             # Utility functions
│   │   └── db/                # Database initialization
│   └── package.json
├── frontend/                  # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── api/               # API integration
│   │   ├── app/               # Routing configuration
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable UI components
│   │   │   ├── dashboard/     # Dashboard components
│   │   │   └── layout/        # Layout components
│   │   └── assets/            # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
├── Docker/                    # Docker configuration
│   ├── docker-compose.yml
│   ├── backend.dockerfile
│   └── frontend.Dockerfile
└── README.md
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Task Routes
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### AI Routes
- `POST /api/ai/analyze` - Analyze with AI
- `GET /api/ai/suggestions` - Get AI suggestions
- `POST /api/ai/detect-mode` - Detect productivity mode

### Insights Routes
- `GET /api/insights` - Get productivity insights
- `GET /api/insights/reports` - Generate reports

## Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
OLLAMA_BASE_URL=http://localhost:11434
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

### Build Frontend
```bash
cd frontend
npm run build
```

### Build Backend
```bash
cd backend
npm run build
```

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build for production

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Docker Commands

```bash
# Build images
docker compose build

# Start services
docker compose up

# Start in background
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f
```

## Features in Detail

### AI Engine
The application uses Ollama to provide local AI processing for:
- Task analysis and categorization
- Productivity pattern detection
- Personalized recommendations
- Smart insights generation

### Authentication
Secure JWT-based authentication system with:
- User registration and login
- Token-based session management
- Protected API routes

### Dashboard
Real-time dashboard displaying:
- Task statistics
- Productivity metrics
- AI-generated insights
- Daily focus recommendations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@mindbreak-ai.com or open an issue on the repository.

## Acknowledgments

- Ollama for local AI capabilities
- React and TypeScript communities
- Express.js framework
- TailwindCSS for styling utilities
