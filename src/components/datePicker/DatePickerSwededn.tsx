import DatePicker, { registerLocale } from 'react-datepicker';
import { addDays, subDays } from 'date-fns';
import { sv } from 'date-fns/locale/sv';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  handleDateChange: (date: [Date | null, Date | null]) => void;
  searchParams: URLSearchParams;
}
registerLocale('sv', sv);
export default function DatePickerSweden({
  searchParams,
  handleDateChange,
}: DatePickerProps) {
  return (
    <>
      <DatePicker
        locale="sv"
        selectsRange={true}
        startDate={
          searchParams.get('startDatum')
            ? new Date(searchParams.get('startDatum') as string)
            : undefined
        }
        endDate={
          searchParams.get('slutDatum')
            ? new Date(searchParams.get('slutDatum') as string)
            : undefined
        }
        onChange={handleDateChange}
        includeDateIntervals={[
          { start: subDays(new Date(), 1), end: addDays(new Date(), 14) },
        ]}
        dateFormat="dd MMM"
        placeholderText="Välj Datum"
        isClearable={true}
        className="form-control bg-light text-dark placeholder-gray fs-md-custom p-2 my-1 my-lg-2 "
      />
    </>
  );
}
