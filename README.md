# Quick Repo Cloner

Instantly `git clone` a local copy of the GitHub/Bitbucket repository you're looking at in Chrome.

Requires very recent Chrome (45ish) at the moment because of gratuitous ES6 that I haven't setup a transpilation pipeline for yet.


## Installation

**Dependencies:** Git, Python.

1. Install the Chrome native host to relay commands to git:
    ```shell
    $ cd chrome-quick-repo-cloner
    $ ./install-native-host
    ```

2. Install the Chrome extension.

3. Specify the directory to clone into (eg. `/Users/ben/projects`) using the Options panel of the extension, accessible from Chrome's Extensions page.
