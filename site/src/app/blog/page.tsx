import { getBlogContent } from "@/lib/content";
import { Box, Heading } from "../../ui/components";

type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export default async function Page() {
    const content = await getBlogContent()
    console.log(content)
    return <Box>
        <Heading>Blog</Heading>
        {content.map((post) => <PostRow key={post.slug} {...post} />)}
    </Box>
}

const PostRow = ({ content, frontmatter, slug }: ArrayElement<Awaited<ReturnType<typeof getBlogContent>>>) => {
    return <Box>
        <Heading>{frontmatter.title}</Heading>
    </Box>
}