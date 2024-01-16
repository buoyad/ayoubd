import { Button } from './Button'
import { useTheme } from '../theme-context'
import { Icon, IconName } from './Icon-component'

export const ColorMode = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme()

  if (!theme) {
    return null
  }

  const icon: IconName = theme === 'light' ? 'sun' : 'moon'

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={className}
    >
      <Icon name={icon} width={16} height={16} />
    </Button>
  )
}
