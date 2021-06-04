import React, { useState } from 'react'

export default function SearchBar() {

    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (): void => {
        window.location.replace(`/user/:username=${searchQuery}`);
    }

    return (
        <form onSubmit={handleSearch}>
            <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" onClick={handleSearch}>Search</button>
        </form>
    )
}
