// TODO: detect current commit from URI, don't just pull head of default branch
// TODO: handle errors eg. dir with repo name already exists

(function() {
    "use strict"

    // To prevent any messages, set this to any non-side-effecting function.
    const yikes = alert
    const info = alert


    /** Repo :: {author: str,
     *           name: str,
     *           gitUri: str} */

    /** Path :: str "(/[^/]*)*" */

    /** Location :: {hostname: str,
     *               pathname: Path,
     *               ?} */


    /** Path -> {author: str, name: str}
     *  Grab first two components of path because most sites follow that URL scheme. */
    function parsePath(path) {
        const parts = path
                      .split("/")
                      .slice(1, 3)
        return {
            author: parts[0],
            name: parts[1]
        }
    }

    /** Location -> Maybe Repo */
    function getRepoFromPage(location) {
        const host = location.hostname.toLowerCase()
        const repoLookup = {
            "github.com": repo => `https://github.com/${repo.author}/${repo.name}.git`,
            "gitlab.com": repo => `https://gitlab.com/${repo.author}/${repo.name}.git`,
            "bitbucket.org": repo => `https://${repo.author}@bitbucket.org/${repo.author}/${repo.name}.git`,
        }

        if (!repoLookup[host])
            return

        let repo = parsePath(location.pathname)
        repo.gitUri = repoLookup[host](repo)
        return repo
    }

    /** Location, str -> IO () */
    function doGitClone(location, cloneDir) {
        const repo = getRepoFromPage(location)
        if (repo) {
            const cloneDest = cloneDir + '/' + repo.name

            chrome.runtime.sendMessage({
                args: ["git", "clone", repo.gitUri, cloneDest]
            })
            info("Cloning repo into " + cloneDest)
        }
        else {
            yikes("Couldn't detect repo, sorry!")
        }
    }


    chrome.storage.sync.get("cloneDir", items => {
        if (items.cloneDir)
            doGitClone(window.location, items.cloneDir)
    })
})()
