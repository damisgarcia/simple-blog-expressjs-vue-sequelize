const PER_PAGE = 5;

const Pagination = {
    paginate: async function(Model, page=1) {        
        // convert external params to Integer
        let numberPage = parseInt(page);
        // get total rows
        let data = await Model.findAndCountAll()
        // calc total pages
        let pages = Math.ceil(data.count / PER_PAGE);
        // calc wrap results
        let offset = PER_PAGE * (numberPage - 1);
        // persist results
        let models = await Model.findAll({
            limit: PER_PAGE,
            offset: offset,
            $sort: { id: 1 }
        });

        return { result: models, count: data.count, pages: pages };
    }
}; 

module.exports = Pagination;