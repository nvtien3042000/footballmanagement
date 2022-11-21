const UtilsPagination = {
    getPageTotal: (itemTotal) => {
        let pageNumber = Math.floor(itemTotal / 3);
        if (itemTotal % 3 > 0) {
            pageNumber = pageNumber + 1;
        }
        return pageNumber;
    },

    getPageTotalCondition: (itemTotal, limit) => {
        let pageNumber = Math.floor(itemTotal / limit);
        if (itemTotal % limit > 0) {
            pageNumber = pageNumber + 1;
        }
        return pageNumber;
    }
}

export default UtilsPagination;