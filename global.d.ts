declare global {
  let myvar: any
}

global.myvar = global.myvar ?? {}

export default undefined
