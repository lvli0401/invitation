import { get, post } from './http'

const registerPost = (param: any) => post('/prod/fake-auth', param)

export { registerPost }
