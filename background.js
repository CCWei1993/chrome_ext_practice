


chrome.storage.local.set({ "list": ['tse_2330.tw'] }).then(() => {
    setInterval(function () {
        fetchData();
    }, 5000);
});

async function fetchData() {

    const list = await chrome.storage.local.get(["list"]).list;
    // chrome.storage.local.get(["list"]).then((result) => {
    //     list = result.list;
    // });

    const url = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=";
    const res = await fetch(url + list.join('|'));
    const record = await res.json();

    chrome.storage.local.set({ "data": record });

}