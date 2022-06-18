#### Wrangler

To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate projectname https://github.com/cloudflare/worker-template
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

# Cloudflare Worker API 👷

## Reasons for existing? 🫣

1. I have a bad habit for making things on my own, which is already provided for free by various providers. I as always taught that if I am handling any data which is not my own, it should be always in a pipeline which is largely managed by me or by someone whom I tust; leaving no room for `black boxes` and a [discovered check](https://www.chess.com/terms/discovered-check-chess) on data, thus having full ownership on data.

2. Coming from a background of networking and backend applications, I have a natural curiosity on how things work that are hidden from an average joe/jane, just like a daemon...👲🏼

> Daemons. They don’t stop working. They’re always active. They seduce. They manipulate. They own us. And even though you’re with me, even though I created you, it makes no difference. We all must deal with them alone. The best we can hope for, the only silver lining in all of this is that when we break through, we find a few familiar faces waiting on the other side.

3. To be honest, it's fun when you are frustrated when a things doesn't work and you finally finally crack it and make it work as you intend to do. 🧗‍♂️

## What does it do? 🤔

This is a simple Node.js application, which exposes `/submit` path, which can take json input from a requester and based upon some lame checks, can either relay the information to Telegram Bot or reject the request. This application runs on Cloudflare Workers, which allows me to `deploy serverless code instantly across the globe to give it exceptional performance, reliability, and scale.` (Yep, copied from official site)

