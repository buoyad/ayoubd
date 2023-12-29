import { Box } from "."
import { styleSheet } from "../util"

export const Code = (props: any) => {
    return <Box style={styles.container} gap="medium">
        {!!props.title && <Box><p>{props.title}</p></Box>}
        <pre {...props} />
    </Box>
}

const styles = styleSheet({
    container: {
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#222',
        padding: "12px 24px",
        color: 'white',
        overflowX: 'scroll',
        boxShadow: '0 0 2px rgba(0,0,0,0.9)',
    }
})