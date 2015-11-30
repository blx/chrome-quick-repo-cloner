const $$ = document.getElementById.bind(document)

const $cloneDir = $$("clone-dir")
const $msg = $$("msg")

function save_options() {
    chrome.storage.sync.set({ cloneDir: $cloneDir.value }, () => {
        $msg.textContent = "Saved."
        setTimeout(() => {
            $msg.textContent = ""
        }, 850)
    })
}

function restore_options() {
    chrome.storage.sync.get({ cloneDir: "" }, items => {
        $cloneDir.value = items.cloneDir
    })
}


document.addEventListener('DOMContentLoaded', restore_options)
$$("save").addEventListener('click', save_options)
