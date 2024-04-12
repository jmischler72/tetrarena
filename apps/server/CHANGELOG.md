# Changelog

## [1.3.0](https://github.com/jmischler72/tetrarena/compare/server-v1.2.0...server-v1.3.0) (2024-04-12)


### Features

* **client:** implement ready feature in client ([f3a00cf](https://github.com/jmischler72/tetrarena/commit/f3a00cfa9aa2a1d3c7715fb754f1596e510f0c8f))
* **client:** move index.ts to colyseus config ([05626a4](https://github.com/jmischler72/tetrarena/commit/05626a445f93d9fbe9b77ae0358a209c6b41dda3))
* **client:** realtime Listing of Rooms List ([3d27e62](https://github.com/jmischler72/tetrarena/commit/3d27e6284f29a19fda3d89f47796041e1c0aaa20))
* **client:** show connection of player + move utils to new package ([b05bdf0](https://github.com/jmischler72/tetrarena/commit/b05bdf0fe26b33204faadbbdfc27238f47ea3092))
* **server:** add ready to players + message to change status ([5f47b9c](https://github.com/jmischler72/tetrarena/commit/5f47b9c08465d1100d0ce9ec7b7ed69acba2c3bd))
* **server:** dockerfile with pnpm (wip) ([33ec6aa](https://github.com/jmischler72/tetrarena/commit/33ec6aa4c5d4bf719d0428a1d93d17029022d0de))
* **server:** reinit timeout when player leaves ([20c9598](https://github.com/jmischler72/tetrarena/commit/20c9598b175500a781011af045d56ca4b094c26a))
* **server:** use shared lib ([a7bca5e](https://github.com/jmischler72/tetrarena/commit/a7bca5e5503e3f8f30c5c77394386c64163cfa32))


### Bug Fixes

* **client:** issues with reconnection when refreshing on Chrome ([d3ccb5e](https://github.com/jmischler72/tetrarena/commit/d3ccb5e322eb062297d9c34737e1a60599f9376e))
* **general:** use package json of respective + fix dockerfile by not deploying ([fff2468](https://github.com/jmischler72/tetrarena/commit/fff24682690dd1ce31bb8112ee24f09e53f95ebc))
* **server:** dockerfile wrong workdir ([7e10de5](https://github.com/jmischler72/tetrarena/commit/7e10de5282148c8876df68ed38a30b90a3fd8553))
* **server:** run with tsx not build (fuck it) ([6f468b9](https://github.com/jmischler72/tetrarena/commit/6f468b9f1a1e83c5599450cbb3f79a156a411969))
* **server:** working dockerfile with pnpm ([b2520b7](https://github.com/jmischler72/tetrarena/commit/b2520b7e9e89192dbc9d9ead64bd71863584335d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @jmischler72/core bumped from 1.1.0 to 1.2.0
    * @jmischler72/types bumped from 1.1.0 to 1.2.0

## [1.2.0](https://github.com/jmischler72/tetrarena/compare/server-v1.1.2...server-v1.2.0) (2024-04-11)


### Features

* **client:** implement ready feature in client ([f3a00cf](https://github.com/jmischler72/tetrarena/commit/f3a00cfa9aa2a1d3c7715fb754f1596e510f0c8f))
* **client:** move index.ts to colyseus config ([05626a4](https://github.com/jmischler72/tetrarena/commit/05626a445f93d9fbe9b77ae0358a209c6b41dda3))
* **client:** realtime Listing of Rooms List ([3d27e62](https://github.com/jmischler72/tetrarena/commit/3d27e6284f29a19fda3d89f47796041e1c0aaa20))
* **client:** show connection of player + move utils to new package ([b05bdf0](https://github.com/jmischler72/tetrarena/commit/b05bdf0fe26b33204faadbbdfc27238f47ea3092))
* **server:** add ready to players + message to change status ([5f47b9c](https://github.com/jmischler72/tetrarena/commit/5f47b9c08465d1100d0ce9ec7b7ed69acba2c3bd))
* **server:** dockerfile with pnpm (wip) ([33ec6aa](https://github.com/jmischler72/tetrarena/commit/33ec6aa4c5d4bf719d0428a1d93d17029022d0de))
* **server:** reinit timeout when player leaves ([20c9598](https://github.com/jmischler72/tetrarena/commit/20c9598b175500a781011af045d56ca4b094c26a))
* **server:** use shared lib ([a7bca5e](https://github.com/jmischler72/tetrarena/commit/a7bca5e5503e3f8f30c5c77394386c64163cfa32))


### Bug Fixes

* **client:** issues with reconnection when refreshing on Chrome ([d3ccb5e](https://github.com/jmischler72/tetrarena/commit/d3ccb5e322eb062297d9c34737e1a60599f9376e))
* **general:** use package json of respective + fix dockerfile by not deploying ([fff2468](https://github.com/jmischler72/tetrarena/commit/fff24682690dd1ce31bb8112ee24f09e53f95ebc))
* **server:** dockerfile wrong workdir ([7e10de5](https://github.com/jmischler72/tetrarena/commit/7e10de5282148c8876df68ed38a30b90a3fd8553))
* **server:** run with tsx not build (fuck it) ([6f468b9](https://github.com/jmischler72/tetrarena/commit/6f468b9f1a1e83c5599450cbb3f79a156a411969))
* **server:** working dockerfile with pnpm ([b2520b7](https://github.com/jmischler72/tetrarena/commit/b2520b7e9e89192dbc9d9ead64bd71863584335d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @jmischler72/core bumped from 1.0.1 to 1.1.0
    * @jmischler72/types bumped from 1.0.1 to 1.1.0

## [1.1.2](https://github.com/jmischler72/tetrarena/compare/server-v1.1.1...server-v1.1.2) (2024-04-11)


### Bug Fixes

* **client:** issues with reconnection when refreshing on Chrome ([d3ccb5e](https://github.com/jmischler72/tetrarena/commit/d3ccb5e322eb062297d9c34737e1a60599f9376e))

## [1.1.1](https://github.com/jmischler72/tetrarena/compare/server-v1.1.0...server-v1.1.1) (2024-04-11)


### Bug Fixes

* **general:** use package json of respective + fix dockerfile by not deploying ([fff2468](https://github.com/jmischler72/tetrarena/commit/fff24682690dd1ce31bb8112ee24f09e53f95ebc))

## [1.1.0](https://github.com/jmischler72/tetrarena/compare/server-v1.0.1...server-v1.1.0) (2024-04-11)


### Features

* **client:** realtime Listing of Rooms List ([3d27e62](https://github.com/jmischler72/tetrarena/commit/3d27e6284f29a19fda3d89f47796041e1c0aaa20))

## [1.0.1](https://github.com/jmischler72/tetrarena/compare/server-v1.0.0...server-v1.0.1) (2024-04-10)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @jmischler72/core bumped from 1.0.0 to 1.0.1
    * @jmischler72/types bumped from 1.0.0 to 1.0.1

## 1.0.0 (2024-04-09)


### Features

* **client:** implement ready feature in client ([f3a00cf](https://github.com/jmischler72/tetrarena/commit/f3a00cfa9aa2a1d3c7715fb754f1596e510f0c8f))
* **client:** move index.ts to colyseus config ([05626a4](https://github.com/jmischler72/tetrarena/commit/05626a445f93d9fbe9b77ae0358a209c6b41dda3))
* **client:** show connection of player + move utils to new package ([b05bdf0](https://github.com/jmischler72/tetrarena/commit/b05bdf0fe26b33204faadbbdfc27238f47ea3092))
* **server:** add ready to players + message to change status ([5f47b9c](https://github.com/jmischler72/tetrarena/commit/5f47b9c08465d1100d0ce9ec7b7ed69acba2c3bd))
* **server:** dockerfile with pnpm (wip) ([33ec6aa](https://github.com/jmischler72/tetrarena/commit/33ec6aa4c5d4bf719d0428a1d93d17029022d0de))
* **server:** reinit timeout when player leaves ([20c9598](https://github.com/jmischler72/tetrarena/commit/20c9598b175500a781011af045d56ca4b094c26a))
* **server:** use shared lib ([a7bca5e](https://github.com/jmischler72/tetrarena/commit/a7bca5e5503e3f8f30c5c77394386c64163cfa32))


### Bug Fixes

* **server:** dockerfile wrong workdir ([7e10de5](https://github.com/jmischler72/tetrarena/commit/7e10de5282148c8876df68ed38a30b90a3fd8553))
* **server:** run with tsx not build (fuck it) ([6f468b9](https://github.com/jmischler72/tetrarena/commit/6f468b9f1a1e83c5599450cbb3f79a156a411969))
* **server:** working dockerfile with pnpm ([b2520b7](https://github.com/jmischler72/tetrarena/commit/b2520b7e9e89192dbc9d9ead64bd71863584335d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @jmischler72/core bumped to 1.0.0
    * @jmischler72/types bumped to 1.0.0
