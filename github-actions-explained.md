Purpose: Explain your security-scan.yml in detail for documentation or onboarding.

### ⚙️ GitHub Actions Workflow Explained – `security-scan.yml`

This document explains the GitHub Actions CI workflow used for automated security scans on a Node.js API project. The pipeline runs **Semgrep** (SAST), **OWASP ZAP** (DAST), and **Gitleaks** (Secret detection).

---

### 🧪 Trigger Events

```yaml
on:
  push:
    branches: [ main ]
  pull_request:
```
This workflow runs when:

Code is pushed to the main branch

A pull request is opened

🧱 Job Structure
```
jobs:
  security:
    runs-on: ubuntu-latest
```
The job is named security

It runs on a GitHub-hosted Ubuntu virtual machine

🪜 Steps Overview
📥 1. Checkout Code
```
- name: 📥 Checkout code
  uses: actions/checkout@v4
```
Clones your repository into the GitHub Actions runner so it can be accessed by the workflow.

📦 2. Install Dependencies
```
- name: 📦 Install Dependencies
  run: npm install
```
Runs npm install to install dependencies listed in package.json.

🚀 3. Start the Node.js App
```
- name: 🚀 Start Node App
  run: |
    nohup npm start &
    sleep 10
```
Uses nohup to run npm start in the background

Waits 10 seconds to ensure the server is up on localhost:3000

🛡️ 4. Static Application Security Testing (SAST) with Semgrep
```
- name: 🛡️ Semgrep SAST Scan
  uses: returntocorp/semgrep-action@v1
  with:
    config: "p/ci"
  continue-on-error: true
```
Scans your source code for insecure patterns (like eval, hardcoded secrets, XSS).

Uses the "p/ci" ruleset for production-ready security checks.

continue-on-error: true lets the pipeline continue even if issues are found.

🌐 5. Dynamic Application Security Testing (DAST) with OWASP ZAP
```
- name: 🌐 Run OWASP ZAP (DAST)
  uses: zaproxy/action-baseline@v0.10.0
  with:
    target: "http://localhost:3000"
    allow_failures: true
    cmd_options: "-a -r zap-report.html"
```
Scans your running API like an external attacker would.

-a: Performs an active scan.

-r zap-report.html: Outputs the report as an HTML file.

allow_failures: true ensures pipeline continues even with findings.

📎 6. Upload ZAP Report Artifact
```
- name: 📎 Upload ZAP Report
  uses: actions/upload-artifact@v4
  with:
    name: zap-html-report
    path: zap-report.html
```
Saves the generated ZAP report so you can download and review it from the GitHub UI.

🔐 7. Secret Scanning with Gitleaks
```
- name: 🔐 Gitleaks Secret Scan
  uses: gitleaks/gitleaks-action@v2
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
Scans the codebase for exposed API keys, secrets, and tokens.

Uses Gitleaks GitHub Action maintained by the community.

✅ Outcome
Full security coverage across source code and runtime.

Alerts are printed in logs and/or available via artifacts.

Badges can be added to visualize scan status.
