# CV Chain

A decentralized professional verification platform built on Stacks blockchain. CV Chain allows professionals to create verifiable on-chain CVs and enables companies to issue soulbound NFTs as immutable proof of employment and achievements.

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

## Smart Contracts

The blockchain layer consists of three interconnected Clarity smart contracts:

### `users.clar`
Manages user registration and CV data storage. Each user is identified by their Stacks wallet address (principal). Stores personal information, work experiences, educational background, and skills. The contract enforces a maximum of 10 entries per list to maintain reasonable gas costs.

### `companies.clar`
Handles company registration and verification. Companies can register on the platform and verify user work experiences by issuing NFT-based accreditations. Currently, companies are automatically marked as verified upon registration, with plans to implement a more robust verification process.

### `nfts.clar`
Core contract for issuing soulbound NFTs. Supports two types: CV NFTs (representing a complete professional profile) and Acreditacion NFTs (company-issued employment verification). All NFTs are permanently bound to the owner's wallet with the `soulbound` flag set to true, making them non-transferable.

Each NFT contains structured metadata including name, company, dates, description, and up to 10 supporting links. The contract maintains a counter for unique NFT IDs.

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

### Testing Smart Contracts

The contracts directory contains the blockchain implementation and test suite.

```bash
# Navigate to contracts folder
cd contracts

# Install contract testing dependencies
npm install

# Run all contract tests
npm test

# Run tests with coverage and gas cost analysis
npm run test:report

# Watch mode for development
npm run test:watch
```

**Test Coverage:**
- `users_test.ts` - User registration, CV creation, and data retrieval
- `companies_test.ts` - Company registration and experience verification
- `nfts_test.ts` - NFT minting, metadata handling, and soulbound validation

All tests run in a simulated Clarity environment using Clarinet, ensuring contract behavior is correct before deployment.

## Development Notes

**Frontend Development:**
- Mock data is used throughout the app (see `App.tsx`)
- Dark mode toggle is available in both employee and company views
- Path alias `@/` resolves to project root for clean imports
- DevMenu component provides navigation during development

**Smart Contract Constraints:**
- Wallet addresses (principals) are used as primary keys
- String length limits: names (50 chars), emails (50 chars), descriptions (100 chars)
- List size limits: max 10 items for experiences, studies, skills, and links
- NFT IDs auto-increment starting from 1

**Integration Points:**
- Frontend NFT IDs should match on-chain NFT IDs from `nfts.clar`
- User wallet addresses link frontend profiles to blockchain data
- Company verification status determines UI trust indicators
- Work3 Score calculation will integrate with blockchain credentials

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

## License

MIT

## Contact

For questions or collaboration opportunities, please open an issue in this repository.
