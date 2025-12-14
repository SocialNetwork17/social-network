'use client'
import styles from "../rootLayout.module.scss";
import {useState} from "react";
import Pagination from "@/shared/ui/pagination/Pagination";
import {Option} from "@/shared/ui/select-box/SelectBox";

const PaginationPage = () => {
    // Используется только для показа currentPage на странице
    const [currentPage, setCurrentPage] = useState<number>(1);
    // Добавлен только для демонстрации
    const [isDisabled, setDisabled] = useState(false);

    const totalItems = 100;
    const itemsPerPage = 10;

    const handlePageChange = (page: number) => {
        // Используется только для показа currentPage на странице
        setCurrentPage(page);
        // Здесь можно добавить логику загрузки данных для выбранной страницы
        console.log(`Переход на страницу: ${page}`);
    };

    const handleSelectOption = (option: Option) => {
        console.log('Selected:', option);
    }

    return (
    <div className={styles.page}>
      <main className={styles.main}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <h1>Pagination example</h1>
              <p>Current page: {currentPage}</p>
              <Pagination
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  maxVisiblePages={5}
                  disabled={isDisabled}
                  onSelectChange={handleSelectOption}
              />
              <button onClick={() => setDisabled(!isDisabled)}>Toggle Disabled</button>
          </div>
      </main>
    </div>
  );
}

export default PaginationPage;