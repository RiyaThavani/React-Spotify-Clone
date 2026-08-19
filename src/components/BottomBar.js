import Player from './BottomBar/Player';

function BottomBar() {
    return (
        <div className="h-24 bg-footer border-t border-white border-opacity-5">
            <div className='h-full max-w-[1800px] mx-auto'>
                <Player />
            </div>
        </div>
    );
}

export default BottomBar;

