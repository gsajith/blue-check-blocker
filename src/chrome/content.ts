const getUsernameFromHeader = (userName: Element): string => {
    return userName.children[0]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.innerHTML || '';
};

const getUsernameFromFeed = (username: Element): string => {
    return username.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.innerHTML || '';
};

const updateStoredCheckNames = async (checkNames: Set<string>): Promise<any> => {
    const storedNames = await chrome.storage.local.get('storedBlueCheckNames');
    let allNames = new Set<string>([...checkNames]);

    if (storedNames.storedBlueCheckNames !== undefined) {
        allNames = new Set([...allNames, ...storedNames.storedBlueCheckNames])
    }

    await chrome.storage.local.set({
        storedBlueCheckNames: [...allNames]
    })
};

const isBlueCheck = (element: Element): boolean => {
    const checkSelector = '[data-testid="icon-verified"]';
    const possibleChecks = element.querySelectorAll(checkSelector);

    if (possibleChecks.length <= 0) {
        return false
    }

    if (possibleChecks[0].children[0].children.length > 1) {
        return hideGoldChecks === true
    } else {
        const fill = possibleChecks[0].children[0].children[0].getAttribute('fill');

        if (fill !== null && typeof fill !== 'undefined') {
            return hideGreyChecks === true
        }
    }
    return true
};

let unhideCount = 0;
let hidingEnabled: (boolean | null) = null;
let hideGoldChecks: (boolean | null) = null;
let hideGreyChecks: (boolean | null) = null;
let fullyHide: (boolean | null) = null;
let hideRepliesOnly: (boolean | null) = null;

chrome.storage.local.get(['hidingEnabled', 'hideGoldChecks', 'hideGreyChecks', 'fullyHide', 'hideRepliesOnly'], (result) => {
    if (result.hidingEnabled !== undefined) {
        hidingEnabled = result.hidingEnabled
    }

    if (result.hideGoldChecks !== undefined) {
        hideGoldChecks = result.hideGoldChecks
    }

    if (result.hideGreyChecks !== undefined) {
        hideGreyChecks = result.hideGreyChecks
    }

    if (result.fullyHide !== undefined) {
        fullyHide = result.fullyHide
    }

    if (result.hideRepliesOnly !== undefined) {
        hideRepliesOnly = result.hideRepliesOnly
    }
});

const observerCallback = (mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            readPage(); // Call your existing function when DOM changes
        }
    }
};

const setupMutationObserver = () => {
    const observer = new MutationObserver(observerCallback);

    // Configure the observer to watch for changes in the body of the page
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

const readPage = (): void => {
    // Check if we're on the timeline
    if (hideRepliesOnly === true) {
        const title = document.title;

        if (title.endsWith('Home / X')) {
            updateStoredCheckNames(new Set<string>());

            chrome.runtime.sendMessage(
                {
                    from: 'content',
                    type: 'parsed-page',
                    message: {names: []}
                }
            );
            return;
        }
    }

    // Detects profile page header blue check
    const usernameHeader = document.querySelectorAll('[data-testid="UserName"]');

    // Detects feed blue checks
    const usernameFeed = document.querySelectorAll('[data-testid="User-Name"]');

    const checkNames = new Set<string>();

    usernameHeader.forEach((userName) => {
        if (isBlueCheck(userName)) {
            // This is on profile page, nothing to do here
            // userName.setAttribute('style', 'display: none;')
            checkNames.add(getUsernameFromHeader(userName));
        }
    });

    usernameFeed.forEach((username) => {
        if (isBlueCheck(username)) {
            const extractedName = getUsernameFromFeed(username);

            if (hidingEnabled === true) {
                const hideStyle = 'display: none;';
                // const hideStyle = 'background-color: #345345;'
                const parentContainer = username.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;

                if (parentContainer !== undefined && parentContainer != null) {
                    const hiddenDiv = document.createElement('div');
                    const id = `unhide-${unhideCount++}`;

                    hiddenDiv.setAttribute('style', 'padding: 12px; font-family: sans-serif; color: #1d9bf0; border-bottom: 1px solid #1d9bf0;opacity: 0.5;');
                    hiddenDiv.innerHTML = extractedName + ' hidden by extension <u id="' + id + '" style="cursor: pointer;">Show</u>';

                    if (parentContainer.children.length === 1) {
                        // Single tweet on timeline
                        if (fullyHide === false) {
                            parentContainer.appendChild(hiddenDiv);

                            document.getElementById(id)?.addEventListener('click', (event) => {
                                event.preventDefault();
                                parentContainer.children[0].lastElementChild?.setAttribute('style', '');
                                parentContainer.children[1].setAttribute('style', 'display: none;');
                            });
                        }

                        parentContainer.children[0].lastElementChild?.setAttribute('style', hideStyle);
                    } else if (parentContainer.children.length === 4) {
                        // Quote tweet on timeline
                        if (fullyHide === false) {
                            parentContainer.insertBefore(hiddenDiv, parentContainer.children[3]);

                            document.getElementById(id)?.addEventListener('click', (event) => {
                                event.preventDefault();
                                parentContainer.children[2].lastElementChild?.setAttribute('style', '');
                                parentContainer.children[3].setAttribute('style', 'display: none;');
                            });
                        }

                        parentContainer.children[2].lastElementChild?.setAttribute('style', hideStyle);
                    }
                }
            }

            checkNames.add(extractedName);
        }
    });

    updateStoredCheckNames(checkNames);

    chrome.runtime.sendMessage(
        {
            from: 'content',
            type: 'parsed-page',
            message: {names: [...checkNames]}
        }
    );
};

// Initialize the MutationObserver
setupMutationObserver();

export {}
