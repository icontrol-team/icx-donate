import getConfig from "./set-config";
import loadStyles from "./style";

const icx_utils = require("./icx-utils");

function makeElement(document, type, className, parent) {
    const el = document.createElement(type);
    if (className) {
        el.className = className;
    }
    if (parent) {
        parent.appendChild(el);
    }
    return el;
}

export default function createButton(document, element) {
    const config = getConfig(element);
    const endpoint = config['endpoint'];
    const tracker = config['tracker'];
    const nid = config['nid'];
    const button_type = config['button_type'];

    let fromAddress = "";
    let responseScore = {};

    loadStyles(document);

    const container = makeElement(document, "div", "donate_wrapper");
    const content = makeElement(
        document,
        "div",
        "container",
        container
    );
    const labelRow = makeElement(
        document,
        "div",
        "ICX-Donation-BTN-LabelRow",
        content
    );
    const label = makeElement(
        document,
        "div",
        "ICX-Donation-BTN-LabelRow--Caption",
        labelRow
    );
    label.innerHTML = "Give ICX to";
    const address = makeElement(
        document,
        "div",
        "ICX-Donation-BTN-LabelRow--Address",
        labelRow
    );
    const addressLink = makeElement(document, "a", null, address);
    addressLink.href = tracker + "/address/" + config.address;
    addressLink.innerHTML = config.address;
    addressLink.title = config.address;
    addressLink.target = "_blank";
    const inputRow = makeElement(
        document,
        "div",
        "donationAmount-input",
        content
    );

    const inputElement = makeElement(
        document,
        "input",
        "donationAmount-input",
        inputRow
    );
    inputElement.placeholder = "0.0Ξ";
    inputElement.min = "0";
    inputElement.step = "0.01";
    // inputElement.type = "number";
    inputElement['aria-label']="Donation Amount";
    const rnd_number = Math.random();
    inputElement.id="donationAmount" + rnd_number;
    inputElement.name="donationAmount" + rnd_number;
    inputElement.value = config.fixed_amount;

    let button_style = ""
    if (button_type === "simple") {
        label.style['font-size'] = "13px";
        addressLink.style['font-size'] = "13px";
        inputElement.style['font-size'] = "0px";
        inputElement.style['width'] = "0px";
        inputRow.style['font-size'] = "0px";
        container.style['width'] = "150px";
        config.button_string = config.fixed_amount + " " + config.button_string;
        button_style = "icx-donation-btn-small"
    }else{
        inputElement.style['font-size'] = "50px";
        inputElement.style['width'] = "350px";
        button_style = "icx-donation-btn btn-wide"

    }
    const button = makeElement(
        document,
        "div",
        button_style,
        inputRow
    );
    button.id = "payWithUCX"
    button['pa-marked']=1

    const button_icon = makeElement(
        document,
        "span",
        "icon",
        button
    )
    const button_text = makeElement(
        document,
        "span",
        "icx-donation-btn-text",
        button
    )
    icx_utils.setInputFilter(inputElement, function(value) {
        if (inputElement.value < 0) {
            inputElement.value = 0;
        }
        // icx_utils.fitText(inputElement);
        inputElement.value = icx_utils.addCommas(value);
    });

    button_text.innerHTML = config.button_string;

    let buttonActive = true;

    function getAddress() {
        window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
            detail: {
                type: 'REQUEST_ADDRESS'
            }
        }))

    }


    button.addEventListener("click", function clickHandler(e) {
        if (buttonActive) {
            getAddress();
        }
    });

    function changeHandler(e) {
        let value = icx_utils.uncomma(inputElement.value);
        if (icx_utils.getFloat(value) <= 0 || isNaN(value) || inputElement.value === "")  {
            button.classList.add("disabledbutton");
            buttonActive = false;
        }else{
            button.classList.remove("disabledbutton");
            buttonActive = true;
        }

    }

    function sleep (delay) {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }


    function iconexEventHandler(event) {
        let type = event.detail.type
        let payload = event.detail.payload
        if (config.debug)
            console.log(event);

        switch (type) {
            case "RESPONSE_HAS_ACCOUNT":
                if (config.debug)
                    console.log("RESPONSE_HAS_ACCOUNT> Result : " + payload.hasAccount + " (" + typeof payload.hasAccount + ")");
                break
            case "RESPONSE_HAS_ADDRESS":
                if (config.debug)
                    console.log("RESPONSE_HAS_ADDRESS> Result : " + payload.hasAddress + " (" + typeof payload.hasAddress + ")");
                break
            case "RESPONSE_ADDRESS":
                fromAddress = payload
                if (config.debug)
                    console.log("RESPONSE_ADDRESS> Result : " + fromAddress + " (" + typeof fromAddress + ")");

                sleep(1000);
                let icx_value = icx_utils.getFloat(inputElement.value);

                if (config.debug)
                    console.log("fromAddress: "+fromAddress + ", toAddress: "+ config.address  + ", icx: "+ icx_value +", nid:"+ nid);

                if (isNaN(icx_value)){
                    throw Error("Invalid icx amount value :" + inputElement.value);
                }else{
                    icx_utils.sendTransaction(fromAddress, config.address, icx_value, nid);
                }

                break
            case "RESPONSE_JSON-RPC":
                responseScore.value = JSON.stringify(payload);
                if (config.debug)
                     console.log("RESPONSE_JSON> Result: " + payload);
                break
            case "CANCEL_JSON-RPC":
                responseScore.value = null;
                if (config.debug)
                    console.log("CANCEL_JSON-RPC> Result: " + payload);
                break
            case "RESPONSE_SIGNING":
                signingData.value = null
                if (config.debug)
                     console.log("RESPONSE_SIGNING> Signature : " + JSON.stringify(payload));
                break
            case "CANCEL_SIGNING":
                signingData.value = null
                if (config.debug)
                     console.log("CANCEL_SIGNING> Signature : " + JSON.stringify(payload));
                break

            default:
        }
    }

    inputElement.addEventListener("change", changeHandler);
    inputElement.addEventListener("keyup", changeHandler);
    window.addEventListener("ICONEX_RELAY_RESPONSE", iconexEventHandler, false);
    return container;
}

