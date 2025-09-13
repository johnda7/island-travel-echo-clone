# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3875c40a-aaeb-47ea-bedc-679166dacdea

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3875c40a-aaeb-47ea-bedc-679166dacdea) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3875c40a-aaeb-47ea-bedc-679166dacdea) and click on Share -> Publish.

### Step-by-step on Lovable

1) Open your project: https://lovable.dev/projects/3875c40a-aaeb-47ea-bedc-679166dacdea
2) Click Share → Publish
3) Build settings:
	- Build command: `npm run build`
	- Output directory: `dist`
	- Install command (optional): `npm ci` or `npm i`
4) SPA routing: already handled (we copy `index.html` to `404.html` in `postbuild`). No extra config needed.
5) Preview/Dev server:
	- Local dev: `npm run dev` (Vite)
	- Fixed port used for local preview of built assets: `npm run serve:dist` serves `dist` on `http://localhost:8081`
6) Enable Auto Publish (optional): Project → Settings → Publish → Auto publish on push to `main`.

If the publish fails, open the Build Logs in Lovable and ensure Node/npm versions are compatible. This project uses Vite 5 and Node 18+.

### Deploy via GitHub Pages (no Lovable)

1) In GitHub repo: Settings → Pages → Build and deployment → Source: GitHub Actions.
2) Commit is already configured to trigger `.github/workflows/deploy.yml` on push to `main`.
3) If you publish as Project Page (i.e. `https://<user>.github.io/<repo>/`), set env `BASE_PATH=/island-travel-echo-clone/` in the build step or in repo secrets. For User/Org Page (`https://<user>.github.io/`), `BASE_PATH` can be omitted.
4) After first successful deploy, you’ll see the public URL in the Actions logs and in Settings → Pages.

### Quick guide: enable GitHub Pages + permissions (required)

If your Actions deployment fails with errors like "Get Pages site failed" or "Resource not accessible by integration", you must enable Pages and grant write permissions to workflows.

1) Enable Pages source:
	- Open Settings → Pages: `https://github.com/<user>/island-travel-echo-clone/settings/pages`
	- In "Build and deployment" set Source = "GitHub Actions"
	- Click Save

2) Grant workflow write permissions (once per repo):
	- Open Settings → Actions → General: `https://github.com/<user>/island-travel-echo-clone/settings/actions`
	- Scroll to "Workflow permissions"
	- Select "Read and write permissions" and Save

3) Re-run deployment:
	- Go to Actions, open the latest failed run, click "Re-run all jobs"
	- Or push any commit to main to trigger a new deployment

URL will be: `https://<user>.github.io/island-travel-echo-clone/`

### Alternatives: Vercel / Netlify (optional)

This is a static SPA built with Vite/React. You can deploy on Vercel or Netlify in minutes:

- Vercel
  - Import repo in Vercel dashboard → Framework: Vite → Build: `npm run build` → Output: `dist/`
- Netlify
  - New site from Git → Build command: `npm run build` → Publish directory: `dist`

No extra routing config needed (SPA fallback is provided by copying `index.html` to `404.html` during postbuild).


## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
