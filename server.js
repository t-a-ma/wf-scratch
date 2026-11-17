const express = require('express');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const { ISSUER, AUDIENCE, PORT = 3000 } = process.env;

if (!ISSUER || !AUDIENCE) {
  console.error('ISSUER and AUDIENCE are required');
  process.exit(1);
}

const app = express();

// Checks the signature, the issuer and the audience of the Auth0 access token.
app.use(auth({ issuerBaseURL: ISSUER, audience: AUDIENCE }));

const scopesOf = (req) => (req.auth.payload.scope || '').split(' ').filter(Boolean);

app.get('/greeting', requiredScopes('read:greeting'), (req, res) => {
  res.json({ message: 'Hello! These are the scopes of your request', scopes: scopesOf(req) });
});

app.post('/greeting', requiredScopes('write:greeting'), (req, res) => {
  res.json({ message: 'Greeting written', scopes: scopesOf(req) });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.code || 'error', message: err.message });
});

app.listen(PORT, () => console.log(`Demo API listening on ${PORT}`));
