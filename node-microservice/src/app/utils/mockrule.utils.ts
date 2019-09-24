export const getRuleName = function(ruleObj, req) {
    let selectedRule = ruleObj.select(req);
    if (selectedRule === undefined) {
        return undefined;
    } else {
        return ruleObj.name + '/' + selectedRule;
    }
};
