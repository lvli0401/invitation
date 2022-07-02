import { get, post } from './http'

const registerPost = async (param: any) => {
  return new Promise((resolve, reject) => {
    post('/prod/fake-auth', param).then(
      res => {
        resolve(res)
      },
      error => {
        console.log('网络异常~', error)
        reject(error)
      },
    )
  })
}

export { registerPost }
