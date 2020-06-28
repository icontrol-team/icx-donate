export default function getConfig(element) {
    const address = element.getAttribute("address");
    const network_info = {
        mainnet : {
            nid: 1,
            endpoint: "https://ctz.solidwallet.io",
            tracker: "https://tracker.icon.foundation"
        },
        euljiro :{
            nid: 2,
            endpoint: "https://test-ctz.solidwallet.io",
            tracker: "https://trackerdev.icon.foundation"
        },
        yeouido :{
            nid: 3,
            endpoint: "https://bicon.net.solidwallet.io",
            tracker: "https://bicon.tracker.solidwallet.io"
        },
        pagoda :{
            nid: 80,
            endpoint: "https://zicon.net.solidwallet.io",
            tracker: "https://zicon.tracker.solidwallet.io"
        }
    }

    const network = element.getAttribute("network") || "mainnet";
    const button_type = element.getAttribute("button-type") || "default";
    const fixed_amount = element.getAttribute("amount") || 0.01;
    const button_string = element.getAttribute("button-string") || "Donate for us";

    let debug = false;
    if (element.getAttribute("debug") !== null){
        debug = true;
        console.log("==== DEBUG MODE ====");
    }

    if (!address) {
        throw new Error("icon-Button requires a `data-address` attribute!");
    }
    const network_set = network_info[network];
    if (!network_set){
        throw new Error("icon-Button requires a `data-network` attribute!  allow -> " + Object.keys(network_info) + ")");
    }

    const config = {
        address:  address,
        network:  network,
        nid:      network_set["nid"],
        endpoint: network_set["endpoint"],
        tracker:  network_set["tracker"],
        button_type: button_type,
        fixed_amount : fixed_amount,
        button_string: button_string,
        debug: debug
    };

    return config;
}

