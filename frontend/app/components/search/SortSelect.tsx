interface SortSelectProps {
    sortOption: string;
    onSortChange: (sortValue: string) => void;
}

const SortSelect = ({ sortOption, onSortChange }: SortSelectProps) => {
    return (
        <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className=" p-2 border border-gray-300"
        >
            <option value="">Järjesta</option>
            <option value="price-asc">Hind kasvav</option>
            <option value="price-desc">Hind kahanev</option>
            <option value="year-asc">Uuemad eespool</option>
            <option value="year-desc">Vanemad eespool</option>
        </select>
    );
};

export default SortSelect;
