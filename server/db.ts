import fs from 'fs';
import path from 'path';

export interface DatabaseUser {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  country?: string;
  role: 'investor' | 'admin';
  isEmailVerified: boolean;
  emailVerifiedAt?: string;
  authProvider: 'email' | 'google';
  depositoryAccountId: string;
  twoFactorEnabled: boolean;
  is2FAEnabled: boolean;
  twoFactorSecret?: string;
  kycStatus: 'not_started' | 'in_progress' | 'submitted' | 'processing' | 'approved' | 'rejected' | 'additional_info_required';
  kycTier: number;
  accountType: 'individual' | 'institutional' | 'family_office';
  avatarUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface DatabaseDeposit {
  id: string;
  userId: string;
  userFullName: string;
  userEmail: string;
  methodId: string;
  methodName: string;
  methodType: string;
  amount: number;
  currencyOrAsset: string;
  txHashOrReference: string;
  senderAccountOrWallet?: string;
  proofDocumentUrl?: string;
  proofFileName?: string;
  customerNotes?: string;
  status: 'proof_submitted' | 'processing' | 'cleared' | 'rejected';
  createdAt: string;
}

export interface DatabaseWithdrawal {
  id: string;
  userId: string;
  userFullName: string;
  userEmail: string;
  amount: number;
  currency: string;
  destinationType: 'bank' | 'crypto';
  destinationDetails: string;
  fee: number;
  netAmount: number;
  status: 'requested' | 'compliance_review' | 'cleared' | 'rejected';
  txHashOrReference?: string;
  createdAt: string;
}

export interface DatabaseTransaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  currency: string;
  direction: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed' | 'processing';
  description: string;
  referenceId?: string;
  category?: string;
  createdAt: string;
}

export interface DatabaseSchema {
  users: DatabaseUser[];
  deposits: DatabaseDeposit[];
  withdrawals: DatabaseWithdrawal[];
  transactions: DatabaseTransaction[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure database file exists
export function initDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      users: [],
      deposits: [],
      withdrawals: [],
      transactions: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file, re-initializing:', err);
    const fallback: DatabaseSchema = { users: [], deposits: [], withdrawals: [], transactions: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(fallback, null, 2), 'utf8');
    return fallback;
  }
}

export function readDatabase(): DatabaseSchema {
  return initDatabase();
}

export function writeDatabase(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write to database.json:', err);
  }
}

// User CRUD
export function findUserByEmail(email: string): DatabaseUser | undefined {
  const db = readDatabase();
  const cleanEmail = email.trim().toLowerCase();
  return db.users.find(u => u.email.trim().toLowerCase() === cleanEmail);
}

export function registerUserInDatabase(user: DatabaseUser): { success: boolean; message?: string; user?: DatabaseUser } {
  const db = readDatabase();
  const cleanEmail = user.email.trim().toLowerCase();

  const existing = db.users.find(u => u.email.trim().toLowerCase() === cleanEmail);
  if (existing) {
    return { success: false, message: 'An account with this email address is already registered in the database.' };
  }

  db.users.unshift(user);
  writeDatabase(db);
  return { success: true, user };
}

export function getAllUsersFromDatabase(): DatabaseUser[] {
  const db = readDatabase();
  return db.users;
}

// Deposits
export function addDepositToDatabase(deposit: DatabaseDeposit): DatabaseDeposit {
  const db = readDatabase();
  db.deposits.unshift(deposit);
  writeDatabase(db);
  return deposit;
}

export function getAllDepositsFromDatabase(): DatabaseDeposit[] {
  const db = readDatabase();
  return db.deposits;
}

// Withdrawals
export function addWithdrawalToDatabase(withdrawal: DatabaseWithdrawal): DatabaseWithdrawal {
  const db = readDatabase();
  db.withdrawals.unshift(withdrawal);
  writeDatabase(db);
  return withdrawal;
}

export function getAllWithdrawalsFromDatabase(): DatabaseWithdrawal[] {
  const db = readDatabase();
  return db.withdrawals;
}
