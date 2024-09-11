# Blue Check Hider

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CodeQL](https://github.com/Foulest/blue-check-hider/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Foulest/blue-check-hider/actions/workflows/github-code-scanning/codeql)
[![Downloads](https://img.shields.io/github/downloads/Foulest/blue-check-hider/total.svg)](https://github.com/Foulest/blue-check-hider/releases)

![Icon](./public/icon-128.png)

**Blue Check Hider** is a Chrome extension that hides posts from people with a blue checkmark
on [Twitter/X](https://twitter.com).

> **Note:** This is an updated fork of the original **[Blue Check Hider](https://github.com/gsajith/blue-check-hider)**
> project.
>
> All credit for the original project goes to **[Gautham Sajith](https://github.com/gsajith)**.

## Changes Made

- Includes all features of the original Blue Check Hider project *(version 1.3)*
- Added a CI (continuous build) action to automatically build on push/pull
- Minor code changes and improvements

## Compiling

> **Note:** These steps might not work correctly and could be outdated.

1. Clone the repository.
2. Install dependencies with `yarn install`.
3. Set up ESLint `npm init @eslint/config`
4. Create a `build` folder with `yarn run build` (once) or `yarn run watch` (continuous build).
5. Follow the instructions
   to [load an unpacked Chrome Extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked),
   and load the `build` folder generated in the previous step

You can also download the [latest artifact](https://github.com/Foulest/blue-check-hider/actions)
or [release](https://github.com/Foulest/blue-check-hider/releases) from this repository.

## Getting Help

For support or queries, please open an issue in
the [Issues section](https://github.com/Foulest/blue-check-hider/issues).
