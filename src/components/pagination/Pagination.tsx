import { useEffect, useState } from 'react'
import style from './Pagination.module.scss'
import ButtonArrow from '../../UI/buttonArrow/ButtonArrow'

interface IPaginationProps {
    currentPage: number
    totalPage: number
    step?: number
    className?: string
    isMobile?: boolean
    onPagination: (value: { page: number, limit: number }) => void
    limit: number
}
const Pagination: React.FC<IPaginationProps> = ({ currentPage = 6, totalPage, step = 2, className = '', isMobile, onPagination, limit }) => {
    const [page, setPage] = useState<number>((currentPage));
    const [all, setAll] = useState<(string | number)[]>([]);
    const handlePageClick = (value: number) => {
        if ((value) > 0) {
            setPage((value));
            onPagination({ page: (value), limit });
        }
    }
    useEffect(() => {
        const start = Math.max(1, page - step + 1);
        const end = Math.min(totalPage, page + step - 1);
        const left = Array.from({ length: page - start }, (_, i) => start + i);
        const right = Array.from({ length: (end) - (page) }, (_, i) => (page) + i + 1);
        if (end === totalPage - 1) {
            right.push(totalPage); // add the last page to the right array
        }
        const all: (string | number)[] = isMobile ? [page, ...right] : [...left, page, ...right];
        if (page === (step + 1) && !isMobile) {
            all.unshift(1);
        }
        else
            if ((page > step) && !isMobile) {
                all.unshift(1, '...');
            }
        if (((page) + (step)) < (totalPage)) {
            all.push('...', totalPage);
        }
        if (((totalPage - page) <= step) && isMobile) {
            all.unshift(...Array.from({ length: (step - totalPage + page) }, (_, i) => page - i - 1).reverse().filter(Boolean));
        }
        setAll(all);
    }, [page, step, totalPage, isMobile]);

    useEffect(() => setPage(Number(currentPage)), [currentPage]);

    return (
        <div className={`${style.pagination} ${className}`}>
            <ButtonArrow onClick={() => page > 1 && handlePageClick(page - 1)} direction="left" size="small" theme={'light'} />
            {all.map((value, index) => (
                <button
                    type="button"
                    className={`${style.pagination__item} ${page === value ? style.pagination__item_active : ''}`}
                    key={index}
                    onClick={() => handlePageClick(value as number)}
                >
                    {value}
                </button>
            ))}
            <ButtonArrow onClick={() => page < totalPage && handlePageClick(Number(page) + 1)} direction="right" size="small" theme={'light'} />
        </div>
    )
}

export default Pagination