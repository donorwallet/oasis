# Donor Matching Wallet - Software Specification

## 1. Project Overview

### 1.1 Application Name
- **English**: Oasis Donation
- **Traditional Chinese**: 浪浪綠洲捐助

### 1.2 Purpose
A mobile-responsive web application for matching donors with stray animal care needs, featuring bilingual support (English/Traditional Chinese), blockchain integration, and donation tracking.

### 1.3 Target Platform
- Mobile-first responsive web application
- HTML/CSS/JavaScript implementation
- Cross-browser compatibility required

## 2. Design Requirements

### 2.1 Visual Design
- **Theme**: Funny, colorful design with gradient light background
- **Effects**: Glowing elements, hover effects, shadowed boxes
- **Communication**: Icon and symbol-heavy interface with minimal text
- **Responsiveness**: Mobile view area optimization

### 2.2 Internationalization
- Bilingual support: English and Traditional Chinese
- Language selection determines interface language throughout the app
- Language persistence across sessions

## 3. Application Architecture

### 3.1 Page Structure
1. **Intro Page** - Landing/language selection
2. **Matching Page** - Donation item and animal selection
3. **Donation Page** - Payment processing and confirmation
4. **About Page** - Organization information and donation summary

### 3.2 Navigation Components
- **Top Bar**: Fixed semi-transparent navigation (Pages 2-4)
  - Scan QR Code → Scan Modal
  - Donation → Donation Page
  - Member Settings → Settings Modal
  - Contact Us → About Page
- **Footer Bar**: Transparent navigation with previous/next page controls

## 4. Detailed Page Specifications

### 4.1 Intro Page

#### 4.1.1 Layout
- **Header**: Bilingual title display
  - "浪浪綠洲捐助"
  - "Oasis Donation"
- **Main Content**: Single frameless image (70% height)
  - Auto-horizontal sliding for images wider than viewport
  - Continuous loop display
- **Footer**: Two language selection buttons
  - "Start" (English) → Sets language to English
  - "開始" (Traditional Chinese) → Sets language to Traditional Chinese

#### 4.1.2 Functionality
- Language detection based on button selection
- Automatic navigation to Matching Page
- Image carousel for visual appeal

### 4.2 Matching Page

#### 4.2.1 Layout Structure
Two main sections with box containers

#### 4.2.2 Section 1: Selection Box ("請選擇")
- **NEEDS Row** (Top carousel):
  - 營養糧食 $100/份 (Nutritional Food)
  - 醫療保險 $268/月 (Medical Insurance) 
  - 智能頸圈 $330/件 (Smart Collar)
  - 全面助養 $489/月 (Full Adoption)

- **LIVES Row** (Bottom carousel):
  - 綠洲浪浪 (All Strays)
  - 松鼠狗6歲 (Squirrel Dog, 6 years)
  - 八哥狗8歲 (Pug Dog, 8 years)
  - 爹利狗14歲 (Terrier Dog, 14 years)

#### 4.2.3 Card Specifications
- Square images (25% height)
- Shadow box styling
- Click triggers Select Modal
- Visual feedback for selected state

#### 4.2.4 Section 2: Support Box ("請支持")
Three rows of functionality:

**Row 1**: Donation button with gradient color effects
**Row 2**: 
- Left: Member greeting ("Hello <member>" or "I am a guest")
- Right: Login/Member Settings button
**Row 3**:
- Left: Total Donations display → Total Donations Modal
- Right: Used Donations display → Used Donations Modal

#### 4.2.5 Data Output Format
```json
{
  "NEEDS": ["FOOD:$100", "INSURANCE:$268", "COLLAR:$330", "ADOPTION:$489"],
  "LIVES": ["ALLSTRAY:1", "SQUIRREL:1", "PUG:1", "TERRIER:1"]
}
```

### 4.3 Modal Specifications

#### 4.3.1 Select Modal
- Large card image (80% width)
- Detailed card information
- Select/Unselect toggle button
- Cancel button
- Return to Matching Page with selection state

#### 4.3.2 Settings Modal
- Login form (username: alice, password: 2345)
- Member information display:
  - Member name: Alice
  - Blockchain address
  - Membership level: Gold
  - Membership expiry: 2029-12-31
- Download receipt button (disabled)
- Login/Logout functionality

#### 4.3.3 Total Donations Modal
- Stablecoin smart contract explanation
- Mock smart contract address
- "View Stablecoin Contract" button → quantumbesu.web.app/contract/oasisHKD
- Recent 10 donations list with dates and amounts

#### 4.3.4 Used Donations Modal
- Quantum-safe blockchain explanation  
- Mock blockchain account address
- "View blockchain data" button → quantumbesu.web.app/account/allstray
- Purchase history with dates and items

#### 4.3.5 Scan Modal
- Camera activation
- QR code scanning functionality
- Content display
- Confirm/Cancel buttons

### 4.4 Donation Page

#### 4.4.1 Section 1: Thank You Box ("多謝捐款")
- Import donation list from Matching Page or Scan Modal
- Calculate total amount: `sum(NEEDS values) × total(LIVES count)`
- Display scrolling text of selected items
- "Pay by STRIPE" button → Payment Modal

#### 4.4.2 Payment Modal
- Visa payment simulation interface
- Input fields:
  - Visa card number
  - Billing address
  - Cardholder name
  - Email
- Pay button (disabled for mockup)
- Cancel button

#### 4.4.3 Section 2: Donation Complete Box ("捐款完成")
- Animated circular green checkmark
- Mock blockchain transaction data:
  - Timestamp
  - Amount
  - Block number
  - Transaction hash
- Update total donations data

### 4.5 About Page

#### 4.5.1 Section 1: Donation Summary
- Calculate Oasis total donations (Guest + Alice)
- Calculate Oasis used donations (Guest + Alice)
- Smart contract explanation
- Contract address with view button
- Nested circular visualization:
  - **Box 1** (66% width): Total Oasis donations
  - **Box 2** (proportional): Used donations ratio
  - **Box 3** (10% width): Current member used donations

#### 4.5.2 Section 2: About Us
**Vision Statement**: 
"當每一隻流浪犬的項圈都在守護家的平安,當沙頭角的數據成為千萬寵物的健康燈塔—— 這便是荒地重生為科技善意的終極證明。"

**Organization Details**:
- 執行機構: 香港犬隻領養配對及教育協會有限公司 (CR No. 2937991)
- 政府註冊NGO, Chapter 88 慈善團體豁免繳稅登記
- 科技合作夥伴: Real Matter Technology Limited
- 聯絡人: 陳先生
- 電話: 852-63600336

## 5. Mock Data Specifications

### 5.1 User Data
- **Guest**: Total donations $5,389,730, Used donations $3,897,304
- **Alice**: Total donations $5,389, Used donations $1,333

### 5.2 Care Item Details
- 營養糧食 $100/份: 一日五餐非公仔麵
- 醫療保險 $268/月: 睇醫生及手術  
- 智能頸圈 $330/件: 自動健康檢查
- 全面助養 $489/月: 即時活動健康資料

### 5.3 Animal Details
- 綠洲浪浪: 園區內所有需要照顧的浪浪
- 松鼠狗6歲: 健康快樂 一隻眼疾
- 八哥狗8歲: 精神活躍 間中肚痛  
- 爹利狗14歲: 老當益壯 右腳不靈活

## 6. Technical Requirements

### 6.1 Core Technologies
- HTML5 with semantic markup
- CSS3 with animations and responsive design
- Vanilla JavaScript for interactivity
- Mobile-first responsive design

### 6.2 Key Features
- Image carousel with auto-sliding
- Modal dialog system
- Form validation and state management
- JSON data handling
- Simulated payment processing
- Blockchain data visualization

### 6.3 External Dependencies
- Camera API for QR code scanning
- External links to quantumbesu.web.app
- Stripe payment interface simulation

### 6.4 Browser Storage Restrictions
- No localStorage or sessionStorage usage
- All data stored in memory during session
- State management through JavaScript variables

## 7. User Experience Flow

### 7.1 Primary User Journey
1. **Landing** → Language selection
2. **Matching** → Select needs and animals
3. **Donation** → Payment processing  
4. **Confirmation** → Transaction complete

### 7.2 Secondary Features
- Member authentication system
- QR code scanning integration
- Donation history tracking
- Blockchain transparency features

## 8. Development Notes

### 8.1 Implementation Priority
1. Core page structure and navigation
2. Language switching functionality
3. Selection and modal systems
4. Payment simulation
5. Data visualization components

### 8.2 Testing Requirements
- Cross-device responsiveness
- Language switching accuracy
- Modal functionality
- Form validation
- Animation performance

This specification provides a comprehensive foundation for developing the Donor Matching Wallet web application with all requested features and functionality.