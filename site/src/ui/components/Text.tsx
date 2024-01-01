import { styleSheet } from "../util"

type Props = {
    bold?: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
export const Text = (_props: Props) => {
    const { bold, style: propStyle, ...props } = _props

    const st = []
    if (bold) {
        st.push(styles.bold)
    }

    const style = Object.assign({}, ...st, propStyle)
    return <p style={style} {...props} />
}

const styles = styleSheet({
    bold: {
        fontWeight: 'bold',
    }
})