# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.1.1 (2024-04-26)

**Note:** Version bump only for package @jmischler72/client

# 1.1.0 (2024-04-26)

### Bug Fixes

- **client:** add border to rooms list ([63e285b](https://github.com/jmischler72/tetrarena/commit/63e285ba787f3018a7e22511ab3fde157325163b))
- **client:** better snackbar ([11de964](https://github.com/jmischler72/tetrarena/commit/11de96474a0b27a63a906eb2d0da676379dfb0b2))
- **client:** bump pnpm version in package.json + gitignore ([48309c4](https://github.com/jmischler72/tetrarena/commit/48309c46db856a3be157224bc615f9b46f75c260))
- **client:** clear on dispatch call only when rendered -> tbc ([cd6a342](https://github.com/jmischler72/tetrarena/commit/cd6a342960c1e4ebd650592ef9913eaf901ff029))
- **client:** correct command netlify.toml ([4330ce6](https://github.com/jmischler72/tetrarena/commit/4330ce6dfd9463759567161f9cf2793d289be8f8))
- **client:** correct command netlify.toml 2 ([c4b2892](https://github.com/jmischler72/tetrarena/commit/c4b289240f469e1c501dab4dd5781370e5bd0169))
- **client:** correct command netlify.toml 3 ([4262e5d](https://github.com/jmischler72/tetrarena/commit/4262e5d4be2ed2568898ce5f836b9e649a5f3b2c))
- **client:** fix problem reconnection with firefox ([24c8ce6](https://github.com/jmischler72/tetrarena/commit/24c8ce676bfb42e3318d018ff500ee442c5405a0))
- **client:** fix problems that came with previous fix ([b1227e7](https://github.com/jmischler72/tetrarena/commit/b1227e79575aed2dc70c9c39d5845d5b16175a23))
- **client:** fix reconnection problem on chrome ([9254e79](https://github.com/jmischler72/tetrarena/commit/9254e799c502c2c9b24302977d65afd7eb6a5060))
- **client:** forgor utils in pkg ([866d5ce](https://github.com/jmischler72/tetrarena/commit/866d5cef8ca5f1cc7aa33a3445be50ea317d2ddf))
- **client:** handle versioning differently ([0949923](https://github.com/jmischler72/tetrarena/commit/09499232bf25c417e1220d91c167f3024663f571))
- **client:** ignore dotenv file ([a3eee09](https://github.com/jmischler72/tetrarena/commit/a3eee09e9f300b83c028658305f66d74e3afd0d1))
- **client:** issues with reconnection when refreshing on Chrome ([d3ccb5e](https://github.com/jmischler72/tetrarena/commit/d3ccb5e322eb062297d9c34737e1a60599f9376e))
- **client:** navbar path ([b078a3e](https://github.com/jmischler72/tetrarena/commit/b078a3eaf86b39bedbd6e16ca3196b263f962a8a))
- **client:** netlify config ([9bc4763](https://github.com/jmischler72/tetrarena/commit/9bc47638c88bc6b197681fc5a78c668b46e8eed5))
- **client:** on player removed ([32ac819](https://github.com/jmischler72/tetrarena/commit/32ac81943c7ce458ab8f22608a0c6a801633cacb))
- **client:** prettier files that i deleted : ( ([35aa5a6](https://github.com/jmischler72/tetrarena/commit/35aa5a6938d6983b2d59d7e37be7e0a021d9202a))
- **client:** remove netlify toml (ill try in ui : )) ([a41c3df](https://github.com/jmischler72/tetrarena/commit/a41c3dfb491cf9fcb3a1f11b8bf517286eb7c2c2))
- **client:** small fixes in disconnected overlay ([5d54530](https://github.com/jmischler72/tetrarena/commit/5d545307a0e4daac4c9494805664dc748824d013))
- **client:** snackbar on player leaving ([22dfca4](https://github.com/jmischler72/tetrarena/commit/22dfca4dcb76f9212a0b1787a3546b13c99373ef))
- **client:** test ([6aa439e](https://github.com/jmischler72/tetrarena/commit/6aa439ec52bdc6b71c5c2ea6ed025b840c1e21cb))
- **core:** fix animation on tetrimino freezed ([619da57](https://github.com/jmischler72/tetrarena/commit/619da57e3373e05661db05e874f452739203b3b4))
- **core:** use seeded random with algo + fix test + snackbar for multiples errors ([97f9a5a](https://github.com/jmischler72/tetrarena/commit/97f9a5a7e1aeb69263cd7fba961e6ae75376fb2a))
- **general:** use package json of respective + fix dockerfile by not deploying ([fff2468](https://github.com/jmischler72/tetrarena/commit/fff24682690dd1ce31bb8112ee24f09e53f95ebc))
- **server:** higher patch rate to fix animations problems ([4fa1df1](https://github.com/jmischler72/tetrarena/commit/4fa1df162eda65444528218bdbb615f34ee12398))

### Features

- **client:** add error/loading handling in room list + waiting room ([12a0499](https://github.com/jmischler72/tetrarena/commit/12a0499b1ce5d1eb06fd2751e1ab7523aa34e9ae))
- **client:** allow reconnection (refresh ...) ([8f3a266](https://github.com/jmischler72/tetrarena/commit/8f3a26624f974ecea7c9d96386a81397e1286381))
- **client:** disconnected overlay ([6ded6dc](https://github.com/jmischler72/tetrarena/commit/6ded6dcde0b3b6a86f7e4165dbe2915f188d5523))
- **client:** implement ready feature in client ([f3a00cf](https://github.com/jmischler72/tetrarena/commit/f3a00cfa9aa2a1d3c7715fb754f1596e510f0c8f))
- **client:** multiplayer game responsive + initialize in manager ([539fb2c](https://github.com/jmischler72/tetrarena/commit/539fb2c9db1fdbc54b1ef44f3af618e014e20cd9))
- **client:** realtime Listing of Rooms List ([3d27e62](https://github.com/jmischler72/tetrarena/commit/3d27e6284f29a19fda3d89f47796041e1c0aaa20))
- **client:** remove unused files ([cbbf897](https://github.com/jmischler72/tetrarena/commit/cbbf8978d456c9a3412d952da740f9608db5ea05))
- **client:** responsive homepage + version/changelog route ([4020e8d](https://github.com/jmischler72/tetrarena/commit/4020e8d69d15660e80bda3140f078d158bfe048f))
- **client:** responsive homepage first iteration ([9d560bc](https://github.com/jmischler72/tetrarena/commit/9d560bca5b853cb4806e03c892b1d24e64026faf))
- **client:** responsive navbar ([c873408](https://github.com/jmischler72/tetrarena/commit/c873408b96002fe5580436fbe362f831150d893d))
- **client:** show connection of player + move utils to new package ([b05bdf0](https://github.com/jmischler72/tetrarena/commit/b05bdf0fe26b33204faadbbdfc27238f47ea3092))
- **client:** test ([ec55798](https://github.com/jmischler72/tetrarena/commit/ec5579812beeea9eccaa4c19053cb29ba397af8a))
- **client:** update package name in all files ([0895570](https://github.com/jmischler72/tetrarena/commit/0895570ec386795468023be703ba21da96620a38))
- **root:** display changelog ([0f5dfa9](https://github.com/jmischler72/tetrarena/commit/0f5dfa98211481813413d5e60b34a75eb57e9c7a))
- **server:** add ready to players + message to change status ([5f47b9c](https://github.com/jmischler72/tetrarena/commit/5f47b9c08465d1100d0ce9ec7b7ed69acba2c3bd))
- **shared:** create shared package for colyseus schema ([9b532af](https://github.com/jmischler72/tetrarena/commit/9b532afb0122472bfd85a85e039e2a0f998c7a7d))
