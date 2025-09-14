# PharmaLink Frontend

**PharmaLink** is a modern web platform for connecting pharmacies and people. This is the frontend for PharmaLink, built with React and designed for seamless integration with the [PharmaLink Backend](https://github.com/ndjek1/Group_BSE25-7_PharmaLink_Backend).

## 🚀 Features

- **Pharmacy Network**: Browse, search, and connect with pharmacies.
- **Medicine Management**: View available medicines, real-time stock, and details.
- **Orders **: Place orders
- **User Dashboard**: Personalized dashboard for pharmacies and customers.
- **Secure Authentication**: Registration, login, protected routes.
- **Responsive Design**: Elegant UI for all devices.
- **Backend Integration**: All data is served and updated via the PharmaLink backend API.

## 🖥️ Tech Stack

- **Frontend**: React, CSS Modules
- **Backend**: Node.js (Express), Postgresql  
  [Backend repo link](https://github.com/ndjek1/Group_BSE25-7_PharmaLink_Backend)
- **API**: RESTful endpoints
- **Authentication**: JWT (handled by backend)
- **Icons**: [Icons8 Pharmacy](https://icons8.com/icons/set/pharmacy)

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Cyiza-Ndoli-DEV/Group_BSE25-7_PharmaLink_Frontend.git
cd Group_BSE25-7_PharmaLink_Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Connect to Backend

Update the backend API URL in `src/services/apiService.js` or your `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```
> Make sure the backend is running on the same machine or update the URL to your backend server.

### 4. Run Frontend

```bash
npm start
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Backend (for full functionality)

Clone and run:  
[PharmaLink Backend](https://github.com/ndjek1/Group_BSE25-7_PharmaLink_Backend)

```bash
git clone https://github.com/ndjek1/Group_BSE25-7_PharmaLink_Backend.git
cd Group_BSE25-7_PharmaLink_Backend
npm install
npm start
```

## 📦 Project Structure

```
src/
  components/        # Reusable components (Navbar, Footer, etc.)
  pages/             # All page views (Home, Pharmacies, Orders, etc.)
  styles/            # CSS files
  services/          # API service for backend communication
  App.jsx            # Main app layout and routes
  index.js           # Entry point
```

## 🔗 API Connection

- All data (pharmacies, medicines, orders, etc.) is fetched from the backend using REST API calls.
- Authentication uses JWT tokens stored in localStorage.
- The backend must be running and accessible for the frontend to operate fully.

## 💡 Future Features

- Chat between customers and pharmacies.
- Notifications for order status.
- Admin analytics dashboard.
- Pharmacy registration & verification.

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

---

**PharmaLink** – Connecting pharmacies and people, smarter.
