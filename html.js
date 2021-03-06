import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import getAbsoluteURL from 'src/utils/get-absolute-url'

const BUILD_TIME = new Date().getTime()

const HTML = ({ body }) => {
  const head = Helmet.rewind()
  let css
  let js

  if (process.env.NODE_ENV === 'production') {
    css = (
      <style
        dangerouslySetInnerHTML={{
          __html: require('!raw!./public/styles.css') // eslint-disable-line global-require
        }}
      />
    )

    js = (
      <script
        dangerouslySetInnerHTML={{
          __html: require('!raw!./src/utils/browser/google-analytics.js') // eslint-disable-line global-require
        }}
      />
    )
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui" />

        {head.title.toComponent()}
        <meta property="og:type" content="website" />
        <meta property="og:image" content={getAbsoluteURL('/static/images/og-image.png')} />
        {head.meta.toComponent()}
        <link rel="icon" href={prefixLink('/static/images/favicon.ico')} />
        {head.link.toComponent()}

        <script
          dangerouslySetInnerHTML={{
            __html: require('!raw!./src/utils/browser/load-fonts.js') // eslint-disable-line global-require
          }}
        />
        {css}
      </head>
      <body>
        <div
          id="react-mount"
          dangerouslySetInnerHTML={{
            __html: body
          }}
        />

        <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
        {js}
      </body>
    </html>
  )
}

HTML.propTypes = {
  body: PropTypes.string.isRequired
}

module.exports = HTML
