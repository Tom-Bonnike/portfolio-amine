import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite, TimelineLite, Power2 } from 'gsap'
import { projectCoverPerimeter } from 'src/sass/variables/exports.module.scss'
import SwagButton from '../SwagButton'
import styles from './slider-cover.module.scss'

class SliderCover extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    handleProjectLinkClick: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.rectangles = {}
  }

  componentDidMount () {
    this.timeline = this.getTimeline()
    this.animate()
  }

  shouldComponentUpdate (nextProps) {
    return (nextProps.project.title !== this.props.project.title)
  }

  componentDidUpdate () {
    this.animate()
  }

  componentWillUnmount () {
    // Always clear the timeline to avoid multiple timeline running at the same time if coming back
    // to the page.
    this.timeline.clear()
    // Always undraw the white rectangle when unmounting the component. We use TweenLite instead of
    // manually setting the attribute so that it properly overrides TweenLite’s CSS.
    TweenLite.set(
      this.rectangles.white,
      { strokeDashoffset: `-${projectCoverPerimeter}` }
    )
  }

  animate () {
    this.timeline.restart()
  }

  getTimeline () {
    const invisible = { autoAlpha: 0 }
    const visible = { autoAlpha: 1 }
    // Create the timeline, paused by default, so that we can re-use the same timeline and restart
    // it everytime we need it.
    const timeline = new TimelineLite({ paused: true })

    return (
      timeline
        .fromTo(this.image, 1, invisible, visible)
        .fromTo(this.info, 1, invisible, visible)
        .fromTo(
          this.rectangles.grey,
          2.5,
          { strokeDashoffset: `-${projectCoverPerimeter}` },
          { strokeDashoffset: 0, ease: Power2.easeOut }
        )
        .fromTo(this.title, 1, invisible, visible)
        .fromTo(this.button, 1, invisible, visible)
    )
  }

  render () {
    const { project, handleProjectLinkClick } = this.props
    const { shortTitle, type, title, path } = project

    return (
      <div>
        <div className={styles.rectangle}>
          <h1
            ref={(component) => { this.title = component }}
            className={styles.title}
          >
            {shortTitle}
          </h1>

          <div
            ref={(component) => { this.info = component }}
            className={styles.projectInfo}
          >
            <span className={styles.projectType}>{type}</span>
            <span className={styles.projectName}>{title}</span>
          </div>

          <div
            ref={(component) => { this.image = component }}
            className={styles.projectImage}
            style={{ backgroundImage: `url(${prefixLink(project.cover)})` }}
          />

          <svg className={styles.svg}>
            {['grey', 'white'].map(lineColor => (
              <polyline
                ref={(component) => { this.rectangles[lineColor] = component }}
                key={lineColor}
                className={styles[lineColor]}
                points="1,208 1,318 721,318 721,1 1,1 1,110"
              />
            ))}
          </svg>
        </div>

        <div
          ref={(component) => { this.button = component }}
          className={styles.buttonWrapper}
        >
          <SwagButton
            handleClick={() => { handleProjectLinkClick(this.rectangles.white) }}
            href={prefixLink(path)}
            text="View project"
          />
        </div>
      </div>
    )
  }
}

export default SliderCover
