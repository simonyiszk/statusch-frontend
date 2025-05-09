import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'

import GrommetApp from 'grommet/components/App'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Toast from 'grommet/components/Toast'
import Anchor from 'grommet/components/Anchor'
import Footer from 'grommet/components/Footer'
import Heading from 'grommet/components/Heading'
import Section from 'grommet/components/Section'
import Status from 'grommet/components/icons/Status'
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub'

import { getLaundry, hideToast, loadSave } from '../actions'
import { NotFound } from '../components'
import LaundryContainer from './LaundryContainer'


import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      desktop: false,
    }
    this.onResize = this.onResize.bind(this)
  }

  componentDidMount() {
    const subscriptions = JSON.parse(localStorage.getItem('mosogepschdatasave')) || []

    this.props.loadSave(subscriptions)
    this.props.getLaundry()
    setInterval(() => this.props.getLaundry(), 1000 * 60)

    window.addEventListener('resize', this.onResize);
    this.onResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const desktop = window.innerWidth > 720
    if (desktop !== this.state.desktop) {
      this.setState({ desktop });
    }
  }

  render() {
    const { showToast, toastData: { text, status } } = this.props
    return (
      <GrommetApp className='app' centered={false} lang='hu-HU'>
        <Header
          size='small'
          float={false}
          fixed
          pad='small'
          colorIndex='light-2'
          full='horizontal'
          className='header-gr'
        >
          <Box direction='row' flex='grow' responsive={false} align='center' pad={{ horizontal: 'medium' }}>
            <Box align='start' flex='grow'>
              <Link to='/' href='/'>
                <picture>
                  <source type='image/svg+xml' width='40' srcSet='status_icon.svg' />
                  <img width='40' src='status_icon.png' alt='' />
                </picture>
              </Link>
            </Box>
            <Box align='end' flex='grow'>
              <a href='https://github.com/simonyiszk/mosogep-sch-reboot/issues'>Hibabejelentés</a>
            </Box>
          </Box>
        </Header>

        <Section>
          <Switch>
            <Route exact path='/' component={LaundryContainer} />
            <Route component={NotFound} />
          </Switch>
        </Section>

        {
          showToast &&
          <Toast onClose={() => this.props.hideToast()} >
            <Box direction='row' align='center' justify='around' responsive={false}>
              <Status value={status} />
              <Heading tag='h3' className='toast-text'>
                {text}
              </Heading>
            </Box>
          </Toast>
        }

        <div id="spacer"></div>
        <Footer
          colorIndex='grey-5-a'
          className='footer'
          pad={{ vertical: 'small' }}
          full='horizontal'
        >
          <Box direction='row' responsive={false} justify='center' flex='grow'>
            Újraindította&nbsp;<a href="https://ha5kfu.hu">HA5KFU</a>&nbsp;&amp;&nbsp;<a href="https://sem.sch.bme.hu">SEM</a>
            <Anchor
              className='social-icon'
              icon={<SocialGithubIcon />}
              href='https://github.com/simonyiszk/mosogep-sch-reboot'
              primary
              target='_blank'
              animateIcon={false}
            />
          </Box>
        </Footer>
      </GrommetApp>
    )
  }
}

const mapStateToProps = ({ laundry: { showToast, toastData } }) => ({
  showToast,
  toastData,
})

const mapDispatchToProps = dispatch => ({
  getLaundry: () => {
    dispatch(getLaundry())
  },
  hideToast: () => {
    dispatch(hideToast())
  },
  loadSave: (save) => {
    dispatch(loadSave(save))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
