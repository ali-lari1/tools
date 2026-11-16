# AI commit count

What share of your commits (and lines added) had an AI co-author?

```
python3 count.py ~/code --author "Your Name"
python3 count.py ~/code --author "Your Name" --since 2026-10-16
```

It walks every git repo in the folder and counts commits whose message has a
`Co-Authored-By:` line naming Claude, Copilot, Cursor, Codex, Gemini, Devin or Aider.
Merges are skipped. Python 3 standard library only; nothing leaves your machine.

It's a floor: code an assistant wrote that you committed yourself, without the
trailer, counts as yours.

Ali Lari, November 2026.
