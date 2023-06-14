async function fetchData() {
    const res = await fetch("https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw");
    const record = await res.json();
    document.getElementById("companyId").innerHTML = record.msgArray[0].c;
    document.getElementById("companyName").innerHTML = record.msgArray[0].n;
    document.getElementById("Volume").innerHTML = record.msgArray[0].v;
    document.getElementById("curPrice").innerHTML = record.msgArray[0].z;
    document.getElementById("yesClose").innerHTML = record.msgArray[0].y;
}
fetchData();