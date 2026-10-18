# NINZA CLOUD — Complete Website Blueprint

A responsive dark-red / black Nebula-inspired website for the NINZA CLOUD brand.

## Files
- `index.html` — complete single-page website structure
- `style.css` — responsive theme, hero illustration, cards, plan grids and panel preview
- `app.js` — mobile navigation, demo subdomain format checker and FAQ interactions
- `CNAME` — custom-domain file for GitHub Pages
- `.nojekyll` — disables Jekyll processing

## Deploy on GitHub Pages
1. Create a repository named `ninza-cloud-website`.
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
5. In the Custom domain field, enter `ninzacloud.bond` (for this main website) and save.
6. At your DNS provider, follow the current GitHub Pages custom-domain instructions for the apex domain. Do not remove or replace existing records without checking their purpose.
7. Enable HTTPS when available.

GitHub guide: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Panel subdomain
The client panel project is separate and should be deployed to its own repository/site if you want `panel.ninzacloud.bond`. Configure that subdomain separately in its own GitHub Pages settings and DNS. Do not set this main site's CNAME to the panel hostname.

## Important
This is a frontend blueprint only. Prices/resources are examples and must be confirmed before publication. The subdomain checker does not register domains or query availability. Buttons link to Discord. VPS provisioning, Minecraft server controls, real customer login, billing, DNS record writes, admin functions and monitoring require a secure backend and real provider integrations. Do not collect credentials or payments in this static website.
