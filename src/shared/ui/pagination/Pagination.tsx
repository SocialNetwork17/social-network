import React, {useState, useEffect, useMemo} from 'react';
import s from './Pagination.module.css';

export type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number | string) => void;
    maxVisiblePages?: number;
}

const Pagination = ({
                        totalItems,
                        itemsPerPage,
                        currentPage,
                        onPageChange,
                        maxVisiblePages = 5
                    }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const displayPages = useMemo(() => {
        if (totalPages <= maxVisiblePages) {
            // Если страниц меньше или равно максимальному количеству видимых страниц
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | '...')[] = [];
        // Всегда показываем первую страницу
        pages.push(1);

        if (currentPage <= 3) {
            // Показываем первые maxVisiblePages страниц
            for (let i = 2; i <= maxVisiblePages - 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
            // Показываем последние maxVisiblePages страниц
            pages.push('...');
            for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages - 1; i++) {
                pages.push(i);
            }
            pages.push(totalPages);
        } else {
            // Показываем страницы вокруг текущей
            pages.push('...');
            pages.push(currentPage - 1);
            pages.push(currentPage);
            pages.push(currentPage + 1);
            pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    }, [currentPage, totalPages, maxVisiblePages]);

    const handlePageClick = (page: number | string) => {
        if (page === '...' || page === currentPage) return;
        onPageChange(page);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <nav className={s.pagination} aria-label="Page navigation">
            <ul className={s.paginationList}>
                {/* Кнопка "Назад" */}
                <li className={s.paginationItem}>
                    <button
                        className={`${s.paginationButton} ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        &laquo;
                    </button>
                </li>

                {/* Страницы */}
                {displayPages.map((page, index) => (
                    <li key={index} className={s.paginationItem}>
                        {page === '...' ? (
                            <span className={s.paginationEllipsis}>...</span>
                        ) : (
                            <button
                                className={`${s.paginationButton} ${page === currentPage ? 'active' : ''}`}
                                onClick={() => handlePageClick(page)}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}

                {/* Кнопка "Вперед" */}
                <li className={s.paginationItem}>
                    <button
                        className={`${s.paginationButton} ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;