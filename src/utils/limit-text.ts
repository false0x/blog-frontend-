export function limitText(inputText: string, maxLength: number = 250): string {
    const processedText: string = inputText.split(/\s+/).join(' ')

    if (processedText.length <= maxLength) {
        return processedText
    } else {
        return processedText.slice(0, maxLength - 3).replace(/\.+$/, '') + '...'
    }
}