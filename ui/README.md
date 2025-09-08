# Domain Information Lookup Application

A full-stack web application for looking up domain information and contact details using React frontend and Node.js backend.

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Domain Lookup Form**: Input field for domain names with validation
- **Information Type Selection**: Choose between domain info, contact info, or both
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **Real-time Results**: Dynamic tables displaying domain and contact information
- **Loading States**: User feedback during API calls

### Backend (Node.js + Express)
- **RESTful API**: GET endpoint for domain information lookup
- **WHOIS Integration**: Connects to external WHOIS API services
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error handling and validation

## 🏗️ Project Structure

```
ttt/
├── server/                 # Backend Node.js server
│   ├── server.js          # Main server file
│   ├── package.json       # Server dependencies
│   └── .env              # Environment variables
└── ui/                    # Frontend React application
    ├── src/
    │   ├── components/
    │   │   └── Domain.js  # Main domain lookup component
    │   ├── App.js         # Main application component
    │   └── index.js       # Application entry point
    ├── package.json       # Frontend dependencies
    └── tailwind.config.js # Tailwind CSS configuration
```

## 🛠️ Technologies Used

### Frontend
- **React 19.1.1** - Modern React with hooks
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.21** - CSS vendor prefixing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Domain Information Displayed

### Domain Information
- Domain name
- Registrar details
- Creation and expiration dates
- Domain status
- Name servers
- DNS records (A, MX, CNAME)

### Contact Information
- **Registrant Contact**: Name, organization, email, phone, address
- **Administrative Contact**: Name, organization, email, phone
- **Technical Contact**: Name, organization, email, phone

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API keys:
   ```env
   WHOIS_API_KEY=your_whois_api_key_here
   PORT=3001
   ```

4. Start the server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Frontend Setup
1. Navigate to the ui directory:
   ```bash
   cd ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔌 API Endpoints

### GET /getDomainInfo
Retrieves domain information based on the provided parameters.

**Query Parameters:**
- `name` (required): Domain name to lookup (e.g., "example.com")
- `type` (required): Type of information to retrieve
  - `domain`: Domain information only
  - `contact`: Contact information only
  - `both`: Both domain and contact information

**Example Request:**
```
GET /getDomainInfo?name=google.com&type=both
```

**Response Format:**
```json
{
  "domainInfo": {
    "domain": "google.com",
    "registrar": "MarkMonitor Inc.",
    "creationDate": "1997-09-15",
    "expirationDate": "2028-09-14",
    "status": "Active",
    "nameServers": ["ns1.google.com", "ns2.google.com"],
    "dnsRecords": [
      { "type": "A", "value": "142.250.190.78" }
    ]
  },
  "contactInfo": {
    "registrant": { ... },
    "admin": { ... },
    "technical": { ... }
  }
}
```

## 🎨 UI Components

### Domain Component
The main component (`src/components/Domain.js`) provides:
- Input form with domain name and information type selection
- Submit button with loading states
- Responsive tables for displaying results
- Error handling and user feedback

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configuration in `tailwind.config.js`. The CSS directives are imported in `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Environment Variables
Create a `.env` file in the server directory with:
- `WHOIS_API_KEY`: Your WHOIS API service key
- `PORT`: Server port (default: 3001)

## 🚀 Deployment

### Build for Production
1. Build the frontend:
   ```bash
   cd ui
   npm run build
   ```

2. Start the production server:
   ```bash
   cd server
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues
- **CORS Errors**: Ensure the backend CORS configuration allows your frontend origin
- **API Key Issues**: Verify your WHOIS API key is valid and has sufficient credits
- **Port Conflicts**: Check that ports 3000 (frontend) and 3001 (backend) are available

### Getting Help
- Check the console for error messages
- Verify API endpoints are accessible
- Ensure all dependencies are installed correctly
