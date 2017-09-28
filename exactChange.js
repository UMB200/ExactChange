function checkCashRegister(price, cash, cid) {
  var change = cash - price;
   var money = [
    { name: "ONE HUNDRED", val: 100.00},
    { name: "FIFTY",       val: 50.00}, 
    { name: "TWENTY",      val: 20.00}, 
    { name: "TEN",         val: 10.00}, 
    { name: "FIVE",        val: 5.00}, 
    { name: "ONE",         val: 1.00}, 
    { name: "QUARTER",     val: 0.25}, 
    { name: "DIME",        val: 0.10}, 
    { name: "NICKEL",      val: 0.05 }, 
    { name: "PENNY",       val: 0.01}
  ];
  var updatedChange = cid.reduce((all, item) => {
    all.total += item[1];
    all[item[0]] = item[1];
    return all;
  }, {total: 0});
  
  if(updatedChange.total < change){
    return "Insufficient Funds";
  }
  else if(updatedChange.total === change){
    return "Closed";
  }
 
  
  var actualChange = money.reduce((all, item) =>{
    var interimResult = 0;
    while(updatedChange[item.name] > 0 && change >=item.val){
      change -= item.val;
      updatedChange[item.name] -=item.val;
      interimResult +=item.val;
      change = Math.round(change * 100)/100;
      }
    
    if(interimResult > 0 ){
      all.push([item.name, interimResult]);
    }
    return all;
        },[]); 
  if(actualChange.length < 1 || change > 0){
    return"Insufficient Funds";
  }
  // Here is your change, ma'am.
  return actualChange;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);