/* globals $ */
"use strict";

function convertMinutesToHours(value) {
    const minutes = parseFloat(value) || 0;
    if (minutes > 0) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}:${remainingMinutes.toFixed(0).padStart(2, '0')}`;
    }
    return null;
}

function convertHoursToMinutes(value) {
    const [hours, minutes] = value.split(':').map(Number);
    const totalMinutes = (hours * 60) + (minutes || 0);
    if (hours > 0 || minutes > 0) {
        return totalMinutes.toFixed(0);
    }
    return null;
}


function isTimeEntryPage(path) {
    return /\/issues\/\d+\/time_entries/.test(path)
        || /\/time_entries\/\d+\/edit/.test(path);
}

function loadModuleTimeEntry() {
    const hoursInput = $("#time_entry_hours");
    const hoursWrapper = $("#time_entry_hours").parent();
    const minutesInput = $(`<input size="6" value="" type="text" name="time_entry[minutes]" id="time_entry_minutes">`);
    const minutesWrapper = $(`<p><label for="time_entry_minutes">Minuten</label></p>`);
    $(minutesWrapper).append(minutesInput);
    $(minutesWrapper).insertAfter(hoursWrapper);

    const hoursValue = hoursInput.val();
    const minutesValue = convertHoursToMinutes(hoursValue);
    minutesInput.val(minutesValue);

    minutesInput.on('input', function () {
        const value = $(this).val();
        const hours = convertMinutesToHours(value);
        hoursInput.val(hours);
    });

    hoursInput.on('input', function () {
        const value = $(this).val();
        const minutes = convertHoursToMinutes(value);
        minutesInput.val(minutes);
    });
}

(function () {
    $(document).ready(function () {
        const currentPath = window.location.pathname;

        if (isTimeEntryPage(currentPath)) {
            loadModuleTimeEntry();
        }
    });
})();
