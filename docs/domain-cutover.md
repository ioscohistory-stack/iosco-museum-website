# Museum domain connection

Site: https://iosco-museum-rebuild.iosco-history.chatgpt.site

Domain: ioscomuseum.com, managed in Weebly.

## Original settings recorded before changes

Observed in the signed-in museum Weebly account on September 7, 2026.
Domain renewal shown in Weebly: June 21, 2029. Registrar lock enabled.

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 199.34.228.159 |
| A | www | 199.34.228.159 |
| A | * | 199.34.228.159 |
| HTTP302 | mail | http://mail.google.com/a/ioscomuseum.com |
| MX (priority 1) | @ | ASPMX.L.GOOGLE.COM |
| MX (priority 5) | @ | ALT1.ASPMX.L.GOOGLE.COM |
| MX (priority 5) | @ | ALT2.ASPMX.L.GOOGLE.COM |
| MX (priority 10) | @ | ALT3.ASPMX.L.GOOGLE.COM |
| MX (priority 10) | @ | ALT4.ASPMX.L.GOOGLE.COM |

Nameservers displayed by Weebly: dns1.register.com, dns2.register.com.

## Rollback

Keep the Weebly site and domain subscriptions active during the transition.
To route the museum addresses back to Weebly, restore the original A records
for @ and www to 199.34.228.159, removing only the replacement routing records
for those two hosts. Keep the wildcard, mail redirect, MX records, nameservers,
registrar lock, and registration unchanged. Allow DNS caches time to update.

## Connection status

Configured the following records through the signed-in Weebly domain manager on
September 7, 2026. The original website A records for @ and www were replaced.

| Type | Host in Weebly | Value |
| --- | --- | --- |
| A | @ | 162.159.143.30 |
| A | @ | 172.66.3.26 |
| CNAME | www | custom-domains.chatgpt.site |
| TXT | _openai-site-verification | openai-site-verification=1OV-whptxMDS0rxQePBxGUACL2ck1I63radSzozYGDA |
| TXT | _cf-custom-hostname | ce6a7b6f-800c-4046-b500-7d85879a7d22 |
| TXT | _openai-site-verification.www | openai-site-verification=j8-eo0XkqUQupRsHa0Qdz15uqZrkR_WcXNBQfr-rC-c |
| TXT | _cf-custom-hostname.www | 1ae8bf64-bd48-4470-abdc-b5c8aae6a909 |

Weebly requires the CNAME destination without its final dot. A submitted destination
with the final dot did not persist; the final saved record was verified in the UI
and with public DNS. Both apex A records and all four TXT values were also verified
using Google Public DNS. The returned DNS TTL was 14,400 seconds (four hours).
Existing caches may continue to use the previous records until they expire.

The five Google MX records were verified unchanged in Weebly and public DNS.
The wildcard A record, mail redirect, nameservers, registrar lock, domain registration,
and Weebly subscriptions were left unchanged. No website source or payment settings
were changed as part of this domain connection.

At 14:54 UTC, the hosting service confirmed www.ioscomuseum.com as active, with
the provider and SSL certificate also active. At 14:55 UTC, ioscomuseum.com was
still pending with SSL status pending_validation and no reported error.
Both Google Public DNS and Cloudflare's public resolver return the intended
apex A records and apex verification TXT records.

Hosting references for follow-up:
- Project: appgprj_6a674c468c208191b186b240411b0b1c
- Apex domain: appgdom_6a9ecbb306088191bd0e851827b73ab1
- WWW domain: appgdom_6a9ecbc4fe248191a50fe878c72823ac
