export interface StaySafeGuide {
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  route: string;
  markdownContent: string;
}

export const staySafe: StaySafeGuide[] = [
  {
    title: "Strong Passwords & Multi-Factor Authentication",
    slug: "passwords-mfa",
    category: "Account Security",
    summary:
      "Create stronger passwords, avoid password reuse, and use multi-factor authentication to protect important accounts.",
    description:
      "A practical guide to creating strong, unique passwords and adding multi-factor authentication to reduce the risk of account takeover.",
    route: "/stay-safe/passwords-mfa",
    markdownContent: `
# Strong Passwords & Multi-Factor Authentication

Your passwords protect some of the most important parts of your life, including email, banking, mobile money, social media, school systems, and work accounts.

A weak or reused password can give criminals access to more than one account. The good news is that a few simple habits can make your accounts much harder to take over.

## Why password security matters

Many account takeovers happen because people reuse the same password on several websites.

If one website suffers a data breach, criminals may try the stolen email and password combination on:

- Email accounts
- Banking services
- Social media
- Online shopping accounts
- Work or school systems

Your email account deserves special protection because it is often used to reset passwords for other services.

## What makes a password strong?

A strong password should be:

- Long
- Difficult for other people to guess
- Unique to that account

Avoid using:

- Your name
- Your phone number
- Your date of birth
- Your school or workplace
- \`123456\`
- \`password\`
- \`qwerty\`
- Simple patterns based on personal information

### Use a passphrase

A passphrase uses several unrelated words that are easier for you to remember.

For example, do not copy this exact phrase, but create your own structure similar to:

\`Mango-River-Lamp-Train\`

Make your own phrase unique. Never use an example published online as your actual password.

## Do not reuse passwords

Reusing passwords creates a chain reaction.

Imagine you use the same password for a shopping website, your email, and your bank account. If the shopping website is breached, criminals may test the same password on your other accounts.

### Better approach

Use a different password for every important account.

Prioritise unique passwords for:

- Your primary email account
- Banking services
- Mobile money services
- Social media
- Work accounts
- School accounts
- Cloud storage
- Password managers

## Consider using a password manager

A password manager can help you:

- Generate strong passwords
- Store unique passwords securely
- Avoid memorising every password
- Reduce password reuse

Protect your password manager with a strong, unique master password and enable multi-factor authentication where available.

## What is multi-factor authentication?

Multi-factor authentication, often called MFA or two-factor authentication, requires another verification step in addition to your password.

This may include:

- A code from an authentication app
- A security key
- A device approval prompt
- An SMS verification code

MFA can help protect your account even if someone learns your password.

## Which accounts should get MFA first?

Enable MFA on:

1. Primary email accounts
2. Banking and financial services
3. Mobile money and payment services
4. Password managers
5. Social media
6. Work and school accounts
7. Cloud storage

## Never share verification codes

Scammers may pretend to be customer support and ask for a verification code sent to your phone.

They may say they need the code to:

- Verify your identity
- Reverse a transaction
- Process a refund
- Secure your account
- Stop suspicious activity

Do not share one-time passwords or verification codes with someone who contacts you unexpectedly.

## If you think someone knows your password

Take action immediately:

1. Change the password from a trusted device.
2. Change passwords on any accounts where you reused it.
3. Check recent sign-in activity.
4. Sign out of unfamiliar devices.
5. Enable MFA.
6. Check your recovery email address and phone number.
7. Contact the service provider if you cannot regain access.

## Quick checklist

- [ ] Use a unique password for every important account.
- [ ] Make passwords long and difficult to guess.
- [ ] Protect your email account especially well.
- [ ] Consider using a password manager.
- [ ] Enable MFA wherever possible.
- [ ] Never share verification codes.
- [ ] Review account recovery information regularly.

## Related guides

- [Email Safety](/stay-safe/email-safety)
- [Social Media Privacy](/stay-safe/social-media-privacy)
- [Phishing & Scams](/cyber-threats/phishing-scams)
- [Preserve Evidence](/report/evidence)
`,
  },

  {
    title: "Safe Online Payments & Mobile Money",
    slug: "online-payments",
    category: "Financial Security",
    summary:
      "Learn how to verify payment requests, avoid fake shops and payment links, and protect your mobile money and banking information.",
    description:
      "A practical guide to making safer online payments and mobile money transactions while recognising common financial scams.",
    route: "/stay-safe/online-payments",
    markdownContent: `
# Safe Online Payments & Mobile Money

Online payments and mobile money make everyday life easier, but criminals also use fake shops, fake payment pages, impersonation messages, and social engineering to steal money.

Before paying, slow down and confirm who you are dealing with.

A few minutes of checking can prevent a costly mistake.

## Pause before you pay

Scammers often create urgency.

They may claim that:

- Your account will be suspended
- You have won a prize
- A parcel is waiting
- A payment must be made immediately
- A family member needs emergency money
- A limited-time offer is about to expire

Before sending money:

1. Stop.
2. Read the request carefully.
3. Verify the situation independently.
4. Contact the organisation using a trusted phone number, app, or website.

Do not rely only on the contact details included in the suspicious message.

## Check websites before entering payment details

A professional-looking website is not automatically legitimate.

Before entering payment information:

- Read the website address carefully.
- Look for spelling changes.
- Be suspicious of unusual domain names.
- Avoid unexpected links sent through SMS or social media.
- Use official websites or trusted bookmarks where possible.

### Important reminder

A padlock icon or HTTPS connection does not prove that a website is trustworthy. Scam websites can also use encrypted connections.

## Be careful with social media shops

Some genuine businesses operate through social media, but criminals can create fake pages using:

- Stolen product photos
- Copied reviews
- Fake customer comments
- Attractive but unrealistic prices

Before buying:

- Look for a history of genuine activity.
- Search for independent reviews.
- Ask questions about the product.
- Check whether the seller has consistent contact information.
- Be cautious when prices seem far below normal market prices.

Do not trust a seller simply because a page has many followers.

## Confirm the recipient before sending money

Before approving a transaction:

- Check the recipient name.
- Check the phone number or account number.
- Check the payment amount.
- Verify new payment details through another trusted channel.

For large or unusual payments, take extra time to confirm the recipient.

## Protect your PIN, passwords, and codes

Never share:

- Your mobile money PIN
- Your banking password
- Your card security information
- One-time verification codes

A scammer may claim they need the information to:

- Reverse a transaction
- Process a refund
- Unlock an account
- Verify your identity
- Stop suspicious activity

Treat verification codes like passwords.

## Avoid unexpected payment links

You may receive a message saying you need to:

- Pay a delivery fee
- Renew an account
- Receive a refund
- Avoid account suspension

Instead of opening the payment link, independently open the official app or website and check whether the request is genuine.

## Common payment scam warning signs

Watch for:

- Pressure to act immediately
- Requests to keep a transaction secret
- Unexpected prizes or refunds
- Requests to send money in order to receive money
- Last-minute changes to payment instructions
- Requests for your PIN or verification code
- Prices that seem too good to be true
- Requests to pay outside a normal platform

## Use secure devices

When handling financial transactions:

- Keep your phone or computer updated.
- Use a screen lock.
- Avoid shared public computers.
- Be cautious with public Wi-Fi.
- Log out when using a device that is not exclusively yours.

## If you sent money to the wrong person or a scammer

Act immediately:

1. Contact your bank, mobile money provider, or payment service.
2. Explain exactly what happened.
3. Provide transaction details and reference numbers.
4. Ask whether the transaction can be stopped or investigated.
5. Save screenshots, messages, receipts, and contact details.
6. Do not send more money to someone promising to recover your funds.
7. Report the incident through the appropriate channels.

## Quick checklist

- [ ] Pause before making an urgent payment.
- [ ] Verify businesses independently.
- [ ] Check recipient details carefully.
- [ ] Never share your PIN.
- [ ] Never share one-time verification codes.
- [ ] Avoid unexpected payment links.
- [ ] Keep transaction records.
- [ ] Act quickly if you believe you have been scammed.

## Related guides

- [Mobile Money Fraud](/cyber-threats/mobile-money-fraud)
- [Phishing & Scams](/cyber-threats/phishing-scams)
- [Recognize an Incident](/report/recognize)
- [Incident Reporting Channels](/report/channels)
`,
  },

  {
    title: "Device Security",
    slug: "device-security",
    category: "Device Protection",
    summary:
      "Protect your phone, computer, tablet, and the information stored on them with updates, screen locks, safe apps, and backups.",
    description:
      "A practical guide to keeping personal and work devices secure against theft, malware, unsafe apps, and unauthorised access.",
    route: "/stay-safe/device-security",
    markdownContent: `
# Device Security

Your phone and computer may contain:

- Messages
- Photos
- Passwords
- Financial applications
- Work documents
- School records
- Personal contacts
- Access to other online accounts

Basic device security helps protect both the device and everything connected to it.

## Keep software updated

Updates often fix security weaknesses that criminals already know about.

Keep updated:

- Your phone operating system
- Your computer operating system
- Your browser
- Important applications
- Your router where applicable

Turn on automatic updates where practical.

Remove applications you no longer use.

## Use a strong screen lock

A screen lock is one of the first protections against unauthorised access.

Use:

- A strong PIN
- A password
- Biometric protection where available

Avoid obvious PINs such as:

- \`1234\`
- \`0000\`
- Your birth year

Set your device to lock automatically after a short period of inactivity.

## Install apps carefully

Malicious apps may:

- Steal information
- Display fake login pages
- Abuse permissions
- Monitor activity
- Attempt to access financial information

Before installing an app:

1. Use an official app store or trusted source.
2. Check the developer.
3. Review permissions.
4. Ask whether the permissions make sense for the app.
5. Remove apps you do not recognise.

Be especially cautious when an app asks for unnecessary access to:

- SMS messages
- Contacts
- Accessibility controls
- Microphone
- Camera
- Files

## Review app permissions

Regularly check which applications can access:

- Your location
- Camera
- Microphone
- Contacts
- SMS messages
- Files and storage

Only give an app access to information it genuinely needs.

## Back up important information

Backups can help you recover after:

- Device theft
- Device loss
- Hardware failure
- Accidental deletion
- Ransomware

Back up important:

- Photos
- Documents
- Business records
- School work
- Contacts

Make sure you can restore information from your backup.

## Be careful with links and downloads

A device can become compromised after:

- Opening a malicious attachment
- Downloading unsafe software
- Installing an untrusted application
- Entering credentials into a fake website

Stay safer by:

- Checking unexpected attachments.
- Avoiding unofficial software downloads.
- Closing suspicious pop-ups.
- Avoiding remote-access software requested by unexpected callers.

Do not install remote-access software because someone unexpectedly calls and claims to be technical support.

## Protect devices from theft and loss

Take these steps:

- Do not leave devices unattended in public.
- Enable device location features.
- Know how to remotely lock your device.
- Know how to erase a lost device remotely where appropriate.
- Record important device information in a safe place.

## Secure your home Wi-Fi

Your router connects many devices to the internet.

Protect it by:

- Changing the default administrator password.
- Using a strong Wi-Fi password.
- Keeping router software updated.
- Limiting who has access.
- Using a guest network where available.

## Warning signs that a device may have a problem

Watch for:

- Unknown apps appearing.
- Repeated pop-ups.
- Unusual battery use.
- Unexpected data use.
- Security settings changing.
- Messages sent without your knowledge.
- Unknown devices signed into your accounts.
- Unexpected password requests.

## If your device is lost, stolen, or compromised

Take action quickly:

1. Use another trusted device.
2. Change passwords for important accounts.
3. Sign out of unfamiliar sessions.
4. Locate or remotely lock the device where possible.
5. Contact your mobile provider if your SIM may be at risk.
6. Monitor financial accounts.
7. Notify your workplace or school if sensitive information may be affected.
8. Preserve evidence before resetting the device if you need to report the incident.

## Quick checklist

- [ ] Install updates promptly.
- [ ] Use a strong screen lock.
- [ ] Install apps from trusted sources.
- [ ] Review app permissions.
- [ ] Back up important files.
- [ ] Be careful with links and downloads.
- [ ] Enable device location features.
- [ ] Protect your home Wi-Fi.

## Related guides

- [Strong Passwords & MFA](/stay-safe/passwords-mfa)
- [Email Safety](/stay-safe/email-safety)
- [Phishing & Scams](/cyber-threats/phishing-scams)
- [Preserve Evidence](/report/evidence)
`,
  },

  {
    title: "Email Safety",
    slug: "email-safety",
    category: "Communication Security",
    summary:
      "Recognise suspicious emails, avoid phishing links and attachments, and protect your email account from takeover.",
    description:
      "A plain-English guide to using email safely, recognising phishing attempts, checking suspicious messages, and protecting your inbox.",
    route: "/stay-safe/email-safety",
    markdownContent: `
# Email Safety

Email is often the key to your other online accounts.

If someone gains access to your email, they may be able to reset passwords for banking, social media, shopping, work, and school services.

Protecting your email account should be a priority.

## Be suspicious of unexpected messages

A phishing email may pretend to come from:

- Your bank
- A government organisation
- A delivery company
- Your workplace
- Your school
- A social media platform
- A well-known online service

The message may ask you to:

- Click a link
- Download a file
- Enter your password
- Confirm account details
- Send money
- Share a verification code

Do not act immediately.

## Check the sender carefully

Before trusting an email:

- Read the sender's address.
- Look for unusual spelling.
- Be cautious of addresses that only look similar to the real organisation.
- Remember that a familiar display name does not guarantee the email is genuine.

If you are unsure, contact the organisation independently.

## Be careful with links

Before clicking a link:

- Ask whether you expected the message.
- Check where the link is taking you where your device allows you to inspect it.
- Do not sign in after following an unexpected link.
- Open the official website independently if you need to check your account.

A phishing website may look almost identical to the real service.

## Be careful with attachments

Unexpected attachments can contain malicious software.

Do not open an attachment simply because:

- The email looks urgent.
- The sender name looks familiar.
- The message says you must act immediately.

Verify unexpected attachments through another communication channel if possible.

## Watch for phishing warning signs

Common warning signs include:

- Urgent language
- Threats about account closure
- Unexpected prizes
- Requests for passwords
- Requests for verification codes
- Poor spelling or unusual wording
- Unexpected attachments
- Suspicious links

A polished message can still be fraudulent, so do not rely only on spelling mistakes.

## Protect your email account

Use:

- A strong, unique password
- Multi-factor authentication
- Accurate recovery information

Regularly review:

- Recent sign-ins
- Active devices
- Recovery email addresses
- Recovery phone numbers

## If you clicked a suspicious link

Do not panic.

Take these steps:

1. Close the suspicious page.
2. Do not enter your password or payment details.
3. If you entered your password, change it immediately.
4. Enable MFA if it is not already enabled.
5. Check account activity.
6. Sign out of unfamiliar devices.
7. Change passwords on other accounts if you reused the password.

## If you opened a suspicious attachment

If possible:

1. Disconnect from the internet if you believe malware may be active.
2. Do not enter passwords into new prompts.
3. Seek help from a trusted technical support person.
4. Change important passwords from another trusted device if necessary.
5. Preserve evidence if you need to report the incident.

## Quick checklist

- [ ] Be suspicious of unexpected emails.
- [ ] Check sender addresses carefully.
- [ ] Avoid unexpected links.
- [ ] Verify unusual attachments.
- [ ] Never share passwords or verification codes by email.
- [ ] Use MFA on your email account.
- [ ] Review account activity regularly.

## Related guides

- [Strong Passwords & MFA](/stay-safe/passwords-mfa)
- [Phishing & Scams](/cyber-threats/phishing-scams)
- [Social Engineering](/cyber-threats/social-engineering)
- [Recognize an Incident](/report/recognize)
- [How to Preserve Evidence](/report/evidence)
`,
  },
];

export default staySafe;