import React from 'react'
import s from './index.module.scss'
import { Button } from 'antd'

export default () => {
  return (
    <div>
      <div className={s.home}>首页</div>
      <Button type='dashed'>测试</Button>
    </div>
  )
}
