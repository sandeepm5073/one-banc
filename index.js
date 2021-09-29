const api = "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const myinformation = () => {
  let myinfo = {
    name:"sandeep maurya ",
    email:"sandeepm5073@gmail.com",
    college:"chandigarh university ",
    enrollmentno:"11813708",
  };
  console.log(myinfo);
  getFunction(api);
}

async function getFunction(url) {
  const response = await fetch(url);
  var data = await response.json();
  const sortedInformation = sortT(data);
  const result = splitTfunction(sortedInformation);
  addTransactions(result);
}

function sortT(data) {
  const sortedT = data.transactions.sort((a, b) => {
    let da = new Date(a.startDate),
      db = new Date(b.startDate);
    return da - db;
  });
  return sortedT;
}

function splitTfunction(sortT = []) {
  const getDate = (date) => {
    return date.split("T")[0];
  };

  const newData = {};

  sortT.forEach((el) => {
    const key = getDate(el.startDate);
    if (!newData[key]) {
      newData[key] = [];
      newData[key].push(el);
    } else {
      newData[key].push(el);
    }
  });
  return newData;
}

var date;
function addTransactions(result) {

  for (let information in result) {
    var titledate = new Date(information);
    titledate = titledate.getDate() + " " + monthNames[(titledate.getMonth() + 1)] + " " + titledate.getFullYear();
    document.getElementById("lower").innerHTML += 
            `<div class="dateline">
              <div>
                <div>
                  <p >${titledate}</p>
                </div
              </div>
            </div>`;

    for (let i = 0; i < result[information].length; i++) {
      let type = result[information][i].type;
      let direction = result[information][i].direction;
      var new_date = new Date(result[information][i].startDate)
      var date = new_date.toLocaleTimeString();
      new_date = new_date.getDate() + " " + monthNames[(new_date.getMonth() + 1)] + " " + new_date.getFullYear();
      if (type === 1 && direction === 1) {
        document.getElementById(
          "lower"
        ).innerHTML += 
                `<div class="rightalign"><div class="transactionbox">
                  <p class="amount">
                    &#8377; ${result[information][i].amount}
                  </p>
                  <p class="message"> ✔️ You paid</p>
                  <div class="id">
                  <p>Transaction ID</p>
                <p>${result[information][i].id}</p>
                </div>
                </div>
                </div>
                <div class="rightside">
                <p>${new_date}, ${date}</p>
                </div>`;
      }
     else if (type === 1 && direction === 2) {
        document.getElementById(
          "lower"
        ).innerHTML += `<div class="leftalign"><div class="transactionbox">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="message">✔️ You received</p>
             <div class="id">
             <p>Transaction ID</p>
              <p>${result[information][i].id}</p>
             </div>
             </div>
             </div>
              <div class="leftside">
              <p>${new_date}, ${date}</p>
            </div>`;
      }
     else if (type === 2 && direction === 2) {
        //    Pay and Decline Button and Align BOX Left
        document.getElementById(
          "lower"
        ).innerHTML += `<div class="leftalign"><div class="transactionbox">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="message">🔗 Request received</p>
              <button class=\"paybtn\">Pay</button>
              <button class=\"cancelbtn\">Decline</button>
             </div>
             </div>
             <div class="leftside">
             <p>${new_date}, ${date}</p>
            </div>`;
      }
     else if (type === 2 && direction === 1) {

        document.getElementById(
          "lower"
        ).innerHTML += `<div class="rightalign"><div class="transactionbox">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="message">🔗 You requested</p>
             <div class="id">
              <button class=\"cancelbtn\">Cancel</button>
             </div>
             </div>
             </div>
             <div class="rightside">
             
             <p>${new_date}, ${date}</p>
           </div>`;
      }
    }
  }
}
