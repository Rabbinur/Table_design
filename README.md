
Live Link: https://tshirt-logo-setup.netlify.app/
#npm i 
#npm run dev


T-Shirt Logo Designer
A dynamic and interactive T-shirt logo designer web application that allows users to upload, resize, and position a logo on a T-shirt. The final T-shirt design can be downloaded as an image.

Live Demo
🌐 Live Link: T-Shirt Logo Designer

🚀 Features
Upload any logo/image to overlay on a T-shirt.
Drag and drop the logo to position it anywhere on the T-shirt.
Resize the logo using a range slider.
Download the final T-shirt design as a high-quality PNG image.
🛠️ Technologies Used
Frontend Framework: React.js
Drag-and-Drop Library: React Draggable
Styling: Tailwind CSS
Deployment: Netlify
📂 Project Setup
Prerequisites
Make sure you have the following installed:

Node.js (v14+ recommended)
npm or yarn
Installation Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/tshirt-logo-designer.git
cd tshirt-logo-designer
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Open the application in your browser at:

arduino
Copy code
http://localhost:5173
📸 How to Use
Upload a Logo:

Click the "Upload Logo" button to select an image from your device.
Position the Logo:

Drag the logo to your desired location on the T-shirt preview.
Resize the Logo:

Use the resize slider to adjust the logo's size.
Download the Design:

Click the "Generate T-Shirt with Logo" button to download the final design.
📂 Project Structure
bash
Copy code
src/
├── assets/         # Static assets like images (e.g., T-shirt image)
├── components/     # Reusable React components
│   └── TShirtDesigner.jsx # Main T-shirt designer component
├── App.jsx         # Application entry point
├── main.jsx        # React DOM rendering
├── styles.css      # Tailwind CSS configuration
✨ Features in Detail
T-Shirt Preview
A responsive preview of the T-shirt that displays the uploaded logo in real time.

Draggable Logo
The logo can be dragged and repositioned anywhere within the T-shirt preview using the React Draggable library.

Resizable Logo
Adjust the size of the logo dynamically using a range slider for finer control.

High-Quality Download
Generate a high-resolution PNG image of the T-shirt with the positioned and resized logo.

🚀 Deployment
This project is deployed on Netlify. Follow these steps for deployment:

Push the repository to GitHub.
Log in to Netlify and connect your repository.
Configure the build command as:
bash
Copy code
npm run build
Set the publish directory to:
Copy code
dist
Deploy the application and get your live link.
