This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
cp .env.production .env.local
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the backend, do:
```bash
cd be
pip install -r requirements.txt
python app.py
``` 

And then change the PROCESS_IMAGE_ENDPOINT to the localhost address. Note that NEXT_PUBLIC_API_ENDPONT is currently being ignored.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

We deployed this site on Danny's Render, so make sure to push to `https://github.com/dannybess1/morpheus-landing` in order to update the frontend on `proteus.photos`. On Aayush's laptop, this looks like `git push danny main`. Edit: This has now been updated to the repo in Proteus directly.