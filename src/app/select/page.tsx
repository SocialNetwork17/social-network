'use client'
import styles from "../page.module.css";
import SelectBox, {Option} from "@/common/components/select-box/SelectBox";
import {useState} from "react";

const options: Option[] = [
    {id: "1", label: "Option 1"},
    {id: "2", label: "Option 2"},
    {id: "3", label: "Option 3"},
    {id: "4", label: "Option 4"},
    {id: "5", label: "Option 5"},
    {id: "6", label: "Option 6"},
    {id: "7", label: "Option 7"},
    {id: "8", label: "Option 8"},
];

const Select = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (option: Option) => {
        setSelectedOption(option.id);
        console.log('Selected:', option);
    };

    return (
    <div className={styles.page}>
      <main className={styles.main}>
          <SelectBox
              options={options}
              value={selectedOption}
              onChange={handleSelect}
              placeholder="Choose an option"
          />
      </main>
    </div>
  );
}

export default Select;