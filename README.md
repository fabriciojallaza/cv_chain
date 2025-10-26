# CV Chain

A decentralized professional verification platform built on Stacks blockchain. CV Chain allows professionals to create verifiable on-chain CVs and enables companies to issue soulbound NFTs as immutable proof of employment and achievements.

🌐 **Live Demo:** [https://cvchain.vercel.app/](https://cvchain.vercel.app/)

## Overview

Traditional CVs rely on trust and manual verification. CV Chain solves this by putting professional credentials directly on the blockchain, where they can be verified instantly and cannot be forged. Companies issue NFTs to employees as proof of their work experience, creating a permanent, tamper-proof professional record.

## Key Features

**For Professionals:**
- Create and maintain on-chain CVs with work experience, education, and skills
- Receive soulbound NFTs from verified companies as proof of employment
- Build a verifiable Work3 Score based on blockchain-verified credentials
- Apply for bounties and projects with cryptographically proven experience

**For Companies:**
- Register as a verified organization on the platform
- Issue NFT-based employment certificates to current and former employees
- Post bounties and review applications with verifiable credentials
- Manage accredited employees and track their professional growth

**Soulbound NFTs:**
- Non-transferable tokens permanently bound to the recipient's wallet
- Contain detailed metadata: role, company, dates, description, and supporting links
- Cannot be faked, transferred, or removed
- Serve as permanent proof of professional achievements

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling and development
- Tailwind CSS + shadcn/ui component library
- Framer Motion for animations

**Smart Contracts:**
- Clarity (Stacks blockchain native language)
- Clarinet SDK for testing and deployment
- Vitest for contract unit tests

## Project Structure

```
cv_chain/
├── components/          # React UI components
│   ├── ui/             # Reusable shadcn components
│   ├── AuthScreen.tsx  # Login/registration
│   ├── EmployeeView.tsx
│   ├── CompanyView.tsx
│   └── SplashScreen.tsx
├── contracts/          # Stacks smart contracts (Clarity)
│   ├── contracts/      # Contract source files (.clar)
│   ├── tests/          # Contract test suites
│   └── Clarinet.toml   # Blockchain configuration
├── styles/
└── App.tsx             # Main application entry
```

## Smart Contracts Architecture

The blockchain layer consists of three interconnected Clarity smart contracts that work together to create a complete credential verification system:

### Contract Flow Overview

```
1. User Registration (users.clar)
   ↓
2. Company Registration & Verification (companies.clar)
   ↓
3. NFT Credential Issuance (nfts.clar)
   ↓
4. Verifiable Professional Profile
```

### `users.clar` - Professional Profile Management

**Purpose:** Creates and manages user profiles with comprehensive professional information.

**Key Functions:**
- `register-user`: Creates a new user profile linked to a Stacks wallet address (principal)
- `create-cv`: Builds a complete CV with work experiences, education, and skills
- `get-user`: Retrieves user profile data for verification

**Data Storage:**
- Personal information (name, email)
- Work experiences (up to 10 entries)
- Educational background (up to 10 entries)
- Professional skills (up to 10 entries)
- CV completion status

**Flow:** Users register with their wallet address → Create CV with professional details → CV marked as complete when all fields are filled

### `companies.clar` - Company Verification System

**Purpose:** Manages company registration and enables them to issue verified credentials.

**Key Functions:**
- `register-company`: Registers a company on the platform with business details
- `get-company`: Retrieves company verification status and information
- `verify-user-experience`: Allows verified companies to accredit employee work experiences

**Data Storage:**
- Company name and registration details
- Verification status (currently auto-verified)
- Contact information and metadata

**Flow:** Company registers on platform → Automatically receives "verified" status → Can now issue NFT credentials to employees

### `nfts.clar` - Soulbound Credential NFTs

**Purpose:** Core contract that mints non-transferable NFT credentials as permanent proof of achievements.

**NFT Types:**
1. **CV NFTs**: Represent a complete professional profile
2. **Acreditacion NFTs**: Company-issued employment verification certificates

**Key Functions:**
- `mint-nft`: Creates a new soulbound NFT with comprehensive metadata
- `get-nft`: Retrieves NFT details and verification data
- `soulbound-check`: Confirms NFT is permanently bound to owner

**NFT Metadata Structure:**
- Name (professional title or credential name)
- Company/Institution name
- Start and end dates
- Detailed description of role/achievement
- Supporting links (up to 10 URLs for portfolios, projects, etc.)
- Soulbound flag (always `true`)

**Flow:** Verified company initiates NFT issuance → NFT minted with detailed metadata → NFT permanently bound to employee's wallet → Employee's Work3Score automatically updated

### Complete Credential Issuance Flow

```
┌─────────────────┐
│  1. Employee    │
│  Registers      │──────┐
│  (users.clar)   │      │
└─────────────────┘      │
                         ▼
┌─────────────────┐    ┌─────────────────────┐
│  2. Company     │    │  Employee creates   │
│  Registers &    │───▶│  CV profile         │
│  Gets Verified  │    │  (users.clar)       │
│  (companies.clar)│    └─────────────────────┘
└─────────────────┘              │
        │                        │
        │                        ▼
        │              ┌─────────────────────┐
        └─────────────▶│  3. Company issues  │
                       │  Soulbound NFT      │
                       │  (nfts.clar)        │
                       └─────────────────────┘
                                 │
                                 ▼
                       ┌─────────────────────┐
                       │  4. NFT Credential  │
                       │  Permanently on     │
                       │  Blockchain         │
                       └─────────────────────┘
```

**Security Features:**
- All NFTs are soulbound (non-transferable)
- Wallet addresses used as immutable primary keys
- String length limits prevent blockchain bloat
- List size constraints maintain reasonable gas costs

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cv_chain

# Install frontend dependencies
npm install
```

### Running the Frontend

```bash
# Start the development server
npm run dev

# The app will open at http://localhost:3000
# Use the DevMenu (bottom-right corner) to navigate between views
```

The frontend runs with mock data to demonstrate functionality without blockchain connection. The DevMenu allows quick switching between employee and company views for testing.

## Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## Future Enhancements

- Stacks wallet integration (Hiro Wallet, Xverse)
- Real-time blockchain data synchronization
- Enhanced company verification process (KYB)
- Work3 Score algorithm implementation
- Multi-signature NFT issuance for added trust
- IPFS integration for storing detailed work portfolios
- DAO-based dispute resolution for contested credentials

## Language Support

The application UI is in Spanish, with plans to add multi-language support. Smart contract comments are also in Spanish.
