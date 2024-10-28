import DatePicker from 'react-datepicker';
import { addDays, subDays } from 'date-fns';

interface DatePickerProps {
  setFilters: (filters: any) => void;
  filters: {
    selectedStartDate: Date | undefined;
    selectedEndDate: Date | undefined;
  };
}

function DatePickerComponent({ setFilters, filters }: DatePickerProps) {
  return (
    <DatePicker
      selectsRange={true}
      startDate={filters.selectedStartDate}
      endDate={filters.selectedEndDate}
      onChange={(update: [Date | null, Date | null]) => {
        setFilters((prevFilters: any) => ({
          ...prevFilters,
          selectedStartDate: update[0],
          selectedEndDate: update[1],
        }));
      }}
      includeDateIntervals={[
        { start: subDays(new Date(), 1), end: addDays(new Date(), 14) },
      ]}
      dateFormat="yyyy-MM-dd"
      placeholderText="Välj Datum"
      className="form-control react-datepicker-wrapper p-2 m-0"
      isClearable={true}
    />
  );
}

export default DatePickerComponent;
