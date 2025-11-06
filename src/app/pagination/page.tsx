'use client'
import styles from "../page.module.css";
import {useState} from "react";
import Pagination from "@/shared/ui/pagination/Pagination";

const PaginationPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = 100;
    const itemsPerPage = 10;

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
        // Здесь можно добавить логику загрузки данных для выбранной страницы
        console.log(`Переход на страницу: ${page}`);
    };

    return (
    <div className={styles.page}>
      <main className={styles.main}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <h1>Pagination example</h1>
              <p>Current page: {currentPage}</p>
              <Pagination
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  maxVisiblePages={5}
              />
          </div>
      </main>
    </div>
  );
}

export default PaginationPage;