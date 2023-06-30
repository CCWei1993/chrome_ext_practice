var list = ['tse_2330.tw'];
document.getElementById("add").addEventListener("click", add);
document.getElementById("delete").addEventListener("click", _delete);
async function fetchData() {

    const url = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=";
    const res = await fetch(url + list.join('|'));
    const record = await res.json();

    const tableObject = document.getElementById("mytable");

    var rowCount = tableObject.rows.length - 1;

    while (rowCount != record.msgArray.length) {

        if (rowCount > record.msgArray.length) {
            tableObject.deleteRow(rowCount--);
        }
        else {
            addRow();
            rowCount++;
        }
    }

    for (let i = 0; i < record.msgArray.length; i++) {
        let cur_price = record.msgArray[i].z === '-' ? Number(record.msgArray[i].z.split('_')[0]) : record.msgArray[i].z;
        tableObject.rows[i + 1].cells[0].innerHTML = record.msgArray[i].c;
        tableObject.rows[i + 1].cells[1].innerHTML = record.msgArray[i].n;
        tableObject.rows[i + 1].cells[2].innerHTML = record.msgArray[i].v;
        tableObject.rows[i + 1].cells[3].innerHTML = cur_price;
        tableObject.rows[i + 1].cells[4].innerHTML = record.msgArray[i].y;
        tableObject.rows[i + 1].cells[5].innerHTML = (cur_price - record.msgArray[i].y) / record.msgArray[i].y;
    }
    // document.getElementById("companyId").innerHTML = record.msgArray[0].c;
    // document.getElementById("companyName").innerHTML = record.msgArray[0].n;
    // document.getElementById("Volume").innerHTML = record.msgArray[0].v;
    // document.getElementById("curPrice").innerHTML = record.msgArray[0].z;
    // document.getElementById("yesClose").innerHTML = record.msgArray[0].y;
}

function addRow() {
    var table = document.getElementById("mytable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = rowCount;
    cell2.innerHTML = rowCount;
    cell3.innerHTML = rowCount;
    cell4.innerHTML = rowCount;
    cell5.innerHTML = rowCount;
    cell6.innerHTML = rowCount;
}

fetchData();

var inverval_timer;

//Time in milliseconds [1 second = 1000 milliseconds ]    
inverval_timer = setInterval(function () {
    fetchData();
    console.log("5 seconds completed");
}, 5000);

//IF you want to stop above timer
function stop_timer() {
    clearInterval(inverval_timer);
}

function add() {
    let _companyid = "tse_" + document.getElementById('textbox_id').value + ".tw";
    var _flag = true;
    for (var i = 0; i < list.length; i++) {
        if (list[i] === _companyid) {
            _flag = false;
            break;
        }
    }
    if (_flag) list.push(_companyid);
    else console.log("duplicate");
}

function _delete() {
    let _companyid = document.getElementById('textbox_id').value;
    for (var i = 0; i < list.length; i++) {
        if (list[i] === _companyid) {
            list.splice(i, 1);
        }
    }
}

// function clearInputBox() {

// }