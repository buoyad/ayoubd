import { styleSheet } from "../util"

type Props = {
    bold?: boolean,
    inline?: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
export const Text = (_props: Props) => {
    const { bold, inline, style: propStyle, ...props } = _props

    const TextComponent = inline ? 'span' : 'p'

    const st = []
    if (bold) {
        st.push(styles.bold)
    }

    const style = Object.assign({}, ...st, propStyle)
    return <TextComponent style={style} {...props} />
}

const styles = styleSheet({
    bold: {
        fontWeight: 'bold',
    }
})