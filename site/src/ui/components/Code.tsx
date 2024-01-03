import { Box } from '.'
import { styleSheet } from '../util'
import { firaCode } from '../fonts'

export const Code = (props: any) => {
  return (
    <Box style={styles.container} gap="medium">
      {!!props.title && (
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
    color: 'white',
    overflowX: 'scroll',
    boxShadow: '0 0 2px rgba(0,0,0,0.9)',
  },
})
