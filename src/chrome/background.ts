import {type ChromeMessage, Sender} from '../types'

type MessageResponse = (response?: any) => void

chrome.runtime.onInstalled.addListener(() => {
    console.log('Installed')
})

chrome.runtime.onMessage.addListener(
    (
        message: ChromeMessage,
        _sender: chrome.runtime.MessageSender,
        _sendResponse: MessageResponse
    ) => {
        if (message.from === Sender.Content && message.type === 'parsed-page') {
            console.log(message.message)
        }
    }
)
