import React from 'react';

function Nav({ onGenreChange, selectedGenre }) {
    const handleMouseEnter = (e) => {
        e.target.classList.add('hover-option');
    };

    const handleMouseLeave = (e) => {
        e.target.classList.remove('hover-option');
    };

    const handleClick = (e) => {
        const genre = e.target.classList[1];
        onGenreChange(genre);
        const activeElem = document.querySelector('.active');
        if (activeElem)
            activeElem.classList.remove('active');
        e.target.classList.add('active');
    };

    return (
        <nav className="navbar">
            <option
                className={`genre all ${selectedGenre === 'all' ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                All
            </option>
            <option
                className={`genre funk ${selectedGenre === 'funk' ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                Funk
            </option>
            <option
                className={`genre hip-hop ${selectedGenre === 'hip-hop' ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                Hip Hop
            </option>
            <option
                className={`genre country ${selectedGenre === 'country' ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                Country
            </option>
            <option
                className={`genre latin ${selectedGenre === 'latin' ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                Latin
            </option>
            <option
                className={`genre pop ${selectedGenre === 'pop' ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                Pop
            </option>
            <option
                className={`genre jazz ${selectedGenre === 'jazz' ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                Jazz
            </option>
            <option
                className={`genre rock ${selectedGenre === 'rock' ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                Rock
            </option>
            <option
                className={`genre soul ${selectedGenre === 'soul' ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                Soul and R&B
            </option>
        </nav>
    );
}

export default Nav;
