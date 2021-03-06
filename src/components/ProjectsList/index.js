import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import SwagButton from '../SwagButton'
import styles from './projects-list.module.scss'

const ProjectsList = ({ projectsData }) => (
  <ul className={styles.root}>
    {projectsData.map(project => (
      <li
        style={{ backgroundImage: `url(${prefixLink(project.intro)})` }}
        className={styles.item}
      >
        <div className={styles.content}>
          <span className={styles.type}>{project.type}</span>
          <span className={styles.title}>{project.title}</span>
        </div>

        <div className={styles.buttonWrapper}>
          <SwagButton
            href={prefixLink(project.path)}
            text="View project"
          />
        </div>
      </li>
    ))}
  </ul>
)

ProjectsList.propTypes = {
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProjectsList
