import React, {ReactElement, useEffect, useState} from 'react'
import {getCurrentTabUId} from './chrome/utils'
import {Accordion} from './components/Accordion'
import ToggleSwitch from './components/ToggleSwitch'

export const App = (): ReactElement | null => {
    const [names, setNames] = useState<string[]>([]);
    const [allNames, setAllNames] = useState<string[]>([]);
    const [currentTabId, setCurrentTabId] = useState<number>(-1);
    const [hidingEnabled, setHidingEnabled] = useState<boolean>(true);
    const [hideRepliesOnly, setHideRepliesOnly] = useState<boolean>(false);
    const [hideGoldChecks, setHideGoldChecks] = useState<boolean>(true);
    const [hideGreyChecks, setHideGreyChecks] = useState<boolean>(true);
    const [fullyHide, setFullyHide] = useState<boolean>(false);
    const initialLoadFlagHiding = React.useRef(true);
    const initialLoadFlagHideRepliesOnly = React.useRef(true);
    const initialLoadFlagFullyHide = React.useRef(true);
    const initialLoadFlagHideGold = React.useRef(true);
    const initialLoadFlagHideGrey = React.useRef(true);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message, sender) => {
            getCurrentTabUId((id) => {
                setCurrentTabId(id ?? -1)
            });

            if (message.from === 'content' && message.type === 'parsed-page' && sender?.tab?.id === currentTabId) {
                setNames(message.message.names);

                chrome.storage.local.get('storedBlueCheckNames').then((storedNames) => {
                    if (storedNames.storedBlueCheckNames !== null) {
                        setAllNames(storedNames.storedBlueCheckNames)
                    }
                })
            }
        })
    }, [currentTabId]);

    useEffect(() => {
        if (initialLoadFlagHiding.current) {
            chrome.storage.local.get('hidingEnabled').then((result) => {
                if (result.hidingEnabled === undefined) {
                    chrome.storage.local.set({hidingEnabled})
                }
            });

            initialLoadFlagHiding.current = false
        } else {
            chrome.storage.local.set({hidingEnabled})
        }
    }, [hidingEnabled]);

    useEffect(() => {
        if (initialLoadFlagHideRepliesOnly.current) {
            chrome.storage.local.get('hideRepliesOnly').then((result) => {
                if (result.hideRepliesOnly === undefined) {
                    chrome.storage.local.set({hideRepliesOnly})
                }
            });

            initialLoadFlagHideRepliesOnly.current = false
        } else {
            chrome.storage.local.set({hideRepliesOnly})
        }
    }, [hideRepliesOnly]);

    useEffect(() => {
        if (initialLoadFlagFullyHide.current) {
            chrome.storage.local.get('fullyHide').then((result) => {
                if (result.fullyHide === undefined) {
                    chrome.storage.local.set({fullyHide})
                }
            });

            initialLoadFlagFullyHide.current = false
        } else {
            chrome.storage.local.set({fullyHide})
        }
    }, [fullyHide]);

    useEffect(() => {
        if (initialLoadFlagHideGold.current) {
            chrome.storage.local.get('hideGoldChecks').then((result) => {
                if (result.hideGoldChecks === undefined) {
                    chrome.storage.local.set({hideGoldChecks})
                }
            });

            initialLoadFlagHideGold.current = false
        } else {
            chrome.storage.local.set({hideGoldChecks})
        }
    }, [hideGoldChecks]);

    useEffect(() => {
        if (initialLoadFlagHideGrey.current) {
            chrome.storage.local.get('hideGreyChecks').then((result) => {
                if (result.hideGreyChecks === undefined) {
                    chrome.storage.local.set({hideGreyChecks})
                }
            });

            initialLoadFlagHideGrey.current = false
        } else {
            chrome.storage.local.set({hideGreyChecks})
        }
    }, [hideGreyChecks]);

    useEffect(() => {
        chrome.storage.local.get('hidingEnabled').then((result) => {
            if (result.hidingEnabled === undefined) {
                setHidingEnabled(true)
            } else {
                setHidingEnabled(result.hidingEnabled)
            }
        });

        chrome.storage.local.get('hideRepliesOnly').then((result) => {
            if (result.hideRepliesOnly === undefined) {
                setHideRepliesOnly(false)
            } else {
                setHideRepliesOnly(result.hideRepliesOnly)
            }
        });

        chrome.storage.local.get('fullyHide').then((result) => {
            if (result.fullyHide === undefined) {
                setFullyHide(false)
            } else {
                setFullyHide(result.fullyHide)
            }
        });

        chrome.storage.local.get('hideGoldChecks').then((result) => {
            if (result.hideGoldChecks === undefined) {
                setHideGoldChecks(true)
            } else {
                setHideGoldChecks(result.hideGoldChecks)
            }
        });

        chrome.storage.local.get('hideGreyChecks').then((result) => {
            if (result.hideGreyChecks === undefined) {
                setHideGreyChecks(true)
            } else {
                setHideGreyChecks(result.hideGreyChecks)
            }
        })
    }, []);

    return (
        <div>
            <div style={{padding: 12}}>
                <ToggleSwitch
                    onText="Hiding enabled"
                    offText="Hiding disabled"
                    handleChecked={(checked) => {
                        setHidingEnabled(checked)
                    }}
                    checked={hidingEnabled}
                />
            </div>

            <div style={{padding: 12}}>
                <ToggleSwitch
                    onText="Hide gold checks (organizations)"
                    offText="Hide gold checks (organizations)"
                    handleChecked={(checked) => {
                        setHideGoldChecks(checked)
                    }}
                    checked={hideGoldChecks}
                />
            </div>

            <div style={{padding: 12}}>
                <ToggleSwitch
                    onText="Hide grey checks (government)"
                    offText="Hide grey checks (government)"
                    handleChecked={(checked) => {
                        setHideGreyChecks(checked)
                    }}
                    checked={hideGreyChecks}
                />
            </div>

            <div style={{padding: 12}}>
                <ToggleSwitch
                    onText="Don't even show the 'tweet hidden' message"
                    offText="Don't even show the 'tweet hidden' message"
                    handleChecked={(checked) => {
                        setFullyHide(checked)
                    }}
                    checked={fullyHide}
                />
            </div>

            <div style={{padding: 12}}>
                <ToggleSwitch
                    onText="Applies to replies only"
                    offText="Applies to replies only"
                    handleChecked={(checked) => {
                        setHideRepliesOnly(checked)
                    }}
                    checked={hideRepliesOnly}
                />
            </div>

            <Accordion
                items={names}
                title={'found on this page'}
            />

            <br/><br/>

            <div style={{display: 'none'}}>
                <Accordion
                    items={allNames}
                    title={'total found'}
                />
            </div>
        </div>
    )
};
