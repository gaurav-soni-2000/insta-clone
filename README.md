# React Native Instagram-Style Local Demo App

A high-fidelity **Instagram-style local prototype** built with **React Native**, **Expo SDK 57**, **TypeScript**, and **React Navigation**.

This application is strictly designed for **local/demo-only environments** and runs completely offline with **zero external backend, no database, no Firebase/Supabase, and no real social media APIs**. Everything is configured dynamically through local JSON files and local state.

---

## 📱 Features & Visual Fidelity

### 1. Visual Accuracy (Matching Modern Android Instagram Dark Theme)
- **Dark Palette**: Pure black background (`#000000`), elevated surfaces (`#121212`, `#1E1E1E`), border lines (`#262626`), accent blue (`#0095F6`), alert/like red (`#FF3040`).
- **Profile Screen**:
  - Username header dropdown with active unread red dot and hamburger menu (`☰`).
  - Avatar with custom status note bubble (e.g., *"Today's vibe..."*) and `+` add story icon.
  - Three-column stats: **Posts**, **Followers**, and **Following** (dynamically linked to follower data).
  - Verified blue badge next to username/display name if configured.
  - **Professional Dashboard** card (*"11.2K views in the last 30 days"*).
  - Highlights row with `+ New` and highlight circles with emoji badges (🏋️, ❤️, 🥹).
  - 4 Profile Tabs: Posts grid, Reels tab, Reposts tab, and Tagged tab.
  - 3-column media grid with pinned indicator pins 📌 and view count badges (e.g., `526`, `350`).
- **Home Feed & Stories**:
  - Instagram brand header with heart/notifications and Direct Messages paperplane icon (with unread badge).
  - Horizontal stories row with Instagram gradient rings (`['#FBAA47', '#D91A46', '#A60F93']`) and "Your story" at index 0.
  - Full post cards with user avatar, username, verified badge, location, double-tap to like with animated floating heart, bookmarking, and local comments modal.
- **Direct Messages (Inbox & Chat)**:
  - Top header with suitcase, insights, and compose icons.
  - "Search" bar with "Filter" action.
  - **Notes row** with status music bubbles (*"Marad B.. Pawan Sin.. 🦅"*, *"Andekhi.. Rahul Shar.. 💐👀😡"*, *"Miti.. Ubaid"*).
  - Filter pill tabs: **All 10**, **Primary 10**, **General**, and **Requests**.
  - Conversation list with blue unread badges, timestamps, reels sent, and story mentions.
  - 1-on-1 Chat screen with sent/received bubbles and live messaging.
- **Search & Explore**:
  - *"Search with Meta AI"* search bar.
  - Real-time search filtering across all configured users by username or display name.
  - 3-column media grid with play icons and view count badges (`571K`, `3.4M`, `8.2M`).
- **Reels**:
  - Full-screen vertical pager with snap scroll.
  - Floating actions on right: Like with counter, Comment counter, Share counter, More options, and spinning audio disc thumbnail.
  - Bottom info: User avatar, username, Follow button, caption, and audio track title/artist.
- **Settings & Activity**:
  - Exact layout matching Instagram settings: Accounts Centre (Meta), Family Centre, Saved, Archive, Your activity, Notifications, Time management, Instagram for tablets.
  - Functional **Log out** button that clears the session and instantly transitions to the Login screen.
- **Mock Login & User Switching**:
  - Instagram-style login screen with username/password validation against `users.json`.
  - Quick demo account chips for 1-tap switching between accounts (`_er_gourav`, `john`, `sarah`, `alex`, `david`, `kritika`, `akshat`).
  - Switching accounts instantly updates the profile, feed, stories, posts grid, and follower counts with no restart required.

---

## 🛠️ Data-Driven Architecture

All profiles, posts, reels, and relationships are decoupled from UI components and stored in `src/data/`:

| File | Purpose |
|---|---|
| `src/data/users.json` | Demo user accounts, passwords, bios, verified flags, notes, stats, and button configs. |
| `src/data/posts.json` | 35+ posts with captions, locations, timestamps, like counts, and pinned indicators. |
| `src/data/stories.json` | Active user stories with multi-image slides and timers. |
| `src/data/highlights.json` | Profile highlights by user (emojis, covers, and story collections). |
| `src/data/reels.json` | Reels with view counts, audio tracks, and captions. |
| `src/data/messages.json` | Direct message threads & notes status list matching the demo screenshots. |
| `src/data/followers.json` | Follower relationship map between user IDs. |
| `src/data/following.json` | Following relationship map between user IDs. |
| `src/data/settings.json` | Settings menu structure and categories. |

### How to Add a New User
Simply open `src/data/users.json` and append a new user object:
```json
{
  "id": "user_008",
  "username": "emma",
  "displayName": "Emma Watson",
  "password": "demo123",
  "bio": "Actor & Activist 🌿",
  "profileImage": "sarah.jpg",
  "verified": true,
  "stats": {
    "posts": 12,
    "followers": 89000,
    "following": 140
  }
}
```
The app will immediately recognize `emma` for login, profile viewing, search, and feed posting without changing a single line of React code!

---

## 🚀 How to Run

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Navigate to Project
```bash
cd /home/gorav-soni/Projects/My-Proj/Insta
```

### 2. Start the App
Run with Expo:
```bash
# Start development server
npx expo start

# Or directly target Android:
npm run android

# Or run in Web browser:
npm run web
```

### Demo Accounts Available
| Username | Password | Display Name | Verified | Notes |
|---|---|---|---|---|
| `_er_gourav` (or `gaurav`) | `demo123` | 魔鬼 | Yes (✓) | Developer profile with pinned posts & dashboard |
| `john` | `demo123` | John Doe | Yes (✓) | Photographer & Creator (25K followers) |
| `sarah` | `demo123` | Sarah Jenkins | No | Travel Blogger (45.2K followers) |
| `alex` | `demo123` | Alex Rivera | Yes (✓) | Tech Founder |
| `david` | `demo123` | David Kim | No | Fitness Coach |
| `kritika` | `demo123` | Kritika Gaurav Soni | Yes (✓) | Fashion Designer |
| `akshat` | `demo123` | Akshat Soni | No | Musician & Producer |

---

## 📁 Project Structure

```text
instagram-demo/
├── App.tsx
├── package.json
├── tsconfig.json
├── src/
│   ├── types/               # TypeScript interfaces (User, Post, Reel, Story, Message, Nav)
│   ├── data/                # Data-driven JSON sources
│   ├── context/             # InstagramContext (Auth, local likes/saves/follows)
│   ├── navigation/          # AppNavigator & BottomTabNavigator
│   ├── theme/               # Colors & dark-mode styling constants
│   ├── utils/               # Asset resolver & formatters
│   ├── components/
│   │   ├── common/          # VerifiedBadge, Avatar, InstagramHeader, CustomButton
│   │   ├── feed/            # PostCard, PostActions, StoriesRow
│   │   ├── profile/         # ProfileHeader, ProfileStats, ProfileBio, Highlights, PostGrid
│   │   ├── explore/         # ExploreSearchBar ("Search with Meta AI"), ExploreGrid
│   │   ├── reels/           # ReelItem with floating controls & audio disc
│   │   └── messages/        # NotesRow, ConversationItem
│   └── screens/
│       ├── auth/            # LoginScreen
│       ├── main/            # HomeScreen, ExploreScreen, CreateScreen, ReelsScreen, ProfileScreen
│       └── sub/             # UserProfileScreen, PostDetailScreen, StoryViewerScreen, DirectMessagesScreen, ChatScreen, FollowersScreen, SettingsScreen, EditProfileScreen
```

