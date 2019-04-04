const Query = {
    user: (parent, args) => {
        return {
            name: 'Fatih',
            surname: 'Keles'
        }
    }
};      

module.exports = Query;