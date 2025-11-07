import React, {useMemo, useState} from 'react';
import s from './Pagination.module.css';
import {Icon} from "@/shared/ui/Icon/Icon";
import SelectBox, {Option} from "@/shared/ui/select-box/SelectBox";

const options: Option[] = [
    {id: "1", label: "10"},
    {id: "2", label: "20"},
    {id: "3", label: "30"},
    {id: "4", label: "40"},
    {id: "5", label: "50"},
    {id: "6", label: "100"},
];

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
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isDisabled, setDisabled] = useState(false);

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

    const handleSelect = (option: Option) => {
        setSelectedOption(option.id);
        console.log('Selected:', option);
    };

    if (totalPages <= 1) return null;

    return (
        <div className={s.pagination} aria-label="Page navigation">
            <ul className={s.paginationList}>
                {/* Кнопка "Назад" */}
                <li className={s.paginationItem}>
                    <button
                        className={`${s.paginationButton} ${currentPage === 1 ? s.disabled : ''}`}
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        <Icon iconId={'arrow-left'} size={16} viewBox={'0 0 16 16'}/>
                    </button>
                </li>

                {/* Страницы */}
                {displayPages.map((page, index) => (
                    <li key={index} className={s.paginationItem}>
                        {page === '...' ? (
                            <span className={s.paginationEllipsis}>...</span>
                        ) : (
                            <button
                                className={`${s.paginationButton} ${page === currentPage ? s.active : ''}`}
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
                        className={`${s.paginationButton} ${currentPage === totalPages ? s.disabled : ''}`}
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        <Icon iconId={'arrow-right'} size={16} viewBox={'0 0 16 16'}/>
                    </button>
                </li>
            </ul>
            <div className={s.paginationWrapper}>
                <span className={s.paginationText}>Show</span>
                <SelectBox
                    options={options}
                    value={selectedOption}
                    onChange={handleSelect}
                    placeholder="10"
                    disabled={isDisabled}
                    styleContainer={{fontSize: '14px', fontWeight: '400', height: '100%'}}
                    styleBox={{ padding: '0 1px 0 5px', gap: 0, height: '100%' }}
                    styleArrow={{ width: '16px', height: '16px' }}
                    styleOption={{padding: '5px 0 5px 5px'}}
                />
                <span>on page</span>
            </div>
        </div>
    );
};

export default Pagination;