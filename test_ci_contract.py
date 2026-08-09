from pathlib import Path
import subprocess
import unittest


class CIContractTest(unittest.TestCase):
    def test_pull_requests_run_locked_validation(self):
        workflow = Path(".github/workflows/design-system.yml").read_text()
        self.assertIn("pull_request:", workflow)
        self.assertIn("permissions:\n  contents: read", workflow)
        self.assertIn("npm ci", workflow)
        for command in ("npm run lint", "npx tsc --noEmit", "npm audit --omit=dev --audit-level=high", "npm run build"):
            self.assertIn(command, workflow)
        self.assertNotIn("actions/checkout@v4", workflow)

    def test_design_token_check_accepts_committed_fallback(self):
        result = subprocess.run(
            ["node", "scripts/verify-design-tokens.mjs"], capture_output=True, text=True
        )
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
