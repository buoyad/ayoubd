import Link from "next/link";
import { Box } from "../ui/components";

export default function Nav() {
    return <Box row={true} gap="large" style={{ width: '100%' }}>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/work">Work</Link>
        <Link href="/admin">Admin</Link>
    </Box>
}