export function loadServerRows(page, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.slice(page * 10, (page + 1) * 10));
      }, 1);
    });
}