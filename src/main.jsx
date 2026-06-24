// Entry point. Import order matters:
//   1. globals (window.React, window.lucide, image URLs, ...)
//   2. design-system bundle (reads window.React, sets the DS namespace)
//   3. styles
//   4. app (defines components, mounts to #root)
import './setup-globals.js'
import './ds-bundle.js'
import './styles.css'
import './app.jsx'
