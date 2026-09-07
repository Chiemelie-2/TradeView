import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  initDatabase,
  findUserByEmail,
  registerUserInDatabase,
  getAllUsersFromDatabase,
  addDepositToDatabase,
  getAllDepositsFromDatabase,
  addWithdrawalToDatabase,
  getAllWithdrawalsFromDatabase,
  DatabaseUser
} from './server/db.js';

const PORT = 3000;
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || process.env.VITE_ADMIN_EMAIL || 'admin@tradeverge.live').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'admin123';

const adminProfile = {
  id: 'usr_admin_executive_001',
  fullName: 'Marcus Vance (Chief Compliance Officer)',
  email: ADMIN_EMAIL,
  phone: '+1 (555) 019-9944',
  country: 'United States',
  role: 'admin',
  isEmailVerified: true,
  emailVerifiedAt: '2025-01-01T00:00:00.000Z',
  authProvider: 'email',
  depositoryAccountId: 'TV-DEP-ADMIN-001',
  twoFactorEnabled: true,
  is2FAEnabled: true,
  kycStatus: 'approved',
  kycTier: 4,
  accountType: 'institutional',
  createdAt: '2025-01-01T00:00:00.000Z'
};

async function startServer() {
  // Initialize storage
  initDatabase();

  const app = express();
  app.use(express.json());

  // ==========================================
  // BACKEND API ROUTES
  // ==========================================

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'TradeVerge Full-Stack Engine',
      environment: process.env.NODE_ENV || 'development',
      serverTime: new Date().toISOString(),
      database: 'connected'
    });
  });

  // Verify Session / Email validation against database
  app.get('/api/auth/validate', (req: Request, res: Response) => {
    const email = (req.query.email as string || '').trim().toLowerCase();
    if (!email) {
      return res.json({ exists: false, message: 'No email provided.' });
    }
    if (email === ADMIN_EMAIL) {
      return res.json({ exists: true, role: 'admin' });
    }
    const user = findUserByEmail(email);
    if (user) {
      return res.json({ exists: true, role: 'investor' });
    }
    return res.json({ exists: false, message: 'No registered user matches this email in the database.' });
  });

  // User Registration -> Direct to database
  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { fullName, email, password, accountType, authProvider } = req.body;

    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Please enter your full legal name.' });
    }

    if (authProvider !== 'google' && (!password || password.length < 6)) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    // Check if email already registered in database
    const existing = findUserByEmail(cleanEmail);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address is already registered in the database. Please sign in.'
      });
    }

    // Disallow registering with the reserved admin email
    if (cleanEmail === ADMIN_EMAIL) {
      return res.status(400).json({
        success: false,
        message: 'This email is reserved for administrative clearance. Please sign in via administrator credentials.'
      });
    }

    const depId = 'TV-DEP-' + Math.floor(100000 + Math.random() * 900000);
    const newUser: DatabaseUser = {
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      fullName: fullName.trim(),
      email: cleanEmail,
      password: password || 'oauth_verified',
      phone: '+1 (555) 019-8832',
      country: 'United States',
      role: 'investor',
      isEmailVerified: true,
      emailVerifiedAt: new Date().toISOString(),
      authProvider: authProvider || 'email',
      depositoryAccountId: depId,
      twoFactorEnabled: true,
      is2FAEnabled: true,
      twoFactorSecret: 'TV-TOTP-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      kycStatus: 'in_progress',
      kycTier: 1,
      accountType: accountType || 'individual',
      avatarUrl: authProvider === 'google'
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256'
        : undefined,
      createdAt: new Date().toISOString()
    };

    const result = registerUserInDatabase(newUser);
    if (!result.success) {
      return res.status(400).json(result);
    }

    // Return safe user object (omit password)
    const { password: _p, ...safeUser } = newUser;
    return res.status(201).json({
      success: true,
      message: 'Account successfully registered and persisted to the database.',
      user: safeUser
    });
  });

  // User Login -> Verified strictly against database / admin details
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;

    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return res.status(400).json({ success: false, message: 'Please enter your registered email address.' });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Please enter your account password.' });
    }

    // 1. Check Administrator Credentials
    if (cleanEmail === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({
          success: false,
          message: 'Invalid administrator credentials. Access to Level 4 Console denied.'
        });
      }
      return res.json({
        success: true,
        role: 'admin',
        user: adminProfile,
        message: 'Executive Administrator Clearance Level 4 Granted.'
      });
    }

    // 2. Check Database for Investor Account
    const dbUser = findUserByEmail(cleanEmail);
    if (!dbUser) {
      return res.status(404).json({
        success: false,
        message: 'Account not found in database. Any user not registered in the database is not permitted to log in. Please register first.'
      });
    }

    // Verify Password against stored record
    if (dbUser.password && dbUser.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. The password provided does not match our database records.'
      });
    }

    const { password: _pwd, ...safeUser } = dbUser;
    return res.json({
      success: true,
      role: 'investor',
      user: safeUser,
      message: `Welcome back, ${safeUser.fullName}.`
    });
  });

  // List all registered database users (for administration)
  app.get('/api/users', (_req: Request, res: Response) => {
    const allUsers = getAllUsersFromDatabase();
    const sanitized = allUsers.map(({ password: _p, ...u }) => u);
    res.json({ success: true, count: sanitized.length, users: sanitized });
  });

  // Deposits API
  app.get('/api/deposits', (_req: Request, res: Response) => {
    const deposits = getAllDepositsFromDatabase();
    res.json({ success: true, count: deposits.length, deposits });
  });

  app.post('/api/deposits', (req: Request, res: Response) => {
    const depositData = req.body;
    if (!depositData.amount || !depositData.userEmail) {
      return res.status(400).json({ success: false, message: 'Invalid deposit submission data.' });
    }
    const saved = addDepositToDatabase({
      ...depositData,
      id: depositData.id || ('dep_' + Date.now()),
      createdAt: depositData.createdAt || new Date().toISOString()
    });
    res.status(201).json({ success: true, deposit: saved });
  });

  // Withdrawals API
  app.get('/api/withdrawals', (_req: Request, res: Response) => {
    const withdrawals = getAllWithdrawalsFromDatabase();
    res.json({ success: true, count: withdrawals.length, withdrawals });
  });

  app.post('/api/withdrawals', (req: Request, res: Response) => {
    const withdrawalData = req.body;
    if (!withdrawalData.amount || !withdrawalData.userEmail) {
      return res.status(400).json({ success: false, message: 'Invalid withdrawal data.' });
    }
    const saved = addWithdrawalToDatabase({
      ...withdrawalData,
      id: withdrawalData.id || ('wth_' + Date.now()),
      createdAt: withdrawalData.createdAt || new Date().toISOString()
    });
    res.status(201).json({ success: true, withdrawal: saved });
  });

  // ==========================================
  // VITE / STATIC CLIENT MIDDLEWARE
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TradeVerge Full-Stack Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[TradeVerge Server Startup Error]:', err);
  process.exit(1);
});
