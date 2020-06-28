export const DEFAULT_STYLES = `
.donate_wrapper a {
  text-decoration: none;
  color: #097a7d;
}

.amount_holder .money_input {
      color: black;
      margin: 0 auto;
      position: relative;
      text-align: center;
      font-size: 55px;
      height: 62px;
      z-index: 1;
}
.amount_holder .money_input .amount_currency {
    display: inline-block;
    font-size: 24px;
    vertical-align: top;
    margin-top: 5px;
    font-family: "PayPalSansBig-Light", Helvetica Neue, Arial, sans-serif;
}
.amount_holder .money_input .amount_currency:not(:root:root) {
    margin-top: 10px;
}
.amount_holder .money_input .amount_currency .amount_currency_symbol {
    color: #666666;
}
.amount_holder .money_input .amount_number {
    display: inline-block;
    height: 62px;
    color: black;
    font-family: "PayPalSansBig-Light", Helvetica Neue, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1em;
    font-size: 1em;
    outline: none;
    width: 110px;
    font-weight: 200;
    border: 0;
    text-align: left;
    padding: 0;
    vertical-align: top;
    background-color: transparent;
}

.donate-voucher-ctas {
    margin-bottom: 12px;
}
.amount_holder {
    margin: 15px auto;
}
.amount_holder :invalid {
    box-shadow: none;
}
.amount_holder :-moz-submit-invalid {
    box-shadow: none;
}
.amount_holder :-moz-ui-invalid {
    box-shadow: none;
}
.amount_holder .money_input {
    color: black;
    margin: 0 auto;
    position: relative;
    text-align: center;
    font-size: 55px;
    height: 62px;
    z-index: 1;
}
.amount_holder .money_input .amount_currency {
    display: inline-block;
    font-size: 24px;
    vertical-align: top;
    margin-top: 5px;
    font-family: "PayPalSansBig-Light", Helvetica Neue, Arial, sans-serif;
}
.amount_holder .money_input .amount_currency:not(:root:root) {
    margin-top: 10px;
}
.amount_holder .money_input .amount_currency .amount_currency_symbol {
    color: #666666;
}
.amount_holder .money_input .amount_number {
    display: inline-block;
    height: 62px;
    color: black;
    font-family: "PayPalSansBig-Light", Helvetica Neue, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1em;
    font-size: 1em;
    outline: none;
    width: 110px;
    font-weight: 200;
    border: 0;
    text-align: left;
    padding: 0;
    vertical-align: top;
    background-color: transparent;
}
.amount_holder .money_input .amount_number::-webkit-inner-spin-button,
.amount_holder .money_input .amount_number::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.amount_holder .money_input .amount_number:focus[value=""] {
    text-align: right;
}
.amount_holder p {
    font-weight: 400;
    font-size: 18px;
    margin: 0 auto;
}

.icx-donation-btn {  
    /** background-color: #0070ba; **/
    background-color: #31B8BB;
    border-radius: 1.5rem;
    border: 0.0625rem solid #31B8BB;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-size: 0.9375rem;
    
    font-family: Helvetica Neue, Arial, sans-serif;
    font-weight: normal;
    font-weight: 700;
    min-width: 6rem;
    padding: 0.5rem 0.1rem;
    margin: -0.5em -0.1rem;
    text-align: center;
    text-decoration: none;    
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    width: 100%;    
}

.icx-donation-btn-small {  
    /** background-color: #0070ba; **/
    background-color: #31B8BB;    
    border-radius: 1.5rem;
    border: 0.0625rem solid #31B8BB;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-size: 0.7rem;    
    font-family: Helvetica Neue, Arial, sans-serif;
    font-weight: normal;
    font-weight: 10;
    padding: 0.5rem 0.1rem;
    margin: -0.5em -0.1rem;
    text-align: center;
    text-decoration: none;
    width: 100%;    
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;    
}

.icx-donation-btn span.icon {
    background: url(https://cdn.jsdelivr.net/npm/simple-icons@v2/icons/icon.svg) no-repeat;    
    filter: invert(100%);
    float: left;    
    width: 20px;
    height: 20px;
    margin-left: 10px;
    
}

.icx-donation-btn-small span.icon {
    background: url(https://cdn.jsdelivr.net/npm/simple-icons@v2/icons/icon.svg) no-repeat;    
    filter: invert(100%);
    float: left;    
    width: 13px;
    height: 13px;
    margin-left: 10px;
}

.icx-donation-btn-text {
    margin-left: -24px;
}


.icx-donation-btn:hover {
    color: rgba(0,0,0,0.5);
    background-color: #227c80;
    border:0.0625rem solid #2a7c80;

}

.icx-donation-btn-small:hover {    
    color: rgba(0,0,0,0.5);
    background-color: #227c80;
    border:0.0625rem solid #2a7c80;

}


.btn-wide {
    max-width: 100%;
    width: 100%;
}



.donate_wrapper {
    width: 350px;
    padding: 20px 15px 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #b7bcbf;
}
.donationAmount-input {
    border:none;
    border-right:0px; 
    border-top:0px; 
    boder-left:0px; 
    boder-bottom:0px;
    width: 100%; 
    font-size: 50px;
    text-align:right;
}
    
.disabledbutton {
    pointer-events: none;
    background-color: #9a9a9a;
    border: 0.0625rem solid #a0a0a0;
}
    
.ICX-Donation-BTN {
  box-sizing: border-box;
  display: flex;
  border-radius: 4px;
  width: 256px;
  max-width: 256px;
  padding: 2px;
  font-family: sans-serif;
  overflow:hidden;
}

.ICX-Donation-BTN a {
  text-decoration: none;
  color: #0099ff;
}

.ICX-Donation-BTN * {
  box-sizing: border-box;
}

.ICX-Donation-BTN--Content {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 192px;
}

.ICX-Donation-BTN-LabelRow {
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
}

.ICX-Donation-BTN-LabelRow--Caption {
  width: 50%;
}

.ICX-Donation-BTN-LabelRow--Address {
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: initial;
}

.ICX-Donation-BTN--InputRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ICX-Donation-BTN--InputRow--Input {
  text-align: right;
  border-radius: 4px;
  height: 24px;
  width: 50%;
}

.ICX-Donation-BTN--InputRow--Button {
  display: inline-block;
  background-color: white;
  padding: 3px 6px;
  border-radius: 4px;
  border: 1px solid #0099ff;
  color: #0099ff;
  cursor: pointer;
  width: 75px;
  text-align: center;
  height: 24px;
  transition: color 0.5s ease, border-color 0.5s ease;
  line-height: 16px;
}

.ICX-Donation-BTN--InputRow--Button.disabled {
  color: #ccc;
  border-color: #ccc;
  cursor: default;
}

.ICX-Donation-BTN--InputRow--Button.done {
  color: #2c2;
  border-color: #2c2;
  cursor: default;
}

.ICX-Donation-BTN--InputRow--Button.error {
  color: #c22;
  border-color: #c22;
  cursor: default;
}

.ICX-Donation-BTN--InputRow--Button.loading div {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px rgba(00, 153, 255, 0.25) solid;
	border-top: 2px rgba(00, 153, 255, 1) solid;
	border-radius: 50%;
	-webkit-animation: loading .6s infinite linear;
	animation: loading .6s infinite linear;
}
@-webkit-keyframes loading {
	from { -webkit-transform: rotate(0deg); }
	to { -webkit-transform: rotate(359deg); }
}
@keyframes loading {
	from { transform: rotate(0deg); }
	to { transform: rotate(359deg); }
}
`;

const STYLES_ROOT_ID = "ICX_BUTTON_STYLE";

export default function loadStyles(document) {
  if (document.getElementById(STYLES_ROOT_ID)) {
    return;
  }
  const styles = document.createElement("style");
  styles.type = "text/css";
  styles.innerHTML = DEFAULT_STYLES;
  styles.id = STYLES_ROOT_ID;
  document.head.appendChild(styles);
}

