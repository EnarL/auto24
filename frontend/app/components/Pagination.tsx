interface PaginationProps {
    currentPage: number;
    totalCars: number;
    onPageChange: (newPage: number) => void;
    carsPerPage: number;
}

const Pagination = ({ currentPage, totalCars, onPageChange, carsPerPage }: PaginationProps) => {
    Math.ceil(totalCars / carsPerPage);
    return (
        <div>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2 p-1 border border-gray-300 disabled:opacity-50"
            >
                Eelmine
            </button>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage * carsPerPage >= totalCars}
                className="p-1 border border-gray-300 disabled:opacity-50"
            >
                Järgmine
            </button>
        </div>
    );
};

export default Pagination;
