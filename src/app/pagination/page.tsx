'use client'
import styles from "../page.module.css";
import {useState} from "react";
import Pagination from "@/shared/ui/pagination/Pagination";



const Select = () => {
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
          <h1>Пример пагинации</h1>
          <p>Текущая страница: {currentPage}</p>
          <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              maxVisiblePages={5}
          />
      </main>
    </div>
  );
}

export default Select;