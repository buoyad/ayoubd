import styles from './page.module.css'
import { Box } from './ui/components'
import { ColorMode } from './ui/theme-context'

export default function Home() {
  return (
    <main className={styles.main}>
      <Box style={{ alignItems: 'center' }}>
        <h1>new ayoubd.com coming soon. now with 512mb ram</h1>
        <ColorMode />
      </Box>
    </main>
  )
}
