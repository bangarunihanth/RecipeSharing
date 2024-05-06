import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Service from './components/service';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Footer from './components/Footer';
import RecipeDetails from './components/RecipeDetails';
import RegisterForm from './components/Register';
import LoginForm from './components/login';
import CommunityPage from './components/communitypage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Service />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          { <Route path="/register" element={<RegisterForm/>} /> }
          { <Route path="/login" element={<LoginForm/>} /> }
          {<Route path="/community" element={<CommunityPage />} />}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;