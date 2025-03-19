# Secure Encryptor

Secure Encryptor is a web-based encryption and decryption tool that allows users to securely encrypt their messages using a secret key and decrypt them when needed. The project is built using **React (frontend)** and **Node.js with Express (backend)**.

## Features

- **Text Encryption**: Encrypts user-inputted text using a secret key.
- **Text Decryption**: Decrypts encrypted text using the correct secret key.
- **Secure Encryption Algorithm**: Uses CryptoJS for AES encryption and decryption.
- **User-friendly Interface**: Simple UI for easy encryption and decryption.

## Technologies Used

### **Frontend:**
- React.js
- Axios
- Tailwind CSS (for styling)

### **Backend:**
- Node.js
- Express.js
- CryptoJS

## Installation & Setup

### **Prerequisites:**
Ensure you have **Node.js** and **npm** installed on your system.

### **Clone the Repository:**
```bash
git clone https://github.com/shreya0x123/secure-encryptor.git
cd secure-encryptor
```

### **Install Dependencies**
#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd ../backend
npm install
```

### **Running the Application**
#### Start Backend Server:
```bash
cd backend
node server.js
```

#### Start Frontend:
```bash
cd frontend
npm start
```

The frontend will be available at **http://localhost:3000** and the backend at **http://localhost:5000**.

## API Endpoints

### **1. Encrypt a message**
```http
POST /encrypt
```
#### **Request Body:**
```json
{
  "text": "Hello World",
  "key": "your-secret-key"
}
```
#### **Response:**
```json
{
  "encrypted": "U2FsdGVkX1+..."
}
```

### **2. Decrypt a message**
```http
POST /decrypt
```
#### **Request Body:**
```json
{
  "ciphertext": "U2FsdGVkX1+...",
  "key": "your-secret-key"
}
```
#### **Response:**
```json
{
  "decrypted": "Hello World"
}
```

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.



