export default function GameDetail({ game }) {
  return (
    <div className="pt-3 mt-3 border-t border-gray-100 space-y-2" onClick={(e) => e.stopPropagation()}>
      <p className="text-sm text-gray-700 leading-relaxed">{game.description}</p>
      {game.bggUrl && (
        <a
          href={game.bggUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {'\u{1F3B2}'} View on BoardGameGeek &rarr;
        </a>
      )}
    </div>
  )
}
