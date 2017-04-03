import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import styles from './button.module.scss'

class SwagButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    external: PropTypes.bool
  }

  static defaultProps = {
    external: false,
    href: '#'
  }

  constructor (props) {
    super(props)

    this.rectLength =
      `${(parseInt(styles.buttonWidth, 10) * 2) + (parseInt(styles.buttonHeight, 10) * 2)}px`
    this.state = { dashOffset: this.rectLength }
  }

  createLinkProps () {
    const { href, external } = this.props

    return ({
      className: styles.link,
      [external ? 'href' : 'to']: prefixLink(href) || '#',
      target: external ? '_blank' : null,
      rel: external ? 'noopener noreferrer' : null
    })
  }

  render () {
    const { dashOffset } = this.state
    const { text } = this.props

    return (
      <button
        className={styles.button}
        onMouseOver={() => this.setState({ dashOffset: '0px' })}
        onMouseLeave={() => this.setState({ dashOffset: this.rectLength })}
      >
        <Link {...this.createLinkProps()}>
          <span>{text}</span>
          <svg
            className={styles.rectanglesContainer}
            width={styles.buttonWidth}
            height={styles.buttonHeight}
          >
            <rect
              className={styles.greyBorders}
              width="180"
              height="44"
              x="1.5"
              y="4.5"
            />
            <rect
              className={styles.greyBorders}
              width="172"
              height="52"
              x="4.5"
              y="1.5"
              transform="rotate(180 91 27)"
            />
            <rect
              className={styles.whiteBorders}
              width="180"
              height="44"
              x="1.5"
              y="4.5"
              strokeDashoffset={dashOffset}
              strokeDasharray={this.rectLength}
            />
            <rect
              className={styles.whiteBorders}
              width="172"
              height="52"
              x="4.5"
              y="1.5"
              strokeDashoffset={dashOffset}
              strokeDasharray={this.rectLength}
              transform="rotate(180 91 27)"
            />
          </svg>
        </Link>
      </button>
    )
  }
}

export default SwagButton
