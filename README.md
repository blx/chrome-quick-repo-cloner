# Quick Repo Cloner

Instantly `git clone` a local copy of the GitHub/Bitbucket repository you're looking at in Chrome.

Requires very recent Chrome (45ish) at the moment because of gratuitous ES6 that I haven't setup a transpilation pipeline for yet.


## How it works

Clicking button runs `extension/main.js` which injects `extension/contentscript.js` into the page. The contentscript looks at the tab's URL/location and generates the path to its `.git` repository, if possible. Contentscript sends a message (`git clone <repo.git> repo`) back to `main.js`, which relays it to `blx-chrome-shell`, a Python script, using Chrome's "native host" messaging. All that the python script does is execute the command sent from the contentscript.


## Installation

**Dependencies:** Git, Python.

1. Install the Chrome native host to relay commands to git:
    ```shell
    $ cd chrome-quick-repo-cloner
    $ ./install-native-host
    ```

2. Install the Chrome extension.

3. Specify the directory to clone repos into (eg. `/Users/ben/projects`) using the Options panel of the extension, accessible from Chrome's Extensions page.


## Todo

- The Options window is slow af to load despite being absurdly simple. This seems to be a known thing with Chrome's options v2 api. I should rewrite with the old options api.

- You may need to edit the `allowed_origins` in `org.blx.shell.json` with the extension ID shown after you install the extension. This ID can change during development until the extension gets packaged for the Chrome Web Store.

- Success/error of the actual `git clone` is not visible right now


## Licence (MIT)

Copyright (c) 2015 Ben Cook

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
