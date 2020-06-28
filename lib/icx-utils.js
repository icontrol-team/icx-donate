// import IconService, { IconAmount, IconConverter, HttpProvider, IconWallet, IconBuilder, SignedTransaction } from 'icon-sdk-js';
import IconService, { IconAmount, IconConverter, HttpProvider, IconBuilder } from 'icon-sdk-js';


export function getFloat(str){
    return parseFloat(uncomma(str));
}

export function uncomma(str) {
    str = String(str);
    str = str.replace(/(^0[\d]+|[a-z]|[A-Z]|[\{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"|\s])/g, '')
    return str.replace(/,/gi, '');
}

export function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}
export  function measureText(pText, pFontSize, pFamily, pWeight) {
    let lDiv = document.createElement('div');

    document.body.appendChild(lDiv);

    if (pFamily != null) {
        lDiv.style.fontFamily = pFamily;
    }
    if (pWeight != null) {
        lDiv.style.fontWeight = pWeight;
    }
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.innerHTML = pText;

    let lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}
export function fitText(el){
    let text = el.value;
    let fsize = parseInt(el.style['font-size']) + 2;
    let measured = measureText(text, fsize);
    let el_width = parseInt(el.style.width);
    console.log(measured,el_width, fsize);
    if (measured.width > el_width){
        while(true){
            fsize = parseInt(el.style['font-size']);
            let m = measureText(text, fsize );
            if(m.width > el_width){
                el.style['font-size'] =  --fsize + 'px';
            }
            else{
                break;
            }
        }
    }
    else if (measured.width < el_width){
        console.log('increasing', measured.width , el_width);
        fsize = parseInt(el.style['font-size']);
        let m = measureText(text, fsize);
        if(m.width < el_width) {
            el.style['font-size'] = ++fsize + 'px';
        }
        // while(true){
        //     fsize = parseInt(el.style['font-size']);
        //     let m = measureText(text, fsize);
        //     // console.log(m.width + " / " + el_width);
        //     // if (m.width > 0 ) {
        //     //     console.log(m.width + " / " + el_width);
        //     //     if (m.width < el_width - 4) { // not sure why -4 is needed (often)
        //     //         // el.css('font-size', ++fsize + 'px');
        //     //         el.style['font-size'] = ++fsize + 'px';
        //     //     } else {
        //     //         break;
        //     //     }
        //     // }
        // }
    }
}


export function addCommas(nStr) {
    nStr = uncomma(nStr);
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


export function sendTransaction(fromAddress, toAddress, amount, nid, options){
    options = options || {};
    nid = nid || 1; // 1=MainNet 3=TestNet , 80=Pagoda

    const icxTransactionBuilder = new IconBuilder.IcxTransactionBuilder;
    const amount_icx = IconAmount.of(amount, IconAmount.Unit.ICX).toLoop();
    const icxTransferData = icxTransactionBuilder
        .from(fromAddress)
        .to(toAddress)
        .nid(IconConverter.toBigNumber(nid))
        .value(amount_icx)
        .timestamp((new Date()).getTime() * 1000)
        .version(IconConverter.toBigNumber(3))
        .stepLimit(IconConverter.toBigNumber(1000000))
        .build();

    let params = IconConverter.toRawTransaction(icxTransferData)
    params['data'] = "";

    let scoreData = {};
    scoreData.value = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "icx_sendTransaction",
        "params": params,
        "id": 50889
    })

    var parsed = JSON.parse(scoreData.value)
    let responseScore = {};
    responseScore.value = null;

    if (parsed.method === "icx_sendTransaction" && !fromAddress) {
        alert('Select the ICX Address')
        return
    }


    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: parsed
        }
    }))
}

function wait(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}

export function waitForTransaction(url, txid) {

    return getTransactionResult(url, txid)
        .then(function(res) {
            console.log(res);
            if (!res) {
                // poll every 1000 ms
                // TODO: timeout?
                return wait(1000).then(function() {
                    return waitForTransaction(url, txid);
                });
            } else {
                return res;
            }
        });
}
export function hello(){
    console.log("hello");
}

/**
 * A simple create payload method
 *
 * @method createPayload
 * @param {Object} data the rpc payload data
 * @param {String} id the rpc data payload ID
 * @returns {Object} payload the completed payload object
 */
function createPayload(data, id) {
    return Object.assign({}, {
        id: id,
        jsonrpc: '2.0',
        params: []
    }, data);
}

function getProvider(url){
    // const httpProvider = new HttpProvider(url+'/api/v3');
    return new HttpProvider(url+'/api/v3');
}

export function getTransactionResult(url, txid){
    console.log("default get");
    const httpProvider = getProvider(url);
    const iconService = new IconService(httpProvider);
    const txObject = new Promise(function(resolve, reject) {
        iconService.getTransactionResult(txid).execute()
        // resolve(res)
        resolve()
    });
    console.log("txid="+ txid + " / txObject=" + txObject);
    return txObject;
}


