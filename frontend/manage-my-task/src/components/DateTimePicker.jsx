import React, { useState, useCallback, useEffect } from 'react';
import { TimePicker, DatePicker, Label, Stack, TextField } from '@fluentui/react';

// Function to snap time to the updated date anchor
const snapTimeToUpdatedDateAnchor = (datePickerDate, currentTime) => {
  let snappedTime = new Date(currentTime.toString());

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

const DateTimePicker = ({ readOnly, editData, currentDeadLine, onSelectDateTime }) => {
  const currentDate = editData ? currentDeadLine : new Date();
  const [datePickerDate, setDatePickerDate] = useState(currentDate); 
  const [currentTime, setCurrentTime] = useState(currentDate); 

  useEffect(() => {
    onSelectDateTime(currentDate);
  }, []);

  // Callback function for selecting date from DatePicker
  const onSelectDate = useCallback(
    (selectedDate) => {
      setDatePickerDate(selectedDate);
      if (currentTime) {
        const snappedTime = snapTimeToUpdatedDateAnchor(selectedDate, currentTime);
        setCurrentTime(snappedTime);
        onSelectDateTime(snappedTime);
      }
    },
    [currentTime, onSelectDateTime]
  );

  // Callback function for time selection from TimePicker
  const onTimePickerChange = useCallback((_, date) => {
    setCurrentTime(date);
    onSelectDateTime(date);
  }, [onSelectDateTime]);

  return (
    <Stack tokens={{ childrenGap: 2 }}>
      <Label>{readOnly ? 'Deadline' : 'Pick your deadline'}</Label> 
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '3px' }}> 
        {readOnly ? (
          <TextField
            readOnly
            value={currentDate ? currentDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }) : ''}
            ariaLabel="Date picker"
          />
        ) : (
          <DatePicker
            showMonthPickerAsOverlay
            value={datePickerDate}
            onSelectDate={onSelectDate}
            ariaLabel="Date picker"
            minDate={new Date()}
          />
        )}
        <TimePicker
          style={readOnly ? { pointerEvents: 'none' } : {}}
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

export default DateTimePicker;
