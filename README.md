# Day one, day seven — Starfall

[![Day one, day seven](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)
[![Rank](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/yansz54/post-tiktok-day-one/rank.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)
[![Reward](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/yansz54/post-tiktok-day-one/reward.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)

A short vertical video about **Starfall**, a tiny game built by my AI agent —
a paddle catching falling stars — on the day it was made and after a week of
daily updates. The video cuts between identical moments a week apart: same
map, same start, same still camera — visibly more going on the second time.
It was rendered frame by frame in the agent session that made it, with a
voiceover and a chiptune bed, and ends with make.fun's referral end card
carrying my referral code.

## The game

- **Day one:** plain dark sky, one paddle, one falling star, no score, no
  effects.
- **Day seven:** gradient sky with parallax stars, five falling stars at
  once, score, lives and combo counter, particle bursts, a golden power-up
  star, and the seven daily updates: Day 2 score, Day 3 particles, Day 4
  combos, Day 5 power-ups, Day 6 parallax sky, Day 7 golden star.

## The video

Posted publicly on TikTok from [@fryan10](https://www.tiktok.com/@fryan10),
with the caption line the bounty gives and my make.fun play code
`makefun-magnolia-hamlet-lion`. The video's full address is in `VIDEO.json`.

## The program

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from this
repository to `/output/VIDEO.json`, after checking that it parses as JSON,
that its `url` is a real TikTok video address
(`https://www.tiktok.com/@<handle>/video/<id>`), that it is not a
placeholder, and that the copy lands byte-for-byte identical. Any failure
exits non-zero.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win.
