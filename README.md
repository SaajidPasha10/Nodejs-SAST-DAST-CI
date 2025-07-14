[![Security Scan (SAST + DAST + Secrets)](https://github.com/SaajidPasha10/Nodejs-SAST-DAST-CI/actions/workflows/security-scan.yml/badge.svg)](https://github.com/SaajidPasha10/Nodejs-SAST-DAST-CI/actions/workflows/security-scan.yml)

# Nodejs-SAST-DAST-CI
A Node.js API project with GitHub Actions to automate SAST, DAST (ZAP), and secret scanning using open-source tools.


---

## 📄 2. `README.md`  
**Purpose**: For your GitHub repo homepage.

```markdown
# 🛡️ Secure Node.js App – Automated CI Security Scans

This project demonstrates how to secure a Node.js API using **GitHub Actions** with:

- ✅ Semgrep for Static Application Security Testing (SAST)
- 🌐 OWASP ZAP for Dynamic Application Security Testing (DAST)
- 🔐 Gitleaks for Secret/Token Detection

![Security Scan](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions/workflows/security-scan.yml/badge.svg)

> 🔁 Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` above with your GitHub details.

---

## 📦 Getting Started

```bash
npm install
npm start
```

Your app will be available at:
👉 http://localhost:3000

🔒 What's Being Scanned?

| Tool      | Type    | What It Checks                            |
| --------- | ------- | ----------------------------------------- |
| Semgrep   | SAST    | Insecure code patterns (`eval`, XSS, etc) |
| OWASP ZAP | DAST    | Runtime API vulnerabilities               |
| Gitleaks  | Secrets | Exposed keys/tokens in code               |

📁 Reports
After each GitHub Actions run:

View logs in the Actions tab

Download full ZAP report under Artifacts

Security findings appear inline if Semgrep or Gitleaks detect issues

🧪 Sample Endpoint (Intentionally Insecure)
```
// app.js
app.get('/eval', (req, res) => {
  const input = req.query.q;
  const result = eval(input); // ❌ Unsafe — used for demo purposes only
  res.send(`Evaluated: ${result}`);
});
```

🔧 Fixes & Recommendations
Use property access instead of eval()

Add CSRF protection middleware like csurf

Escape all user input or use res.json() for output

Never store credentials in code (scan with Gitleaks)


