class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const { keyword } = this.queryStr;
        if (keyword) {
            const keywordFilter = {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            };
            this.query = this.query.find(keywordFilter);
        }
        return this;
    }

    filter() {
        const { keyword, page, limit, ...filterOptions } = this.queryStr;

        // Remove unnecessary fields for filtering
        const removeFields = ["page", "limit"];

        removeFields.forEach((key) => delete filterOptions[key]);

        // Convert filter options to MongoDB query format
        let queryStr = JSON.stringify(filterOptions);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports=ApiFeatures;