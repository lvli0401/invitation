import React from 'react'
import Index from '@/pages/index'
import { shallow, render, mount } from 'enzyme'

//组件渲染测试
describe(`测试交互`, () => {
  const container = mount(<Index />)
  it('modal hidden by default', () => {
    expect(
      container.find('Modal[data-testid="modal"]').prop('visible'),
    ).toBeFalsy()
  })

  it('should have the login enabled with valid values', () => {
    container.find('button[data-testid="invite"]').simulate('click')
    expect(
      container.find('Modal[data-testid="modal"]').prop('visible'),
    ).toBeTruthy()
  })

  //   it('should have the login enabled with valid values', () => {
  //     container.find('Modal[data-testid="modal"]').simulate('cancel')
  //     expect(
  //       container.find('Modal[data-testid="modal"]').prop('visible'),
  //     ).toBeFalsy()
  //   })
})
