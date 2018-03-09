import BotCoin from '../../blockchain/BotCoin';
import TxStatus from '../../helpers/TxStatus'

let timers = {};

export const txObserverActions = {
  ADD_TX: "ADD_TX",
  UPDATE_TX: "UPDATE_TX",
  TX_TIMER_START: 'TX_TIMER_START',
  TX_TIMER_TICK: 'TX_TIMER_TICK',
  TX_TIMER_STOP: 'TX_TIMER_STOP'
}

export const start = (tx_id, success_callback) => (dispatch) => {
  dispatch({ type: txObserverActions.ADD_TX, tx_id: tx_id, value: {status: TxStatus.IN_PROGRESS} })
  clearInterval(timers[tx_id]);
  timers[tx_id] = setInterval(() => dispatch(tick(tx_id, success_callback)), 5000);
  dispatch({ type: txObserverActions.TX_TIMER_START })
  dispatch(tick(tx_id, success_callback))
}

const tick = (tx_id, success_callback) => (dispatch) => {
  dispatch({ type: txObserverActions.TX_TIMER_TICK })
  //TODO use one smartcontract for all checks
  let botcoin = new BotCoin();
  if (botcoin.isTxMined(tx_id)) {
    let status = botcoin.isTxSucceed(tx_id) ? TxStatus.SUCCEED : TxStatus.FAILED
    dispatch({ type: txObserverActions.UPDATE_TX, tx_id: tx_id, key: 'status', value: status })
    if(success_callback){
      dispatch(success_callback(status))
    }
    dispatch(stop(tx_id))
  }
}

const stop = (tx_id) => (dispatch) => {
  clearInterval(timers[tx_id]);
  dispatch({ type: txObserverActions.TX_TIMER_STOP })
}
