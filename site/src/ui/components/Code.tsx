import { Box } from "."

export const Code = (props: any) => {
    return <Box style={{ width: '100%', borderRadius: 4, backgroundColor: '#222', padding: "12px 24px", color: 'white' }} gap="medium">
        {!!props.title && <Box><p>{props.title}</p></Box>}
        <pre {...props} />
    </Box>
}