import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import Index from '@/pages/index/index'
import { shallow, render, mount } from 'enzyme'

//组件渲染测试
describe(`测试<App /> snapshots`, () => {
  const tree = shallow(<Index />)

  it('1. 匹配首页快照', () => {
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('2. 测试点击invite按钮', () => {
    const wrapper = mount(<Index />)
    const button = wrapper.find('button').at(0)

    expect(button.exists)
    button.simulate('click')
    expect(wrapper.state('visible')).toBe(true)
  })
})
