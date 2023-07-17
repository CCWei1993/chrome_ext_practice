
// let list = ['tse_2330.tw'];
// let obj = await chrome.storage.local.get(["list"]);


function init() {
    // chrome.storage.local.set({ "state": 'on' })
    chrome.storage.local.get(["list"]).then((result) => {
        console.log(result.list);
        if (!result.list) {
            chrome.storage.local.set({ "list": ['tse_2330.tw'] });
        }

    });

}

init();

async function fetchData() {

    let obj = await chrome.storage.local.get(["list", "threshold"]);
    let list = obj.list;
    const url = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=";
    const res = await fetch(url + list.join('|'));
    const record = await res.json();
    const dataLen = record.msgArray ? record.msgArray.length : 0;

    let data = [];

    for (let i = 0; i < dataLen; i++) {

        let cur_price = record.msgArray[i].z === '-' ? Number(record.msgArray[i].b.split('_')[0]) : record.msgArray[i].z;
        data.push({
            c: record.msgArray[i].c,
            n: record.msgArray[i].n,
            v: record.msgArray[i].v,
            y: record.msgArray[i].y,
            curPrice: cur_price,
            priceChange: (cur_price - record.msgArray[i].y) / record.msgArray[i].y
        });

    }

    let threshold = obj.threshold;
    let notifList = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].priceChange > threshold) {
            notifList.push({ title: data[i].n, message: data[i].curPrice });
        }
    }

    if (notifList.length > 0) {
        let options = {
            type: 'list',
            title: 'stock information',
            message: 'This is a Basic Notification',
            iconUrl: chrome.runtime.getURL('icon/icon.png'),
            items: notifList
        };
        chrome.notifications.create(options);
    }

    chrome.storage.local.set({ "data": data });

}

let inverval_timer;

inverval_timer = setInterval(function () {
    fetchData();
}, 5000);

// function stop_timer() {
//     clearInterval(inverval_timer);
// }

//
// chrome.storage.onChanged.addListener(

//     function (changes, areaName) {

//         if ("state" in changes) {
//             if (changes.state.newValue === 'off') {
//                 console.log(changes);
//                 stop_timer();
//             }
//         }
//     }
// );