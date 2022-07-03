import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import Index from '@/pages/index/index'
import Enzyme, { shallow, render, mount } from 'enzyme'

Enzyme.configure({
  adapter: new Adapter(),
})

//组件渲染测试
describe(`测试<App /> snapshots`, () => {
  const tree = shallow(<Index />)

  it('1. 匹配快照', () => {
    expect(toJson(tree)).toMatchSnapshot()
  })
})
