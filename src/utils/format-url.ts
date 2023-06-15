/**
 * The function removes the protocol (http or https) from a given URL string.
 * @param {string} url - The `url` parameter is a string representing a URL that may or may not have a
 * protocol (either "http://" or "https://") at the beginning.
 * @returns The function `removeProtocol` takes a string `url` as input and removes the protocol
 * (either "http://" or "https://") from the beginning of the string using a regular expression. The
 * modified string is then returned as output.
 */
export function removeProtocol(url: string) {
  return url.replace(/^https?:\/\//, '')
}

/**
 * The function adds the "http://" protocol to a URL if it doesn't already have it.
 * @param {string} url - The `url` parameter is a string representing a website URL.
 * @returns If the input `url` does not start with either `http://` or `https://`, the function will
 * return a new string with `http://` added to the beginning of the input `url`. If the input `url`
 * already starts with `http://` or `https://`, the function will simply return the input `url` without
 * any modifications.
 */
export function addProtocol(url: string) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `http://${url}`
  }
  return url
}

/**
 * The function checks if a given URL has a protocol of either "http://" or "https://".
 * @param {string} url - The `url` parameter is a string representing a URL that we want to check for
 * the presence of a protocol (either "http://" or "https://").
 * @returns The function `hasProtocol` takes a string parameter `url` and returns a boolean value. It
 * returns `true` if the `url` parameter starts with either `http://` or `https://`, indicating that it
 * has a protocol specified. Otherwise, it returns `false`.
 */
export function hasProtocol(url: string) {
  return url.startsWith('http://') || url.startsWith('https://')
}
