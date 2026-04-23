# component-testing-compare

Vitest, Cypress, and Playwright comparison for component testing.

|                                                      | Vitest                                              | Playwright                              | Cypress                                  |
| ---------------------------------------------------- | --------------------------------------------------- | --------------------------------------- | ---------------------------------------- |
| Time to run 12 files with 35 tests on my machine     | 6.743s                                              | 10.387s                                 | 44.948s                                  |
| Time to run 12 files with 35 tests in Github Actions | 9s                                                  | 25s                                     | 1m 3s                                    |
| Stable                                               | October 2025                                        | Experimental since May 2022             | August 2022                              |
| Bundler                                              | Vite                                                | Vite \*                                 | Vite, Webpack                            |
| Time travel                                          | ❌                                                  | ✅                                      | ✅                                       |
| Interactive                                          | ✅                                                  | ❌                                      | ✅                                       |
| Supported frameworks                                 | Vue, Svelte, React, Lit, Preact, Solid, Marko, Qwik | React, Vue, Svelte, Solid               | React, Angular, Vue, Svelte. (Qwik, Lit) |
| Supported browsers                                   | Firefox, Chrome, Edge, Safari, Webkit, Chromium     | Chromium, WebKit, Firefox, Chrome, Edge | Chrome, Edge, Firefox, (WebKit)          |

\* Times are best of 3 runs.  
\* Table is from 23.04.2026  
\* Frameworks in parenthesis are by community  
\* Browsers in parenthesis are experimental  
\* Playwright is not reusing your existing Vite config and has its own Vite version.
