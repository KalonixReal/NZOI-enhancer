# NZOI Enhancer

> A Tampermonkey userscript that adds a full in-browser IDE and a smart problem dashboard to [train.nzoi.org.nz](https://train.nzoi.org.nz).

> [!IMPORTANT]
> **This tool is made for C++ users only.**
> When you copy code out of the editor, you must **paste it somewhere first** (e.g. Notepad) to save it — don't close the tab without saving!

---

## What It Does

### On Problem Pages
When you open any problem, the page splits in two:
- **Left side** — the problem statement
- **Right side** — a full C++ code editor with IntelliSense and diagnostics

From the editor you can:
- ▶ **Run** — execute your code against the sample test cases instantly, right in the browser
- 📤 **Submit** — submit to the NZOI judge without leaving the page
- 💾 **Save** — save your code (also auto-saves as you type)
- 📁 **Codes** — open a file manager to load or delete previously saved solutions

### On the Dashboard (Home Page)
The home page gets a full makeover:
- Dark UI with a clean problem table
- **Search** problems by name or tag
- **Filter** by difficulty, tag, or group
- **Sort** by rating, progress, or name
- AI-powered **difficulty ratings and tags** for every problem (e.g. `dynamic programming ★★★`)
- Manually **edit tags or ratings** if you disagree with the AI
- **Re-classify** any problem with a different AI provider

---

## Installation

### Step 1 — Install Tampermonkey
Tampermonkey is a browser extension that lets you run custom scripts on websites.

- [Chrome / Edge](https://www.tampermonkey.net/)
- [Firefox](https://www.tampermonkey.net/)

After installing, you'll see a small icon in your browser toolbar. That means it's working.

### Step 2 — Install the Script
Click this link and then click **"Install"** in the Tampermonkey popup that appears:

➡️ **[Install NZOI Enhancer](https://github.com/KalonixReal/NZOI-enhancer/raw/refs/heads/main/combined_ide+dashboard.user.js)**

### Step 3 — Install ModHeader
The in-browser IDE requires two special HTTP headers to work. Your browser won't set these automatically, so you need ModHeader to add them.

- [Chrome / Edge — ModHeader](https://chrome.google.com/webstore/detail/modheader-modify-http-hea/idgpnmonknjnojddfkpgkljpfnnfcklj)
- [Firefox — ModHeader](https://addons.mozilla.org/en-US/firefox/addon/modheader-firefox/)

**After installing ModHeader:**

1. Click the ModHeader icon in your toolbar
2. Make sure it's set to apply to `train.nzoi.org.nz`
3. Add two **Response Headers** exactly like this:

| Name | Value |
|---|---|
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Embedder-Policy` | `credentialless` |

> Without these headers, the code editor and diagnostics **will not load**.

### Step 4 — Go to NZOI
Visit [https://train.nzoi.org.nz/](https://train.nzoi.org.nz/) and you should see the new dashboard. Open any problem to see the split-screen IDE.

---

## First Time Setup (Dashboard)

> [!NOTE]
> **The first time you load the dashboard, you need to wait.**
> The script will automatically classify every problem using AI — this assigns difficulty ratings and topic tags. Depending on how many problems there are, this may take **a few minutes**. You'll see a counter in the top-left like `47/312 classified` that updates in real time.
> Once classification is done, everything is saved locally and loads instantly next time.

---

## Usage Guide

### Running Code on a Problem
1. Open any problem (e.g. `/problems/1234`)
2. The editor loads on the right — start typing your C++ solution
3. Click **Run** to test against all sample inputs shown on the page
4. Results appear below the editor — green = passed, red = wrong answer with a diff view
5. Click **Submit** to send to the NZOI judge

### Saving and Loading Code
- Your code **auto-saves to GitHub Gist** as you type (you'll see `✓ Auto-saved` appear)
- Click **Save** (or press `Ctrl+S` / `Cmd+S`) to force an immediate save
- Click **Codes** to open the file manager:
  - **Local tab** — files saved in your browser's local storage
  - **Gist tab** — files saved to GitHub Gist (syncs across devices)
  - Click **Load** to restore a previous solution

### Using the Dashboard
| Feature | How to use it |
|---|---|
| Search | Type in the search bar — matches name, tags, and rating |
| Filter by tag | Use the **All Tags** dropdown |
| Filter by difficulty | Use the **All Difficulties** dropdown (★ = easiest) |
| Filter by group | Use the **All Groups** dropdown |
| Sort | Click any column header (Problem, Progress, Group, Tags, Difficulty) |
| Edit tags | Click the pencil icon next to a problem's tags |
| Edit rating | Click the pencil icon next to a difficulty rating |
| Re-classify | Click the refresh icon on the right of any row |
| Use a specific AI | Click the ⋮ (three dots) button to pick a provider |

---

## FAQ

**The editor isn't loading / it's just a blank white box.**
Make sure ModHeader is installed and the two response headers are correctly added. Reload the page after adding them.

**The dashboard is stuck at "0/X classified".**
Wait a moment — the AI classification runs in the background. If it doesn't start after 30 seconds, try refreshing the page.

**My code disappeared.**
Click **Codes → Gist tab** to check if it was saved to Gist. If it's not there, it may not have been saved before the tab was closed. Always use `Ctrl+S` before closing.

**Can I use this on Firefox?**
Yes — install the Firefox versions of both Tampermonkey and ModHeader.

---

## Notes

- Everything runs inside one userscript — no server, no login, no configuration files
- Code is saved both locally in your browser and to a private GitHub Gist
- AI classification uses free API tokens included in the script — you don't need your own
- Works entirely in the browser with no external setup besides ModHeader

---

## Credits

### [clangd-in-browser-fork](https://github.com/KalonixReal/clangd-in-browser-fork)
The code editor embedded in the problem page is powered by this project — a fork of [clangd-in-browser](https://github.com/nicholasgasior/clangd-in-browser) that brings a full C++ language server (clangd) into the browser. It provides real IntelliSense, error underlining, and diagnostics without installing anything locally. This userscript embeds it inside an `<iframe>` and communicates with it via `postMessage` to set and retrieve your code.
