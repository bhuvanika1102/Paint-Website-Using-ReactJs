import React from 'react';
import '../styles/HomePage.css';

function App() {
 

  return (
    <div>
      
      <section className="hero">
        <h1>Welcome to Our Painting Website</h1>
        <w>Experience our amazing Web and Develope your drawing skills.</w>
        <br/>
        <br/>
        <a href="/nextpage" className="btn">Get Started</a>
      </section>
      <section className="about">
        <h2>About Us</h2>
        <p>Owned by <br /> Abirami <br/>Bhuvanika <br />Rajakumari <br />Suji <br /></p>
      </section>
      <footer>
        {/* <p>&copy; 2023 Your Website</p> */}
      </footer>
    </div>
  );
}

export default App;

