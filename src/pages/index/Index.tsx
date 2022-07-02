import React, { useEffect } from 'react'
import s from './index.module.scss'
import { Button, message, Image } from 'antd'
import heart from '@/static/heart.svg'
import useRegister from '@/page_components/index/useRegister'

export default () => {
  const [modal, open] = useRegister()
  return (
    <div className={s.home}>
      <div className={s.header}>
        {['BROCCOLI', '&', 'CO.'].map(v => (
          <span key={v}>{v}</span>
        ))}
      </div>
      <div className={s.content}>
        <p>A better way</p>
        <p>to enjoy every day.</p>
        <p>Be the first to known when we launch</p>
        <Button type='primary' className={s.button} onClick={open}>
          Request an invite
        </Button>
      </div>
      <div className={s.footer}>
        <div>
          <span>Made with</span>
          <Image className={s.img} src={heart} />
          <span>in Melbourne</span>
        </div>
        <p>@ 2022 Broccoli &amp; Co. All rights reserved</p>
      </div>
      {modal}
    </div>
  )
}
