import { registerAPI, loginAPI, sendEmailCodeAPI, getUserFavoriteListAPI } from '@/apis'
import logo from '@/assets/svgs/logo.svg'
import GreyButton from '@/components/common/grey-button'
import { setFavoriteList } from '@/store/modules/favorites'
import { setLikedLabels, setLoginStatus, setTempId, setUserInfo } from '@/store/modules/user'
import { Icon } from '@iconify/react'
import {
  notification,
  Button,
  Form,
  Input,
  Row,
  message,
  type FormProps,
  type FormInstance,
} from 'antd'
import { FC, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

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
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const registerFormRef = useRef<FormInstance<RegisterForm>>(null)

  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [codeStatus, setCodeStatus] = useState<{ isSent: boolean; countDown: number }>({
    isSent: false,
    countDown: 0,
  })
  const [mouseEnter, setMouseEnter] = useState(false)
  const [windowVisible, setWindowVisible] = useState(true)

  // 登录提交
  const [loginLoading, setLoginLoading] = useState(false)
  const handleLogin: FormProps<LoginForm>['onFinish'] = async (values) => {
    try {
      setLoginLoading(true)
      const {
        data: { userInfo, accessToken, refreshToken },
      } = await loginAPI(values)
      dispatch(
        setUserInfo({
          id: userInfo.id,
          username: userInfo.username,
          avatar: userInfo.avatar,
          littleAvatar: userInfo.littleAvatar,
          email: userInfo.email,
          fanNum: userInfo.fanCount,
          followNum: userInfo.followCount,
        }),
      )
      dispatch(setTempId(''))
      dispatch(setLikedLabels(userInfo.likedLabels))
      dispatch(setLoginStatus(true))
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      const { data } = await getUserFavoriteListAPI({ id: userInfo.id })
      const list = data.sort((a, b) => a.order - b.order)
      dispatch(setFavoriteList(list))
      notification.success({
        message: '登录成功',
        description: `欢迎回来，${userInfo.username}！`,
      })
      navigate('/home')
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setLoginLoading(false)
    }
  }
  // 注册提交
  const [registerLoading, setRegisterLoading] = useState(false)
  const handleRegister: FormProps<RegisterForm>['onFinish'] = async (values) => {
    try {
      setRegisterLoading(true)
      await registerAPI({
        email: values.email,
        password: values.password,
        verification_code: values.validateCode,
      })
      notification.success({
        message: '注册成功',
        description: '请登录邮箱验证账号！',
      })
      setIsRegister(false)
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setRegisterLoading(false)
    }
  }
  // 发送验证码，60s倒计时刷新状态
  const [sendingCode, setSendingCode] = useState(false)
  const handleSendCode = async () => {
    const email = registerFormRef.current?.getFieldValue('email')
    if (!email) return messageApi.error('请填写邮箱！')
    if (codeStatus.isSent) return
    try {
      setSendingCode(true)
      await sendEmailCodeAPI({ email })
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
    } catch (error) {
      console.log('出现错误了喵！！', error)
      return
    } finally {
      setSendingCode(false)
    }
  }

  return (
    <>
      {contextHolder}
      <CSSTransition in={!windowVisible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div className='absolute top-10px left-1/2 -translate-x-1/2 z-2'>
          <GreyButton
            onClick={() => {
              setWindowVisible(true)
            }}>
            <Icon color='#fff' icon='ant-design:arrow-down-outlined' />
          </GreyButton>
        </div>
      </CSSTransition>

      <CSSTransition in={windowVisible} timeout={300} classNames='opacity-gradient' unmountOnExit>
        <div
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
          className='overflow-hidden select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-130 rounded-6 p-15 flex flex-col items-center justify-between gap-10 bg-white z-2'>
          <div className='flex flex-col items-center justify-center'>
            <img className='w-50' src={logo} alt='picals-logo' />
            <span className='font-normal font-size-m color-deepgrey'>兴趣使然的插画收藏小站</span>
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

          {/* 关闭按钮 */}
          <CSSTransition in={mouseEnter} timeout={300} classNames='opacity-gradient' unmountOnExit>
            <div className='absolute top-10 right-10'>
              <GreyButton
                onClick={() => {
                  setWindowVisible(false)
                }}>
                <Icon color='#fff' icon='ant-design:close-outlined' />
              </GreyButton>
            </div>
          </CSSTransition>

          {/* 默认状态，选择登录还是注册 */}
          {!isLogin && !isRegister && (
            <div
              className='
            w-full
            flex
            flex-col
            gap-10
        '>
              <Button
                size='large'
                shape='round'
                className='w-full'
                type='primary'
                onClick={() => setIsRegister(true)}>
                注册账号
              </Button>

              <Button
                size='large'
                shape='round'
                className='w-full'
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
              <Form.Item className='w-full flex justify-center'>
                <Button
                  className='w-50'
                  type='default'
                  shape='round'
                  size='large'
                  loading={loginLoading}
                  htmlType='submit'>
                  登录
                </Button>
              </Form.Item>
            </Form>
          )}

          {/* 注册状态 */}
          {isRegister && (
            <Form
              name='register'
              ref={registerFormRef}
              labelCol={{ span: 6 }}
              labelAlign='left'
              wrapperCol={{ span: 18 }}
              style={{ width: '100%' }}
              onFinish={handleRegister}
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
                    loading={sendingCode}
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
                label='确认密码'
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
              <Form.Item className='w-full flex justify-center'>
                <Button
                  className='w-50'
                  type='default'
                  shape='round'
                  size='large'
                  loading={registerLoading}
                  htmlType='submit'>
                  注册
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </CSSTransition>
    </>
  )
}

export default LoginWindow
