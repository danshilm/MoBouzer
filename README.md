[![Expo Project Page](https://img.shields.io/badge/Made_With_Expo-000?style=for-the-badge&logo=expo&labelColor=4630eb&logoWidth=20)](https://expo.dev/@danshilm/mobouzer)

# MoBouzer

A cross-platform mobile app for navigating Mauritius by bus (and soon via the metro too!) based on public transport data and user contributions to OpenStreetMaps.

<!-- <a href="" >
  <img src=".github/images/download_on_the_app_store.svg" alt="Download on the App Store" height='50' />
</a> -->
<!-- <a href="" >
  <img src='.github/images/get_it_on_google_play.png' alt='Get it on Google Play' height='50' />
</a> -->

[![iOS Preview](https://img.shields.io/badge/-iOS%20Preview%20Build-000?style=flat&logo=apple)](https://expo.dev/artifacts/eas/Cejp7LDV2Qp6pFEFrsNEV.tar.gz)
<!-- [![Android Preview](https://img.shields.io/badge/-Android%20Preview%20Build-000?style=flat&logo=android)]() -->

## Screenshots

_Soon_

## Features

- [x] Shows bus stops throughout the island (currently ~800 bus stops)
- [x] Shows bus lines (currently ~5 bus lines)
- [ ] Provides directions for walking & bus routes to your destination [in progress]
- [ ] Calculates estimated arrival time/travel duration
- [ ] Estimates time for buses to arrive at specific bus stops
  - [ ] Based on fixed schedule
  - [ ] Based on real time data
- [ ] Calculates fare for your trip

## Project Layout

This repository is the home of the mobile app as well as all associated services to run and manage the application, in a monorepo structure using PNPM workspaces.

- [`apps/mobile-app`](apps/mobile-app/) is the React Native app itself
- [`apps/admin-cli`](apps/admin-cli) is a small CLI tool made to manage the data (for bus stops & bus lines) that's used in the mobile application
- [`packages/functions`](packages/functions) contains serverless functions running on GCP related to MoBouzer and the MoBouzer GCP project itself
- [`packages/shared`](packages/shared) holds interfaces/procedures used in both the admin CLI and the mobile app, hence the name (_obviously_)

## Acknowledgements

- This project wouldn't have been started if I hadn't come across the awesome [`mauritius-buses.com`](https://mauritius-buses.com) website where people can get routes to their destination and the buses they can take to get there.

  I personally used that website for years before coming up with the idea for MoBouzer. 
That was mainly due to the bus stops on `mauritius-buses.com` not being individually visible; bus stops are grouped by stage (a unit of measurement used to calculate the bus fare). 
Therefore, it is pretty hard to use `mauritius-buses.com` to travel to unknown areas since one has to estimate when they have reached their destination.

- This project is tested with [BrowserStack](https://www.browserstack.com/).

  <a href="https://www.browserstack.com/">
    <img src=".github/images/browserstack-banner.png" alt="BrowserStack Banner" height="50" />
  </a>
