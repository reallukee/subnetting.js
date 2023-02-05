/*
	VLSM.js

	Questo progetto è distribuito sotto licenza MIT.
	Questo progetto è disponibile su GitHub.

	Repository:     https://github.com/reallukee/flsm.js/
	Descrizione:    JS
	Autore:         Luca Pollicino (https://github.com/reallukee/)
	Versione:       0.0.1
*/

const data = [
    {
        name: "A",
        host: 100,
        minbit: 0,
        addresses: 0,
    },
    {
        name: "B",
        host: 50,
        minbit: 0,
        addresses: 0,
    },
    {
        name: "C",
        host: 25,
        minbit: 0,
        addresses: 0,
    },
    {
        name: "D",
        host: 10,
        minbit: 0,
        addresses: 0,
    },
    {
        name: "E",
        host: 2,
        minbit: 0,
        addresses: 0,
    }
];

var index = 0;

var ip = 0;
var mask = 0;

var netBits = 0;
var subnetBits = 0;
var hostBits = 0;

var net = 0;
var subnet = 0;
var host = 0;

function showIp(ip)
{
	var t = "";

	t += ((ip >> 24) & 255);
	t += ".";
	t += ((ip >> 16) & 255);
	t += ".";
	t += ((ip >> 8) & 255);
	t += ".";
	t += ((ip >> 0) & 255);
	
	return t;
}


function assembleIp()
{
	var ip1Ctrl = document.getElementById('ip1');
	var ip2Ctrl = document.getElementById('ip2');
	var ip3Ctrl = document.getElementById('ip3');
	var ip4Ctrl = document.getElementById('ip4');
    
	ip = 0;

	ip += (ip1Ctrl.value << 24);
	ip += (ip2Ctrl.value << 16);
	ip += (ip3Ctrl.value << 8);
	ip += (ip4Ctrl.value << 0);
}


function assembleMask()
{
	var mask1Ctrl = document.getElementById('mask1');
	var mask2Ctrl = document.getElementById('mask2');
	var mask3Ctrl = document.getElementById('mask3');
	var mask4Ctrl = document.getElementById('mask4');

	mask = 0;

	mask += (mask1Ctrl.value << 24);
	mask += (mask2Ctrl.value << 16);
	mask += (mask3Ctrl.value << 8);
	mask += (mask4Ctrl.value << 0);
}


function calc()
{
    assembleIp();
    assembleMask();

    var outputCtrl = document.getElementById('output');

    while (outputCtrl.children.length > 1)
	{
		outputCtrl.removeChild(outputCtrl.children[1]);
	}

    index = 0;

    for (var i = 0; i < data.length; i++)
    {
        var contentCtrl = document.getElementById('content');

        if (document.getElementById('enabled' + (i + 1)).checked)
        {
            data[i].host = document.getElementById('host' + (i + 1)).value;

            index++;
        }
        else
        {
            break;
        }
    }

    for (var i = 0; i < index; i++)
    {
        data[i].minbit = Math.ceil(Math.log2(data[i].host));
        data[i].addresses = Math.pow(2, data[i].minbit);
    }
    
    for (var i = 0; i < index; i++)
    {
        netBits = 32 - Math.ceil(Math.log2(~mask));
        subnetBits = 32 - netBits - Math.ceil(Math.log2(data[i].host));
        hostBits = Math.ceil(Math.log2(data[i].host));
        net = net;
        subnet = Math.pow(2, subnetBits);
        host = Math.pow(2, hostBits) - 2;

        if (i == 0)
        {
            net = ip;
        }
        else
        {
            net = net + data[i - 1].addresses;
        }

        var row = document.createElement('tr');

		var networkIpCtrl = document.createElement('td');
		var maskIpCtrl = document.createElement('td');
		var firstIpCtrl = document.createElement('td');
		var lastIpCtrl = document.createElement('td');
		var defaultGatewayIpCtrl = document.createElement('td');
		var broadcastIpCtrl = document.createElement('td');

        var networkIp = net;
		var maskIp = 0xFFFFFFFF ^ (host + 1);
		var firstIp = networkIp + 1;
		var lastIp = networkIp + data[i].addresses - 3;
		var defaultGatewayIp = networkIp + data[i].addresses - 2;
		var broadcastIp = networkIp + data[i].addresses - 1;
        
        networkIpCtrl.innerText = showIp(networkIp);
		maskIpCtrl.innerText = showIp(maskIp);
		firstIpCtrl.innerText = showIp(firstIp);
		lastIpCtrl.innerText = showIp(lastIp);
		defaultGatewayIpCtrl.innerText = showIp(defaultGatewayIp);
		broadcastIpCtrl.innerText = showIp(broadcastIp);

		row.appendChild(networkIpCtrl);
		row.appendChild(maskIpCtrl);
		row.appendChild(firstIpCtrl);
		row.appendChild(lastIpCtrl);
		row.appendChild(defaultGatewayIpCtrl);
		row.appendChild(broadcastIpCtrl);

		outputCtrl.appendChild(row);
    }
}
