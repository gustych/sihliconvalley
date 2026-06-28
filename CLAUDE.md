# CLAUDE.md — sihliconvalley.ch

## Project Identity

- **Name:** Sihliconvalley
- **Domain:** sihliconvalley.ch
- **Repo:** github.com/wgusta/sihliconvalley
- **Purpose:** Community project showcase site (Star Wars crawl intro, then project cards)
- **Projects shown:** SihlHack (sihlhack.ch), LuckHack (luckhack.ch), openLEG (openleg.ch)
- **NOT:** gusty.ch, not a personal portfolio, not Güney Usta's portfolio

## Tech

Next.js 16, React 19, Tailwind 3, TypeScript. i18n (DE default, EN). Deployed on Vercel.

## Git

Remote: `origin → github.com/wgusta/sihliconvalley.git`

GitHub Actions bot commits to README.md on every push. Resolve conflicts:
```
git pull --rebase
git checkout --ours README.md && git add README.md && git rebase --continue
git push
```
