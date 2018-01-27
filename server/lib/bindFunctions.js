export default function (self) {
  const exclude = ['_init', 'constructor']
  const props = self.constructor.name === 'Object'
    ? Object.getOwnPropertyNames(self) // Regular object
    : Object.getOwnPropertyNames(self.constructor.prototype) // Class object

  for (const prop of props) {
    const val = self[prop]

    if (typeof val === 'function' && !exclude.includes(val)) {
      self[prop] = val.bind(self)
    }
  }
}
