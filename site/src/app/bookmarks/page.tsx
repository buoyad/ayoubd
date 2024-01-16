import { getBookmarks } from '@/lib/bookmarks'
import { Box, Heading, Text } from '@/ui/components'
import dayjs from 'dayjs'

export default async function Page() {
  const bookmarks = await getBookmarks()
  return (
    <Box className="content !gap-12">
      <Box className="!gap-0">
        <Heading className="!pb-0">Bookmarks</Heading>
        <Text className="text-base font-semibold">
          Resources and interesting articles I want to keep handy
        </Text>
      </Box>
      <Box className="w-full !gap-6">
        {bookmarks.map((bookmark) => (
          <BookmarkRow key={bookmark.url} {...bookmark} />
        ))}
      </Box>
    </Box>
  )
}

const BookmarkRow = ({
  url,
  date,
  domain,
  title,
  favicon,
}: Awaited<ReturnType<typeof getBookmarks>>[number]) => {
  return (
    <a
      className="text-body group w-full cursor-pointer hover:no-underline"
      href={url}
      rel="noopener"
    >
      <Text className="text-base font-semibold group-hover:underline">
        {title}
      </Text>
      <Box row className="w-full !gap-1">
        <Box
          className="relative h-[15px] w-[15px] rounded"
          role="img"
          aria-label="Favicon"
        >
          {/* inset here is to fix background color peeking */}
          <Box
            className="absolute inset-[.5px] rounded bg-gray-200"
            aria-hidden
          />
          <img
            className="absolute inset-0 rounded"
            src={favicon}
            alt="Favicon"
          />
        </Box>
        <Text className="text-xs">{domain}</Text>
        <Box
          className="relative top-1 h-[1px] flex-grow opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(90deg, white 0%, white 50%, transparent 51%, transparent 100%)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: '5px 1px',
          }}
        />
        <Text className="text-xs">{dayjs(date).format('MMM D, YYYY')}</Text>
      </Box>
    </a>
  )
}
