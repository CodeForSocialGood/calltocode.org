function bindFunctions (self) {
  const reserved = ['_init', 'constructor']
  const props = self.constructor.name === 'Object'
    ? Object.getOwnPropertyNames(self) // Regular object
    : Object.getOwnPropertyNames(self.constructor.prototype) // Class object

  for (const prop of props) {
    const val = self[prop]

    if (typeof val === 'function' && reserved.every(r => !prop.startsWith(r))) {
      self[prop] = val.bind(self)
    }
  }
}

module.exports = bindFunctions
