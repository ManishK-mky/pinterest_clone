<h1>Pinterest Clone Project</h1>
<p>This project is a Pinterest clone built using MongoDB, Node.js, Express.js, and Multer. It provides functionalities such as signup, login using Passport.js, home page, follower/following system, creating pins, and saving pins.</p>
<h2>Table of Contents</h2>
<ul>
  <li><a href="#features">Features</a></li>
  <li><a href="#prerequisites">Prerequisites</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#file-structure">File Structure</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
</ul>
<h2 id="features">Features</h2>
<ul>
  <li>User authentication (signup, login) using Passport.js</li>
  <li>Home page displaying pins</li>
  <li>Follower/Following system</li>
  <li>Create pins with images and descriptions</li>
  <li>Save pins to view later</li>
</ul>
<h2 id="prerequisites">Prerequisites</h2>
<p>Before you begin, ensure you have met the following requirements:</p>
<ul>
  <li>Node.js and npm installed on your machine</li>
  <li>MongoDB installed and running</li>
  <li>Basic knowledge of MongoDB, Node.js, Express.js, and Multer</li>
</ul>
<h2 id="installation">Installation</h2>
<ol>
  <li>Clone the repository:</li>
  <code>git clone https://github.com/yourusername/pinterest-clone.git</code>
  <li>Navigate to the project directory:</li>
  <code>cd pinterest-clone</code>
  <li>Install dependencies:</li>
  <code>npm install</code>
  <li>Create a <code>.env</code> file in the root directory and add the following environment variables:</li>
  <pre>
PORT=3300
MONGODB_URI=mongodb://127.0.0.1:27017/pinterest-clone
SESSION_SECRET=your_session_secret
  </pre>
  <p>Replace <code>your_session_secret</code> with your preferred session secret.</p>
</ol>
<h2 id="usage">Usage</h2>
<ol>
  <li>Start the server:</li>
  <code>npm start</code>
  <li>Visit <a href="http://127.0.0.1:3300">http://localhost:3300</a> in your web browser to access the application.</li>
</ol>

<h2 id="contributing">Contributing</h2>
<p>Contributions are welcome! Feel free to open an issue or submit a pull request.</p>
<h2 id="license">License</h2>
<p>This project is licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.</p>
