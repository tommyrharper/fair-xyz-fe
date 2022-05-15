This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Steps I followed to set this up

1. Create `lib/apolloClient.ts` and copy this [file](https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js) into it.

2. Install deps:
```bash
npm i @apollo/client lodash deepmerge
npm i -D @types/lodash
npm i -D ts-node @graphql-codegen/cli
```
3. Added types to `apolloClient.ts` and remove example specific logic.
4. Setup apollo provider.
5. Setup codegen:
```
npx graphql-codegen init
> React
> http://localhost:8000/graphql
> graphql/**/*.graphql
> TypeScript/TypeScript Operations/TypeScript React Apollo
> generated/graphql.tsx
> No
> codegen.yml
> generate
```
6. `npm run generate`
7. Add tailwind:
```
npm i tailwindcss
```
- create `styles/index.css`
```
npx tailwind init
```
- create `postcss.config.js`
- import `../styles/index.css` instead of `../styles/globals.css`

## Todo

- Add arrow back button to layout
- Check if email is legit (BE & FE)
  - Elegantly handle duplicate emails
- Update routes to use router.push etc.
- delete unused fonts
- remove default layout
- clean edit.tsx
- rename reminder header
- remove old text-input and rename input to text-input
- Add hooks
- Handle dates that have already expired
