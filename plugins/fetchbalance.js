// export default (context, inject) => {
//     (mswaliUserId) => {
//         let fetchbalanceproxy = `get-balance&user_id=${mswaliUserId}`
//         let response = await this.$axios.get(
//             `/api/${fetchbalanceproxy}`,
//         );
//         let walletBalanceFromAPI = await Math.trunc(response.data.data);
//         let walletCreditsFromAPI = await response.data.credit_balance;
//         await this.persistwalletBalance(walletBalanceFromAPI);
//         await this.persistUserCredits(walletCreditsFromAPI);
//         console.log(walletBalanceFromAPI);
//         console.log('GLOBAL bAlANCE FUNCTION')
//         return walletBalanceFromAPI = this.$store.state.walletBalance;
//     }
// }