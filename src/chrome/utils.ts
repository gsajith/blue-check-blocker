// export const getCurrentTabUrl = (
//     callback: (url: string | undefined) => void
// ): void => {
//     const queryInfo = {active: true, lastFocusedWindow: true}
//
//     chrome.tabs.query(queryInfo, (tabs) => {
//         callback(tabs[0].url)
//     })
// }

export const getCurrentTabUId = (
    callback: (id: number | undefined) => void
): void => {
    const queryInfo = {active: true, lastFocusedWindow: true};

    chrome.tabs.query(queryInfo, (tabs) => {
        if (tabs.length > 0) {
            callback(tabs[0].id);
        } else {
            callback(undefined); // Handle the case where no active tab is found
        }
    });
};
