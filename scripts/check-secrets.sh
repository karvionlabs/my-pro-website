#!/usr/bin/env bash
# Pre-commit secret scanning guard for Karvion Labs
set -e

echo "🔒 [DevSecOps] Scanning staged changes for secret leaks..."

# Check staged git diff for common secret patterns
SUSPICIOUS=$(git diff --cached --unified=0 | grep -E -i '(\b(sk_live_[0-9a-zA-Z]{24,}|ghp_[0-9a-zA-Z]{36}|AIzaSy[0-9a-zA-Z_-]{33}|xox[baprs]-[0-9a-zA-Z]{10,48}|-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----)\b)' || true)

if [ -n "$SUSPICIOUS" ]; then
  echo "🚨 [SECURITY ALERT] Exposed secret or private key pattern detected in staged files:"
  echo "$SUSPICIOUS"
  echo "Commit rejected by DevSecOps security guard. Please sanitize credentials before committing."
  exit 1
fi

echo "✅ [DevSecOps] Secret scan passed: Zero exposed credentials detected."
exit 0
