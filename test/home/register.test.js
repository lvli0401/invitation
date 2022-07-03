import React from 'react'
import { shallow, render, mount } from 'enzyme'
import { registerPost } from '@/api/request'

//组件渲染测试
describe(`测试注册接口`, () => {
  it('参数正确提交', async () => {
    const res = await registerPost({ name: 'll', email: 'll@qq.com' })
    expect(res).toEqual('Registered')
  })

  it('参数错误提交', async () => {
    try {
      const res = await registerPost({
        name: 'll',
        email: 'usedemail@airwallex.com',
      })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
