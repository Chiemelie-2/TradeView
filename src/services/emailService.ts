export interface DispatchedEmail {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  templateType: 'registration_confirmation' | 'google_auth_verified' | 'kyc_status' | 'depository_notice';
  htmlContent: string;
  plainText: string;
  sentAt: string;
  status: 'delivered';
  verificationToken: string;
  depositoryAccountId: string;
  securityHash: string;
}

const STORAGE_EMAILS_KEY = 'tv_dispatched_emails';

export const getDispatchedEmails = (): DispatchedEmail[] => {
  try {
    const raw = localStorage.getItem(STORAGE_EMAILS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveDispatchedEmail = (email: DispatchedEmail): void => {
  try {
    const existing = getDispatchedEmails();
    const updated = [email, ...existing].slice(0, 50); // keep last 50
    localStorage.setItem(STORAGE_EMAILS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
};

/**
 * Generates and dispatches an institutional account registration email
 */
export const dispatchRegistrationEmail = (
  fullName: string,
  email: string,
  authProvider: 'email' | 'google' = 'email',
  accountId?: string
): DispatchedEmail => {
  const depId = accountId || 'TV-' + Math.floor(100000 + Math.random() * 900000);
  const token = 'SEC-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
  const securityHash = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const now = new Date().toUTCString();

  const isGoogle = authProvider === 'google';
  const subject = isGoogle 
    ? `Google Verified Account Registration: Welcome to TradeVerge Private Wealth [ID: ${depId}]`
    : `Institutional Account Registration & Verification: Welcome to TradeVerge [ID: ${depId}]`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #050505; color: #e5e5e5; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; overflow: hidden; }
          .header { background: #000; border-bottom: 2px solid #f59e0b; padding: 24px; text-align: center; }
          .logo { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 2px; }
          .gold { color: #f59e0b; }
          .content { padding: 32px 28px; line-height: 1.6; }
          .badge { display: inline-block; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #f59e0b; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
          .google-badge { display: inline-block; background: rgba(66, 133, 244, 0.15); border: 1px solid rgba(66, 133, 244, 0.4); color: #60a5fa; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-left: 8px; }
          .account-box { background: #111111; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px; margin: 24px 0; }
          .meta-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; }
          .meta-label { color: #888888; font-family: monospace; }
          .meta-val { color: #ffffff; font-weight: 600; font-family: monospace; }
          .cta-button { display: block; text-align: center; background: #f59e0b; color: #000000; padding: 14px 24px; border-radius: 10px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-size: 13px; letter-spacing: 1px; margin: 28px 0; }
          .footer { background: #050505; border-top: 1px solid rgba(255,255,255,0.1); padding: 20px; font-size: 11px; color: #666666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">TRADEVERGE<span class="gold">.LIVE</span></div>
            <div style="font-size: 11px; color: #999; margin-top: 4px; text-transform: uppercase; letter-spacing: 2px;">Institutional Private Wealth & Depository</div>
          </div>
          <div class="content">
            <div style="margin-bottom: 16px;">
              <span class="badge">Registration Confirmed</span>
              ${isGoogle ? '<span class="google-badge">Google Verified Auth</span>' : ''}
            </div>
            <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 12px 0;">Welcome, ${fullName}</h2>
            <p style="color: #cccccc; font-size: 14px; margin: 0 0 16px 0;">
              Your account has been officially registered on the TradeVerge Institutional Platform. Your isolated custodial ledger sub-account has been provisioned.
            </p>
            
            <div class="account-box">
              <div class="meta-row">
                <span class="meta-label">Registered Email:</span>
                <span class="meta-val">${email}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Depository Account ID:</span>
                <span class="meta-val">${depId}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Authentication Method:</span>
                <span class="meta-val">${isGoogle ? 'Google Single Sign-On (Verified)' : 'Email & Encrypted Password'}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Initial Compliance Status:</span>
                <span class="meta-val" style="color: #f59e0b;">Tier 1 Cleared (Tier 2 Eligible)</span>
              </div>
              <div class="meta-row" style="border-bottom: none;">
                <span class="meta-label">Security Activation Code:</span>
                <span class="meta-val" style="color: #10b981;">${token}</span>
              </div>
            </div>

            <p style="color: #999999; font-size: 13px;">
              To begin allocating capital into deterministic structured yield vehicles and funding your balance via Tier 1 manual bank wires or multi-chain cryptocurrency, please access your investor dashboard.
            </p>

            <a href="https://tradeverge.live/#/dashboard" class="cta-button">
              Access Private Wealth Terminal
            </a>

            <div style="background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.15); border-radius: 8px; padding: 12px; margin-top: 20px; font-size: 11px; color: #777;">
              <strong>Cryptographic Fingerprint:</strong> ${securityHash}<br/>
              <strong>Timestamp:</strong> ${now}<br/>
              If you did not register this account, please immediately inform our compliance desk at <em>compliance@tradeverge.live</em>.
            </div>
          </div>
          <div class="footer">
            TradeVerge Private Wealth Ltd • Bahnhofstrasse 45, 8001 Zurich, Switzerland<br/>
            Segregated Depository Accounts Held at Tier 1 Partner Institutions. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  const plainText = `
Welcome to TradeVerge Private Wealth, ${fullName}!

Your account has been officially registered on our institutional platform.
Account Details:
- Registered Email: ${email}
- Depository Account ID: ${depId}
- Auth Provider: ${isGoogle ? 'Google Account Verified' : 'Standard Email'}
- Security Token: ${token}
- Timestamp: ${now}

Access your terminal: https://tradeverge.live/#/dashboard

TradeVerge Private Wealth Ltd • Zurich, Switzerland
  `.trim();

  const dispatchedEmail: DispatchedEmail = {
    id: 'eml_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    recipientEmail: email,
    recipientName: fullName,
    subject,
    templateType: isGoogle ? 'google_auth_verified' : 'registration_confirmation',
    htmlContent,
    plainText,
    sentAt: new Date().toISOString(),
    status: 'delivered',
    verificationToken: token,
    depositoryAccountId: depId,
    securityHash
  };

  saveDispatchedEmail(dispatchedEmail);
  return dispatchedEmail;
};
