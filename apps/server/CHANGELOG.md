# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.6.1 (2024-04-18)

**Note:** Version bump only for package @jmischler72/server

# [1.6.0](https://github.com/jmischler72/tetrarena_client/compare/v1.1.0...v1.6.0) (2024-04-17)

### Bug Fixes

- **client:** clear on dispatch call only when rendered -> tbc ([cd6a342](https://github.com/jmischler72/tetrarena_client/commit/cd6a342960c1e4ebd650592ef9913eaf901ff029))
- **client:** issues with reconnection when refreshing on Chrome ([d3ccb5e](https://github.com/jmischler72/tetrarena_client/commit/d3ccb5e322eb062297d9c34737e1a60599f9376e))
- **core:** fix animation on tetrimino freezed ([619da57](https://github.com/jmischler72/tetrarena_client/commit/619da57e3373e05661db05e874f452739203b3b4))
- **general:** use package json of respective + fix dockerfile by not deploying ([fff2468](https://github.com/jmischler72/tetrarena_client/commit/fff24682690dd1ce31bb8112ee24f09e53f95ebc))
- **server:** add missing deps ([f3e92fe](https://github.com/jmischler72/tetrarena_client/commit/f3e92fe41f02f6e66778fb03756281d5ac49ef4a))
- **server:** clean code ([66723c1](https://github.com/jmischler72/tetrarena_client/commit/66723c1933a13dea941d7a73fb5927c6f0f1dea4))
- **server:** dockerfile wrong workdir ([7e10de5](https://github.com/jmischler72/tetrarena_client/commit/7e10de5282148c8876df68ed38a30b90a3fd8553))
- **server:** higher patch rate to fix animations problems ([4fa1df1](https://github.com/jmischler72/tetrarena_client/commit/4fa1df162eda65444528218bdbb615f34ee12398))

### Features

- **client:** implement ready feature in client ([f3a00cf](https://github.com/jmischler72/tetrarena_client/commit/f3a00cfa9aa2a1d3c7715fb754f1596e510f0c8f))
- **client:** realtime Listing of Rooms List ([3d27e62](https://github.com/jmischler72/tetrarena_client/commit/3d27e6284f29a19fda3d89f47796041e1c0aaa20))

# Changelog

## [1.3.2](https://github.com/jmischler72/tetrarena/compare/server-v1.3.1...server-v1.3.2) (2024-04-16)

### Bug Fixes

- **core:** fix animation on tetrimino freezed ([619da57](https://github.com/jmischler72/tetrarena/commit/619da57e3373e05661db05e874f452739203b3b4))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @jmischler72/core bumped from 1.2.1 to 1.2.2
    - @jmischler72/types bumped from 1.2.1 to 1.2.2

## [1.3.1](https://github.com/jmischler72/tetrarena/compare/server-v1.3.0...server-v1.3.1) (2024-04-13)

### Bug Fixes

- **client:** clear on dispatch call only when rendered -&gt; tbc ([cd6a342](https://github.com/jmischler72/tetrarena/commit/cd6a342960c1e4ebd650592ef9913eaf901ff029))
- **server:** add missing deps ([f3e92fe](https://github.com/jmischler72/tetrarena/commit/f3e92fe41f02f6e66778fb03756281d5ac49ef4a))
- **server:** clean code ([66723c1](https://github.com/jmischler72/tetrarena/commit/66723c1933a13dea941d7a73fb5927c6f0f1dea4))
- **server:** higher patch rate to fix animations problems ([4fa1df1](https://github.com/jmischler72/tetrarena/commit/4fa1df162eda65444528218bdbb615f34ee12398))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @jmischler72/core bumped from 1.2.0 to 1.2.1
    - @jmischler72/types bumped from 1.2.0 to 1.2.1

## [1.3.0](https://github.com/jmischler72/tetrarena/compare/server-v1.2.0...server-v1.3.0) (2024-04-12)

### Features

- **client:** implement ready feature in client ([f3a00cf](https://github.com/jmischler72/tetrarena/commit/f3a00cfa9aa2a1d3c7715fb754f1596e510f0c8f))
- **client:** move index.ts to colyseus config ([05626a4](https://github.com/jmischler72/tetrarena/commit/05626a445f93d9fbe9b77ae0358a209c6b41dda3))
- **client:** realtime Listing of Rooms List ([3d27e62](https://github.com/jmischler72/tetrarena/commit/3d27e6284f29a19fda3d89f47796041e1c0aaa20))
- **client:** show connection of player + move utils to new package ([b05bdf0](https://github.com/jmischler72/tetrarena/commit/b05bdf0fe26b33204faadbbdfc27238f47ea3092))
- **server:** add ready to players + message to change status ([5f47b9c](https://github.com/jmischler72/tetrarena/commit/5f47b9c08465d1100d0ce9ec7b7ed69acba2c3bd))
- **server:** dockerfile with pnpm (wip) ([33ec6aa](https://github.com/jmischler72/tetrarena/commit/33ec6aa4c5d4bf719d0428a1d93d17029022d0de))
- **server:** reinit timeout when player leaves ([20c9598](https://github.com/jmischler72/tetrarena/commit/20c9598b175500a781011af045d56ca4b094c26a))
- **server:** use shared lib ([a7bca5e](https://github.com/jmischler72/tetrarena/commit/a7bca5e5503e3f8f30c5c77394386c64163cfa32))

### Bug Fixes

- **client:** issues with reconnection when refreshing on Chrome ([d3ccb5e](https://github.com/jmischler72/tetrarena/commit/d3ccb5e322eb062297d9c34737e1a60599f9376e))
- **general:** use package json of respective + fix dockerfile by not deploying ([fff2468](https://github.com/jmischler72/tetrarena/commit/fff24682690dd1ce31bb8112ee24f09e53f95ebc))
- **server:** dockerfile wrong workdir ([7e10de5](https://github.com/jmischler72/tetrarena/commit/7e10de5282148c8876df68ed38a30b90a3fd8553))
- **server:** run with tsx not build (fuck it) ([6f468b9](https://github.com/jmischler72/tetrarena/commit/6f468b9f1a1e83c5599450cbb3f79a156a411969))
- **server:** working dockerfile with pnpm ([b2520b7](https://github.com/jmischler72/tetrarena/commit/b2520b7e9e89192dbc9d9ead64bd71863584335d))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @jmischler72/core bumped from 1.1.0 to 1.2.0
    - @jmischler72/types bumped from 1.1.0 to 1.2.0

## [1.2.0](https://github.com/jmischler72/tetrarena/compare/server-v1.1.2...server-v1.2.0) (2024-04-11)

### Features

- **client:** implement ready feature in client ([f3a00cf](https://github.com/jmischler72/tetrarena/commit/f3a00cfa9aa2a1d3c7715fb754f1596e510f0c8f))
- **client:** move index.ts to colyseus config ([05626a4](https://github.com/jmischler72/tetrarena/commit/05626a445f93d9fbe9b77ae0358a209c6b41dda3))
- **client:** realtime Listing of Rooms List ([3d27e62](https://github.com/jmischler72/tetrarena/commit/3d27e6284f29a19fda3d89f47796041e1c0aaa20))
- **client:** show connection of player + move utils to new package ([b05bdf0](https://github.com/jmischler72/tetrarena/commit/b05bdf0fe26b33204faadbbdfc27238f47ea3092))
- **server:** add ready to players + message to change status ([5f47b9c](https://github.com/jmischler72/tetrarena/commit/5f47b9c08465d1100d0ce9ec7b7ed69acba2c3bd))
- **server:** dockerfile with pnpm (wip) ([33ec6aa](https://github.com/jmischler72/tetrarena/commit/33ec6aa4c5d4bf719d0428a1d93d17029022d0de))
- **server:** reinit timeout when player leaves ([20c9598](https://github.com/jmischler72/tetrarena/commit/20c9598b175500a781011af045d56ca4b094c26a))
- **server:** use shared lib ([a7bca5e](https://github.com/jmischler72/tetrarena/commit/a7bca5e5503e3f8f30c5c77394386c64163cfa32))

### Bug Fixes

- **client:** issues with reconnection when refreshing on Chrome ([d3ccb5e](https://github.com/jmischler72/tetrarena/commit/d3ccb5e322eb062297d9c34737e1a60599f9376e))
- **general:** use package json of respective + fix dockerfile by not deploying ([fff2468](https://github.com/jmischler72/tetrarena/commit/fff24682690dd1ce31bb8112ee24f09e53f95ebc))
- **server:** dockerfile wrong workdir ([7e10de5](https://github.com/jmischler72/tetrarena/commit/7e10de5282148c8876df68ed38a30b90a3fd8553))
- **server:** run with tsx not build (fuck it) ([6f468b9](https://github.com/jmischler72/tetrarena/commit/6f468b9f1a1e83c5599450cbb3f79a156a411969))
- **server:** working dockerfile with pnpm ([b2520b7](https://github.com/jmischler72/tetrarena/commit/b2520b7e9e89192dbc9d9ead64bd71863584335d))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @jmischler72/core bumped from 1.0.1 to 1.1.0
    - @jmischler72/types bumped from 1.0.1 to 1.1.0

## [1.1.2](https://github.com/jmischler72/tetrarena/compare/server-v1.1.1...server-v1.1.2) (2024-04-11)

### Bug Fixes

- **client:** issues with reconnection when refreshing on Chrome ([d3ccb5e](https://github.com/jmischler72/tetrarena/commit/d3ccb5e322eb062297d9c34737e1a60599f9376e))

## [1.1.1](https://github.com/jmischler72/tetrarena/compare/server-v1.1.0...server-v1.1.1) (2024-04-11)

### Bug Fixes

- **general:** use package json of respective + fix dockerfile by not deploying ([fff2468](https://github.com/jmischler72/tetrarena/commit/fff24682690dd1ce31bb8112ee24f09e53f95ebc))

## [1.1.0](https://github.com/jmischler72/tetrarena/compare/server-v1.0.1...server-v1.1.0) (2024-04-11)

### Features

- **client:** realtime Listing of Rooms List ([3d27e62](https://github.com/jmischler72/tetrarena/commit/3d27e6284f29a19fda3d89f47796041e1c0aaa20))

## [1.0.1](https://github.com/jmischler72/tetrarena/compare/server-v1.0.0...server-v1.0.1) (2024-04-10)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @jmischler72/core bumped from 1.0.0 to 1.0.1
    - @jmischler72/types bumped from 1.0.0 to 1.0.1

## 1.0.0 (2024-04-09)

### Features

- **client:** implement ready feature in client ([f3a00cf](https://github.com/jmischler72/tetrarena/commit/f3a00cfa9aa2a1d3c7715fb754f1596e510f0c8f))
- **client:** move index.ts to colyseus config ([05626a4](https://github.com/jmischler72/tetrarena/commit/05626a445f93d9fbe9b77ae0358a209c6b41dda3))
- **client:** show connection of player + move utils to new package ([b05bdf0](https://github.com/jmischler72/tetrarena/commit/b05bdf0fe26b33204faadbbdfc27238f47ea3092))
- **server:** add ready to players + message to change status ([5f47b9c](https://github.com/jmischler72/tetrarena/commit/5f47b9c08465d1100d0ce9ec7b7ed69acba2c3bd))
- **server:** dockerfile with pnpm (wip) ([33ec6aa](https://github.com/jmischler72/tetrarena/commit/33ec6aa4c5d4bf719d0428a1d93d17029022d0de))
- **server:** reinit timeout when player leaves ([20c9598](https://github.com/jmischler72/tetrarena/commit/20c9598b175500a781011af045d56ca4b094c26a))
- **server:** use shared lib ([a7bca5e](https://github.com/jmischler72/tetrarena/commit/a7bca5e5503e3f8f30c5c77394386c64163cfa32))

### Bug Fixes

- **server:** dockerfile wrong workdir ([7e10de5](https://github.com/jmischler72/tetrarena/commit/7e10de5282148c8876df68ed38a30b90a3fd8553))
- **server:** run with tsx not build (fuck it) ([6f468b9](https://github.com/jmischler72/tetrarena/commit/6f468b9f1a1e83c5599450cbb3f79a156a411969))
- **server:** working dockerfile with pnpm ([b2520b7](https://github.com/jmischler72/tetrarena/commit/b2520b7e9e89192dbc9d9ead64bd71863584335d))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @jmischler72/core bumped to 1.0.0
    - @jmischler72/types bumped to 1.0.0
