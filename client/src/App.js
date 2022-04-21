import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import Home from '../src/components/Home/Home';
import Navbar from '../src/components/Navbar/Navbar';
import Auth from '../src/components/Auth/Auth';

const App = () => (

    <Router>
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/auth" exact element={<Auth />} />
      </Routes>
    </Container>
  </Router>
);

export default App;