import React from 'react'
import toJson from 'enzyme-to-json'
import Index from '@/pages/index/index'
import { shallow, render, mount } from 'enzyme'

//组件渲染测试
describe(`测试<App /> snapshots`, () => {
  const tree = shallow(<Index />)

  it('匹配首页快照', () => {
    expect(toJson(tree)).toMatchSnapshot()
  })
})
