# Workload Federation demo

A GitHub Actions workflow that gets an access token from Auth0 with Workload Federation, then calls a small demo API with it.

The API has two routes:
- `GET /greeting` needs `read:greeting` and answers with the scopes of the request.
- `POST /greeting` needs `write:greeting`.

Follow the Workload Federation playbook in Confluence to create the issuer, the API, the client and the grant. Then:

1. Push these files to the main branch of a scratch GitHub repository.
2. In GitHub, open Actions, pick the `wf` workflow and choose Run workflow.
3. Fill in the inputs: the client ID, the token endpoint (`https://YOUR_TENANT.us.auth0.com/oauth/token`), the tenant audience (`https://YOUR_TENANT.us.auth0.com/`) and the API audience (`https://greeting.demo`).

The run passes when `GET /greeting` returns 200 and `POST /greeting` returns 403. The client was only granted `read:greeting`.
