# 🌍 Digital Will on Sui Blockchain

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Sui](https://img.shields.io/badge/Built_on-Sui_Blockchain-6FBCF0)](https://sui.io)
[![USSD](https://img.shields.io/badge/USSD_Enabled-Yes-green)](https://africastalking.com)

A **tamper-proof digital will system** for Africa, combining Next.js, MongoDB, and Sui Move to democratize estate planning.

> **Problem Solved**: 73% of Africans lack valid wills due to costly legal processes and fraud risks. This project provides an immutable, accessible solution.

## 🚀 Key Features

- 📞 **USSD Interface**: Create wills via feature phones (`*123#`)
- 🔒 **Sui Blockchain**: Immutable will storage & automated asset distribution
- 📱 **SMS Notifications**: Alert beneficiaries without internet access
- 🖋️ **Digital Signatures**: Legally verifiable with NIN integration
- 🏠 **Hybrid Assets**: Support for crypto + physical property

## 🛠 Tech Stack

| Component       | Technology                | Purpose                          |
|-----------------|---------------------------|----------------------------------|
| Frontend        | Next.js (TypeScript)      | Web/USSD interfaces              |
| Backend         | Next.js API Routes        | Auth & blockchain interactions   |
| Database        | MongoDB Atlas             | User profiles & will metadata    |
| Blockchain      | Sui Move                  | Immutable will logic             |
| Storage         | IPFS+Filecoin            | Encrypted document storage       |
| Auth            | NextAuth + JWT            | Biometric/SMS login              |

## 📂 Repository Structure
digital-will/
├── client/                 # Next.js frontend
│   ├── pages/              # App routes (USSD simulator, web portal)
│   └── styles/             # Africa-centric UI (dark mode for low-bandwidth)
│
├── server/                 # Next.js API routes
│   ├── lib/                # MongoDB models (User, WillMetadata)
│   └── api/                # /api/will, /api/auth, /api/sui-listener
│
├── sui-move/               # Smart contracts
│   ├── sources/            # Move modules (will.move, asset.move)
│   └── tests/              # Unit/integration tests
│
├── docs/                   # Architecture diagrams, legal compliance
└── docker-compose.yml      # Local dev setup (MongoDB + Sui localnet)

## 👥 Team Members
Role                    Name            Responsibilities                Contact
Developer   ||Babayemi Mercy Janet ||Smart contracts (Sui Move), Blockchain integration ||mercyjanet013@gmail.com / @github
Developer	[Dev 2 Name]	Next.js, USSD/SMS interfaces, PWA optimization	dev2@email.com / @github
Product Manager	[PM Name]	Roadmap prioritization, Legal compliance, Partnerships	pm@email.com / @linkedin
Product Designer	[Designer Name]	Africa-centric UX (USSD/Web), Asset visualization	designer@email.com