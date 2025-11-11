'use client'
import styles from "../../../app/page.module.css";
import SelectBox, {Option} from "@/shared/ui/select-box/SelectBox";
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
    const [isDisabled, setDisabled] = useState(false);

    const handleSelect = (option: Option) => {
        console.log('Selected:', option);
    };

    return (
    <div className={styles.page}>
      <main className={styles.main}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
              <SelectBox
                  options={options}
                  onChange={handleSelect}
                  placeholder="Choose an option"
                  disabled={isDisabled}
              />
              <button onClick={() => setDisabled(!isDisabled)}>Toggle Disabled</button>
          </div>
      </main>
    </div>
  );
}

export default Select;