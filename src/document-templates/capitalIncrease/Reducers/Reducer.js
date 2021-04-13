import {sharesPaymentAccountTypes, sharesSubscriptionDocuments} from "../CapitalIncrease";

const initialState = {
    companyName: '',
    boardMeeting: {
        date: new Date(),
        place: '',
        boardMembers: [],
        reasonForCapitalIncrease: '',
        decisions: 'Alle beslutninger var enstemmige',
    },
    extraordinaryMeetingInvitation: {
        date: new Date(),
        time: new Date(),
        place: '',
        dateForSendingInvitation: new Date(),
        boardHead: '',
    },
    extraordinaryMeeting: {
        whoOpensMeeting: '',
        meetingManager: '',
        coSigner: '',
        sharesSubscriptionDocument: sharesSubscriptionDocuments.PROTOCOL.key,
        sharesSubscriptionDeadline: new Date(),
        paymentDeadline: 0,
        sharesPaymentAccountType: sharesPaymentAccountTypes.ISSUE_ACCOUNT.key,
        sharesPaymentAccountNumber: '',
        capitalIncreaseExpenses: 0,
        paragraphInStatute: '',
        newParagraphInStatute: '',
        capitalIncreaseDistribution: {
            shareSubscriptionPrice: 0,
            denomination: 1,
            perMoneyValuation: 0,
            shareholders: [],
        },
    },
};

export default function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}
