# FightingGameGeneralMemo

A memo app for fighting games in general. Record and manage combos, setups, and character matchup notes in a free-form format that isn't tied to any specific game's terminology.

## Goals

- Centralize combo, setup, and matchup notes in one place
- Avoid hardcoding any game- or character-specific names/moves into the app; let users enter everything freely
- Support sorting and searching notes by tag

## Key Features (Planned)

- Create, edit, and view memos (combos / setups / matchup notes)
- View memos while offline
- Sync across devices via a shared account (Windows / iPhone, etc.)
- Sort and search by tag

## Tech Stack

- React Native + Expo (TypeScript)
- State management: useState → Zustand (migrating as learning progresses)
- Data persistence: AsyncStorage → expo-sqlite → cloud DB (migrating as learning progresses)
- Authentication / account sharing: under consideration

## Release Policy

- Planned for release on app stores (with ads)
- Game-specific names (character names, move names, etc.) are not handled by the app itself; left entirely to free-form user input

## Progress Checklist

- [x] Hand-drawn UI design / icon selection
- [ ] Create Expo project
- [ ] Implement screen navigation
- [ ] Implement state management
- [ ] Implement DB schema
- [ ] Implement authentication / account sharing
- [ ] Integrate ad SDK (final stage)
- [ ] Store review prep / privacy policy (final stage)

## Notes

- This repository is maintained for personal learning and development purposes
