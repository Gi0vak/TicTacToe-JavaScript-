import React from 'react'
import PhpIcon from '../../../assets/Php-icon.png'
import JavascriptIcon from '../../../assets/JavaScript-icon.png'

const CodeLanguageImage = ({ code }) => {
  const styles = {
    image: {
      width: '80px',
      height: '80px',
    },
  }

  const Image = code === 'PHP' ? <img src={PhpIcon} alt="PHP Icon" style={styles.image} /> :
    <img src={JavascriptIcon} alt="JS Icon" style={styles.image} />

  return Image
}

export default CodeLanguageImage


