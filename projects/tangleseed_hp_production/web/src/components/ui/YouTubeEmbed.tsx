interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
    autoplay?: boolean;
    className?: string;
}

export default function YouTubeEmbed({
    videoId,
    title = "YouTube video",
    autoplay = false,
    className = ""
}: YouTubeEmbedProps) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1&mute=1' : ''}`;

    return (
        <div
            className={`relative w-full pb-[56.25%] ${className}`}
            style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}
        >
            <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
