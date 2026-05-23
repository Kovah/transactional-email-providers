#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const errors = [];

// Load data files
let providersData;
let outOfScopeData;

try {
  const providersPath = join(rootDir, 'src/data/providers.json');
  providersData = JSON.parse(readFileSync(providersPath, 'utf-8'));
} catch (error) {
  errors.push(`Failed to load src/data/providers.json: ${error.message}`);
}

try {
  const outOfScopePath = join(rootDir, 'src/data/out-of-scope.json');
  outOfScopeData = JSON.parse(readFileSync(outOfScopePath, 'utf-8'));
} catch (error) {
  errors.push(`Failed to load src/data/out-of-scope.json: ${error.message}`);
}

// Custom validation checks
if (providersData) {
  // Check that providers.providers is an array
  if (!Array.isArray(providersData.providers)) {
    errors.push('providers.providers must be an array');
  } else {
    // Check lastUpdated is a real calendar date
    if (typeof providersData.lastUpdated !== 'string') {
      errors.push('lastUpdated must be a string in YYYY-MM-DD format');
    } else {
      const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
      const match = providersData.lastUpdated.match(dateRegex);
      if (!match) {
        errors.push(`lastUpdated "${providersData.lastUpdated}" is not in YYYY-MM-DD format`);
      } else {
        const [, y, m, d] = match;
        const dt = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
        const isRealDate = dt.getUTCFullYear() === Number(y)
          && dt.getUTCMonth() === Number(m) - 1
          && dt.getUTCDate() === Number(d);
        if (!isRealDate) {
          errors.push(`lastUpdated "${providersData.lastUpdated}" is not a valid calendar date`);
        }
      }
    }

    // Check pay-as-you-go providers have costPerMonth === 0 in first plan
    providersData.providers.forEach((provider, index) => {
      // Check URL is parseable http/https URL
      try {
        const parsed = new URL(provider.url);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          errors.push(`Provider "${provider.name}" (index ${index}): url must use http/https, got ${parsed.protocol}`);
        }
      } catch {
        errors.push(`Provider "${provider.name}" (index ${index}): url is not a valid URL: ${provider.url}`);
      }

      if (provider.payAsYouGo === true) {
        if (!provider.plans || provider.plans.length === 0) {
          errors.push(
            `Provider "${provider.name}" (index ${index}): payAsYouGo=true requires at least one plan`
          );
        } else if (provider.plans[0].costPerMonth !== 0) {
          errors.push(
            `Provider "${provider.name}" (index ${index}): payAsYouGo=true requires plans[0].costPerMonth === 0, got ${provider.plans[0].costPerMonth}`
          );
        }
      }
    });
  }
}

if (outOfScopeData) {
  // Check that out-of-scope root is an array
  if (!Array.isArray(outOfScopeData)) {
    errors.push('out-of-scope.json root must be an array');
  }
}

// Report results
if (errors.length > 0) {
  console.error('❌ Data validation failed:\n');
  errors.forEach(error => {
    console.error(`  • ${error}`);
  });
  console.error('');
  process.exit(1);
} else {
  console.log('✅ All custom validation checks passed');
  process.exit(0);
}
