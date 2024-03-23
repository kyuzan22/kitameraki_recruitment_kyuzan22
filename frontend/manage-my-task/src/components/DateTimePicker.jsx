import React, { useState, useCallback, useEffect } from 'react';
import { TimePicker, DatePicker, Label, Text, Stack } from '@fluentui/react';


const snapTimeToUpdatedDateAnchor = (datePickerDate, currentTime) => {
  let snappedTime = new Date(currentTime);

  if (currentTime && !isNaN(currentTime.valueOf())) {
    const startAnchor = new Date(datePickerDate);
    const endAnchor = new Date(startAnchor);
    endAnchor.setDate(startAnchor.getDate() + 1);
    if (currentTime < startAnchor || currentTime > endAnchor) {
      snappedTime = new Date(startAnchor);
      snappedTime.setHours(currentTime.getHours());
      snappedTime.setMinutes(currentTime.getMinutes());
      snappedTime.setSeconds(currentTime.getSeconds());
      snappedTime.setMilliseconds(currentTime.getMilliseconds());
    }
  }

  return snappedTime;
};

const TimePickerDateTimePicker = ({editData,currentDeadLine,onSelectDateTime}) => {
  const currentDate = editData ? currentDeadLine : new Date();
  const [datePickerDate, setDatePickerDate] = useState(currentDate);
  const [currentTime, setCurrentTime] = useState(currentDate);

  useEffect(() => {
    onSelectDateTime(currentDate); // Call onSelectDateTime with current date and time on component mount
  }, []);

  const onSelectDate = useCallback(
    (selectedDate) => {
      setDatePickerDate(selectedDate);
      if (currentTime) {
        const snappedTime = snapTimeToUpdatedDateAnchor(selectedDate, currentTime);
        setCurrentTime(snappedTime);
        onSelectDateTime(snappedTime);
      }
    },
    [currentTime,onSelectDateTime]
  );

  const onTimePickerChange = useCallback((_, date) => {
    setCurrentTime(date);
    onSelectDateTime(date);
  }, [onSelectDateTime]);

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Label>{'Pick your deadline'}</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '3px' }}>
        <DatePicker
          showMonthPickerAsOverlay
          value={datePickerDate}
          onSelectDate={onSelectDate}
          ariaLabel="Date picker"
          minDate={currentDate}
        />
        <TimePicker
          placeholder="Select a time"
          dateAnchor={datePickerDate}
          value={currentTime}
          onChange={onTimePickerChange}
          ariaLabel="Time picker"
          minTime={currentTime}
        />
      </div>
    </Stack>
  );
};

export default TimePickerDateTimePicker;
