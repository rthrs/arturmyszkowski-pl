# DNS & Domain Configuration Documentation

This document outlines the DNS configuration for the `arturmyszkowski.pl` domain. It serves as a single source of truth for understanding how web traffic, email, and other services are routed.

**Last Updated:** October 21, 2025

## 1. Overview

- **Domain Registrar:** OVHcloud
- **Authoritative DNS Provider:** [Netlify](https://www.netlify.com/)
- **Primary Website Host (`arturmyszkowski.pl`):** [Vercel](https://vercel.com/)
- **Archived Website Host (`v1.arturmyszkowski.pl`):** [Netlify](https://www.netlify.com/)
- **Email Provider:** OVHcloud (MX Plan)

The nameservers for `arturmyszkowski.pl` are configured at the registrar (OVH) to point to Netlify. All DNS records are therefore managed exclusively within the **Netlify DNS panel**.

## 2. Website Hosting Records

These records route web traffic to the correct hosting platforms.

### 2.1. Primary Domain (`arturmyszkowski.pl` & `www`)

The main domain points to the Vercel-hosted Next.js application.

| Type      | Name  | Value                  | TTL  | Purpose                                          |
| :-------- | :---- | :--------------------- | :--- | :----------------------------------------------- |
| **A**     | `@`   | `76.76.21.21`          | Auto | Points the root domain to Vercel's Edge Network. |
| **CNAME** | `www` | `cname.vercel-dns.com` | Auto | Points the `www` subdomain to Vercel.            |

### 2.2. Archived v1 Site (`v1.arturmyszkowski.pl`)

The `v1` subdomain points to the original Hugo-based website, hosted on Netlify.

| Type      | Name | Value                                       | TTL  | Purpose                                 |
| :-------- | :--- | :------------------------------------------ | :--- | :-------------------------------------- |
| **CNAME** | `v1` | `scintillating-tiramisu-37b9e8.netlify.app` | Auto | Points to the archived Netlify project. |

---

## 3. Email Records (OVHcloud MX Plan)

These records are essential for routing email to and from the OVHcloud mail servers. **DO NOT MODIFY** these unless migrating email providers.

### 3.1. Mail Exchanger (MX)

Directs incoming mail to OVH's servers.

| Type   | Name | Value              | Priority |
| :----- | :--- | :----------------- | :------- |
| **MX** | `@`  | `mx1.mail.ovh.net` | 1        |
| **MX** | `@`  | `mx2.mail.ovh.net` | 5        |
| **MX** | `@`  | `mx3.mail.ovh.net` | 100      |

### 3.2. Email Authentication (SPF, DKIM, DMARC)

These `TXT` and `CNAME` records are critical for email security and deliverability.

| Type      | Name                          | Value                                                     | Purpose                                                                         |
| :-------- | :---------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **TXT**   | `@`                           | `v=spf1 include:mx.ovh.com ~all`                          | **SPF:** Authorizes OVH's servers to send email on behalf of the domain.        |
| **CNAME** | `ovhmo-selector-1._domainkey` | `ovhmo-selector-1...ds.dkim.mail.ovh.net`                 | **DKIM:** Points to OVH's public key for signing outgoing emails.               |
| **CNAME** | `ovhmo-selector-2._domainkey` | `ovhmo-selector-2...ds.dkim.mail.ovh.net`                 | **DKIM:** Points to OVH's second public key for redundancy.                     |
| **TXT**   | `_dmarc`                      | `v=DMARC1; p=none; rua=mailto:contact@arturmyszkowski.pl` | **DMARC:** Defines the email authentication policy (currently in monitor mode). |

---

## 4. Verification & Service Records

These are `TXT` records used to verify ownership for third-party services.

| Type    | Name | Value                                        | Purpose                             |
| :------ | :--- | :------------------------------------------- | :---------------------------------- |
| **TXT** | `@`  | `google-site-verification=...` (unique code) | Google Search Console verification. |
