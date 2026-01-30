# Push to your Git repo (michael@backlinelogic.com)

Git is initialized and the initial commit is done. Follow these steps to push to your account.

## 1. Create a new repo on GitHub (or GitLab)

**GitHub:**

1. Go to [github.com/new](https://github.com/new).
2. Sign in with the account that uses **michael@backlinelogic.com** (or your Backline Logic org).
3. **Repository name:** `inventory-prototype` (or any name you prefer).
4. **Public** or **Private** — your choice.
5. **Do not** check "Add a README" (you already have one).
6. Click **Create repository**.

**GitLab:** Create a new project, leave "Initialize with README" unchecked.

---

## 2. Add the remote and push

Replace `YOUR_USERNAME_OR_ORG` with your GitHub username or org (e.g. `backlinelogic`).

**HTTPS:**

```bash
cd /Users/admin/Developer/inventory-prototype
git remote add origin https://github.com/YOUR_USERNAME_OR_ORG/inventory-prototype.git
git branch -M main
git push -u origin main
```

**SSH (if you use SSH keys):**

```bash
cd /Users/admin/Developer/inventory-prototype
git remote add origin git@github.com:YOUR_USERNAME_OR_ORG/inventory-prototype.git
git branch -M main
git push -u origin main
```

When prompted:

- **HTTPS:** Use your GitHub username and a [Personal Access Token](https://github.com/settings/tokens) as the password (not your GitHub password).
- **SSH:** No password if your key is loaded in the agent.

---

## 3. Confirm

Open the repo in the browser; you should see the latest commit and all project files.
