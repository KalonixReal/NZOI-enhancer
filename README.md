
# NZOI Enhancer

## Important

* THIS TOOL IS MADE FOR C++ USERS

* YOU MUST COPY THE CODE IN YOUR IDE AND THEN PRESS PASTE TO SAVE THE CODE

## Features

### IDE (on problem pages)

* Dark, split layout (problem ↔ editor)
* In-browser code editor
* Run sample tests directly in the page
* Submit without leaving the editor
* Simple local file manager (save / load / delete code)

### Dashboard

* Dark UI
* Faster loading with caching
* Search, filter, and sort problems
* Manual tags & ratings
* Classification tools

---

## Installation

### 1. Userscript

1. Install **Tampermonkey** (Chrome / Edge / Firefox)
2. Open and install:

   ```
   https://raw.githubusercontent.com/KalonixReal/NZOI-enhancer/main/combined_ide+dashboard.user.js
   ```
3. Go to `https://train.nzoi.org.nz/problems/*`

---

### 2. Required: ModHeader (for cross-origin isolation)

The IDE embeds external tools (editor / diagnostics) that **require COOP + COEP headers**.
Browsers do not allow setting these headers directly from userscripts, so **ModHeader is required**.

#### Install ModHeader

* Chrome Web Store: **ModHeader**
* Enable it for `train.nzoi.org.nz`

#### Add these headers (Response Headers)

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: credentialless
```

Make sure ModHeader is **enabled** before loading the NZOI site.

> Without this, the embedded IDE / diagnostics will not work correctly.

---

## Usage

### Coding

* Open any problem
* Editor appears automatically
* Code is saved per problem
* **Run** → executes sample tests
* **Submit** → submits to NZOI judge
* **Files** → manage saved code

### Dashboard

* Search by name or tag
* Sort by difficulty, progress, group
* Edit tags / ratings directly

---

## Notes

* Everything is contained in **one userscript**
* No external setup besides ModHeader
* Works entirely in the browser
