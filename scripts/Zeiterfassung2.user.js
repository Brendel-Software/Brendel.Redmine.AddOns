// ==UserScript==
// @name         Redmine AddOn: Zeiterfassung
// @namespace    https://brendel.software/
// @version      1.1
// @description  Verbessert die Redmine Zeiterfassung
// @author       R. Olschewsky
// @match        https://redmine.brendel.software/issues/*/time_entries/*
// @icon         https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @updateURL    https://raw.githubusercontent.com/Brendel-Software/Brendel.Redmine.AddOns/master/scripts/Zeiterfassung.user.js
// @downloadURL  https://raw.githubusercontent.com/Brendel-Software/Brendel.Redmine.AddOns/master/scripts/Zeiterfassung.meta.js
// ==/UserScript==
/* globals $ */
(function() {
    'use strict';

    function convertMinutesToHours(value) {
        const minutes = parseFloat(value) || 0;
        const hours = minutes / 60;
        if (minutes > 0) {
            return hours.toFixed(2);
        }

        return null;
    }

    function convertHoursToMinutes(value) {
        const hours = parseFloat(value) || 0;
        const minutes = hours * 60;
        if (hours > 0) {
            return minutes.toFixed(0)
        }

        return null;
    }

    $(document).ready(function(){
        const hoursInput = $("#time_entry_hours");
        const hoursWrapper = $("#time_entry_hours").parent();
        const minutesInput = $(`<input size="6" value="" type="text" name="time_entry[minutes]" id="time_entry_minutes">`);
        const minutesWrapper = $(`<p><label for="time_entry_minutes">Minuten</label></p>`);
        $(minutesWrapper).append(minutesInput);
        $(minutesWrapper).insertAfter(hoursWrapper);

        minutesInput.on('input', function() {
            const value = $(this).val();
            const hours = convertMinutesToHours(value);
            hoursInput.val(hours);
        });

        hoursInput.on('input', function() {
            const value = $(this).val();
            const minutes = convertHoursToMinutes(value);
            minutesInput.val(minutes);
        });
    });
})();