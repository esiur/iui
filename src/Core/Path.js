export default class Path {
  /**
   * Similar to `os.path.join` in nodejs.
   * @param {...String} args
   * @returns {String}
   */
  static join() {
    return Array.from(arguments)
      .join("/")
      .replace(/\/{1,}/g, "/");
  }
}
