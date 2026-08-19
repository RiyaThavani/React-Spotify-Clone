import { Icon } from 'Icons';

function DownloadApp() {
    const handleClick = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        const isAndroid = /android/i.test(userAgent)
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window).MSStream

        if (isAndroid) {
            window.open('https://play.google.com/store/apps/details?id=com.spotify.music', '_blank')
        } else if (isIOS) {
            window.open('https://apps.apple.com/app/spotify/id324684580', '_blank')
        } else {
            window.open('https://www.spotify.com/download/', '_blank')
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="h-10 flex flex-shrink-0 items-center px-6 text-sm font-semibold text-link gap-x-4 hover:text-white hover:cursor-pointer text-left"
        >
            <Icon name='download' size={20} />
            Download App
        </button>
    )
}

export default DownloadApp
