import { Button } from './Button'
import { useTheme } from '../theme-context'
import { Icon, IconName } from './Icon-component'
import { Dropdown } from './Dropdown'

export const ColorMode = ({ className }: { className?: string }) => {
  const { theme, preference, setTheme } = useTheme()

  const options = [
    { label: 'Light', value: 'light', icon: 'sun' },
    { label: 'Dark', value: 'dark', icon: 'moon' },
    { label: 'System', value: undefined, icon: 'gear' },
  ] as const

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

  return (
    <Dropdown
      ariaLabel="Select site theme"
      selected={preference}
      options={options}
      onSelect={setTheme}
      className={className}
    />
  )
}
