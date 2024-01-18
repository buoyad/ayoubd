import { Box } from '.'
import { styleSheet } from '../util'
import { firaCode } from '../fonts'

const heights = {
  small: 'max-h-[40ch]',
  medium: 'max-h-[60ch]',
  large: 'max-h-[80ch]',
}

export const Code = (props: any) => {
  const mh =
    heights[(props.maxHeight as 'small' | 'medium' | 'large') || 'medium'] ||
    heights.medium
  const title = props.title
  return (
    <Box
      style={styles.container}
      className={`overflow-auto text-gray-100 ${mh}`}
      gap="medium"
    >
      {!!title && (
        <Box>
          <p>{props.title}</p>
        </Box>
      )}
      <pre {...props} />
    </Box>
  )
}

export const CodeInner = ({ className, ...props }: any) => {
  return (
    <code
      {...props}
      className="text-base"
      style={{
        ...firaCode.style,
        fontFeatureSettings: '"liga" 1',
      }}
    />
  )
}

const styles = styleSheet({
  container: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#222',
    padding: '12px 24px',
    boxShadow: '0 0 2px rgba(0,0,0,0.9)',
  },
})
