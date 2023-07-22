# Reddit Place Capture

This is a simple ts script to save the r/place canvas to an image

## Usage

> Make sure to update `src/config.ts` with your own values!

Install dependencies with

```bash
npm install
## or
pnpm import # this imports from yarn.lock
## or
yarn
```

By default, the interval option runs every 3 minutes. Change this in `src/config.ts` if you want to

Run it on an interval:

```bash
npm run start
## or
pnpm run start
## or
yarn start
```

To run it only once, use

```bash
npm run once
## or
pnpm run once
## or
yarn once
```
