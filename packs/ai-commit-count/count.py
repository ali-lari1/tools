"""What share of your commits (and added lines) did an AI co-author?
Reads `git log` in every repo under a folder. Counts a commit as AI-assisted when its
message has a Co-Authored-By trailer naming Claude, Copilot, Cursor, Codex, Gemini or Devin.
usage: python3 count.py ~/dev [--author "Your Name"] [--since 2026-01-01]"""
import subprocess, sys, os, re, argparse, json
AI = re.compile(r"co-authored-by:.*\b(claude|copilot|cursor|codex|gemini|devin|aider)\b", re.I)
ap = argparse.ArgumentParser(); ap.add_argument("root"); ap.add_argument("--author"); ap.add_argument("--since"); ap.add_argument("--json")
a = ap.parse_args()
tot = {"commits": 0, "ai_commits": 0, "lines": 0, "ai_lines": 0, "repos": 0}
for name in sorted(os.listdir(os.path.expanduser(a.root))):
    repo = os.path.join(os.path.expanduser(a.root), name)
    if not os.path.isdir(os.path.join(repo, ".git")): continue
    cmd = ["git", "-C", repo, "log", "--no-merges", "--numstat", "--format=@@%H%x1f%B%x1e"]
    if a.author: cmd.append(f"--author={a.author}")
    if a.since: cmd.append(f"--since={a.since}")
    out = subprocess.run(cmd, capture_output=True, text=True, errors="replace").stdout
    if not out.strip(): continue
    tot["repos"] += 1
    for block in out.split("@@")[1:]:
        msg, _, stats = block.partition("\x1e")
        added = sum(int(l.split("\t")[0]) for l in stats.strip().splitlines() if l.split("\t")[0].isdigit())
        ai = bool(AI.search(msg))
        tot["commits"] += 1; tot["lines"] += added
        if ai: tot["ai_commits"] += 1; tot["ai_lines"] += added
pc = lambda x, y: round(100 * x / y, 1) if y else 0
print(f"{tot['repos']} repos, {tot['commits']} commits, {tot['ai_commits']} with an AI co-author ({pc(tot['ai_commits'], tot['commits'])}%)")
print(f"lines added: {tot['lines']:,}, in AI co-authored commits: {tot['ai_lines']:,} ({pc(tot['ai_lines'], tot['lines'])}%)")
if a.json: json.dump(tot, open(a.json, "w"), indent=1)
