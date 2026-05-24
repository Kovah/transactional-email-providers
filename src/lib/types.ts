export interface PlanExtra {
  blockSize: number | null;
  costPerBlock: number | null;
  costPerEmail: number;
}

export interface Plan {
  /** Emails per month included in this plan tier (0 for pure pay-as-you-go) */
  volume: number;
  /** Monthly cost in USD */
  costPerMonth: number;
  /** Cost per single email in USD */
  costPerEmail: number;
  /** Billing model for this tier; omitted means legacy subscription semantics. */
  billingModel?: 'subscription' | 'metered' | 'prepaid_bundle';
  /** Overage pricing — null if no overage possible or PAYG */
  extra: PlanExtra | null;
}

export interface Provider {
  name: string;
  url: string;
  /** Two-letter or short region label */
  location: 'EU' | 'US' | 'UK' | 'CA' | 'Global';
  freePlan: boolean;
  /** Human-readable free limit description, e.g. "100/d + 3,000/mo" */
  freeLimits: string | null;
  /** True if the provider offers pay-per-email without a monthly commitment */
  payAsYouGo: boolean;
  /** Pricing tiers, ordered cheapest-first. Always at least one entry. */
  plans: [Plan, ...Plan[]];
  /** null = not specified / unknown */
  marketingAllowed: boolean | null;
  /** null = not specified. true = KYC or manual review required */
  verificationNeeded: boolean | null;
  /** null = unlimited */
  domainLimit: number | null;
  notes: string | null;
}

export interface ProvidersData {
  lastUpdated: string;
  providers: Provider[];
}

export interface OutOfScope {
  name: string;
  reason: string;
}
