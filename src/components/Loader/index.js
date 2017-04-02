import React, { Component, PropTypes } from 'react'
import ProgressBar from '../ProgressBar'
import styles from './loader.module.scss'

class Loader extends Component {
  static propTypes = {
    onReady: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { progress: 0 }
  }

  componentDidMount () {
    this.loadAssets()
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  loadAssets () {
    // @TODO get assets logic here instead of fake interval
    this.interval = setInterval(() => {
      if (this.state.progress === 100) {
        this.props.onReady()
      } else {
        this.setState(prevState => ({
          progress: prevState.progress + 1
        }))
      }
    }, 100)
  }

  render () {
    const { progress } = this.state

    return (
      <section className={styles.root}>
        <div className={styles.wrapper}>
          <span className={styles.welcomeText}>WELCOME</span>
          <div className={styles.progressBarWrapper}>
            <ProgressBar progress={progress} />
          </div>
        </div>
      </section>
    )
  }
}

export default Loader