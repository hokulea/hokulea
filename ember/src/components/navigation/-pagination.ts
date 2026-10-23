export const FirstIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M200 48v160a8 8 0 0 1-13.66 5.66l-80-80a8 8 0 0 1 0-11.32l80-80A8 8 0 0 1 200 48M72 40a8 8 0 0 0-8 8v160a8 8 0 0 0 16 0V48a8 8 0 0 0-8-8"/></svg>`;
export const PrevIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M168 48v160a8 8 0 0 1-13.66 5.66l-80-80a8 8 0 0 1 0-11.32l80-80A8 8 0 0 1 168 48"/></svg>`;
export const NextIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="m181.66 133.66l-80 80A8 8 0 0 1 88 208V48a8 8 0 0 1 13.66-5.66l80 80a8 8 0 0 1 0 11.32"/></svg>`;
export const LastIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M149.66 122.34a8 8 0 0 1 0 11.32l-80 80A8 8 0 0 1 56 208V48a8 8 0 0 1 13.66-5.66ZM184 40a8 8 0 0 0-8 8v160a8 8 0 0 0 16 0V48a8 8 0 0 0-8-8"/></svg>`;

export const LABELS = {
  backward: 'Previous page',
  first: 'First page',
  forward: 'Next page',
  last: 'Last page',
  itemPerPage: 'Items per page:',
  itemRange: (min: number, max: number, total: number) => `${min} – ${max} of ${total} items`,
  item: (min: number, max: number) => `${min} – ${max} items`,
  page: (page: number) => `page ${page}`,
  pageRange: (total: number) => `of ${total} ${total === 1 ? 'page' : 'pages'}`,
  pageNumber: 'Page Number'
};
