import logo from '@/assets/svgs/logo.svg'
import { Button, Form, Input, Row, type FormProps } from 'antd'
import { FC, useState } from 'react'
import { Icon } from '@iconify/react'
import GreyButton from '@/components/common/grey-button'

// 登录表单
type LoginForm = {
  email: string
  password: string
}
// 注册表单
type RegisterForm = {
  email: string
  validateCode: string
  password: string
  confirmPassword: string
}

const LoginWindow: FC = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  // const [sentCode, setSentCode] = useState(false)
  const [codeStatus, setCodeStatus] = useState<{ isSent: boolean; countDown: number }>({
    isSent: false,
    countDown: 0,
  })

  // 登录提交
  const handleLogin: FormProps<LoginForm>['onFinish'] = (values) => {
    console.log('Success:', values)
  }
  // 登录失败
  const handleLoginFailed: FormProps<LoginForm>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // 注册提交
  const handleRegister: FormProps<RegisterForm>['onFinish'] = (values) => {
    console.log('Success:', values)
  }
  // 注册失败
  const handleRegisterFailed: FormProps<RegisterForm>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // 发送验证码，60s倒计时刷新状态
  const handleSendCode = () => {
    if (codeStatus.isSent) return
    setCodeStatus({ isSent: true, countDown: 60 })
    const timer = setInterval(() => {
      setCodeStatus((prev) => {
        if (prev.countDown === 0) {
          clearInterval(timer)
          return { isSent: false, countDown: 0 }
        }
        return { isSent: true, countDown: prev.countDown - 1 }
      })
    }, 1000)
  }

  return (
    <div
      className='
        absolute
        top-1/2
        left-1/2
        -translate-x-50%
        -translate-y-50%
        w-130
        rounded-6
        p-15
        flex
        flex-col
        items-center
        justify-between
        gap-10
        hover:shadow-lg
        bg-white
        transition-duration-300
        border-color-#E5E5E5
    '>
      <div
        className='
          flex
          flex-col
          items-center
          justify-center
        '>
        <img className='w-50' src={logo} alt='picals-logo' />
        <span
          className='
            font-normal 
            font-size-14px
            color-#6D757A
        '>
          兴趣使然的插画收藏小站
        </span>
      </div>

      {/* 返回按钮 */}
      {(isLogin || isRegister) && (
        <GreyButton
          className='absolute top-10 left-10'
          onClick={() => {
            setIsLogin(false), setIsRegister(false)
          }}>
          <Icon color='#fff' icon='ant-design:arrow-left-outlined' />
        </GreyButton>
      )}

      {/* 默认状态，选择登录还是注册 */}
      {!isLogin && !isRegister && (
        <div
          className='
            w-100%
            flex
            flex-col
            gap-10
        '>
          <Button
            size='large'
            shape='round'
            className='w-100%'
            type='primary'
            onClick={() => setIsRegister(true)}>
            注册账号
          </Button>

          <Button
            size='large'
            shape='round'
            className='w-100%'
            type='default'
            onClick={() => setIsLogin(true)}>
            登录
          </Button>
        </div>
      )}

      {/* 登录状态 */}
      {isLogin && (
        <Form
          name='login'
          labelCol={{ span: 6 }}
          labelAlign='left'
          wrapperCol={{ span: 18 }}
          style={{ width: '100%' }}
          onFinish={handleLogin}
          onFinishFailed={handleLoginFailed}
          autoComplete='off'>
          <Form.Item<LoginForm>
            label='邮箱'
            name='email'
            rules={[{ required: true, message: '登录需要输入邮箱！' }]}>
            <Input size='large' placeholder='请输入邮箱' />
          </Form.Item>
          <Form.Item<LoginForm>
            label='密码'
            name='password'
            rules={[{ required: true, message: '登录需要输入密码！' }]}>
            <Input.Password size='large' placeholder='请输入密码' />
          </Form.Item>
          <Form.Item className='w-100% flex justify-center'>
            <Button className='w-50' type='default' shape='round' size='large' htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* 注册状态 */}
      {isRegister && (
        <Form
          name='register'
          labelCol={{ span: 6 }}
          labelAlign='left'
          wrapperCol={{ span: 18 }}
          style={{ width: '100%' }}
          onFinish={handleRegister}
          onFinishFailed={handleRegisterFailed}
          autoComplete='off'>
          <Form.Item<RegisterForm>
            label='邮箱'
            name='email'
            rules={[{ required: true, message: '注册需要输入邮箱！' }]}>
            <Input size='large' placeholder='请输入邮箱' />
          </Form.Item>
          <Form.Item<RegisterForm>
            label='验证码'
            name='validateCode'
            rules={[{ required: true, message: '请填写发送的验证码！' }]}>
            <Row className='flex justify-between'>
              <Input className='w-40' size='large' placeholder='请输入验证码' />
              <Button
                disabled={codeStatus.isSent}
                size='large'
                type='primary'
                onClick={handleSendCode}>
                {codeStatus.isSent ? `${codeStatus.countDown}s` : '发送验证码'}
              </Button>
            </Row>
          </Form.Item>
          <Form.Item<RegisterForm>
            label='密码'
            name='password'
            rules={[{ required: true, message: '注册需要输入密码！' }]}>
            <Input.Password size='large' placeholder='请输入密码' />
          </Form.Item>
          <Form.Item<RegisterForm>
            label='密码'
            name='confirmPassword'
            rules={[
              { required: true, message: '请再输入一遍密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码输入不一致！'))
                },
              }),
            ]}>
            <Input.Password size='large' placeholder='请再输入一遍密码' />
          </Form.Item>
          <Form.Item className='w-100% flex justify-center'>
            <Button className='w-50' type='default' shape='round' size='large' htmlType='submit'>
              注册
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default LoginWindow
