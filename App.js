const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

// Secret key for signing and verifying tokens
const secretKey = 'secret-key-123';

// Generate JWT token with a digital signature
app.get('/generate-token', (req, res) => {
  const payload = { userId: 12400, username: 'M.rehan' };
  const token = jwt.sign(payload, secretKey);
  res.send(token);
});

// Verify and decode the JWT token
app.get('/verify-token', (req, res) => {
  const token = req.headers.authorization;
  let tokens = token.split(" ")[1]
  console.log(token)
  jwt.verify(tokens, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).send('Token verification failed');
    } else {
      res.send(decoded);
    }
  });
});

// Set up token expiration with 1 hour validity
const expirationTime = '5s';

// Generate JWT token with expiration
app.get('/generate-expiring-token', (req, res) => {
  const payload = { userId: 1234, username: 'shahid ullah' };
  const token = jwt.sign(payload, secretKey, { expiresIn: expirationTime });
  res.send(token);
});

// Protect a route with JWT authentication
app.get('/protected-route', (req, res) => {
  const token = req.headers.authorization;
  let tokens = token.split(" ")[1]
  jwt.verify(tokens, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).send('Token verification failed');
    } else {
      // Access granted, perform necessary operations
      res.send('Access granted!');
    }
  });
});

// Store JWT token in a cookie
app.get('/store-token', (req, res) => {
    const payload = { userId: 123, username: 'shahid ullah' };
    const token = jwt.sign(payload, secretKey);
    res.cookie('jwt', token);
    res.send('Token stored in cookie');
  });
  
  // Verify JWT token from a cookie
  app.get('/verify-session', (req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).send('Token verification failed');
      } else {
        res.send(decoded);
      }
    });
  });

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
