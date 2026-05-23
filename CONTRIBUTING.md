# Contributing — How to Add or Update Providers

## Data File

All provider data lives in [`src/data/providers.json`](src/data/providers.json).  
The excluded providers list is in [`src/data/out-of-scope.json`](src/data/out-of-scope.json).

## Adding a New Provider

1. Open `src/data/providers.json`
2. Add a new object to the `providers` array (keep it alphabetically sorted by `name`)
3. Update the `lastUpdated` field at the top of the file to today's date (`YYYY-MM-DD`)
4. Open a pull request with a link to the provider's pricing page as evidence
5. Ensure each provider has at least one pricing tier in `plans` (empty arrays fail the build)

### Field Reference

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Provider display name |
| `url` | `string` | Provider homepage URL |
| `location` | `string` | Region: `EU`, `US`, `UK`, `CA`, or `Global` |
| `freePlan` | `boolean` | Whether a free tier exists for production sending |
| `freeLimits` | `string \| null` | Human-readable free limit, e.g. `"100/d + 3,000/mo"` |
| `payAsYouGo` | `boolean` | Whether provider offers pay-per-email without a fixed monthly plan |
| `plans` | `Plan[]` | Pricing tiers, ordered cheapest-first (must contain at least one entry) |
| `plans[].volume` | `number` | Emails per month included |
| `plans[].costPerMonth` | `number` | Monthly cost in USD (`0` for PAYG tiers) |
| `plans[].costPerEmail` | `number` | Cost per individual email in USD |
| `plans[].extra` | `object \| null` | Overage pricing; `null` if no overage or not applicable |
| `plans[].extra.blockSize` | `number \| null` | Overage billing block size |
| `plans[].extra.costPerBlock` | `number \| null` | Cost per block in USD |
| `plans[].extra.costPerEmail` | `number` | Cost per overage email in USD |
| `marketingAllowed` | `boolean \| null` | Whether marketing emails are permitted; `null` = not specified |
| `verificationNeeded` | `boolean \| null` | Whether KYC or manual account review is required; `null` = not specified |
| `domainLimit` | `number \| null` | Max sending domains; `null` = unlimited |
| `notes` | `string \| null` | Short free-text note for anything important |

### Out of Scope Criteria

Providers are excluded if they:
- Only offer contact-based billing (charge per subscriber, not per email)
- Are enterprise-only with no self-serve pricing
- No longer appear operational
- Do not support transactional emails (API or SMTP) at all

Add excluded providers to `src/data/out-of-scope.json` with a clear reason.

## Updating Pricing

1. Verify the new pricing on the provider's official pricing page
2. Update the relevant provider object in `providers.json`
3. Update `lastUpdated` at the top of the file
4. Open a PR with a link to the pricing page

## Scope

This list covers **transactional email** providers only — services that let you send triggered, one-to-one emails (receipts, password resets, notifications) via API or SMTP.  
Marketing campaign tools (bulk sends to subscriber lists) are out of scope regardless of whether they offer an API.
