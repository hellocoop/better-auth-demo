# Hellō Better Auth Demo

This is a sample application showcasing the [@hellocoop/better-auth](https://www.npmjs.com/package/@hellocoop/better-auth) plugin - the fastest way to add identity to your application.

## Setup

To run locally, you will need:

- [nodejs 18+](https://nodejs.org/en/download)
- [git](https://github.com/git-guides/install-git)

## 1. Clone this repository

<https://github.com/hellocoop/better-auth-demo>

[How to clone a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

You should now have a `better-auth-demo` directory on your machine with the contents of this repo.

## 2. Get your Hellō Client ID
#### Option 1: Quick CLI Setup
```bash
npx @hellocoop/quickstart
```
This will open your browser, log you into Hellō, prompt you for your app name, and output your `client_id`. Set `HELLO_CLIENT_ID` to this value in the third step.

#### Option 2: Web Console Setup
Visit [console.hello.coop](https://console.hello.coop), log into Hellō and create your application and obtain your Client ID which is the `HELLO_CLIENT_ID` in the third step.


#### Option 3: MCP Setup

1. Install the Hello Admin MCP Server for [Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=hello-admin&config=eyJ1cmwiOiJodHRwczovL2FkbWluLW1jcC5oZWxsby5jb29wIn0K), [VSCode](vscode:mcp/install?%7B%22name%22%3A%22Hell%C5%8D%20Admin%22%2C%22url%22%3A%22https%3A//admin-mcp.hello.coop%22%2C%22type%22%3A%22http%22%7D), or if you are using another IDE, click [here](https://www.hello.dev/docs/admin-mcp/#installing) to find the install links.
1. Run the prompt (This will open your browser and log you into Hellō.):  
`Create a Hellō application named "Hellō Better Auth Demo", and use the logos in the "logos" directory to set the dark and light mode logo versions. Then, create a ".env" file based on ".env.example", and set the "CLIENT_ID" to the one from the newly created application.`

Skip to step 4 since the MCP server will create the `.env` file with the `CLIENT_ID` for you!

---

> The http://localhost* redirect URI is enabled by default, allowing you to immediately start development on your machine.


## 3. Set your Hellō Client ID
Copy the `.env.example` file at the root of this repo to `.env`
and set the value of the `HELLO_CLIENT_ID` to what you got in the second step.

## 4. Install and run!

Run these commands to start running locally:

```sh
cd better-auth-demo
npm install
npm run dev
```

Open <http://localhost:3000> (assuming port 3000 was free)

Click the `[ō Continue with Hellō]` button to log in. You will be redirected to the Hellō Wallet. If you have not added a logo or URLs, you will see placeholders.

## Learn More

- [@hellocoop/better-auth](https://www.npmjs.com/package/@hellocoop/better-auth)
- [Hellō Docs](https://www.hello.dev/docs/)
- [Better Auth Docs](https://www.better-auth.com/docs)
  
