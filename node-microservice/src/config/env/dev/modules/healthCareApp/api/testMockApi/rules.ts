module.exports = {
    name: 'testMockApi',
    select: function(req) {
        if (req.identityNum === 'id2') {
            return '02';
        } else {
            return '01';
        }
    }
};
