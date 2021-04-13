export function calculateNewSharesPrice(shareholders, sharesInfo) {
    return pricePerShare(sharesInfo) * calculateNewShares(shareholders, sharesInfo);
}

export function pricePerShare(sharesInfo) {
    return sharesInfo.find(n => n.name === 'shareSubscriptionPrice').val;
}

export function calculateNewShares(shareholders) {
    if (shareholders.length > 0) {
        return shareholders
            .map(s => Number(s.find(n => n.name === 'newShares').val))
            .reduce((a, b) => a + b);
    }
    return 0;
}
