module.exports = {
    name: 'testMock2Api',
    select: function(req) {
        if (req.identityNum === 'id2') {
            return '02';
        } else {
            return '01';
        }
    }
};
