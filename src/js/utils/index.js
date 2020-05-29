"use strict";

/**
 * Helpers
 */
export const $js = (el) => $(js(el));
export const js = (el) => '[data-js=' + el + ']';

export const priceFormat = (val) => val.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

export const findById = (data, id) => data.filter(x => x.id == id);
export const findIndexById = (data, id) => data.findIndex(x => x.id == id);
