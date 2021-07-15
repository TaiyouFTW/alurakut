export function Relations({ title, items }) {
    return (
        <>
            <h2 className="smallTitle">
                {title} ({items.length})
            </h2>
            <ul>
                {items.slice(0, 6).map((item) => {
                    return (
                        <li key={item.id}>
                            <a href={`/users/${item.name}`}>
                                <img src={item.image} />
                                <span>{item.name}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
};